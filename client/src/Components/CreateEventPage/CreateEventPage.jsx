import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CollectionsIcon from '@mui/icons-material/Collections';
import {
  AppBar, Toolbar, IconButton, Typography,
  FormControl, FormGroup, FormControlLabel, InputLabel,
  Select, MenuItem, InputAdornment, Switch,
  Box, TextField, Stack, Button
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export default function CreateEventPage() {
  // const CreateEventPage = () => {
  const [eventType, setEventType] = React.useState('');

  const handleChange = (event) => {
    setEventType(event.target.value);
  };

  return (
    <Box
      component="section"
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
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              Create a New Event
            </Typography>
            <Box sx={{ flexGrow: 2 }} />
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
          <TextField required id="event-title" label="Event Title" variant="outlined" sx={{ pb: 2 }} />

          {/* Event Type */}
          <FormControl fullWidth sx={{ pb: 2 }}>
            <InputLabel id="event-type">Event Type *</InputLabel>
            <Select labelId="select-event-type" value={eventType} label="Event Types" onChange={handleChange}>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Art">Art</MenuItem>
              <MenuItem value="Gaming">Gaming</MenuItem>
            </Select>
          </FormControl>

          {/* Event Description */}
          <TextField required id="event-description" label="Event Description" variant="outlined" multiline={true} minRows={3} sx={{ pb: 2 }} />

          {/* Location */}
          <TextField required id="event-location" label="Location" variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton edge="start">
                    <PlaceIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Box sx={{ display: "flex", justifyContent: "left" }}>
            Event Timing
          </Box>

          {/* Time and Date Grid */}
          <Grid container spacing={2}>

            {/* Start Date -> Set as required with form submit error checking */}
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Start Date *" />
              </LocalizationProvider>
            </Grid>

            {/* Start Time -> Set as required with form submit error checking */}
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="Start Time *" />
              </LocalizationProvider>
            </Grid>

            {/* End Date */}
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="End Date" />
              </LocalizationProvider>
            </Grid>

            {/* End Time */}
            <Grid size={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <TimePicker label="End Time" />
              </LocalizationProvider>
            </Grid>
          </Grid>

          {/* Set Event Private */}
          <Box sx={{ display: "flex", justifyContent: "left" }}>
            <FormGroup>
              <FormControlLabel control={<Switch />} label="This Event is Private" />
            </FormGroup>
          </Box>

          {/* Upload Image - see how to space out the icons nicely they look like shit */}
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

          {/* Confirm and Invite Guests Button */}
          <Button variant='contained' sx={{ borderRadius: '10px' }}>
            Confirm and Invite Guests
          </Button>
        </Stack>
      </Box>

    </Box>
  );
};

// export default CreateEventPage;
