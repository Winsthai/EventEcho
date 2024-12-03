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
import logo from "../../images/logo.png";
import dayjs from "dayjs";

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
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const [popupMessage, setPopupMessage] = useState(""); // Message for the popup
  const [userRegistered, setUserRegistered] = useState(false);
  const [isEventPassed, setIsEventPassed] = useState(false); // To track if the event has passed

  const authToken = localStorage.getItem("authToken");

  const handleClick = (url) => {
    navigate(url);
  };

  const handleRegisterButton = async (eventId) => {
    if (isEventPassed) {
      // Display message if the event has passed
      setPopupMessage("This event has already passed.");
      setShowPopup(true);
      return;
    }

    try {
      await registerEvent(eventId);
      setUserRegistered(true);
      setPopupMessage("Successfully registered for event!");
      setShowPopup(true);
    } catch (e) {
      setError(e.message);
    }
  };

  // Determine whether to display mobile or desktop version of website
  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");

  const isEventDatePassed = (event) => {
    const today = new Date();
    const startDate = new Date(event.startdate);
    const endDate = event.enddate ? new Date(event.enddate) : null;

    if (endDate) {
      return today > endDate;
    } else {
      return today > startDate;
    }
  };

  useEffect(() => {
    // Check if the event has passed
    if (event) {
      const hasPassed = isEventDatePassed(event);
      setIsEventPassed(hasPassed);
    }
  }, [event]);

  useEffect(() => {
    // Hide popup after 3 seconds
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  // Query event from the API
  async function fetchEvent(eventId) {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/events/${eventId}`;
    const authToken = localStorage.getItem("authToken");
    try {
      // Fetch and store results from API URL
      setError("");
      const response = await fetch(APIUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
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

  async function registerEvent(eventId) {
    const APIUrl = `http://localhost:3001/api/events/${eventId}/register`;
    try {
      // Fetch and store results from API URL
      const response = await fetch(APIUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();

      // Error message
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Happens if component first renders, and event state is initially null, and we try accessing fields before it has data
  if (!event) {
    // Wait until event data is available
    return;
  }

  let reviewTime, reviewDate, startTimeTrimmed, endTimeTrimmed;

  startTimeTrimmed = event.starttime.slice(0, -6);
  // End time exists
  if (event.endtime !== null) {
    endTimeTrimmed = event.endtime.slice(0, -6);
    reviewTime = startTimeTrimmed.concat(" - ", endTimeTrimmed);
  } else {
    reviewTime = startTimeTrimmed.concat(" - TBD");
  }

  // end date exists
  if (
    event.enddate !== null &&
    !dayjs(JSON.parse(event.startdateraw)).isSame(
      dayjs(JSON.parse(event.enddateraw))
    )
  ) {
    reviewDate = event.startdate
      .slice(0, 10)
      .concat(" - ", event.enddate.slice(0, 10));
  } else {
    reviewDate = event.startdate.slice(0, 10);
  }

  const getIcon = (type) => {
    switch (type) {
      case "Sports":
        return <SportsBasketballIcon />;
      case "Music":
        return <MusicNoteIcon />;
      case "Food":
        return <LocalDiningIcon />;
      case "Art":
        return <ColorLensIcon />;
      case "Hangout":
        return <GroupsIcon />;
      case "Gaming":
        return <SportsEsportsIcon />;
      default:
        return null;
    }
  };

  const eventIcon = getIcon(event.eventtype);

  let imageUrl = event.eventimage ? event.eventimage : logo;

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
            src={event.eventimage}
            alt="Event background"
          />
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
              <p id="EventPageP">{reviewDate}</p>
            </Stack>
            {/* Time */}
            <Stack
              direction="row"
              alignItems="center"
              spacing={1}
              color="text.secondary"
            >
              <AccessTimeIcon />
              <p id="EventPageP">{reviewTime}</p>
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

          {/* Event type */}
          <h1
            id="EventReviewHeader"
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
            {eventIcon}
            {event.eventtype}
          </Box>

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
              backgroundColor: isEventPassed ? "gray" : "#F68F8D",
              borderRadius: "20px",
              marginBottom: "80px",
              cursor: "pointer",
              "&:hover": {
                backgroundColor: isEventPassed ? "gray" : "#A50B07",
              },
            }}
            onClick={() => handleRegisterButton(event.id)}
          >
            {isEventPassed ? "Event Passed" : "Register"}
            Register
          </Button>
          {showPopup && (
            <Box
              sx={{
                position: "fixed",
                top: "5%",
                left: "50%",
                transform: "translateX(-50%)",
                backgroundColor: isEventPassed ? "darkred" : "#5cb85c",
                color: "white",
                padding: "10px 20px",
                borderRadius: "8px",
                zIndex: 1000,
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                width: "80%", // Makes it responsive on mobile
                maxWidth: "400px", // Ensures it doesn’t get too wide on large screens
                minWidth: "250px", // Ensures it’s not too narrow
              }}
            >
              {popupMessage}
            </Box>
          )}
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
                  backgroundColor: "gray", // just in case the event echo logo is used
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(20px)", // Adjust blur intensity
                  transform: "scale(1.1)", // Slightly zoom out
                  zIndex: 1, // Place behind the image
                }}
              ></Box>

              {/* Event Image */}
              <Box
                component="img"
                id="EventPagePhotoBackgroundDesktop"
                src={imageUrl}
                alt="Event background"
                sx={{
                  position: "relative",
                  zIndex: 2, // Place above the blur
                }}
              />
            </Box>
          </Box>

          {/* Event Information (time, date, title, description, etc.)*/}
          <Box>
            {/* Event Title + */}
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
                  <p id="EventPagePDesktop">{reviewDate}</p>
                </Stack>
                {/* Time */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.2}
                  color="text.secondary"
                >
                  <AccessTimeIcon id="EventPageIconsDesktop" />
                  <p id="EventPagePDesktop">{reviewTime}</p>
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
              {eventIcon}
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
                  backgroundColor: isEventPassed ? "gray" : "#F68F8D",
                  borderRadius: "30px", // This is different compared to the 20px in mobile version
                  fontSize: "20px",
                  //fontFamily: "Poppins", // this does nothing?
                  "&:hover": {
                    backgroundColor: isEventPassed ? "gray" : "#A50B07",
                  },
                }}
                onClick={() => handleRegisterButton(event.id)}
              >
                Register
              </Button>
              {showPopup && (
                <Box
                  sx={{
                    position: "fixed",
                    top: "10%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: isEventPassed ? "darkred" : "#5cb85c",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    zIndex: 1000,
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {popupMessage}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
};

export default EventPage;
