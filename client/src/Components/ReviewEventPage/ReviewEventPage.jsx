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
import dayjs from "dayjs";
import logo from "../../images/logo.png";

import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import "./ReviewEventPageStyles.css";

// This needs to get deleted.
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

const ReviewEventPage = ({
  eventDetails,
  setEventDetails,
  detailsCompleted,
  invitedGuests,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");
  console.log(invitedGuests);
  console.log(eventDetails);

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
    } else {
      startTimeTrimmed = eventDetails.starttime.slice(0, -6);
      // if there is end time
      if (eventDetails.endtime !== null) {
        endTimeTrimmed = eventDetails.endtime.slice(0, -6);
        reviewTime = startTimeTrimmed.concat(" - ", endTimeTrimmed);
        console.log("end time exists");
      } else {
        reviewTime = startTimeTrimmed.concat(" - TBD");
      }

      // if there is end date
      if (
        eventDetails.enddate !== null &&
        !dayjs(JSON.parse(eventDetails.startdateraw)).isSame(
          dayjs(JSON.parse(eventDetails.enddateraw))
        )
      ) {
        reviewDate = eventDetails.startdate.concat(" - ", eventDetails.enddate);
      } else {
        reviewDate = eventDetails.startdate;
      }

      console.log(startTimeTrimmed);
      console.log(eventDetails.endtime);
    }
  }

  async function addEventTodb() {
    try {
      const response = await fetch("http://localhost:3001/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.authToken}`
        },
        body: JSON.stringify({
          title: eventDetails.title,
          eventtype: eventDetails.eventtype,
          description: eventDetails.description,
          address: eventDetails.address,
          startdate: eventDetails.startdate,
          startdateraw: eventDetails.startdateraw,
          starttime: eventDetails.starttime,
          starttimeraw: eventDetails.starttimeraw,
          enddate: eventDetails.enddate,
          enddateraw: eventDetails.enddateraw,
          endtime: eventDetails.endtime,
          endtimeraw: eventDetails.endtimeraw,
          visibility: eventDetails.visibility,
          eventimage: eventDetails.eventimage
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }

      const data = await response.json();
      console.log("event created", data);
    } catch (error) {
      console.log("some error here", error);
    }
  };

  const handlePostEvent = async (url) => {
    // upload to cloud
    if (eventDetails.imageform !== null) {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dk7v80lgt/image/upload`,
        {
          method: "POST",
          body: eventDetails.imageform,
        }
      );

      const uploadedImageURL = await response.json();
      console.log(uploadedImageURL.url);
      await setEventDetails({ ...eventDetails, eventimage: "uploadedImageURL.url" });
      console.log(eventDetails);
    }

    // make api call to push to db here
    //await addEventTodb();

    navigate(url);
  };

  const eventType = onEditPage
    ? events[id - 1].eventtype
    : eventDetails.eventtype;

  const imageUrl = onEditPage ? events[id - 1].image : eventDetails.eventimage;

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

  const eventIcon = getIcon(eventType);

  if (isMobile) {
    return (
      <Box>
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

              <Box sx={{ flexGrow: 2 }} />
            </Toolbar>
          </AppBar>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: "4.5rem",
          }}
        >
          {onEditPage ? (
            <Box
              component="img"
              id="EventReviewPhoto"
              src={eventDetails.eventimage}
            ></Box>
          ) : (
            <Box
              component="img"
              id="EventReviewPhoto"
              src={
                eventDetails.imageform === null ? logo : eventDetails.eventimage
              }
            ></Box>
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
            <h1 id="EventReviewTitle">
              {onEditPage ? events[id - 1].title : eventDetails.title}
            </h1>
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
              <p id="EventReviewP">
                {onEditPage ? events[id - 1].startdate : reviewDate}
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
              <p id="EventReviewP">{onEditPage ? reviewTime : reviewTime}</p>
            </Stack>
            {/* Address */}
            <Stack
              direction="row"
              alignItems="flex-start"
              spacing={1}
              color="text.secondary"
            >
              <LocationOnIcon />
              <p id="EventReviewP">
                {onEditPage ? events[id - 1].address : eventDetails.address}
              </p>
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
            {eventType}
          </Box>

          {/* Event Description */}
          <Box
            sx={{
              "& h1": { mb: 0 }, //
              "& p": { mt: 0 },
            }}
          >
            <h1 id="EventReviewHeader">Event Description</h1>
            <p id="EventReviewP">
              {onEditPage
                ? events[id - 1].description
                : eventDetails.description}
            </p>
          </Box>
        </Box>

        <Box
          sx={{
            px: 3, // Padding on left and right for the outer container
          }}
        >
          {/* Guest List */}
          <h1 id="EventReviewHeader">Guest List</h1>

          {/* Map Contacts */}
          {invitedGuests.length === 0 ? (
            <p id="EventReviewP" style={{ marginTop: 0 }}>
              Consider inviting some guests!
            </p>
          ) : (
            invitedGuests.map((id, index) => {
              const contact = contacts.find((contact) => contact.id === id);
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "16px",
                  }}
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
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            onClick={() => navigate("/user/1")}
            sx={{
              borderRadius: "10px",
              mx: 3, // margin on left/right
              width: "100%", // button width
              mb: 10,
              mt: 2,
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
  // ---------DESKTOP VERSION---------------
  else {
    return (
      <Box
        borderBottom="1px solid #ddd"
        bgcolor="white"
        mx="2.5rem"
        mt="1.5rem"
        marginBottom="2.5rem"
        borderRadius="20px"
        sx={{
          padding: "2vh 3vw", // Padding for all items inside the white box
        }}
      >
        <Box
          sx={{
            alignItems: "center", // center vert
            textAlign: "center",
          }}
        >
          {/* Event picture */}
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
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                filter: "blur(20px)", // Adjust blur intensity
                transform: "scale(1.1)", // Slightly zoom out
                zIndex: 1, // Place behind the image
              }}
            ></Box>

            {/* Event Image */}
            {onEditPage ? (
              <Box
                component="img"
                id="EventReviewPhotoDesktop"
                src={events[id - 1].description}
                sx={{
                  position: "relative",
                  zIndex: 2, // Place above the blur
                }}
              ></Box>
            ) : (
              <Box
                component="img"
                id="EventReviewPhotoDesktop"
                src={
                  eventDetails.imageform === null
                    ? logo
                    : eventDetails.eventimage
                }
                sx={{
                  position: "relative",
                  zIndex: 2, // Place above the blur
                }}
              ></Box>
            )}
          </Box>
        </Box>

        <Box>
          {/* Title */}
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
            <h1 id="EventReviewTitleDesktop">
              {onEditPage ? events[id - 1].title : eventDetails.title}
            </h1>
            <Stack spacing={1}>
              {/* Date */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1}
                color="text.secondary"
              >
                <CalendarMonthIcon id="EventReviewIconsDesktop" />
                <p id="EventReviewPDesktop">
                  {onEditPage ? events[id - 1].startdate : reviewDate}
                </p>
              </Stack>
              {/* Time */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.2}
                color="text.secondary"
              >
                <AccessTimeIcon id="EventReviewIconsDesktop" />
                <p id="EventReviewPDesktop">
                  {onEditPage ? reviewTime : reviewTime}
                </p>
              </Stack>
              {/* Address */}
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.2}
                color="text.secondary"
              >
                <LocationOnIcon id="EventReviewIconsDesktop" />
                <p id="EventReviewPDesktop">
                  {onEditPage ? events[id - 1].address : eventDetails.address}
                </p>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <h1
          id="EventReviewHeaderDesktop"
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
          {eventType}
        </Box>

        {/* Event Description */}
        <Box
          sx={{
            "& h1": { mb: "0.5rem" }, // margin bottom of 8px
            "& p": { mt: 0 }, // margin top of 0px
          }}
        >
          <h1 id="EventReviewEDDesktop">Event Description</h1>
          <p id="EventReviewPDesktop">
            {onEditPage ? events[id - 1].description : eventDetails.description}
          </p>
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
          {invitedGuests.length === 0
            ? "Consider inviting some guests!"
            : invitedGuests.map((id, index) => {
              const contact = contacts.find((contact) => contact.id === id);
              return (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
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
            })}
        </Box>

        {/* Post event / send invites button */}
        <Button
          variant="contained"
          onClick={() => handlePostEvent("/user/1")}
          sx={{
            borderRadius: "10px",
            width: "100%", // button width
            px: "3vw",
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
    );
  }
};

export default ReviewEventPage;
