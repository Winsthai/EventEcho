import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  Button,
  Menu,
  MenuItem,
  Stack,
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
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [invitedEvents, setInvitedEvents] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab
  const [searchQuery, setSearchQuery] = useState("");
  const [buttonSwitch, setButtonSwitch] = useState(0);
  const [error, setError] = useState("");
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [selectedEventToRemove, setSelectedEventToRemove] = useState(null);


  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  const authToken = localStorage.getItem("authToken");
  const username = localStorage.getItem("username");

  // Open confirmation popup
  const handleOpenRemoveConfirmation = (event) => {
    setSelectedEventToRemove(event);
    setShowRemoveConfirmation(true);
  };

  // Close confirmation popup
  const handleCloseRemoveConfirmation = () => {
    setSelectedEventToRemove(null);
    setShowRemoveConfirmation(false);
  };

  // Confirm removal
  const handleConfirmRemove = async () => {
    if (selectedEventToRemove) {
      await handleRemoveButton(selectedEventToRemove.id); // Call the original remove logic
    }
    handleCloseRemoveConfirmation();
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
  };

  const searchedHostedEvents = hostedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchedRegisteredEvents = registeredEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchedInvitedEvents = invitedEvents.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
  };

  // Removing an event
  const handleRemoveButton = async (eventId) => {
    try {
      await removeEvent(eventId);
      setButtonSwitch((buttonSwitch) => {
        return buttonSwitch + 1;
      });
    } catch (e) {
      setError(e.message);
    }
  };

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

  // Query users registered events
  async function queryRegisteredEvents() {
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

  // Fetch registered events on startup, then update registered events on state change
  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        setError(null);

        const result = await queryRegisteredEvents();

        const sortedRegisteredEvents = result.events.sort((a, b) => {
          // Get start dates of each event
          const eventA = a.startdate.toLowerCase();
          const eventB = b.startdate.toLowerCase();

          if (eventA < eventB) return -1; // If event a comes before event b
          if (eventA > eventB) return 1; // If event a comes after event b
          return 0; // Same event dates
        });

        setRegisteredEvents(sortedRegisteredEvents);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchRegisteredEvents();
  }, [searchQuery, selectedTab, buttonSwitch]); // Call this useEffect each time one of these states change.

  // Query users invited events
  async function queryInvitedEvents() {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/users/invitedEvents`;
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

  // Fetch invited events on startup, then update invited events on state change
  useEffect(() => {
    const fetchInvitedEvents = async () => {
      try {
        setError(null);

        const result = await queryInvitedEvents();

        const sortedInvitedEvents = result.events.sort((a, b) => {
          // Get start dates of each event
          const eventA = a.startdate.toLowerCase();
          const eventB = b.startdate.toLowerCase();

          if (eventA < eventB) return -1; // If event a comes before event b
          if (eventA > eventB) return 1; // If event a comes after event b
          return 0; // Same event dates
        });

        setInvitedEvents(sortedInvitedEvents);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchInvitedEvents();
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

  // Call API to remove an event
  async function removeEvent(eventId) {
    const APIUrl = `http://localhost:3001/api/events/${eventId}`;
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
        mb: "35px",
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
        <SearchBar
          onSearchChange={handleSearchChange}
          noMargin={true}
          placeholder="Search for events..."
        />
      </Box>

      {/* Tabs for switching between Hosted and Registered Events */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Event Tabs"
        variant="scrollable"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Hosted Events" />
        <Tab label="Registered Events" />
        <Tab label="Invitations" />
      </Tabs>

      {/* Hosted Events Section */}
      {selectedTab === 0 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Your Hosted Events
          </Typography>
          {searchedHostedEvents.length !== 0 ? (
            <>
              {searchedHostedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="hosted"
                  onRemoveButton={() => handleOpenRemoveConfirmation(event)} // Show confirmation popup
              />
              ))}
              {showRemoveConfirmation && (
              <Box
                sx={{
                  position: "fixed",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "white",
                  padding: 4,
                  borderRadius: 2,
                  boxShadow: 3,
                  zIndex: 1000,
                }}
              >
                <Typography variant="h6" sx={{ mb: 2 }}>
                  Are you sure you want to delete this event?
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" color="error" onClick={handleConfirmRemove}>
                    Yes
                  </Button>
                  <Button variant="outlined" onClick={handleCloseRemoveConfirmation}>
                    No
                  </Button>
                </Stack>
              </Box>
            )}

            {/* Background overlay */}
            {showRemoveConfirmation && (
              <Box
                sx={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100vw",
                  height: "100vh",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 999,
                }}
                onClick={handleCloseRemoveConfirmation}
              ></Box>
            )}

            </>
          ) : (
            <NoCreatedEvents />
          )}
        </>
      )}

      {/* Registered Events Section */}
      {selectedTab === 1 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Your Registered Events
          </Typography>
          {searchedRegisteredEvents.length !== 0 ? (
            <>
              {searchedRegisteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  variant="upcoming"
                  OnUnregisterButton={handleUnregisterButton}
                />
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
        </>
      )}

      {/* Invitations Section */}
      {selectedTab === 2 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Event Invitations
          </Typography>
          {searchedInvitedEvents.length !== 0 ? (
            <>
              {searchedInvitedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
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
