import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIcon from '@mui/icons-material/Upload';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  AppBar, Toolbar, IconButton, Typography,
  FormControl, FormGroup, FormControlLabel, InputLabel,
  Select, MenuItem, InputAdornment, Switch,
  Box, TextField, Stack, Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useMediaQuery } from "@mui/material";
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


export default function CreateEventPage({
  eventDetails,
  setEventDetails,
  setDetailsCompleted,
  detailsChanged,
  setDetailsChanged
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  // console.log(eventDetails);

  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");

  // in db, public=true and private=false 
  let formattedDate;
  let goodTimings = true;

  const [requiredFieldsErrors, setRequiredFieldErrors] = React.useState({
    title: false,
    eventtype: false,
    description: false,
    address: false,
    startdate: false,
    starttime: false,
    startdateraw: false,
    starttimeraw: false
  });

  async function fetchEvent(eventId) {
    const APIUrl = `http://localhost:3001/api/events/${eventId}`;

    try {
      const response = await fetch(APIUrl);
      const data = await response.json();
      console.log("retrieved data", data);

      if (!response.ok) {
        throw new Error(data.error || "something bad happened uh oh");
      }
      return data.event;

    } catch (error) {
      console.log("some error here", error);
    }
  }

  // retrieve event info if on edit page
  React.useEffect(() => {
    if (onEditPage && !detailsChanged) {
      console.log("fetch useEffect called");
      const fetchEvents = async () => {
        if (id) {
          // before api call
          try {
            const retrieveEvent = await fetchEvent(id);

            setEventDetails({
              ...eventDetails,
              title: retrieveEvent.title,
              eventtype: retrieveEvent.eventtype,
              description: retrieveEvent.description,
              address: retrieveEvent.address,
              startdate: retrieveEvent.startdate.slice(0, -14),
              starttime: retrieveEvent.starttime,
              enddate: format(retrieveEvent.enddate, 'yyyy-MM-dd'),
              endtime: retrieveEvent.endtime,
              visibility: retrieveEvent.visibility,
              startdateraw: retrieveEvent.startdateraw,
              starttimeraw: retrieveEvent.starttimeraw,
              enddateraw: retrieveEvent.enddateraw,
              endtimeraw: retrieveEvent.endtimeraw,
              eventimage: retrieveEvent.eventimage,
              imagename: retrieveEvent.eventimage,
              imagenamemobile: mobileFileNameFormat(retrieveEvent.eventimage),
              imageform: "exists_in_cloud" // check to make sure if this is still there, then do not reupload when posting
            });

          }
          catch (e) {
            console.log("error: ", e);
          }
        }
      };
      fetchEvents();
    }
  }, [id]);

  const updateDetails = (event) => {
    const { name, value } = event.target;
    setEventDetails({ ...eventDetails, [name]: value });
    setDetailsChanged(true);
  };

  const handleStartDateChange = (date) => {
    const jsonDate = JSON.stringify(date);
    console.log(`json stringify: ${jsonDate}`);

    formattedDate = format(date, 'yyyy-MM-dd');
    setEventDetails({ ...eventDetails, startdate: formattedDate, startdateraw: jsonDate });
    setDetailsChanged(true);
  }

  const handleStartTimeChange = (time) => {
    const jsonTime = JSON.stringify(time);
    console.log(`json stringify: ${jsonTime}`);

    const formattedTime = format(time, "HH:mm:ss'+00'");
    console.log(time);
    setEventDetails({ ...eventDetails, starttime: formattedTime, starttimeraw: jsonTime });
    setDetailsChanged(true);
  }

  const handleEndDateChange = (date) => {
    const jsonDate = JSON.stringify(date);
    console.log(`json stringify: ${jsonDate}`);

    formattedDate = format(date, 'yyyy-MM-dd');
    setEventDetails({ ...eventDetails, enddate: formattedDate, enddateraw: jsonDate });
    setDetailsChanged(true);
  }

  const handleEndTimeChange = (time) => {
    const jsonTime = JSON.stringify(time);
    console.log(`json stringify: ${jsonTime}`);

    const formattedTime = format(time, "HH:mm:ss'+00'");
    console.log(time);
    setEventDetails({ ...eventDetails, endtime: formattedTime, endtimeraw: jsonTime });
    setDetailsChanged(true);
  }

  const handleVisibilityChange = (event) => {
    const { checked } = event.target;
    console.log(checked);
    setEventDetails({ ...eventDetails, visibility: checked });
    setDetailsChanged(true);
  }

  function mobileFileNameFormat(file) {
    if (!file) {
      return;
    }
    let mobileFileName = '';
    if (file.length > 25) {
      const beginning = file.slice(0, 8);
      const filetype = file.slice(-8);
      mobileFileName = beginning.concat("...", filetype);
      console.log(mobileFileName);
    }
    else {
      mobileFileName = file;
    }
    return mobileFileName;
  }

  // save image to push later
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (!file || !file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      console.log("BAD!");
      alert("File type is not an image format");
      return;
    }

    const mobileFileName = mobileFileNameFormat(file.name);

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "eventEcho");
    data.append("cloud_name", "dk7v80lgt");
    data.append("c_crop", "h_600,w_800");

    const fileURL = URL.createObjectURL(file);
    setEventDetails({
      ...eventDetails,
      eventimage: fileURL,
      imagename: file.name,
      imagenamemobile: mobileFileName,
      imageform: data
    });
    setDetailsChanged(true);

  }

  // deletes files
  const handleDeleteFile = () => {
    setEventDetails({ ...eventDetails, eventimage: null, imagename: '', imageform: null });
    setDetailsChanged(true);
  }

  // call field checking here
  const handleNavigate = (url) => {
    if (checkFields()) {
      console.log("Hey hey hey");
      alert("Some required fields are missing or incorrect.");
    }
    else if (goodTimings === false) {
      alert("Some event timing fields are incorrect.");
    }
    else {
      setDetailsCompleted(true);
      console.log(eventDetails);
      navigate(url, { state: { message: 'testing testing' } });
    }
  };

  // field checking (and alot of error checking for date and times)
  const checkFields = () => {
    goodTimings = true;

    const currentdate = dayjs();
    const startdateraw_conv = dayjs(JSON.parse(eventDetails.startdateraw));
    const starttimeraw_conv = dayjs(JSON.parse(eventDetails.starttimeraw));
    const enddateraw_conv = dayjs(JSON.parse(eventDetails.enddateraw));
    const endtimeraw_conv = dayjs(JSON.parse(eventDetails.endtimeraw));

    console.log("current time only: ", currentdate.format('HH:mm:ss'));
    console.log("today: ", currentdate);
    console.log("start date: ", startdateraw_conv);
    console.log("today = start date? : ", (dayjs().startOf('day')).isSame(startdateraw_conv, 'day'));
    console.log("current time > start time? ", dayjs(currentdate.format('HH:mm:ss'), 'HH:mm:ss').isAfter(starttimeraw_conv));

    // both start date and time missing
    if (eventDetails.startdate === null && eventDetails.starttime === null) {
      setEventDetails({
        ...eventDetails,
        startdate: null,
        starttime: null,
        startdateraw: JSON.stringify(''),
        starttimeraw: JSON.stringify('')
      });
      goodTimings = false;
      console.log("no event timings!");
    }
    // just start time missing
    else if (eventDetails.starttime === null) {
      setEventDetails({ ...eventDetails, starttime: null, starttimeraw: JSON.stringify('') });
      goodTimings = false;
    }
    // just start date missing
    else if (eventDetails.startdate === null) {
      setEventDetails({ ...eventDetails, startdate: null, startdateraw: JSON.stringify('') });
      goodTimings = false;
    }
    else {
      // start date is after end date
      if (startdateraw_conv.isAfter(enddateraw_conv)) {
        console.log("event is ending before it starts?");
        goodTimings = false;
        setEventDetails({ ...eventDetails, enddate: null, enddateraw: JSON.stringify('') });
      }
      // same day but start time is after end time
      else if (startdateraw_conv.isSame(enddateraw_conv) && starttimeraw_conv.isAfter(endtimeraw_conv)) {
        console.log("same day but can't end before it starts");
        goodTimings = false;
        setEventDetails({ ...eventDetails, endtime: null, endtimeraw: JSON.stringify('') });
      }
      // check if today is start date and time is before current time
      else if ((currentdate.startOf('day')).isSame(startdateraw_conv, 'day') &&
        dayjs(currentdate.format('HH:mm:ss'), 'HH:mm:ss').isAfter(starttimeraw_conv)) {
        console.log("why are you making an event in the past?");
        goodTimings = false;
        setEventDetails({
          ...eventDetails,
          startdate: null,
          starttime: null,
          startdateraw: JSON.stringify(''),
          starttimeraw: JSON.stringify('')
        });
      }
      // if event is in the past (usually when editing events? like the football game)
      else if (currentdate.isAfter(startdateraw_conv) || currentdate.isAfter(enddateraw_conv)) {
        console.log("this event has already passed");
        goodTimings = false;
        setEventDetails({
          ...eventDetails,
          startdate: null,
          enddate: null,
          startdateraw: JSON.stringify(''),
          enddateraw: JSON.stringify('')
        });
      }
    }

    const newErrors = {
      title: !eventDetails.title,
      eventtype: !eventDetails.eventtype,
      description: !eventDetails.description,
      address: !eventDetails.address,
      startdate: !eventDetails.startdate,
      starttime: !eventDetails.starttime,
      startdateraw: !eventDetails.startdateraw,
      starttimeraw: !eventDetails.starttimeraw
    };

    setRequiredFieldErrors(newErrors);
    return Object.values(newErrors).includes(true);
  };

  // MOBILE VERSION
  if (isMobile) {
    return (
      // Page Container
      <Box component="section"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflowY: "auto"
        }}
      >
        {/* Top App Bar */}
        <Box component="section"
          sx={{
            width: "100%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000
          }}
        >
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar sx={{ color: "secondary" }}>
              <Typography variant="h6" component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: 'center',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: 'auto'
                }}>
                {onEditPage ? 'Edit an Event' : 'Create a New Event'}
              </Typography>

              <IconButton
                onClick={onEditPage ? () => navigate('/user') : () => navigate('/')}
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
              <Box sx={{ flexGrow: 1 }}>
              </Box>

            </Toolbar>
          </AppBar>
        </Box>

        {/* forms */}
        <Box component="form" noValidate sx={{ width: "85%", height: "100%", pt: 8, pb: 8 }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ height: "100%", padding: 2 }}
          >
            {/* Event title */}
            <TextField required fullWidth
              name="title"
              id="event-title"
              label="Event Title"
              variant="outlined"
              sx={{ pb: 2 }}
              value={eventDetails.title}
              onChange={updateDetails}
              error={requiredFieldsErrors.title}
            />

            {/* Event Type */}
            <FormControl fullWidth sx={{ pb: 2 }}>
              <InputLabel id="event-type">Event Type *</InputLabel>
              <Select labelId="select-event-type"
                name='eventtype'
                // defaultValue={onEditPage ? events[id - 1].eventtype : eventType}
                label="Event Types"
                value={eventDetails.eventtype}
                onChange={updateDetails}
                sx={{ textAlign: 'left' }}
                error={requiredFieldsErrors.eventtype}
              >
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Hangout">Hangout</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
                <MenuItem value="Convention">Convention</MenuItem>
              </Select>
            </FormControl>

            {/* Event Description */}
            <TextField required
              name="description"
              id="event-description"
              label="Event Description"
              variant="outlined"
              multiline={true}
              minRows={3}
              sx={{ pb: 2 }}
              value={eventDetails.description}
              onChange={updateDetails}
              error={requiredFieldsErrors.description}
            />

            {/* Location (THERE'S NO WAY WE'RE DOING GOOGLE MAPS API AUTOFILL) */}
            <TextField required
              id="event-location"
              name="address"
              label="Location"
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <PlaceIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              value={eventDetails.address}
              onChange={updateDetails}
              error={requiredFieldsErrors.address}
            />

            {/* Event Timing Title */}
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Typography sx={{ fontSize: "20px" }}>Event Timing</Typography>
            </Box>

            {/* Time and Date Grid */}
            <Grid container spacing={2}>

              {/* Start Date -> Set as required with form submit error checking */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="startdate" label="Start Date *"
                    value={eventDetails.startdateraw === null ? null : dayjs(JSON.parse(eventDetails.startdateraw))}
                    onChange={handleStartDateChange}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Start Time -> Set as required with form submit error checking */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker name="starttime" label="Start Time *"
                    value={eventDetails.starttimeraw === null ? null : dayjs(JSON.parse(eventDetails.starttimeraw))}
                    onChange={handleStartTimeChange}
                  />
                </LocalizationProvider>
              </Grid>

              {/* End Date */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="enddate" label="End Date"
                    value={eventDetails.enddateraw === null ? null : dayjs(JSON.parse(eventDetails.enddateraw))}
                    onChange={handleEndDateChange}
                    minDate={dayjs()}
                  />
                </LocalizationProvider>
              </Grid>

              {/* End Time */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker name="endtime" label="End Time"
                    value={eventDetails.endtimeraw === null ? null : dayjs(JSON.parse(eventDetails.endtimeraw))}
                    onChange={handleEndTimeChange}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>

            {/* Set Event Public */}
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={eventDetails.visibility}
                      onChange={handleVisibilityChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="This Event is Public" />
              </FormGroup>
            </Box>

            {/* Upload Image Title */}
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              <Typography sx={{ fontSize: "20px" }}>Event Posting Photo</Typography>
            </Box>

            {/* Upload Image */}
            <Box sx={{ border: '1px solid #aaaaa9', borderRadius: '5px', pt: 1 }}>
              <Stack direction="column" spacing={2} sx={{ display: "flex", justifyContent: "center", padding: 2 }}>
                <Button
                  component="label"
                  variant='contained'
                  startIcon={<CloudUploadIcon />}
                  sx={{
                    borderRadius: '10px'
                  }}
                >
                  Upload Image
                  <input type="file" hidden onChange={handleFileChange} />
                </Button>
                <Stack direction="row" spacing={1} sx={{ display: "flex", justifyContent: "center" }}>
                  <Typography sx={{ fontSize: "14px", alignContent: "center" }}>
                    {eventDetails.imageform ? eventDetails.imagenamemobile : "No image selected"}
                  </Typography>
                  {eventDetails.imageform ?
                    <IconButton onClick={handleDeleteFile} sx={{ alignSelf: "center" }}>
                      <DeleteIcon />
                    </IconButton> : null
                  }

                </Stack>

              </Stack>
            </Box>

            {/* Confirm and Invite Guests Button if create, Confirm Changes+Edit Guests if edit */}
            {onEditPage ?

              <Button variant='contained'
                onClick={() => handleNavigate(`/editEvent/${id}/changeGuests`)}
                sx={{
                  borderRadius: '10px',
                  backgroundColor: "#F68F8D",
                  "&:hover": {
                    backgroundColor: "#A50B07",
                  }
                }}
              >
                Confirm Changes
              </Button> :
              <Button variant='contained'
                onClick={() => handleNavigate('/createEvent/addGuests')}
                sx={{
                  borderRadius: '10px',
                  backgroundColor: "#F68F8D",
                  "&:hover": {
                    backgroundColor: "#A50B07",
                  }
                }}
              >
                Confirm and Invite Guests
              </Button>

            }

          </Stack>
        </Box>
      </Box>
    );
  }

  // DESKTOP VERSION
  else {
    return (
      <Box component="section"
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          overflowY: "auto",
          pt: 2
        }}>

        {/* Forms */}
        <Stack
          direction="column"
          spacing={2}
          sx={{
            height: "100%",
            width: "80%",
            padding: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >

          {/* Event Title and Type Horizontal Stack */}
          <Stack direction="row" spacing={6} sx={{ width: "80%" }}>

            {/* Event title */}
            <TextField fullWidth required
              name='title'
              id="event-title"
              label="Event Title"
              variant="outlined"
              sx={{ width: "100%" }}
              value={eventDetails.title}
              onChange={updateDetails}
              error={requiredFieldsErrors.title}
            />

            {/* Event Type */}
            <FormControl fullWidth sx={{ width: "80%" }}>
              <InputLabel id="event-type">Event Type *</InputLabel>
              <Select labelId="select-event-type"
                name='eventtype'
                label="Event Types"
                value={eventDetails.eventtype}
                onChange={updateDetails}
                sx={{ textAlign: 'left' }}
                error={requiredFieldsErrors.eventtype}
              >
                <MenuItem value="Sports">Sports</MenuItem>
                <MenuItem value="Music">Music</MenuItem>
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Art">Art</MenuItem>
                <MenuItem value="Hangout">Hangout</MenuItem>
                <MenuItem value="Gaming">Gaming</MenuItem>
                <MenuItem value="Convention">Convention</MenuItem>
              </Select>
            </FormControl>
          </Stack>

          {/* Event Description */}
          <TextField fullWidth required
            name='description'
            id="event-description"
            label="Event Description"
            variant="outlined"
            multiline={true}
            minRows={3}
            sx={{ pb: 2, width: "80%" }}
            value={eventDetails.description}
            onChange={updateDetails}
            error={requiredFieldsErrors.description}
          />

          {/* Location and Private Toggle Horizontal Stack */}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>

            {/* Location */}
            <TextField fullWidth required
              id="event-location"
              name="address"
              label="Location"
              variant="outlined"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton edge="start">
                        <PlaceIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              sx={{ width: "50%" }}
              value={eventDetails.address}
              onChange={updateDetails}
              error={requiredFieldsErrors.address}
            />

            {/* Set Event Public */}
            <Box sx={{ alignSelf: "center", pl: 10 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={eventDetails.visibility}
                      onChange={handleVisibilityChange}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  }
                  label="This Event is Public" />
              </FormGroup>
            </Box>
          </Stack>

          {/* Event Timing Title */}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            <Typography variant='h6' sx={{ pt: 1 }}>
              Event Timing
            </Typography>
            <Box />
          </Stack>

          {/* Start Time and Date */}
          <Stack direction="row" spacing={4} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            {/* Start Date -> Set as required with form submit error checking */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="startdate" label="Start Date *"
                value={eventDetails.startdateraw === null ? null : dayjs(JSON.parse(eventDetails.startdateraw))}
                onChange={handleStartDateChange}
                minDate={dayjs()}
              />
            </LocalizationProvider>

            {/* Start Time -> Set as required with form submit error checking */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker name="starttime" label="Start Time *"
                value={eventDetails.starttimeraw === null ? null : dayjs(JSON.parse(eventDetails.starttimeraw))}
                onChange={handleStartTimeChange}
              />
            </LocalizationProvider>
          </Stack>

          {/* End Time and Date */}
          <Stack direction="row" spacing={4} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            {/* End Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="enddate" label="End Date"
                value={eventDetails.enddateraw === null ? null : dayjs(JSON.parse(eventDetails.enddateraw))}
                onChange={handleEndDateChange}
                minDate={dayjs()}
              />
            </LocalizationProvider>

            {/* End Time */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker name="endtime" label="End Time"
                value={eventDetails.endtimeraw === null ? null : dayjs(JSON.parse(eventDetails.endtimeraw))}
                onChange={handleEndTimeChange}
              />
            </LocalizationProvider>
          </Stack>

          {/* Upload Event Photo Title*/}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            <Typography variant='h6' sx={{ pt: 1 }}>
              Upload Event Posting Photo
            </Typography>
            <Box />
          </Stack>

          {/* Upload Photo */}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left", mb: 4 }}>
            <TextField fullWidth label="Upload File" variant='outlined'
              value={eventDetails.imagename ? eventDetails.imagename : ''}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position='start'>
                      <IconButton component="label">
                        <UploadIcon />
                        <input type="file" hidden onChange={handleFileChange} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton onClick={handleDeleteFile}>
                        <DeleteIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }
              }}
              sx={{ width: "40%" }}
            />
            <Box />
          </Stack>

          <Box sx={{ pt: 1 }}>
            <Button
              variant='contained'
              onClick={onEditPage ?
                () => handleNavigate(`/editEvent/${id}/changeGuests`) :
                () => handleNavigate('/createEvent/addGuests')
              }
              sx={{
                borderRadius: '10px',
                mb: 2,
                mt: 2,
                alignSelf: "center", // centers button
                padding: 2, // button height
                backgroundColor: "#F68F8D",
                "&:hover": {
                  backgroundColor: "#A50B07",
                }
              }}
            >
              {onEditPage ? "Confirm Changes" : "Confirm and Invite Guests"}
            </Button>
          </Box>
        </Stack>
      </Box>

    );
  }
};

