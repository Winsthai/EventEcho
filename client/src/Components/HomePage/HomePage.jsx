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
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import { useParams, useNavigate } from "react-router-dom";

import "./HomePageStyles.css";

const HomePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { id } = useParams();
  const navigate = useNavigate();

  // React states
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State to manage search queries
  const [activeFilters, setActiveFilters] = useState([]); // State to track active filters
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const authToken = localStorage.getItem("authToken");

  // Check if event date has passed
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

  // Update search query state
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

  // Filter menu constants
  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const handleDropdownClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorE1(null);
  };

  // Page navigation
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

  // Query events from the API
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

        const result = await queryEvents(activeFilters, searchQuery, pageNum);

        const sortedEvents = result.events.sort((a, b) => {
          // Get start dates of each event
          const eventA = a.startdate.toLowerCase();
          const eventB = b.startdate.toLowerCase();

          if (eventA < eventB) return -1; // If event a comes before event b
          if (eventA > eventB) return 1; // If event a comes after event b
          return 0; // Same event dates
        });

        setEvents(sortedEvents);
        setTotalPages(result.totalPages);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchEvents();
  }, [activeFilters, searchQuery, pageNum]); // Call each time activeFilters or searchQuery changes.

  async function authenticateAdmin() {
    {
      // Generate API Url
      const APIUrl = `http://localhost:3001/api/admin`;

      try {
        // Fetch and store results from API URL
        const response = await fetch(APIUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
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
  }

  // Fetch admin status on startup
  useEffect(() => {
    const fetchAuthenticateAdmin = async () => {
      try {
        setError(null);

        const result = await authenticateAdmin();
        if (result.message === "Admin authenticated") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        setIsAdmin(false);
        setError(e.message);
      }
    };

    fetchAuthenticateAdmin();
  }, [authToken]);

  if (isMobile) {
    // Mobile Component
    return (
      <Box id="homeBox">
        {/* Top mobile component */}
        <Stack direction="row" id="homeHeaderStack">
          {/* Header */}
          <h1>Events</h1>

          {/* Login button */}
          {authToken ? (
            <></>
          ) : (
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{ borderRadius: "20px" }}
                startIcon={<AccountCircleIcon />}
              >
                <Box id="homeLoginButton"> Login </Box>
              </Button>
            </Box>
          )}

          {/* Admin button */}
          {isAdmin && authToken ? (
            <Box>
              <Button
                variant="contained"
                onClick={() => navigate("/admin")}
                sx={{ borderRadius: "20px" }}
                startIcon={<AdminPanelSettingsIcon />}
              >
                Admin
              </Button>
            </Box>
          ) : (
            <></>
          )}
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

          {events.length !== 0 ? (
            <>
              {events
                .filter((event) => !isEventDatePassed(event))
                .map((event) => (
                  <EventCard key={event.id} event={event} variant="" />
                ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
          {/* Page Navigation */}
          <Stack
            direction="row"
            sx={{
              justifyContent: "center",
              alignItems: "center",
              mt: "1.5vh",
              mb: "80px",
            }}
          >
            {/* Prev Button */}
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

            {/* Display pages */}
            <Box sx={{ ml: "4vw", mr: "4vw", fontSize: "14px" }}>
              Page {pageNum} of {totalPages}
            </Box>

            {/* Next Button */}
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

          {/* Filter Buttons */}
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

        {/* Upcoming Events */}
        <h1>Upcoming Events</h1>

        {events.length !== 0 ? (
          <>
            {events
              .filter((event) => !isEventDatePassed(event))
              .map((event) => (
                <EventCard key={event.id} event={event} variant="" />
              ))}
          </>
        ) : (
          <NoUpcomingEvents />
        )}

        {/* Page Navigation */}
        <Stack
          direction="row"
          sx={{ justifyContent: "center", alignItems: "center", mt: "1.5vh" }}
        >
          {/* Prev Button */}
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

          {/* Display pages */}
          <Box sx={{ ml: "4vw", mr: "4vw", fontSize: "1.2vw" }}>
            Page {pageNum} of {totalPages}
          </Box>

          {/* Next Button */}
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
