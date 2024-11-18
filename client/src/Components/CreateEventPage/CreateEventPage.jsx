import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PlaceIcon from '@mui/icons-material/Place';
import { AppBar, Toolbar, IconButton, Typography, FormControl, InputLabel, Select, MenuItem, InputAdornment, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


const CreateEventPage = () => {
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
      }}
    >
      <Box
        component="section"
        sx={{
          width: "100%",
          height: "20%"
        }}
      >
        {/* Top App Bar */}
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }}>
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              Create a New Event
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Toolbar>
        </AppBar>
      </Box>

      {/* forms */}
      <Box
        component="form"
        sx={{
          width: "85%",
          height: "100%"
        }}
      >
        <Stack
          direction="column"
          spacing={2}
          sx={{ height: "100%", padding: 2 }}
        >
          {/* Event title */}
          <TextField id="event-title" label="Event Title" variant="outlined" sx={{ pb: 2 }} />

          {/* Event Type */}
          <FormControl fullWidth sx={{ pb: 2 }}>
            <InputLabel id="event-type">Event Type</InputLabel>
            <Select labelId="select-event-type" value={eventType} label="Event Types" onChange={handleChange}>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Art">Art</MenuItem>
              <MenuItem value="Gaming">Gaming</MenuItem>
            </Select>
          </FormControl>

          {/* Event Description */}
          <TextField id="event-description" label="Event Description" variant="outlined" multiline={true} minRows={3} sx={{ pb: 2 }} />

          {/* Location */}
          <TextField id="event-location" label="Location" variant="outlined"
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

          {/* Time and Date Grid */}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              Start Date
            </Grid>
            <Grid item xs={6}>
              Start Time
            </Grid>
            <Grid item xs={6}>
              End Date
            </Grid>
            <Grid item xs={6}>
              End Time
            </Grid>
            
          </Grid>

        </Stack>
      </Box>


    </Box>
  );
};

export default CreateEventPage;
