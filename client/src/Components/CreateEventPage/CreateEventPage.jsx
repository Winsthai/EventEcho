import * as React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, IconButton, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
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
        <AppBar position="static">
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
          <TextField id="event-title" label="Event Title" variant="standard" sx={{ pb: 2 }} />
          <FormControl fullWidth>
            <InputLabel id="event-type">Event Type</InputLabel>
            <Select labelId="select-event-type" value={eventType} label="Event Types" onChange={handleChange}>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Food">Food</MenuItem>
              <MenuItem value="Art">Art</MenuItem>
              <MenuItem value="Gaming">Gaming</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>


    </Box>
  );
};

export default CreateEventPage;
