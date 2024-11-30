import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button, useMediaQuery } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import "./EventPage.css";

const EventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null); // []
  const [error, setError] = useState("");

  const handleClick = (url) => {
    navigate(url);
  };

  // Determine whether to display mobile or desktop version of website
  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");

  // Query event from the API
  async function fetchEvent(eventId) {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/events/${eventId}`;

    try {
      // Fetch and store results from API URL
      setError("");
      const response = await fetch(APIUrl);
      const data = await response.json();
      console.log("API Response:", data); // Debugging output
      // Error message
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred");
      }

      setEvent(data.event);
      return data;
    } catch (e) {
      setError(e.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchEvent(id);
    }
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Happens if component first renders, and event state is initially null, and we try accessing fields before it has data
  if (!event) {
    // Wait until event data is available
    return;
  }

  // Have to do some weird stuff because "startdate" "starttime" "enddate" "endtime" are not formatted properly?
  const startDateTime = new Date(
    `${event.startdate.slice(0, 10)}T${event.starttime.slice(0, 8)}+00:00`
  );

  const endDateTime =
    event.enddate && event.endtime
      ? new Date(
          `${event.enddate.slice(0, 10)}T${event.endtime.slice(0, 8)}+00:00`
        )
      : null;

  if (isMobile) {
    // Mobile component
    return (
      <Box>
        {/* Header Box */}
        {/* Top App Bar */}
        <Box
          component="section"
          sx={{
            width: "100%",
            height: "20%",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1000,
          }}
        >
          <AppBar position="static" sx={{ mb: 2 }}>
            <Toolbar sx={{ color: "secondary" }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  flexGrow: 1,
                  textAlign: "center",
                  position: "absolute",
                  left: 0,
                  right: 0,
                  margin: "auto",
                }}
              >
                Event Details
              </Typography>
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
          {event.image ? (
            <Box
              component="img"
              id="EventPagePhotoBackground"
              src={event.image}
              alt="Event background"
            />
          ) : (
            <Box id="EventPagePhotoBackground">temp</Box>
          )}
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
                {endDateTime
                  ? endDateTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })
                    // If null, display nothing
                  : "TBD"}
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
            px: "2.5rem", // padding left and right
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
          marginBottom="2.5rem"
          borderRadius="20px"
          sx={{
            padding: "2vh 3vw", // Padding for all items inside the white box
          }}
        >
          <Box
            sx={{
              alignItems: "center", // Center vertically
              textAlign: "center", // Ensures the text inside is centered
            }}
          >
            {/* Event Picture */}
            <Box
              sx={{
                position: "relative", // Allow pseudo-element positioning
                overflow: "hidden", // Prevent pseudo-element from exceeding bounds
                height: "550px", // Match the image height
                borderRadius: "15px", // Add border radius
              }}
            >
              {/* Blurred Background Image */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  // Note: No blur exists if the event doesn't have an image
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)", // Adjust blur intensity
                  transform: "scale(1.1)", // Slightly zoom out
                  zIndex: 1, // Place behind the image
                }}
              ></Box>

              {/* Event Image */}
              {event.image ? (
                <Box
                  component="img"
                  id="EventPagePhotoBackgroundDesktop"
                  src={event.image}
                  alt="Event background"
                  sx={{
                    position: "relative",
                    zIndex: 2, // Place above the blur
                  }}
                />
              ) : (
                <Box id="EventPageNoPhotoDesktop">temp</Box>
              )}
            </Box>
            {/* Event Title */}
          </Box>
          {/* Event Information (time, date, title, description, etc.)*/}
          <Box>
            {/* Date, time, and address */}
            <Box
              sx={{
                marginTop: "1rem",
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
                  <CalendarMonthIcon id="EventPageIconsDesktop" />
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
                  <AccessTimeIcon id="EventPageIconsDesktop" />
                  <p id="EventPagePDesktop">
                    {startDateTime.toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}{" "}
                    - {/* Add spaces to the left and right of - */}
                    {endDateTime
                      ? endDateTime.toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        // If null, display nothing
                      : "TBD"}
                  </p>
                </Stack>
                {/* Address */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.2}
                  color="text.secondary"
                >
                  <LocationOnIcon id="EventPageIconsDesktop" />
                  <p id="EventPagePDesktop">{event.address}</p>
                </Stack>
              </Stack>
            </Box>

            <h1
              id="EventPageHeaderDesktop"
              style={{
                marginBottom: 0,
                paddingBottom: 0,
              }}
            >
              Event Type
            </h1>
            {/* Event Type Tag */}
            <Box
              sx={{
                display: "inline-flex", // Tag doesn't take up full container width, only its content
                alignItems: "center",
                gap: "0.5rem", // Space between mui icon / tag
                marginTop: "0.5rem",
                marginBottom: "0.5rem",
                backgroundColor: "#ff7474", // color
                borderRadius: "20px",
                padding: "0.5rem 1rem", // make button bigger
                color: "white", // font color
                fontWeight: "bold",
                textTransform: "uppercase", // Make text all caps (to match the filters box on homepage)
              }}
            >
              {/* Event Type Icon */}
              {event.eventtype === "Sports" && <SportsBasketballIcon />}
              {event.eventtype === "Music" && <MusicNoteIcon />}
              {event.eventtype === "Food" && <LocalDiningIcon />}
              {event.eventtype === "Art" && <ColorLensIcon />}
              {event.eventtype === "Hangout" && <GroupsIcon />}
              {event.eventtype === "Gaming" && <SportsEsportsIcon />}

              {/* Event Type Text */}
              {event.eventtype}
            </Box>

            {/* Event Description */}
            <Box
              sx={{
                "& h1": { mb: "0.5rem" }, // margin bottom of 8px
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
