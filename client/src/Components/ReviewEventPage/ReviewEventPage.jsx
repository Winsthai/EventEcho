import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Button,
  useMediaQuery,
  Stack,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import dayjs from 'dayjs';

import "./ReviewEventPageStyles.css";

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
    image:
      "https://i.ytimg.com/vi/BLsQyx604Yc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYWKCLjjwlIHVaM6MGC9bvpVLe_A", // temporary
  },
];

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];

const ReviewEventPage = ({ eventDetails, detailsCompleted, invitedGuests }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");
  console.log(invitedGuests);

  // if user forcefully enters in createEvent/reviewEvent before details finished need to redirect or something
  useEffect(() => {
    if (!detailsCompleted) {
      navigate("/createEvent");
    }
  }, [detailsCompleted, navigate]);

  let reviewTime, reviewDate, startTimeTrimmed, endTimeTrimmed, databaseImage;

  if (detailsCompleted) {
    if (onEditPage) {
      startTimeTrimmed = events[id - 1].starttime.slice(0, -6);
      endTimeTrimmed = events[id - 1].endtime.slice(0, -6);
      reviewTime = startTimeTrimmed.concat(" - ", endTimeTrimmed);
      databaseImage = events[id - 1].image;
    }
    else {
      startTimeTrimmed = eventDetails.starttime.slice(0, -6);
      // if there is end time
      if (eventDetails.endtime !== null) {
        endTimeTrimmed = eventDetails.endtime.slice(0, -6);
        reviewTime = startTimeTrimmed.concat(" - ", endTimeTrimmed);
        console.log("end time exists");
      }
      else {
        reviewTime = startTimeTrimmed;
      }

      // if there is end date
      if (eventDetails.enddate !== null &&
        !dayjs(JSON.parse(eventDetails.startdateraw)).isSame(dayjs(JSON.parse(eventDetails.enddateraw)))) {
        reviewDate = eventDetails.startdate.concat(" - ", eventDetails.enddate);
      }
      else {
        reviewDate = eventDetails.startdate;
      }

      console.log(startTimeTrimmed);
      console.log(eventDetails.endtime);
    }
  }

  if (isMobile) {
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
          overflowY: "auto",
        }}
      >
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
                Review Details
              </Typography>
              <Box sx={{ flexGrow: 1, display: "flex" }}>
                <IconButton
                  onClick={
                    onEditPage
                      ? () => navigate(`/editEvent/${id}/changeGuests`)
                      : () => navigate("/createEvent/addGuests")
                  }
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  sx={{ mr: 2 }}
                >
                  <ArrowBackIcon />
                </IconButton>
              </Box>

              <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
          </AppBar>
        </Box>

        {/* Event Details */}
        <Box
          component="form"
          sx={{ width: "85%", height: "100%", pt: 8, textAlign: "left" }}
        >
          {/* Event Title */}
          <h1 id="EventReviewTitle">
            {onEditPage ? events[id - 1].title : eventDetails.title}
          </h1>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between", // Space between event detail and event picture
              alignItems: "flex-start", // Align items to the top
              margin: "0 auto",
              "& p": {
                // Apply styles to <p> tags inside this Box
                margin: "4px 0", // Vertical margin for each <p> tag
                padding: 0, // Remove any padding inside <p> tags
              },
            }}
          >
            {/* Left Group: Date, Time, Location */}
            <Box
              sx={{
                flex: 2.5,
              }}
            >
              <Box
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <CalendarMonthIcon />
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>
                  {onEditPage ? events[id - 1].startdate : reviewDate}
                </p>
              </Box>
              <Box
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <AccessTimeIcon />
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>
                  {onEditPage ? reviewTime : reviewTime}
                </p>
              </Box>
              <Box
                color="text.secondary"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <LocationOnIcon />
                {/* Adjust marginLeft later */}
                <p id="EventReviewP" style={{ marginLeft: "8px" }}>
                  {onEditPage ? events[id - 1].address : eventDetails.address}
                </p>
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
              {onEditPage ? (
                <Box
                  component="img"
                  id="EventReviewPhotoDesktop"
                  src={databaseImage}
                ></Box>
              ) : (
                <Box
                  component="img"
                  id="EventReviewPhotoDesktop"
                  src="https://s1.ticketm.net/dam/a/8b3/7896254c-063b-4815-b3a3-04cc7b6b68b3_RETINA_PORTRAIT_3_2.jpg"
                ></Box>
              )}
            </Box>
          </Box>
          {/* Details */}
          <Box
            sx={{
              "& h1": { mb: 1 }, // margin bottom of 8px
              "& p": { mt: 0 }, // margin top of 0px
            }}
          >
            <h1 id="EventReviewHeader">Event Description</h1>
            {/* Change the line below eventually */}
            <p id="EventReviewP">
              {onEditPage
                ? events[id - 1].description
                : eventDetails.description}
            </p>
          </Box>

          {/* Guest List */}
          <h1 id="EventReviewHeader">Guest List</h1>

          {/* Map Contacts */}
          {invitedGuests.length === 0 ? "invite some friends loser" : invitedGuests.map((id, index) => {
            const contact = contacts.find(contact => contact.id === id);
            return (
              <Box
                sx={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
                key={id}
              >
                <div className="ReviewEventPage-desktop-avatar">
                  {contact.name[0].toUpperCase()}
                  {contact.name.split(" ")[1][0].toUpperCase()}
                </div>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <h1 id="EventReviewNames">{contact.name}</h1>
                </Box>
              </Box>
            );
          })
          }

        </Box>
        <Button
          variant="contained"
          onClick={() => navigate("/user/1")}
          sx={{
            borderRadius: "10px",
            // width: "25%", // button width
            mb: 10,
            mt: 4,
            alignSelf: "center", // centers button
            padding: "1rem", // button height
            backgroundColor: "#F68F8D",
            "&:hover": {
              backgroundColor: "#A50B07",
            },
          }}
        >
          Post Event and Send Invites
        </Button>
      </Box>
    );
  }
  // ---------DESKTOP VERSION---------------
  else {
    return (
      <Box>
        {/* Header Box */}
        <Box
          sx={{
            width: "100%",
            minHeight: "100%",
            display: "flex", // Flexbox
            alignItems: "center", // Centers the box vertically
            flexDirection: "column", // for the button
          }}
        >
          {/* <h1 id="EventReviewHeaderDesktop">Create a New Event</h1> */}
          {/* Put that box in a box brother */}
          <Box
            sx={{
              width: "100%", // Adjust width as needed
              maxWidth: "80%", // Optional max-width for responsiveness
              display: "flex",
              flexDirection: "column",
              gap: "2rem", // Space between sections
              justifyContent: "center", // Centers the box horizontally
              alignItems: "center", // Centers the box vertically
            }}
          >
            {/* DESKTOP NAVBAR WOULD GO HERE, or maybe up a box who knows, but for sure below Create a New Event */}

            {/* Stack to left justify the event title */}
            <Stack>
              <h1 id="EventReviewHeaderDesktop">
                {onEditPage ? events[id - 1].title : eventDetails.title}
              </h1>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-start", // Align items to the top

                  "& p": {
                    // Apply styles to <p> tags inside this Box
                    margin: "4px 0", // Vertical margin for each <p> tag
                    padding: 0, // Remove any padding inside <p> tags
                  },
                  pb: "2rem",
                }}
              >
                {/* Left Group (Event details (dates, location))*/}
                <Stack
                  sx={{
                    marginRight: "4rem",
                    justifyContent: "space-between",
                    height: "275px",
                  }}
                >
                  {/* Date and time */}
                  <Box>
                    <p id="EventReviewDateAndTimeLocationHeadersDesktop">
                      Date and Time
                    </p>
                    <Box
                      color="text.secondary"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        minWidth: "250px",
                      }}
                    >
                      <CalendarMonthIcon />
                      {/* Adjust marginLeft later */}
                      <p
                        id="EventReviewDateTimeLocationDesktop"
                        style={{ marginLeft: "8px" }}
                      >
                        {onEditPage ? events[id - 1].startdate : reviewDate}
                      </p>
                    </Box>
                    <Box
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <AccessTimeIcon />
                      {/* Adjust marginLeft later */}
                      <p
                        id="EventReviewDateTimeLocationDesktop"
                        style={{ marginLeft: "8px" }}
                      >
                        {onEditPage ? reviewTime : reviewTime}
                      </p>
                    </Box>
                  </Box>
                  {/* Location */}
                  <Box>
                    <p id="EventReviewDateAndTimeLocationHeadersDesktop">
                      Location
                    </p>
                    <Box
                      color="text.secondary"
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <LocationOnIcon />
                      {/* Adjust marginLeft later */}
                      <p
                        id="EventReviewDateTimeLocationDesktop"
                        style={{ marginLeft: "8px" }}
                      >
                        {onEditPage ? events[id - 1].address : eventDetails.address}
                      </p>
                    </Box>
                  </Box>
                </Stack>

                {/* Middle Group (Picture) */}
                <Box sx={{ marginRight: "3rem" }}>
                  {/* Picture goes here */}
                  {onEditPage ? (
                    <Box
                      component="img"
                      id="EventReviewPhotoDesktop"
                      src={databaseImage}
                    ></Box>
                  ) : (
                    <Box
                      component="img"
                      id="EventReviewPhotoDesktop"
                      src="https://s1.ticketm.net/dam/a/8b3/7896254c-063b-4815-b3a3-04cc7b6b68b3_RETINA_PORTRAIT_3_2.jpg"
                    ></Box>
                  )}
                </Box>

                {/* Right Group (Event Description) */}
                <Box
                  sx={{
                    maxWidth: "500px",
                    "& h1": { mb: 1, mt: 0 }, // margin bottom of 8px, margin top of 0px
                    "& p": { mt: 0 }, // margin top of 0px
                  }}
                >
                  <h1
                    id="EventReviewHeaderDesktop"
                    style={{ fontSize: "22px" }}
                  >
                    Event Description
                  </h1>
                  {/* Change the line below eventually */}
                  <p id="EventReviewPDesktop">
                    {onEditPage
                      ? events[id - 1].description
                      : eventDetails.description}
                  </p>
                </Box>
              </Box>
              {/* Guest List */}
              <h1 id="EventReviewHeaderDesktop">Guest List</h1>
              <Box
                sx={{
                  display: "flex",
                  gap: "4rem", // Gap between guest
                  flexWrap: "wrap",
                }}
              >

                {/* Map Guests */}
                {invitedGuests.length === 0 ? "invite some friends loser" : invitedGuests.map((id, index) => {
                  const contact = contacts.find(contact => contact.id === id);
                  return (
                    <Box
                      sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}
                      key={id}
                    >
                      <div className="ReviewEventPage-desktop-avatar">
                        {contact.name[0].toUpperCase()}
                        {contact.name.split(" ")[1][0].toUpperCase()}
                      </div>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <h1 id="EventReviewNamesDesktop">{contact.name}</h1>
                      </Box>
                    </Box>
                  );
                })
                }

              </Box>
            </Stack>
          </Box>
          <Button
            variant="contained"
            onClick={() => navigate("/user/1")}
            sx={{
              borderRadius: "10px",
              // width: "25%", // button width
              mb: 4,
              mt: 4,
              alignSelf: "center", // centers button
              padding: "1rem", // button height
              backgroundColor: "#F68F8D",
              "&:hover": {
                backgroundColor: "#A50B07",
              },
            }}
          >
            Post Event and Send Invites
          </Button>
        </Box>
      </Box>
    );
  }
};

export default ReviewEventPage;
