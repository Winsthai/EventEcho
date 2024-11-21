/* eslint-disable react/prop-types */ // TEMPORARY
import { useMediaQuery, Box, Stack, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import "./EventCardStyles.css";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event, variant = "" }) => {
  // Use media query to check if screen width is less than 600px (mobile view)
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  if (!event) {
    return <></>;
  }

  const startDateTime = new Date(
    `${event.startdate.slice(0, 10)}T${event.starttime.slice(0, 8)}+00:00`
  );

  if (isMobile) {
    return (
      <Box
        className="homeUpcomingEventBox"
        onClick={() => navigate(`/event/${event.id}`)}
      >
        {event.image ? (
          <Box
            component="img"
            className="homeUpcomingEventPhoto"
            src={event.image}
          ></Box>
        ) : (
          <Box className="homeUpcomingEventPhoto">temp</Box>
        )}

        <Stack className="homeUpcomingEventDetails">
          {/* Date */}
          <Box className="homeEventDate" color="text.secondary">
            {startDateTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Box>
          <Box className="homeEventName"> {event.title} </Box>

          {/* Time */}
          <Stack
            direction="row"
            alignItems="center"
            className="homeEventTime"
            color="text.secondary"
          >
            <AccessTimeIcon
              className="homeEventIconsMobile"
              sx={{ fontSize: "1rem" }}
            />
            {startDateTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Stack>

          {/* Address */}
          <Stack
            direction="row"
            alignItems="center"
            className="homeEventLocation"
            color="text.secondary"
          >
            <LocationOnIcon
              className="homeEventIconsMobile"
              sx={{ fontSize: "1rem" }}
            />
            {event.address}
          </Stack>
        </Stack>
        {variant === "upcoming" ? (
          <Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: "80%",
                backgroundColor: "#ff7474",
                marginRight: "3vw",
                textTransform: "none",
              }}
              onClick={() => navigate(`/event/${event.id}`)} // Probably change this later
            >
              Unregister
            </Button>
          </Box>
        ) : variant === "hosted" ? (
          <Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                height: "80%",
                backgroundColor: "#ff7474",
                marginRight: "3vw",
                textTransform: "none",
              }}
              onClick={() => navigate(`/event/${event.id}`)} // Probably change this later
            >
              Edit
            </Button>
          </Box>
        ) : (
          <></>
        )}
      </Box>
    );
  } else {
    return (
      <Box className="homeUpcomingEventBoxDesktop">
        {event.image ? (
          <Box
            component="img"
            className="homeUpcomingEventPhoto"
            src={event.image}
          ></Box>
        ) : (
          <Box className="homeUpcomingEventPhoto">temp</Box>
        )}
        <Stack className="homeUpcomingEventDetailsDesktop" direction="row">
          <Box className="homeEventNameDesktop"> {event.title} </Box>

          {/* Date */}
          <Box className="homeEventDateDesktop" color="text.secondary">
            <CalendarMonthIcon
              className="homeEventIconsDesktop"
              sx={{ fontSize: "1em" }}
            />
            {startDateTime.toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </Box>

          {/* Time */}
          <Box className="homeEventTimeDesktop" color="text.secondary">
            <AccessTimeIcon
              className="homeEventIconsDesktop"
              sx={{ fontSize: "1em" }}
            />
            {startDateTime.toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Box>

          {/* Address */}
          <Box className="homeEventLocationDesktop" color="text.secondary">
            <LocationOnIcon
              className="homeEventIconsDesktop"
              sx={{ fontSize: "1em" }}
            />
            {event.address}
          </Box>
          {variant === "upcoming" ? (
            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#ff7474",
                }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                Unregister
              </Button>
            </Box>
          ) : (
            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#ff7474",
                }}
                onClick={() => navigate(`/event/${event.id}`)}
              >
                Register
              </Button>
            </Box>
          )}
        </Stack>
      </Box>
    );
  }
};

export default EventCard;
