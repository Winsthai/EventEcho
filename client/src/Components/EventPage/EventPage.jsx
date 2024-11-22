import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button, useMediaQuery } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {
  AppBar, Toolbar, IconButton, Typography,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import "./EventPage.css";

const events = [
  {
    id: "1",
    title: "Football Game",
    eventtype: "Sports",
    description: "A friendly neighborhood football game.",
    address: "123 Stadium Rd, City",
    coordinates: {
      x: 40.7128,
      y: -74.006,
    },
    startdate: "2024-11-15",
    starttime: "15:00:00+00",
    enddate: "2024-11-15",
    endtime: "17:00:00+00",
    visibility: true,
    image:
      "https://m.media-amazon.com/images/M/MV5BOWZiNzZkZGEtMWEwOS00NjZkLWFmYTctZmQyMDY3NGU0OWZjXkEyXkFqcGc@._V1_.jpg", // temporary
  },
  {
    id: "2",
    title: "Jazz Concert",
    eventtype: "Music",
    description: "Live jazz performance.",
    address: "456 Music Hall Ave, City",
    coordinates: {
      x: 40.7306,
      y: -73.9352,
    },
    startdate: "2024-12-01",
    starttime: "19:00:00+00",
    enddate: "2024-12-01",
    endtime: "21:00:00+00",
    visibility: true,
    image:
      "https://www.horizonsmusic.co.uk/cdn/shop/articles/image1_1600x1600.jpg?v=1621417277", // temporary
  },
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
  const onEditPage = location.pathname.includes("edit");

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
  const startDateTime = new Date(
    `${event.startdate.slice(0, 10)}T${event.starttime.slice(0, 8)}+00:00`
  );
  const endDateTime = new Date(
    `${event.enddate.slice(0, 10)}T${event.endtime.slice(0, 8)}+00:00`
  );

  if (isMobile) {
    // Mobile component
    return (
      <Box>
        {/* Header Box */}
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
                <IconButton
                  onClick={() => navigate(-1)}
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
                Event Details
              </Typography>
              <Box sx={{ flexGrow: 2 }} />
            </Toolbar>
          </AppBar>
        </Box>

        {/* Event Picture */}
        {/* TODO: implement this when possible */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "4.5rem",
          }}
        >
          <Box
            component="img"
            id="EventPagePhotoBackground"
            src={event.image}
          ></Box>
        </Box>

        {/* Event Details */}
        <Box
          sx={{
            px: 3, // Padding on left and right for the outer container
          }}
        >
          {/* Event Title */}
          <Box>
            <h1 id="EventPageTitle">{event.title}</h1>
          </Box>
          {/* Date, time, and address */}
          <Stack spacing={1}>
            {/* Date */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              color="text.secondary"
            >
              <CalendarMonthIcon />
              <p id="EventPageP">
                {new Date(event.startdate).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </Stack>
            {/* Time */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              color="text.secondary"
            >
              <AccessTimeIcon />
              <p id="EventPageP">
                {startDateTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                -{" "}
                {/* This comment apparently helps for whitespace. dont delete LOL. not a joke */}
                {endDateTime.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </p>
            </Stack>
            {/* Address */}
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={1}
              color="text.secondary"
            >
              <LocationOnIcon />
              <p id="EventPageP">{event.address}</p>
            </Stack>
          </Stack>
          {/* Event Description */}
          <Box
            sx={{
              "& h1": { mb: 1 }, //
              "& p": { mt: 0 },
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
            justifyContent: "center",
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
            width: "100%",
            height: "100%",
            display: "flex",
            mx: "2.5rem", // Margin left and right
          }}
        >
          {/* Event Details text, that is centered */}
          <h1 id="EventPageHeaderDesktop">Event Details</h1>
        </Box>
        {/* Box here that makes the background of all the content white */}
        <Box borderBottom="1px solid #ddd" bgcolor="white" mx="2.5rem">
          {/* Put picture on the left, and Event Details to its right */}
          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              alignItems: "center", // Center vertically
              textAlign: "center", // Ensures the text inside is centered
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
              <Box
                component="img"
                id="EventPagePhotoBackground"
                src={event.image}
              ></Box>
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
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1}
                  color="text.secondary"
                >
                  <CalendarMonthIcon />
                  <p id="EventPagePDesktop">
                    {new Date(event.startdate).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </Stack>
                {/* Time */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.2}
                  color="text.secondary"
                >
                  <AccessTimeIcon />
                  <p id="EventPagePDesktop">
                    {startDateTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    -{" "}
                    {/* This comment apparently helps for whitespace. dont delete LOL. not a joke */}
                    {endDateTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </p>
                </Stack>
                {/* Address */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.6}
                  color="text.secondary"
                >
                  <LocationOnIcon />
                  <p id="EventPagePDesktop">{event.address}</p>
                </Stack>
              </Stack>
            </Box>
          </Box>
          {/* Event Details */}
          <Box
            sx={{
              px: 6, // Padding on left and right for the outer container
            }}
          >
            {/* Event Description */}
            <Box
              sx={{
                "& h1": { mb: 1 }, // margin bottom of 8px
                "& p": { mt: 0 }, // margin top of 0px
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
