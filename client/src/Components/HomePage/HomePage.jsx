import SearchBar from "../SearchBar";
import EventCard from "../EventCard/EventCard";
import NoUpcomingEvents from "./Components/NoUpcomingEvents";
import {
  Box,
  Stack,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsBasketballIcon from "@mui/icons-material/SportsBasketball";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import GroupsIcon from "@mui/icons-material/Groups";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

import { useParams, useNavigate } from "react-router-dom";

import "./HomePageStyles.css";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search queries
  const [activeFilters, setActiveFilters] = useState([]); // State to track active filters
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
    setPageNum(1);
  };

  // Handle filter button clicks
  const handleFilterClick = (clickedFilter) => {
    setActiveFilters((prevFilters) =>
      prevFilters.includes(clickedFilter)
        ? prevFilters.filter((filters) => filters !== clickedFilter)
        : [...prevFilters, clickedFilter]
    );
    setPageNum(1);
  };

  // Filter menu const
  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const handleDropdownClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorE1(null);
  };

  const handlePrevPage = () => {
    setPageNum((prevPageNum) => {
      return prevPageNum - 1;
    });
  };

  const handleNextPage = () => {
    setPageNum((prevPageNum) => {
      return prevPageNum + 1;
    });
  };

  async function queryEvents(
    eventType = "",
    search = "",
    page = "1",
    limit = ""
  ) {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/events?eventType=${eventType}&search=${search}&page=${page}&limit=${limit}`;

    try {
      // Fetch and store results from API URL
      const response = await fetch(APIUrl);
      const data = await response.json();

      // Error message
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred");
      }

      return data;
    } catch (e) {
      setError(e.message);
    }
  }

  // Fetch events on startup, then update events each time filters or search change.
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);

        const result = await queryEvents(
          activeFilters[0],
          searchQuery,
          pageNum
        );
        setEvents(result.events);
        setTotalPages(result.totalPages);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchEvents();
  }, [activeFilters, searchQuery, pageNum]); // Call each time activeFilters or searchQuery changes.

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
            <Button
              variant="contained"
              onClick={() => navigate("/user/1")}
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
          <SearchBar
            onSearchChange={handleSearchChange}
            placeholder="Search for events..."
          />

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

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}

          {events.length !== 0 ? (
            <>
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="" />
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
          <Stack
            direction="row"
            sx={{ justifyContent: "center", alignItems: "center", mt: "1.5vh" }}
          >
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#ff7474",
              }}
              startIcon={<NavigateBeforeIcon />}
              disabled={pageNum <= 1}
              onClick={() => handlePrevPage()}
            >
              Prev
            </Button>
            <Box sx={{ ml: "4vw", mr: "4vw", fontSize: "14px" }}>
              Page {pageNum} of {totalPages}
            </Box>
            <Button
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "#ff7474",
              }}
              endIcon={<NavigateNextIcon />}
              disabled={pageNum >= totalPages}
              onClick={() => handleNextPage()}
            >
              Next
            </Button>
          </Stack>
        </Stack>
      </Box>
    );
  } else {
    // Desktop component
    return (
      <Stack direction="column" id="homeDesktopStack">
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <SearchBar
            onSearchChange={handleSearchChange}
            placeholder="Search for events..."
          ></SearchBar>

          <Button
            id="desktopFiltersButton"
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#A50B07",
            }}
            startIcon={<FilterAltIcon />}
            aria-controls={open ? "filtersMenu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleDropdownClick}
          >
            Filters
          </Button>
          <Menu
            id="filtersMenu"
            anchorEl={anchorE1}
            open={open}
            onClose={handleDropdownClose}
            MenuListProps={{
              "aria-labelledby": "desktopFiltersButton",
            }}
          >
            {/* Sports */}
            <MenuItem onClick={() => handleFilterClick("Sports")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Sports")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<SportsBasketballIcon />}
              >
                Sports
              </Button>
            </MenuItem>
            {/* Music */}
            <MenuItem onClick={() => handleFilterClick("Music")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Music")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<MusicNoteIcon />}
              >
                Music
              </Button>
            </MenuItem>
            {/* Food */}
            <MenuItem onClick={() => handleFilterClick("Food")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Food")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<LocalDiningIcon />}
              >
                Food
              </Button>
            </MenuItem>
            {/* Art */}
            <MenuItem onClick={() => handleFilterClick("Art")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Art")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<ColorLensIcon />}
              >
                Art
              </Button>
            </MenuItem>
            {/* Hangout */}
            <MenuItem onClick={() => handleFilterClick("Hangout")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Hangout")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<GroupsIcon />}
              >
                Hangout
              </Button>
            </MenuItem>
            {/* Gaming */}
            <MenuItem onClick={() => handleFilterClick("Gaming")}>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  backgroundColor: activeFilters.includes("Gaming")
                    ? "#A50B07"
                    : "#ff7474",
                }}
                startIcon={<SportsEsportsIcon />}
              >
                Gaming
              </Button>
            </MenuItem>
          </Menu>
        </Stack>

        <h1>Upcoming Events</h1>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {events.length !== 0 ? (
          <>
            {events.map((event) => (
              <EventCard key={event.id} event={event} variant="" />
            ))}
          </>
        ) : (
          <NoUpcomingEvents />
        )}
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center", mt: "1.5vh" }}
        >
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#ff7474",
            }}
            startIcon={<NavigateBeforeIcon />}
            disabled={pageNum <= 1}
            onClick={() => handlePrevPage()}
          >
            Prev
          </Button>
          <Box sx={{ ml: "4vw", mr: "4vw", fontSize: "1.2vw" }}>
            Page {pageNum} of {totalPages}
          </Box>
          <Button
            variant="contained"
            sx={{
              borderRadius: "20px",
              backgroundColor: "#ff7474",
            }}
            endIcon={<NavigateNextIcon />}
            disabled={pageNum >= totalPages}
            onClick={() => handleNextPage()}
          >
            Next
          </Button>
        </Stack>
      </Stack>
    );
  }
};

export default HomePage;
