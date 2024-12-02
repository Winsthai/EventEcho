import NoUpcomingEvents from "../HomePage/Components/NoUpcomingEvents";
import NoUsers from "./Components/NoUsers";
import EventCard from "../EventCard/EventCard";
import UserCard from "../UserCard/UserCard";
import SearchBar from "../SearchBar";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
  Button,
  Stack,
} from "@mui/material";
import { useState, useEffect } from "react";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const AdminPage = () => {
  // React states
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");

  // Handle switching tabs
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  // Update search query state
  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
    setPageNum(1);
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

        const result = await queryEvents("", searchQuery, pageNum);
        setEvents(result.events);
        setTotalPages(result.totalPages);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchEvents();
  }, [searchQuery, pageNum]); // Call each time activeFilters or searchQuery changes.

  return (
    <Box
      sx={{
        padding: 4,
        paddingLeft: "5vw",
        paddingRight: "5vw",
        textAlign: "left",
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Admin Dashboard
      </Typography>

      {/* Search bar */}
      {selectedTab == 0 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar
            onSearchChange={handleSearchChange}
            noMargin={true}
            placeholder="Search for events..."
          />
        </Box>
      ) : (
        <></>
      )}

      {selectedTab == 1 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar
            onSearchChange={handleSearchChange}
            noMargin={true}
            placeholder="Search for users..."
          />
        </Box>
      ) : (
        <></>
      )}

      {/* Tabs for switching between Events and Users */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Event Tabs"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Events" />
        <Tab label="Users" />
      </Tabs>

      {/* Events Section */}
      {selectedTab === 0 && (
        <>
          {events.length !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Events
              </Typography>
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="admin" />
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
        </>
      )}

      {/* Users Section*/}
      {selectedTab === 1 && (
        <>
          {users.length !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Users
              </Typography>
              {users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </>
          ) : (
            <NoUsers />
          )}
        </>
      )}
    </Box>
  );
};

export default AdminPage;
