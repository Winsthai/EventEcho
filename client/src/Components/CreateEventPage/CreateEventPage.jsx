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

export default function CreateEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");

  const [eventType, setEventType] = React.useState('');
  const [eventPhotoName, setEventPhotoName] = React.useState('');

  // in db, public=true and private=false 
  let vis, startTimeTrimmed, endTimeTrimmed;

  if (onEditPage) {
    vis = events[id - 1].visibility;
    startTimeTrimmed = events[id - 1].starttime.slice(0, -3);
    endTimeTrimmed = events[id - 1].endtime.slice(0, -3);
  }
  else {
    vis = true;
  }

  const [eventPublic, setEventPublic] = React.useState(vis);

  const handleEventTypeChange = (event) => {
    setEventType(event.target.value);
  };

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setEventPhotoName(event.target.files[0].name);
    }
  }

  const handleVisibilityChange = (event) => {
    setEventPublic(event.target.checked);
  }

  // just clears the text field for now, will have to actually delete uploaded file later
  const handleDeleteFile = (event) => {
    setEventPhotoName('');
  }

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
            height: "20%",
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
        <Box component="form" sx={{ width: "85%", height: "100%", pt: 8, pb: 8 }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ height: "100%", padding: 2 }}
          >
            {/* Event title */}
            <TextField required
              id="event-title"
              label="Event Title"
              variant="outlined"
              sx={{ pb: 2 }}
              defaultValue={onEditPage ? events[id - 1].title : ""}
            />

            {/* Event Type */}
            <FormControl fullWidth sx={{ pb: 2 }}>
              <InputLabel id="event-type">Event Type *</InputLabel>
              <Select labelId="select-event-type"
                defaultValue={onEditPage ? events[id - 1].eventtype : eventType}
                label="Event Types"
                onChange={handleEventTypeChange}
                sx={{ textAlign: 'left' }}
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
              id="event-description"
              label="Event Description"
              variant="outlined"
              multiline={true}
              minRows={3}
              sx={{ pb: 2 }}
              defaultValue={onEditPage ? events[id - 1].description : ""}
            />

            {/* Location */}
            <TextField required id="event-location" label="Location" variant="outlined"
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
              defaultValue={onEditPage ? events[id - 1].address : ""}
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
                  <DatePicker label="Start Date *"
                    defaultValue={onEditPage ? dayjs(events[id - 1].startdate) : null}
                  />
                </LocalizationProvider>
              </Grid>

              {/* Start Time -> Set as required with form submit error checking */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker label="Start Time *"
                    defaultValue={onEditPage ? dayjs(events[id - 1].startdate.concat("T", startTimeTrimmed)) : null}
                  />
                </LocalizationProvider>
              </Grid>

              {/* End Date */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker label="End Date"
                    defaultValue={onEditPage ? dayjs(events[id - 1].enddate) : null}
                  />
                </LocalizationProvider>
              </Grid>

              {/* End Time */}
              <Grid size={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker label="End Time"
                    defaultValue={onEditPage ? dayjs(events[id - 1].enddate.concat("T", endTimeTrimmed)) : null}
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
                      checked={eventPublic}
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
                  onClick={() => navigate(`/editEvent/${id}/reviewEvent`)}
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
                  onClick={() => navigate(`/editEvent/${id}/changeGuests`)}
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
                onClick={() => navigate('/createEvent/addGuests')}
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
              id="event-title"
              label="Event Title"
              variant="outlined"
              sx={{ width: "100%" }}
              defaultValue={onEditPage ? events[id - 1].title : ""}
            />

            {/* Event Type */}
            <FormControl fullWidth sx={{ width: "80%" }}>
              <InputLabel id="event-type">Event Type *</InputLabel>
              <Select labelId="select-event-type"
                defaultValue={onEditPage ? events[id - 1].eventtype : eventType}
                label="Event Types"
                onChange={handleEventTypeChange}
                sx={{ textAlign: 'left' }}
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
            id="event-description"
            label="Event Description"
            variant="outlined"
            multiline={true}
            minRows={3}
            sx={{ pb: 2, width: "80%" }}
            defaultValue={onEditPage ? events[id - 1].description : ""}
          />

          {/* Location and Private Toggle Horizontal Stack */}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>

            {/* Location */}
            <TextField fullWidth required id="event-location" label="Location" variant="outlined"
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
              defaultValue={onEditPage ? events[id - 1].address : ""}
            />

            {/* Set Event Public */}
            <Box sx={{ alignSelf: "center", pl: 10 }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={eventPublic}
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
              <DatePicker label="Start Date *"
                defaultValue={onEditPage ? dayjs(events[id - 1].startdate) : null}
              />
            </LocalizationProvider>

            {/* Start Time -> Set as required with form submit error checking */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="Start Time *"
                defaultValue={onEditPage ? dayjs(events[id - 1].startdate.concat("T", startTimeTrimmed)) : null}
              />
            </LocalizationProvider>
          </Stack>

          <Stack direction="row" spacing={4} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            {/* End Date */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label="End Date"
                defaultValue={onEditPage ? dayjs(events[id - 1].enddate) : null}
              />
            </LocalizationProvider>

            {/* End Time */}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TimePicker label="End Time"
                defaultValue={onEditPage ? dayjs(events[id - 1].enddate.concat("T", endTimeTrimmed)) : null}
              />
            </LocalizationProvider>
          </Stack>

          {/* Upload Event Photo Title */}
          <Stack direction="row" spacing={6} sx={{ width: "80%", display: "flex", justifyContent: "left" }}>
            <Typography variant='h6' sx={{ pt: 1 }}>
              Upload Event Posting Photo
            </Typography>
            <Box />
          </Stack>

          {/* Upload Photo */}
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
                () => navigate(`/editEvent/${id}/changeGuests`) :
                () => navigate('/createEvent/addGuests')
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

