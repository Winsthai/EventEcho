import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  useMediaQuery,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchBar from "../SearchBar";
import UserCard from "./Components/UserCard";
import NoFriendsCard from "./Components/NoFriendsCard";
import { useNavigate } from "react-router-dom";

import "./FriendsPage.css";

// Test data for now
const testUsers = [
  {
    id: 1,
    username: "Steven",
    registeredEvents: [],
    createdEvents: [],
    friends: [2, 3, 4, 5, 6],
    outgoingRequests: [6],
    incomingRequests: [5],
  },
  {
    id: 2,
    username: "Shaun Tapiau",
    registeredEvents: [],
    createdEvents: [],
    friends: [1, 3],
    outgoingRequests: [6],
    incomingRequests: [],
  },
  {
    id: 3,
    username: "Winston",
    registeredEvents: [],
    createdEvents: [],
    friends: [1, 2],
    outgoingRequests: [6],
    incomingRequests: [],
  },
  {
    id: 4,
    username: "Dummy",
    registeredEvents: [],
    createdEvents: [],
    friends: [],
    outgoingRequests: [6],
    incomingRequests: [],
  },
  {
    id: 5,
    username: "Add Me!!!",
    registeredEvents: [],
    createdEvents: [],
    friends: [],
    outgoingRequests: [1, 6],
    incomingRequests: [],
  },
  {
    id: 6,
    username: "Already sent request",
    registeredEvents: [],
    createdEvents: [],
    friends: [],
    outgoingRequests: [],
    incomingRequests: [1, 2, 3, 4, 5],
  },
];

const FriendsPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const currUser = testUsers.find((elem) => elem.id == id);
      setUser(currUser);
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  if (!user) {
    return <div>loading...</div>;
  }

  const addableUsers = testUsers.filter(
    (testUser) =>
      !user.friends.includes(testUser.id) && // Not already friends
      testUser.id !== user.id && // Not the user itself
      !user.outgoingRequests.includes(testUser.id) && // Not a user with an outgoing request
      !user.incomingRequests.includes(testUser.id) // Not a user with an incoming request
  );

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
          Hello {user.username}!
        </Typography>
        <Button
          id="FriendsPageButton"
          variant="contained"
          color="primary"
          sx={{
            textTransform: "none",
          }}
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/user/${id}`);
          }} // Probably change this later
        >
          Back to Profile
        </Button>
      </Box>

      {/* Search bar */}
      {(user.friends.length !== 0 && selectedTab == 0) || selectedTab == 1 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar noMargin={true} placeholder="Search for friends..." />
        </Box>
      ) : (
        // Display nothing otherwise
        <></>
      )}

      {/* Tabs for switching between Friends list and Add Friends */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Friends Tabs"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Friends List" />
        <Tab label="Find Friends" />
        <Tab label="Incoming Request" />
      </Tabs>

      {/* Friends List Section */}
      {selectedTab === 0 && (
        <>
          {/* Mobile view */}
          {isMobile ? (
            <>
              {user.friends.length !== 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Your Friends List
                  </Typography>

                  {user.friends.map((friendID) => {
                    const friend = testUsers.find(
                      (user) => user.id === friendID
                    );
                    return (
                      <UserCard
                        key={friend.id}
                        user={friend}
                        variant="remove"
                      />
                    );
                  })}
                </>
              ) : (
                <NoFriendsCard setSelectedTab={setSelectedTab} />
              )}
            </>
          ) : (
            // Desktop layout, wrap in box so we can put user cards side by side
            <>
              {user.friends.length !== 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Your Friends List
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap", // Allow wrapping to the next row
                      justifyContent: "flex-start", // Align items to the start
                      gap: 2, // Add spacing between cards
                    }}
                  >
                    {user.friends.map((friendID) => {
                      const friend = testUsers.find(
                        (user) => user.id === friendID
                      );
                      return (
                        <UserCard
                          key={friend.id}
                          user={friend}
                          variant="remove"
                        />
                      );
                    })}
                  </Box>
                </>
              ) : (
                <NoFriendsCard setSelectedTab={setSelectedTab} />
              )}
            </>
          )}
        </>
      )}

      {/* Find Friends Section */}
      {selectedTab === 1 && (
        <>
          {isMobile ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Add Other Users
              </Typography>
              {addableUsers.length !== 0 ? (
                <>
                  {addableUsers.map((addableUser) => (
                    <UserCard
                      key={addableUser.id}
                      user={addableUser}
                      variant="add"
                    />
                  ))}
                </>
              ) : (
                <Box>
                  <p>No other addable users exists.</p>
                </Box>
              )}
            </>
          ) : (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Add Other Users
              </Typography>
              {addableUsers.length !== 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  {addableUsers.map((addableUser) => (
                    <UserCard
                      key={addableUser.id}
                      user={addableUser}
                      variant="add"
                    />
                  ))}
                </Box>
              ) : (
                <Box>
                  <p>No other addable users exists.</p>
                </Box>
              )}
            </>
          )}
        </>
      )}

      {/* Incoming Requests Section */}
      {selectedTab === 2 && (
        <>
          {isMobile ? (
            <>
              {user.incomingRequests.length !== 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Current Requests
                  </Typography>
                  {user.incomingRequests.map((incomingID) => {
                    const acceptableFriend = testUsers.find(
                      (user) => user.id === incomingID
                    );
                    return (
                      <UserCard
                        key={acceptableFriend.id}
                        user={acceptableFriend}
                        variant="accept"
                      />
                    );
                  })}
                </>
              ) : (
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  No Requests Currently
                </Typography>
              )}
            </>
          ) : (
            <>
              {user.incomingRequests.length !== 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Current Requests
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "flex-start",
                      gap: 2,
                    }}
                  >
                    {user.incomingRequests.map((incomingID) => {
                      const acceptableFriend = testUsers.find(
                        (user) => user.id === incomingID
                      );
                      return (
                        <UserCard
                          key={acceptableFriend.id}
                          user={acceptableFriend}
                          variant="accept"
                        />
                      );
                    })}
                  </Box>
                </>
              ) : (
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                  No Requests Currently
                </Typography>
              )}
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default FriendsPage;
