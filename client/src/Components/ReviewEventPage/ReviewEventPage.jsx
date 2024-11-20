import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AppBar, Toolbar, IconButton, Typography, Box, Button, useMediaQuery } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import './ReviewEventPageStyles.css';

const ReviewEventPage = () => { 
  const isMobile = useMediaQuery("(max-width:600px)");
  
  if (isMobile) {
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
                Review Details
              </Typography>
              <Box sx={{ flexGrow: 2 }} />
            </Toolbar>
          </AppBar>
        </Box>
        
        {/* Event Details */}
        <Box component="form" sx={{ width: "85%", height: "100%", pt: 8, textAlign: "left"}}>
          {/* Event Title */}
          <h1 id="EventReviewTitle">keshi: REQUIEM TOUR</h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Space between event detail and event picture
              alignItems: "flex-start",       // Align items to the top
              margin: "0 auto",
              "& p": {                   // Apply styles to <p> tags inside this Box
                margin: "4px 0",         // Vertical margin for each <p> tag
                padding: 0,              // Remove any padding inside <p> tags
              },
            }}
          >
            {/* Left Group: Date, Time, Add to Calendar, Location */}
            <Box 
              sx={{ 
                flex: 2.5, 
              }}
            >
              {/* Can replace icons with the pictures from images, once this is updated from main */}
              <Box color="text.secondary" sx={{ display: "flex", alignItems: "center"}}>
                <CalendarMonthIcon/>
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>Friday, 15 Nov 2024</p>
              </Box>
              <Box color="text.secondary" sx={{ display: "flex", alignItems: "center"}}>
                <AccessTimeIcon/>
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>7:00 PM - 10:00 PM</p>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center"}}>
                <p id="EventReviewP" style={{color: "blue"}}>+ Add to Calendar</p>
              </Box>
              <Box color="text.secondary" sx={{ display: "flex", alignItems: "center"}}>
                <LocationOnIcon/>
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>Edmonton, AB</p>
              </Box>
            </Box>
            {/* Right Group: Picture */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end", // Align picture to the right
              }}
            >
              {/* Picture goes here */}
              <p id="EventReviewPhoto">Picture here</p>
            </Box>
          </Box>
          {/* Details */}
          <Box
            sx={{ 
              "& h1": { mb: 1 }, // margin bottom of 8px
              "& p": { mt: 0 } // margin top of 0px
            }}
          >
            <h1 id="EventReviewHeader">Event Description</h1>
            {/* Change the line below eventually */}
            <p id="EventReviewP">show up please</p>
          </Box>


          {/* Guest List */}
          <h1 id="EventReviewHeader">Guest List</h1>
          
          {/* Steven */}
          {/* Box here is to set it up so pictures on the left, and name + waiting for rsvp is on the right */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px"}}>
            <img 
              src="pfp.png" 
              alt="Steven Nguyen" 
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "16px"}} 
            />
            {/* Have the persons name on top, and waiting for rsvp on the bottom, in blue */}
            <Box sx={{ display: "flex", flexDirection: "column"}}>
              <h4 id="EventReviewNames">Steven Nguyen</h4>
              <p id="EventReviewRVSP">Waiting for RSVP</p>
            </Box>
          </Box>
          {/* Winston */}
          {/* Box here is to set it up so pictures on the left, and name + waiting for rsvp is on the right */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <img 
              src="pfp.png" 
              alt="Winston Thai" 
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "16px"}} 
            />
            {/* Have the persons name on top, and waiting for rsvp on the bottom, in blue */}
            <Box sx={{ display: "flex", flexDirection: "column"}}>
              <h4 id="EventReviewNames">Winston Thai</h4>
              <p id="EventReviewRVSP">Waiting for RSVP</p>
            </Box>
          </Box>
          {/* Shaun */}
          {/* Box here is to set it up so pictures on the left, and name + waiting for rsvp is on the right */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}>
            <img 
              src="pfp.png" 
              alt="Shaun Tapiau" 
              style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "16px"}} 
            />
            {/* Have the persons name on top, and waiting for rsvp on the bottom, in blue */}
            <Box sx={{ display: "flex", flexDirection: "column"}}>
              <h4 id="EventReviewNames">Shaun Tapiau</h4>
              <p id="EventReviewRVSP">Waiting for RSVP</p>
            </Box>
          </Box>
          
        </Box>
        <Button 
          variant='contained' 
          sx={{ 
            borderRadius: '10px', 
            width: "85%", 
            mb: 9
          }}
        >
            Confirm Event and Invite Guests
        </Button>

      </Box>
    );
  } else {
    return (
      <p>desktop review</p>
    );
  }

};

export default ReviewEventPage;