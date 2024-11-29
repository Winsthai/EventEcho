import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
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

// remove later
const events = [
  {
    "id": "1",
    "title": "Football Game",
    "eventtype": "Sports",
    "description": "A friendly neighborhood football game.",
    "address": "123 Stadium Rd, City",
    "coordinates": {
      "x": 40.7128,
      "y": -74.006
    },
    "startdate": "2024-11-15",
    "starttime": "15:00:00+00",
    "enddate": "2024-11-15",
    "endtime": "17:00:00+00",
    "visibility": true
  },
  {
    "id": "2",
    "title": "Jazz Concert",
    "eventtype": "Music",
    "description": "Live jazz performance.",
    "address": "456 Music Hall Ave, City",
    "coordinates": {
      "x": 40.7306,
      "y": -73.9352
    },
    "startdate": "2024-12-01",
    "starttime": "19:00:00+00",
    "enddate": "2024-12-01",
    "endtime": "21:00:00+00",
    "visibility": false
  },
  {
    id: "3",
    title: "Food Festival",
    eventtype: "Food",
    description: "A festival with foods from around the world.",
    address: "789 Gourmet St, City",
    coordinates: {
      x: 40.7612,
      y: -73.9822,
    },
    startdate: "2024-11-20",
    starttime: "11:00:00+00",
    enddate: "2024-11-20",
    endtime: "16:00:00+00",
    visibility: false,
  },
];

