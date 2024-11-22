import SearchBar from "../SearchBar";
import { Box, Stack, Button, useMediaQuery } from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useParams, useNavigate } from 'react-router-dom';

// import CalendarDesktop from '../../images/CalendarDesktop.png';
// import ClockDesktop from '../../images/ClockDesktop.png';
// import LocationDesktop from '../../images/LocationDesktop.png';

import './HomePageStyles.css';

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

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  if (isMobile) {
    // Mobile Component
    return (
      <Box
        id="homeBox"
      >
        <Stack
          direction="row"
          id="homeHeaderStack"
        >
          <h1>Events</h1>
          <Box>
            <Button variant="contained"
              onClick={() => navigate('/user/1')}
              sx={{ borderRadius: "20px" }}
              startIcon={<AccountCircleIcon />}
            >
              <Box id="homeLoginButton"> Login </Box>
            </Button>
          </Box>

        </Stack>

        <Stack
          id="homeEventsStack"
        >
          <SearchBar></SearchBar>
          <Stack
            direction="row"
            id="homeFiltersStack"
          >
            <Box id="homeFiltersBox">
              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#ff7474" }}
                startIcon={<SportsBasketballIcon />}
              >
                Sports
              </Button>

              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: "#ff7474"
                }}
                startIcon={<MusicNoteIcon />}
              >
                Music
              </Button>

              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#ff7474" }}
                startIcon={<LocalDiningIcon />}
              >
                Food
              </Button>

              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#ff7474" }}
                startIcon={<ColorLensIcon />}
              >
                Art
              </Button>

              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#ff7474" }}
                startIcon={<GroupsIcon />}
              >
                Hangout
              </Button>

              <Button
                variant="contained"
                sx={{ borderRadius: "20px", backgroundColor: "#ff7474" }}
                startIcon={<SportsEsportsIcon />}
              >
                Gaming
              </Button>
            </Box>
          </Stack>

          <Box id="homeUpcomingHeader"> Upcoming Events </Box>

          <Box className="homeUpcomingEventBox">
            <Box className="homeUpcomingEventPhoto">temp</Box>

            <Stack className="homeUpcomingEventDetails" onClick={() => navigate('/event/1')}>
              <Box className="homeEventDate" color="text.secondary"> Thursday, November 14 </Box>
              <Box className="homeEventName"> Football Game </Box>
              <Stack direction="row" alignItems="center" className="homeEventTime" color="text.secondary"> <AccessTimeIcon className="homeEventIconsMobile" sx={{ fontSize: "1rem" }} /> 8:00 AM </Stack>
              <Stack direction="row" alignItems="center" className="homeEventLocation" color="text.secondary"> <LocationOnIcon className="homeEventIconsMobile" sx={{ fontSize: "1rem" }} />123 Stadium Rd, City </Stack>
            </Stack>
          </Box>

        </Stack>

      </Box>

    );
  } else {
    return (
      <Stack direction="column" id="homeDesktopStack">
        <h1 style={{ marginTop: "0" }}>Upcoming Events</h1>
        <Box className="homeUpcomingEventBoxDesktop">
          <Box className="homeUpcomingEventPhoto">temp</Box>
          <Stack className="homeUpcomingEventDetailsDesktop" direction="row" onClick={() => navigate('/event/1')}>
            <Box className="homeEventNameDesktop"> Football Game </Box>
            <Box className="homeEventDateDesktop" color="text.secondary"> <CalendarMonthIcon className="homeEventIconsDesktop" sx={{ fontSize: "1em" }} /> Thursday, November 14 </Box>
            <Box className="homeEventTimeDesktop" color="text.secondary"> <AccessTimeIcon className="homeEventIconsDesktop" sx={{ fontSize: "1em" }} /> 8:00 AM </Box>
            <Box className="homeEventLocationDesktop" color="text.secondary">  <LocationOnIcon className="homeEventIconsDesktop" sx={{ fontSize: "1em" }} /> 123 Stadium Rd, City </Box>
            <Box>
              <Button
                variant="contained"
                sx={{ borderRadius: "20px", height: "80%", backgroundColor: "#ff7474" }}
              >
                Register
              </Button>
            </Box>
          </Stack>
        </Box>
      </Stack>

    );
  }

};

export default HomePage;
