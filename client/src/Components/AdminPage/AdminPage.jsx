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
  const [bannedUsers, setBannedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [buttonSwitch, setButtonSwitch] = useState(0); // Switch for updating events and users
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedEventToRemove, setSelectedEventToRemove] = useState(null);
  const [showBanConfirmation, setShowBanConfirmation] = useState(false);
  const [selectedUserToBan, setSelectedUserToBan] = useState(null);

  // Function to open the ban confirmation popup
const handleOpenBanConfirmation = (user) => {
  setSelectedUserToBan(user);
  setShowBanConfirmation(true);
};

// Function to close the ban confirmation popup
const handleCloseBanConfirmation = () => {
  setSelectedUserToBan(null);
  setShowBanConfirmation(false);
};

// Function to confirm the ban
const handleConfirmBan = async () => {
  if (selectedUserToBan) {
    await handleBanButton(selectedUserToBan.id); // Proceed with banning the user
  }
  handleCloseBanConfirmation(); // Close the confirmation popup
};

// Function to open the confirmation popup
const handleOpenConfirmation = (event) => {
  setSelectedEventToRemove(event);
  setShowConfirmation(true);
};

// Function to close the confirmation popup
const handleCloseConfirmation = () => {
  setSelectedEventToRemove(null);
  setShowConfirmation(false);
};

// Function to confirm the removal
const handleConfirmRemove = async () => {
  if (selectedEventToRemove) {
    await handleRemoveButton(selectedEventToRemove.id); // Proceed with removal
  }
  handleCloseConfirmation(); // Close the confirmation popup
};

  const authToken = localStorage.getItem("authToken");

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

  // Ban button
  const handleBanButton = async (userId) => {
    try {
      await banUser(userId);
      setButtonSwitch((buttonSwitch) => {
        return buttonSwitch + 1;
      });
    } catch (e) {
      setError(e.message);
    }
  };

  // Unban button
  const handleUnbanButton = async (userId) => {
    try {
      await unbanUser(userId);
      setButtonSwitch((buttonSwitch) => {
        return buttonSwitch + 1;
      });
    } catch (e) {
      setError(e.message);
    }
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

  // Fetch events on startup, then update events each time one of the states change
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setError(null);

        const result = await queryEvents("", searchQuery, pageNum);

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
  }, [searchQuery, pageNum, selectedTab, buttonSwitch]); // Call this useEffect each time one of these states change.

  // Query users from the API
  async function queryUsers(search = "") {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/admin/bannedUsers?search=${search}&banned=false`;

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

  // Fetch users on startup, then update users on state changes.
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setError(null);

        const result = await queryUsers(searchQuery);
        setUsers(result.users);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchUsers();
  }, [searchQuery, buttonSwitch, selectedTab]); // Call this useEffect each time one of these states change.

  // Query banned users from the API
  async function queryBannedUsers(search = "") {
    // Generate API Url
    const APIUrl = `http://localhost:3001/api/admin/bannedUsers?search=${search}`;

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

  // Fetch banned users on startup, then update banned users on state change
  useEffect(() => {
    const fetchBannedUsers = async () => {
      try {
        setError(null);

        const result = await queryBannedUsers(searchQuery);
        setBannedUsers(result.users);
      } catch (e) {
        setError(e.message);
      }
    };

    fetchBannedUsers();
  }, [searchQuery, buttonSwitch, selectedTab]); // Call this useEffect each time one of these states change.

  // Call API to remove an event
  async function removeEvent(eventId) {
    const APIUrl = `http://localhost:3001/api/events/${eventId}`;
    
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

  // Call API to ban a user
  async function banUser(userId) {
    const APIUrl = `http://localhost:3001/api/admin/banUser/${userId}`;
    
    try {
      // Fetch and store results from API URL
      const response = await fetch(APIUrl, {
        method: "PATCH",
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

  // Call API to unban a user
  async function unbanUser(userId) {
    const APIUrl = `http://localhost:3001/api/admin/unbanUser/${userId}`;
    
    try {
      // Fetch and store results from API URL
      const response = await fetch(APIUrl, {
        method: "PATCH",
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

      {selectedTab == 2 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar
            onSearchChange={handleSearchChange}
            noMargin={true}
            placeholder="Search for banned users..."
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
        <Tab label="Banned Users" />
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
                <EventCard
                  key={event.id}
                  event={event}
                  variant="admin"
                  onRemoveButton={() => handleOpenConfirmation(event)} // Open confirmation popup
              />
            ))}

            {/* Confirmation Popup */}
            {showConfirmation && (
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
                  Are you sure you want to remove this event?
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleConfirmRemove}
                  >
                    Yes
                  </Button>
                  <Button variant="outlined" onClick={handleCloseConfirmation}>
                    No
                  </Button>
                </Stack>
              </Box>
            )}
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
                <UserCard
                  key={user.id}
                  user={user}
                  onBanButton={() => handleOpenBanConfirmation(user)}
              />
            ))}
          </>
              ) : (
                <NoUsers />
              )}
            </>
          )}

          {/* Ban Confirmation Popup */}
          {showBanConfirmation && (
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
                Are you sure you want to ban this user?
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmBan}
                >
                  Yes
                </Button>
                <Button variant="outlined" onClick={handleCloseBanConfirmation}>
                  No
                </Button>
              </Stack>
            </Box>
          )}

      {/* Banned Users Section*/}
      {selectedTab === 2 && (
        <>
          {bannedUsers.length !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Banned Users
              </Typography>
              {bannedUsers.map((user) => (
                <UserCard
                  variant="banned"
                  key={user.id}
                  user={user}
                  onUnbanButton={handleUnbanButton}
                />
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
