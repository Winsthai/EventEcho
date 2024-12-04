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

const FriendsPage = () => {
  const [currentUser, setCurrentUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [addableUsers, setAddableUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState("");
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab
  const [searchQuery, setSearchQuery] = useState("");

  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();

  // Get session token from local storage, might need to change?
  const authToken = localStorage.getItem("authToken");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query); // Update search query
  };

  const searchedFriends = friends.filter((friend) =>
    friend.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchedAddableUsers = addableUsers.filter((addableUser) =>
    addableUser.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchedIncomingRequests = incomingRequests.filter((incomingRequest) =>
    incomingRequest.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  async function queryCurrentUser() {
    const APIUrl = `http://localhost:3001/api/users/me`;
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
    }catch (e) {
      setError(e.message);
    }
  }

  async function queryFriends() {
    const APIUrl = `http://localhost:3001/api/users/friends`;
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

      return data.users;
    }catch (e) {
      setError(e.message);
    }
  }

  async function queryIncomingRequests() {
    const APIUrl = `http://localhost:3001/api/users/incomingFriendRequests`;
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

      return data.users;
    }catch (e) {
      setError(e.message);
    }
  }

  async function queryOutgoingRequests() {
    const APIUrl = `http://localhost:3001/api/users/outgoingFriendRequests`;
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

      return data.users;
    }catch (e) {
      setError(e.message);
    }
  }

  async function queryAllUsers() {
    const APIUrl = `http://localhost:3001/api/users/allUsers`;
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

      return data.users;
    }catch (e) {
      setError(e.message);
    }
  }

  // function to get a user, so we can properly update friends list with the correct information.
  const getUser = (userID) => {
    const user = allUsers.find(user => user.id === userID);
    if (!user) {
      throw new Error("User not found");
    }
    return user; // Return the user data
  };


  // useEffect to get friends, incomingFR, outgoingFR, all users, (also determines addable users).
  useEffect(() => {
    if (authToken) {
      const fetchAll = async () => {
        try {
          setError(null);
  
          const [fetchedFriends, fetchedIncomingRequests, fetchedOutgoingRequests, fetchedAllUsers, fetchedCurrentUser] =
          await Promise.all([
            queryFriends(),
            queryIncomingRequests(),
            queryOutgoingRequests(),
            queryAllUsers(),
            queryCurrentUser(),
          ]);

          setFriends(fetchedFriends);
          setIncomingRequests(fetchedIncomingRequests);
          setOutgoingRequests(fetchedOutgoingRequests);
          setAllUsers(fetchedAllUsers); // used for the get user function
          setCurrentUser(fetchedCurrentUser);

          const addable = fetchedAllUsers.filter(
            (user) =>
              user.id !== currentUser.id &&
              !fetchedFriends.find((friend) => friend.id === user.id) &&
              !fetchedIncomingRequests.find((req) => req.id === user.id) &&
              !fetchedOutgoingRequests.find((req) => req.id === user.id)
          );
  
          setAddableUsers(addable);
        } catch (e) {
          setError(e.message);
        }
      };
  
      fetchAll();
      } else {
       //Go to login screen if no token
      navigate("/login");
    }
  }, [authToken, selectedTab, searchQuery, friends]);
  // Might need to change. didnt have friends/incomReq/outReq before. ^^^^^

  // Remove Friend
  const handleRemoveFriend = async (friendId) => {
    const APIUrl = `http://localhost:3001/api/users/friend/${friendId}`;
    try {
      const response = await fetch(APIUrl, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = await response.json();

      if(!response.ok) {
        throw new Error(data.error || "Failed to remove friend.")
      }

      // Update friends list
      setFriends((prev) => prev.filter((friend) => friend.id !== friendId));
    } catch (e) {
      setError(e.message);
    }
  };

  // Send a friend request
  const handleSendRequest = async (recipientId) => {
    // recipientId is the person who is receiving the friend request from us
    const senderId = currentUser.id // us
    const APIUrl = `http://localhost:3001/api/users/outgoingFriendRequests/${senderId}`; // url contains the ID of the person SENDING, which is us
    try {
      const response = await fetch(APIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ incomingRequestId: recipientId }), // "person who friend request is being sent to" I interpret this as the recipient
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to send friend request.");
      }
  
      // Update outgoing requests + addable users
      setOutgoingRequests((prev) => [...prev, { id: recipientId }]);
      setAddableUsers((prev) => prev.filter((user) => user.id !== recipientId));
    } catch (e) {
      setError(e.message);
    }
  };

  // Accept a friend request
  const handleAcceptRequest = async (senderID) => {
    const recipientId = currentUser.id // us, the user, are receiving the friend requests
    const APIUrl = `http://localhost:3001/api/users/incomingFriendRequests/${recipientId}`; // we go to recipientId, because that is us
    try {
      const response = await fetch(APIUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ 
          outgoingRequestId: senderID 
        }), // by definition, we put senderID into the body
      });

      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to accept friend request.");
      }

      const userData = getUser(senderID);
  
      // Update incoming requests and friends
      setIncomingRequests((prev) => prev.filter((req) => req.id !== senderID));
      setFriends((prev) => [...prev, userData]);
    } catch (e) {
      setError(e.message);
    }
  };

  if (!authToken) {
    return <div>loading...</div>;
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
          Hello {currentUser.username}!
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
            navigate(`/user`);
          }} // Probably change this later
        >
          Back to Profile
        </Button>
      </Box>

      {/* Search bar */}
      {(friends.length > 0 && selectedTab == 0) || 
      (addableUsers > 0 && selectedTab == 1) || 
      (incomingRequests > 0 && selectedTab == 2) ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar noMargin={true} onSearchChange={handleSearchChange} placeholder="Search for friends..." />
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
              {searchedFriends.length > 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Your Friends List
                  </Typography>

                  {searchedFriends.map((friend) => {
                    return (
                      <UserCard
                        key={friend.id}
                        user={friend}
                        variant="remove"
                        onAction={() => handleRemoveFriend(friend.id)}
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
              {searchedFriends.length > 0 ? (
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
                    {searchedFriends.map((friend) => {
                      return (
                        <UserCard
                          key={friend.id}
                          user={friend}
                          variant="remove"
                          onAction={() => handleRemoveFriend(friend.id)}
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
              {searchedAddableUsers.length > 0 ? (
                <>
                  {searchedAddableUsers.map((addableUser) => (
                    <UserCard
                      key={addableUser.id}
                      user={addableUser}
                      variant="add"
                      onAction={() => handleSendRequest(addableUser.id)}
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
              {searchedAddableUsers.length > 0 ? (
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    gap: 2,
                  }}
                >
                  {searchedAddableUsers.map((addableUser) => (
                    <UserCard
                      key={addableUser.id}
                      user={addableUser}
                      variant="add"
                      onAction={() => handleSendRequest(addableUser.id)}
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
              {searchedIncomingRequests.length > 0 ? (
                <>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Current Requests
                  </Typography>
                  {searchedIncomingRequests.map((acceptableFriend) => {
                    return (
                      <UserCard
                        key={acceptableFriend.id}
                        user={acceptableFriend}
                        variant="accept"
                        onAction={() => handleAcceptRequest(acceptableFriend.id)}
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
              {searchedIncomingRequests.length > 0 ? (
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
                    {searchedIncomingRequests.map((acceptableFriend) => {
                      return (
                        <UserCard
                          key={acceptableFriend.id}
                          user={acceptableFriend}
                          variant="accept"
                          onAction={() => handleAcceptRequest(acceptableFriend.id)}
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
