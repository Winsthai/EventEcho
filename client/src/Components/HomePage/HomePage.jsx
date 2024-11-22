import SearchBar from "../SearchBar";
import EventCard from "../EventCard/EventCard";
import NoUpcomingEvents from "./Components/NoUpcomingEvents";
import {
  Box,
  Stack,
  Button,
  useMediaQuery,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams, useNavigate } from 'react-router-dom';


import "./HomePageStyles.css";

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
    image:
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
    image:
      "https://www.horizonsmusic.co.uk/cdn/shop/articles/image1_1600x1600.jpg?v=1621417277", // temporary
  }
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search queries
  const [activeFilters, setActiveFilters] = useState([]); // State to track active filters

  const isMobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
  };

  const searchedEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Finds all events with currently active filters
  const filteredEvents = events.filter((event) =>
    activeFilters.some((filter) =>
      event.eventtype.toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Handle filter button clicks
  const handleFilterClick = (clickedFilter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(clickedFilter)
        ? prevFilters.filter((filters) => filters !== clickedFilter)
        : [...prevFilters, clickedFilter]
    );
  };

  // Checks if searchedEvents and filteredEvents have events in common
  const getCommonEvents = () => {
    // If no filters active, return searched events
    if (activeFilters.length === 0) {
      return searchedEvents;

      // Find common events between searched events and filtered events
    } else {
      return searchedEvents.filter((searchedEvent) =>
        filteredEvents.some(
          (filteredEvent) => filteredEvent.id === searchedEvent.id
        )
      );
    }
  };

  const commonEvents = getCommonEvents();

  const [open, setOpen] = useState(false);

  const handleDropdownClick = () => {
    setOpen ((prev) => !prev);
  }

  const handleDropdownClose = () => {
    setOpen(false);
  }

  if (isMobile) {
    // Mobile Component
    return (
      <Box id="homeBox">
        {/* Top mobile component */}
        <Stack direction="row" id="homeHeaderStack">
          {/* Header */}
          <h1>Events</h1>

          {/* Login button */}
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

        {/* Main body for events */}
        <Stack id="homeEventsStack">
          {/* Search bar */}
          <SearchBar onSearchChange={handleSearchChange} />

          {/* Filter buttons */}
          <Stack direction="row" id="homeFiltersStack">
            <Box id="homeFiltersBox">
              {/* Sports */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Sports")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<SportsBasketballIcon />}
                onClick={() => handleFilterClick("Sports")}
              >
                Sports
              </Button>

              {/* Music */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Music")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<MusicNoteIcon />}
                onClick={() => handleFilterClick("Music")}
              >
                Music
              </Button>

              {/* Food */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Food")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<LocalDiningIcon />}
                onClick={() => handleFilterClick("Food")}
              >
                Food
              </Button>

              {/* Art */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Art")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<ColorLensIcon />}
                onClick={() => handleFilterClick("Art")}
              >
                Art
              </Button>

              {/* Hangout */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Hangout")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<GroupsIcon />}
                onClick={() => handleFilterClick("Hangout")}
              >
                Hangout
              </Button>

              {/* Gaming */}
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Gaming")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<SportsEsportsIcon />}
                onClick={() => handleFilterClick("Gaming")}
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
                <EventCard key={event.id} event={event} variant="" />
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
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <SearchBar></SearchBar>
          <FormControl sx={{ minWidth: 50 }}>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#A50B07"
              }}
              startIcon={<FilterAltIcon/>}
            >
              Filters
            </Button>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={[]}
              label="Age"
              // onChange={handleChange}
              autoWidth
              multiple
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <h1 style={{ marginTop: "0" }}>Upcoming Events</h1>

        {events.length !== 0 ? (
          <>
            {events.map((event) => (
              <EventCard key={event.id} event={event} variant="" />
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
