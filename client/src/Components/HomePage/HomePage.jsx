import SearchBar from "../SearchBar";
import EventCard from "../EventCard/EventCard"
import NoUpcomingEvents from "./Components/NoUpcomingEvents"
import { Box, Stack, Button, useMediaQuery} from "@mui/material";
import { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

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
      "visibility": true,
      "image":
          "https://m.media-amazon.com/images/M/MV5BOWZiNzZkZGEtMWEwOS00NjZkLWFmYTctZmQyMDY3NGU0OWZjXkEyXkFqcGc@._V1_.jpg", // temporary
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
      "visibility": true,
      "image":
          "https://www.horizonsmusic.co.uk/cdn/shop/articles/image1_1600x1600.jpg?v=1621417277", // temporary
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search queries
  const [activeFilter, setActiveFilter] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
  };

  const searchedEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  }

  const filteredEvents = events.filter((event) =>
    event.eventtype.toLowerCase().includes(activeFilter.toLowerCase())
  );

  const handleFilterClick = (event) => {
    handleFilterChange(event.target.value);
    console.log(event.target.value);
  }

  // Checks if searchedEvents and filteredEvents have events in common
  const commonEvents = searchedEvents.filter((searchedEvent) => 
    filteredEvents.some((filteredEvent) => filteredEvent.id === searchedEvent.id)
  );

  if (isMobile) {
    // Mobile Component
    return (
      <Box
        id="homeBox"
      >
        {/* Top mobile component */}
        <Stack
          direction="row"
          id="homeHeaderStack"
        >
          {/* Header */}
          <h1>Events</h1>

          {/* Login button */}
          <Box>
            <Button
              variant="contained"
              sx={{ borderRadius: "20px" }}
              startIcon={<AccountCircleIcon />}
            >
              <Box id="homeLoginButton"> Login </Box>
            </Button>
          </Box>
        </Stack>
  
        {/* Main body for events */}
        <Stack
          id="homeEventsStack"
        >
          {/* Search bar */}
          <SearchBar onSearchChange={handleSearchChange} />

          {/* Filter buttons */}
          <Stack
            direction="row"
            id="homeFiltersStack"
          >
            <Box id="homeFiltersBox">
              {/* Sports */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<SportsBasketballIcon/>}
                value="Sports"
                onClick={handleFilterClick}
              >
                Sports
              </Button>

              {/* Music */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", 
                backgroundColor:"#ff7474"}} 
                startIcon={<MusicNoteIcon/>}
              > 
                Music 
              </Button>

              {/* Food */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<LocalDiningIcon/>}
              > 
                Food 
              </Button>
              
              {/* Art */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<ColorLensIcon/>}
              > 
                Art
              </Button>
              
              {/* Hangout */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}}
                startIcon={<GroupsIcon/>}
              > 
                Hangout
              </Button>

              {/* Gaming */}
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<SportsEsportsIcon/>}
              > 
                Gaming
              </Button>
            </Box>
          </Stack>
          {/* Upcoming events section */}
          <Box id="homeUpcomingHeader"> Upcoming Events </Box>

          {commonEvents.length !== 0 ? (
            <>
              {commonEvents.map((event) => (
                <EventCard key={event.id} event={event} variant=""/>
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}       
        </Stack>
      </Box>
    );
  } else {
    return (
      <Stack direction="column" id="homeDesktopStack">
        <h1 style={{marginTop:"0"}}>Upcoming Events</h1>
        {events.length !== 0 ? (
            <>
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant=""/>
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
      </Stack>
    );
  }
};

export default HomePage;