export default function CreateEventPage({ eventDetails, setEventDetails }) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(eventDetails);

  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");

  const [eventPhotoName, setEventPhotoName] = React.useState('');

  // in db, public=true and private=false 
  let vis, startTimeTrimmed, endTimeTrimmed;
  let formattedDate;

  const [requiredFieldsErrors, setRequiredFieldErrors] = React.useState({
    title: false,
    eventtype: false,
    description: false,
    address: false,
    startdate: false,
    starttime: false
  });


  if (onEditPage) {
    vis = events[id - 1].visibility;
    startTimeTrimmed = events[id - 1].starttime.slice(0, -3);
    endTimeTrimmed = events[id - 1].endtime.slice(0, -3);
  }
  else {
    vis = true;
  }

  const [eventPublic, setEventPublic] = React.useState(vis);

  const updateDetails = (event) => {
    const { name, value } = event.target;
    setEventDetails((prevDetails) => {
      const updatedDetails = { ...eventDetails, [name]: value };
      console.log(updatedDetails);
      return updatedDetails;
    });
  };

  const handleStartDateChange = (date) => {
    const jsonDate = JSON.stringify(date);
    console.log(`json stringify: ${jsonDate}`);

    formattedDate = format(date, 'yyyy-MM-dd');
    setEventDetails({ ...eventDetails, startdate: formattedDate, startdateraw: jsonDate });

  }

  const handleStartTimeChange = (time) => {
    const jsonTime = JSON.stringify(time);
    console.log(`json stringify: ${jsonTime}`);

    const formattedTime = format(time, "HH:mm:ss'+00'");
    console.log(time);
    setEventDetails({ ...eventDetails, starttime: formattedTime, starttimeraw: jsonTime });
  }

  const handleEndDateChange = (date) => {
    const jsonDate = JSON.stringify(date);
    console.log(`json stringify: ${jsonDate}`);

    formattedDate = format(date, 'yyyy-MM-dd');
    setEventDetails({ ...eventDetails, enddate: formattedDate, enddateraw: jsonDate });
  }

  const handleEndTimeChange = (time) => {
    const jsonTime = JSON.stringify(time);
    console.log(`json stringify: ${jsonTime}`);

    const formattedTime = format(time, "HH:mm:ss'+00'");
    console.log(time);
    setEventDetails({ ...eventDetails, endtime: formattedTime, endtimeraw: jsonTime });
  }

  const handleVisibilityChange = (event) => {
    setEventPublic(event.target.checked);
    const { checked } = event.target;
    console.log(checked);
    setEventDetails({ ...eventDetails, visibility: checked });
  }

  // need to see whats going on here
  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setEventPhotoName(event.target.files[0].name);
    }
  }

  // just clears the text field for now, will have to actually delete uploaded file later
  const handleDeleteFile = (event) => {
    setEventPhotoName('');
  }

  // call field checking here
  const handleNavigate = (url) => {
    if (checkFields()) {
      console.log("Hey hey hey");
      alert("missing shit");
    }
    else {
      navigate(url, { state: { message: 'testing testing' } });
    }
  };

  const checkFields = () => {
    if (eventDetails.startdate === null && eventDetails.starttime === null) {
      setEventDetails({ ...eventDetails, startdateraw: JSON.stringify(''), starttimeraw: JSON.stringify('') });
      console.log("no event timings!");
    }
    else if (eventDetails.starttime === null) {
      setEventDetails({ ...eventDetails, starttimeraw: JSON.stringify('') });
    }
    else if (eventDetails.startdate === null) {
      setEventDetails({ ...eventDetails, startdateraw: JSON.stringify('') });
    }

    const newErrors = {
      title: !eventDetails.title,
      eventtype: !eventDetails.eventtype,
      description: !eventDetails.description,
      address: !eventDetails.address,
      startdate: !eventDetails.startdate,
      starttime: !eventDetails.starttime
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
                onClick={onEditPage ? () => navigate('/user/1') : () => navigate('/')}
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
                <MenuItem value="Gaming">Gaming</MenuItem>
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
              Event Timing
            </Box>

            {/* Time and Date Grid */}
            <Grid container spacing={2}>

              {/* Start Date -> Set as required with form submit error checking */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker name="startdate" label="Start Date *"
                    value={eventDetails.startdateraw === null ? null : dayjs(JSON.parse(eventDetails.startdateraw))}
                    onChange={handleStartDateChange}
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

            {/* Upload Image */}
            <Box sx={{ border: '1px solid #aaaaa9', borderRadius: '5px', padding: 1 }}>
              Select Event Posting Photo
              <Stack direction="row" spacing={2} sx={{ display: "flex", justifyContent: "center" }}>
                <IconButton aria-label='open camera' size='large'>
                  <PhotoCameraIcon sx={{ fontSize: '48px' }} />
                </IconButton>
                <IconButton aria-label='open gallery' size='large'>
                  <CollectionsIcon sx={{ fontSize: '48px' }} />
                </IconButton>
              </Stack>
            </Box>

            {/* Confirm and Invite Guests Button if create, Confirm Changes+Edit Guests if edit */}
            {onEditPage ?
              <Stack direction="row" spacing={2}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: '100%',
                  '& > *': {
                    flex: 1
                  }

                }}>
                <Button variant='contained'
                  onClick={() => handleNavigate(`/editEvent/${id}/reviewEvent`)}
                  sx={{
                    borderRadius: '10px',
                    backgroundColor: "#F68F8D",
                    "&:hover": {
                      backgroundColor: "#A50B07",
                    }
                  }}
                >
                  Confirm Changes
                </Button>
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
                  Edit Guests
                </Button>
              </Stack> :
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
                <MenuItem value="Gaming">Gaming</MenuItem>
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

          {/* Time and Date */}
          <Stack direction="row" spacing={4} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            {/* Start Date -> Set as required with form submit error checking */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="startdate" label="Start Date *"
                value={eventDetails.startdateraw === null ? null : dayjs(JSON.parse(eventDetails.startdateraw))}
                onChange={handleStartDateChange}
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

          <Stack direction="row" spacing={4} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            {/* End Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker name="enddate" label="End Date"
                value={eventDetails.enddateraw === null ? null : dayjs(JSON.parse(eventDetails.enddateraw))}
                onChange={handleEndDateChange}
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

          {/* Upload Photo  - FIX FIX FIX*/}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left", mb: 4 }}>
            <TextField fullWidth label="Upload File" variant='outlined'
              value={eventPhotoName}
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
              } // should also complete the step in desktopProgressBar
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

