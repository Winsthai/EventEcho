import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button, useMediaQuery } from "@mui/material";
import CalendarDesktop from '../../images/CalendarDesktop.png';
import ClockDesktop from '../../images/ClockDesktop.png';
import LocationDesktop from '../../images/LocationDesktop.png';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';


import './EventPage.css';

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
      "startdate": "2024-11-15T00:00:00.000Z",
      "starttime": "15:00:00+00",
      "enddate": "2024-11-15T00:00:00.000Z",
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
      "startdate": "2024-12-01T00:00:00.000Z",
      "starttime": "19:00:00+00",
      "enddate": "2024-12-01T00:00:00.000Z",
      "endtime": "21:00:00+00",
      "visibility": true
  }
];

const EventPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    const handleClick = (url) => {
        navigate(url);
    };

    // Determine whether to display mobile or desktop version of website
    const isMobile = useMediaQuery("(max-width:600px)");

    // check which id is in test data. useEffect. Tell it to get event based on ID. useEffect runs when the page is loaded
    useEffect(() => {
        const result = events.find((element) => element.id === id);
        setEvent(result);
    }, []); // empty array, means it doesn't rerun

    // Happens if component first renders, and event state is initially null, and we try accessing fields before it has data
    if (!event) {
        // Wait until event data is available
        return;
    }

    // Have to do some weird stuff because "startdate" "starttime" "enddate" "endtime" are not formatted properly?
    const startDateTime = new Date(`${event.startdate.slice(0, 10)}T${event.starttime.slice(0, 8)}+00:00`);
    const endDateTime = new Date(`${event.enddate.slice(0, 10)}T${event.endtime.slice(0, 8)}+00:00`);

    if (isMobile) {
        // Mobile component
        return (
            <Box>
                {/* Header Box */}
                <Box
                    borderBottom="1px solid #ddd"
                    bgcolor="white"
                    sx={{
                        width:"100%",
                        height: "100%",
                        display: "flex",
                        justifyContent:"center",
                        alignItems: "center", 
                        textAlign:"center",
                    }}
                >
                    {/* Event Details text, that is centered */}
                    <h1 id="EventPageHeader">Event Details</h1>
                    
                    {/* X button, which is aligned with the right side of the screen */}
                    <Button 
                        // Arrow function to navigate back to the root page
                        onClick={() => navigate("/")}
                        sx={{ 
                            fontSize: "2.5rem", 
                            color: "black",
                            position: "absolute",
                            right: "0.5rem",
                        }}
                    >
                        &times; {/* x symbol */}
                    </Button>
                </Box>

                {/* Event Picture */}
                {/* TODO: implement this when possible */}
                <p id="EventPagePhotoBackground" style={{ textAlign: "center"}}>
                    Event Picture Placeholder
                </p>

                {/* Event Details */}
                <Box
                    sx={{ 
                        px: 3 // Padding on left and right for the outer container
                    }}
                >
                    {/* Event Title */}
                    <Box>
                        <h1 id="EventPageTitle">{event.title}</h1>
                    </Box>
                    {/* Date, time, and address */}
                    <Stack spacing={1}>
                        {/* Date */}
                        <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                            <CalendarMonthIcon/>
                            <p id="EventPageP">
                                {new Date(event.startdate).toLocaleDateString("en-US", {
                                    weekday: "long",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </Stack>
                        {/* Time */}
                        <Stack direction="row" alignItems="center" spacing={1} color="text.secondary">
                            <AccessTimeIcon/>
                            <p id="EventPageP">
                                {startDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })} - {/* This comment apparently helps for whitespace. dont delete LOL. not a joke */}
                                {endDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                            </p>
                        </Stack>
                        {/* Address */}
                        <Stack direction="row" alignItems="flex-start" spacing={1} color="text.secondary">
                            <LocationOnIcon/>
                            <p id="EventPageP">{event.address}</p>
                        </Stack>
                    </Stack>
                    {/* Event Description */}
                    <Box
                        sx={{ 
                            "& h1": { mb: 1 }, //
                            "& p": { mt: 0 } 
                        }}
                    >
                        <h1 id="EventPageED">Event Description</h1>
                        <p id="EventPageP">{event.description}</p>
                    </Box>
                </Box>
                {/* Register button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent:"center",
                    }}
                >
                    <Button 
                        variant="contained"
                        sx={{
                            backgroundColor: "#F68F8D", 
                            borderRadius: "20px", 
                            marginBottom: "80px", // so button doesn't overlap with mobile interface at the bottom.
                            "&:hover": {
                                backgroundColor: "#A50B07",
                            },
                        }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        );
    } else {
        // Desktop component
        return (
            <Box>
                {/* Header Box */}
                <Box
                    sx={{
                        width:"100%",
                        height: "100%",
                        display: "flex",
                        mx: "2.5rem", // Margin left and right
                    }}
                >
                    {/* Event Details text, that is centered */}
                    <h1 id="EventPageHeaderDesktop">Event Details</h1>
                </Box>
                {/* Box here that makes the background of all the content white */}
                <Box
                    borderBottom="1px solid #ddd"
                    bgcolor="white"
                    mx="2.5rem"
                >
                    {/* Put picture on the left, and Event Details to its right */}
                    <Box 
                        sx={{ 
                            display: "flex", 
                            gap: "1rem",
                            alignItems: "center",    // Center vertically
                            textAlign: "center",     // Ensures the text inside is centered
                        }}
                    >
                        {/* Event Picture */}
                        {/* TODO: implement this when possible */}
                        <Box
                            sx={{ 
                                marginLeft: "1.5rem",
                                marginRight: "1.5rem",
                                marginTop: "1.5rem",
                            }}
                        >
                            <p id="EventPagePhotoBackgroundDesktop">
                                Event Picture Placeholder
                            </p>
                        </Box>
                        {/* Event Title */}
                        {/* Date, time, and address */}
                        <Box
                            sx={{ 
                                marginTop: "1.5rem",
                                marginRight: "1.5rem",
                                display: "flex",
                                flexDirection: "column", // Ensures title and details stack vertically
                                alignItems: "flex-start", // Align all children to the left
                            }}
                        >
                            {/* Title */}
                            <h1 id="EventPageTitleDesktop">{event.title}</h1>
                            <Stack spacing={1}>
                                {/* Date */}
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <img src={CalendarDesktop} alt="Calendar Icon"/>
                                    <p id="EventPagePDesktop">
                                        {new Date(event.startdate).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </Stack>
                                {/* Time */}
                                <Stack direction="row" alignItems="center" spacing={1.2}>
                                    <img src={ClockDesktop} alt="Clock Icon"/>
                                    <p id="EventPagePDesktop">
                                        {startDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })} - {/* This comment apparently helps for whitespace. dont delete LOL. not a joke */}
                                        {endDateTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })}
                                    </p>
                                </Stack>
                                {/* Address */}
                                <Stack direction="row" alignItems="center" spacing={1.6}>
                                    <img src={LocationDesktop} alt="Location Icon" style={{ marginLeft: "2px" }}/>
                                    <p id="EventPagePDesktop">{event.address}</p>
                                </Stack>
                            </Stack>
                        </Box>
                    </Box>
                    {/* Event Details */}
                    <Box
                        sx={{ 
                            px: 6 // Padding on left and right for the outer container
                        }}
                    >
                        {/* Event Description */}
                        <Box
                            sx={{ 
                                "& h1": { mb: 1 }, // margin bottom of 8px
                                "& p": { mt: 0 } // margin top of 0px
                            }}
                        >
                            <h1 id="EventPageEDDesktop">Event Description</h1>
                            <p id="EventPagePDesktop">{event.description}</p>
                            {/* Register button */}
                            <Button 
                                variant="contained"
                                sx={{
                                    marginBottom: "1.5rem",
                                    backgroundColor: "#F68F8D", 
                                    borderRadius: "30px", // This is different compared to the 20px in mobile version
                                    fontSize: "20px",
                                    //fontFamily: "Poppins", // this does nothing?
                                    "&:hover": {
                                        backgroundColor: "#A50B07",
                                    },
                                }}
                            >
                            Register
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }
};

export default EventPage;