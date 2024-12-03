import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import NoCreatedEvents from "./Components/NoCreatedEvents";
import NoUpcomingEvents from "./Components/NoUpcomingEvents";
import EventCard from "../EventCard/EventCard";
import SearchBar from "../SearchBar";
import { useNavigate } from "react-router-dom";

import MenuIcon from "@mui/icons-material/Menu";

const UserPage = () => {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonSwitch, setButtonSwitch] = useState(0);
  const [error, setError] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  // User menu constants
  const [anchorE1, setAnchorE1] = useState(null);
  const open = Boolean(anchorE1);
  const handleDropdownClick = (event) => {
    setAnchorE1(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorE1(null);
  };

  const handleSignout = (url) => {
    localStorage.clear();
    navigate(url);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  const handleUnregisterButton = async (eventId) => {
    try {
      await unregisterEvent(eventId);
      setButtonSwitch((buttonSwitch) => {
        return buttonSwitch + 1;
      });
    } catch (e) {
      setError(e.message);
    }
  }

  // Query users hosted events
  async function queryHostedEvents() {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/users/createdEvents`;
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

  // Fetch hosted events on startup, then update hosted events on state change
  useEffect(() => {
    const fetchHostedEvents = async () => {
      try {
        setError(null);

        const result = await queryHostedEvents();
        setHostedEvents(result.events);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchHostedEvents();
  }, [searchQuery, selectedTab, buttonSwitch]); // Call this useEffect each time one of these states change.

  // Query users hosted events
  async function queryUpcomingEvents() {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/users/registeredEvents`;
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

  // Fetch hosted events on startup, then update hosted events on state change
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        setError(null);

        const result = await queryUpcomingEvents();
        setUpcomingEvents(result.events);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUpcomingEvents();
  }, [searchQuery, selectedTab, buttonSwitch]); // Call this useEffect each time one of these states change.

  // Call API to unregister user from event
  async function unregisterEvent(eventId) {
    const APIUrl = `http://localhost:3001/api/events/${eventId}/unregister`;
    const authToken = localStorage.getItem("authToken");
    try {
      // Fetch and store results from API URL
      const response = await fetch(APIUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();

      // Error message
      if (!response.ok) {
        throw new Error(data.error || "An unexpected error occurred");
      }
    } catch (e) {
      setError(e.message);
    }
  }


  return (
    <Box
      sx={{
        padding: 4,
        paddingLeft: "5vw",
        paddingRight: "5vw",
        textAlign: "left",
      }}
    >
      {/* Header with button */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Hello {username}!
        </Typography>
        <Button
          id="desktopUserButton"
          variant="contained"
          sx={{
            borderRadius: "10px",
            backgroundColor: "#A50B07",
            padding: 0,
            minWidth: "40px",
            minHeight: "30px",
          }}
          aria-controls={open ? "userMenu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleDropdownClick}
        >
          <MenuIcon />
        </Button>
        {/* User Menu */}
        <Menu
          id="userMenu"
          anchorEl={anchorE1}
          open={open}
          onClose={handleDropdownClose}
          MenuListProps={{
            "aria-labelledby": "desktopUserButton",
          }}
        >
          {/* Friends button */}
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/friends`);
            }}
          >
            <Button
              id="FriendsPageButton"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
            >
              Friends Page
            </Button>
          </MenuItem>
          <MenuItem
            onClick={(e) => {
              e.stopPropagation();
              handleSignout("/login");
            }}
          >
            <Button
              id="FriendsPageButton"
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
              }}
            >
              Sign out
            </Button>
          </MenuItem>
        </Menu>
      </Box>

      {/* Search bar */}
      <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
        <SearchBar noMargin={true} placeholder="Search for events..." />
      </Box>

      {/* Tabs for switching between Hosted and Upcoming Events */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Event Tabs"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Hosted Events" />
        <Tab label="Upcoming Events" />
      </Tabs>

      {/* Hosted Events Section */}
      {selectedTab === 0 && (
        <>
          {hostedEvents !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Your Hosted Events
              </Typography>
              {hostedEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="hosted" />
              ))}
            </>
          ) : (
            <NoCreatedEvents />
          )}
        </>
      )}

      {/* Upcoming Events Section */}
      {selectedTab === 1 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Your Upcoming Events
          </Typography>
          {upcomingEvents.length !== 0 ? (
            <>
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="upcoming" OnUnregisterButton={handleUnregisterButton}/>
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
        </>
      )}
    </Box>
  );
};

export default UserPage;
