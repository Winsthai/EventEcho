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
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import logo from "../../images/logo.png";

import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import "./ReviewEventPageStyles.css";

const ReviewEventPage = ({
  eventDetails,
  detailsCompleted,
  invitedGuests,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const onEditPage = location.pathname.includes("edit");
  // console.log(invitedGuests);
  // console.log(eventDetails);

  const [friendsList, setFriendsList] = useState([]);

  // retrieve friends
  async function fetchFriends() {
    const APIUrl = `http://localhost:3001/api/users/friends`;

    try {
      const response = await fetch(APIUrl, {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.authToken}` }
      }
      );
      const data = await response.json();
      //console.log("your friends:", data);

      if (!response.ok) {
        throw new Error(data.error || "where yo friends at boy");
      }
      return data.users;

    } catch (error) {
      console.log(error);
    }
  };

  // retrieve friends list from the db at the beginning
  useEffect(() => {
    if (!detailsCompleted && !onEditPage) {
      navigate("/createEvent");
    }
    else if (!detailsCompleted && onEditPage) {
      navigate(`/editEvent/${id}`)
    }

    const fetchMyFriends = async () => {
      try {
        const myFriends = await fetchFriends();
        setFriendsList(myFriends);
        console.log("hello friends ", myFriends);
      } catch (error) {
        console.log("cooked");
      }
    };
    fetchMyFriends();
  }, []);

  let reviewTime, reviewDate, startTimeTrimmed, endTimeTrimmed;

  if (detailsCompleted) {
    startTimeTrimmed = eventDetails.starttime.slice(0, -6);
    // if there is end time
    if (eventDetails.endtime !== null) {
      endTimeTrimmed = eventDetails.endtime.slice(0, -6);
      reviewTime = startTimeTrimmed.concat(" - ", endTimeTrimmed);
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
  }

  async function addEventTodb(cloudinaryLink) {
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
          eventimage: cloudinaryLink
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

  async function editEventdb(cloudinaryLink) {
    console.log("pushing changes to db");
    console.log("link: ", cloudinaryLink);
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}`, {
        method: "PUT",
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
          eventimage: cloudinaryLink
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
      }
      const data = await response.json();
      console.log("event updated", data);

    } catch (error) {
      console.log("some error here", error);
    }

  };

  // 2 options for CREATE - either include image or not (upload or don't)
  // 3 options for EDIT - 1. keep same image, 2. upload new image, 3. delete image
  const handlePostEvent = async (url) => {
    // upload to cloud
    let uploadedImageURL = null;
    if (eventDetails.imageform !== null) {
      // CREATE / EDIT upload new image
      if (typeof (eventDetails.imageform) !== "string") {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/dk7v80lgt/image/upload`,
          {
            method: "POST",
            body: eventDetails.imageform,
          }
        );

        uploadedImageURL = await response.json();
        console.log("cloud link", uploadedImageURL.url);
        onEditPage ? editEventdb(uploadedImageURL.url) : addEventTodb(uploadedImageURL.url);
      }
      // EDIT keep same image
      else {
        console.log("this image is the same so not reuploading");

        uploadedImageURL = eventDetails.eventimage;
        editEventdb(uploadedImageURL);
      }

    }
    // no image
    else {
      console.log("no image so just add event");
      onEditPage ? editEventdb(null) : addEventTodb(null);
    }

    navigate(url);
  };

  const eventType = eventDetails.eventtype;

  const imageUrl = eventDetails.eventimage === null ? logo : eventDetails.eventimage;

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
          <Box
            component="img"
            id="EventReviewPhoto"
            src={imageUrl}
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
            <h1 id="EventReviewTitle">
              {eventDetails.title}
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
                {reviewDate}
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
              <p id="EventReviewP">{reviewTime}</p>
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
                {eventDetails.address}
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
              {eventDetails.description}
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
          {invitedGuests.length === 0 || friendsList.length === 0 ? (
            <p id="EventReviewP" style={{ marginTop: 0 }}>
              Consider inviting some guests!
            </p>
          ) : (
            invitedGuests.map((id, index) => {
              const contact = friendsList.find((cont) => cont.id === id);
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
                    {contact.firstname[0].toUpperCase()}
                    {contact.lastname[0].toUpperCase()}
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <h1 id="EventReviewNames">{contact.firstname.concat(" ", contact.lastname)}</h1>
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
            onClick={() => handlePostEvent("/user")}
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
                backgroundColor: "gray",
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
              id="EventReviewPhotoDesktop"
              src={imageUrl}
              sx={{
                position: "relative",
                zIndex: 2, // Place above the blur
              }}
            ></Box>
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
              {eventDetails.title}
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
                  {reviewDate}
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
                  {reviewTime}
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
                  {eventDetails.address}
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
            {eventDetails.description}
          </p>
        </Box>

        {/* Guest List */}
        <h1 id="EventReviewHeaderDesktop" style={{ marginBottom: "0.5rem" }}>Guest List</h1>
        <Box
          sx={{
            display: "flex",
            gap: "4rem", // Gap between guest
            flexWrap: "wrap",
          }}
        >
          {/* Map Guests */}
          {invitedGuests.length === 0 || friendsList.length === 0
            ? <p id="EventReviewPDesktop" style={{ marginTop: "0" }}>Consider inviting some guests!</p>
            : invitedGuests.map((id, index) => {
              const contact = friendsList.find((cont) => cont.id === id);
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
                    {contact.firstname[0].toUpperCase()}
                    {contact.lastname[0].toUpperCase()}
                  </div>
                  <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <h1 id="EventReviewNamesDesktop">{contact.firstname.concat(" ", contact.lastname)}</h1>
                  </Box>
                </Box>
              );
            })}
        </Box>

        {/* Post event / send invites button */}
        <Button
          variant="contained"
          onClick={() => handlePostEvent("/user")}
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
