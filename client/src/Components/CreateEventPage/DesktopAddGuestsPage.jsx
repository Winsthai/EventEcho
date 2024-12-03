import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputAdornment,
  Box,
  TextField,
  Stack,
  Button,
  useMediaQuery,
  Checkbox,
} from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import "./DesktopInviteGuests.css";
import "./MobileInviteGuests.css";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useParams, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation } from "react-router-dom";

export default function DesktopAddGuestsPage({ invitedGuests, setInvitedGuests }) {
  const location = useLocation();
  const onEditPage = location.pathname.includes("edit");
  const { id } = useParams();
  const navigate = useNavigate();

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSelect = (id) => {
    setInvitedGuests((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
    console.log(invitedGuests);
  };


  // get registered users (checking)
  async function getRegisteredUsers() {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}/attendingUsers`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.authToken}` }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "wonder where they are...");
      }

      return data;

    } catch (error) {
      console.log(error);
    }
  };

  // retrieve registered users on render
  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        const myRegisteredUsers = await getRegisteredUsers();
        console.log("hello registered users ", myRegisteredUsers);
      } catch (error) {
        console.log("cooked (register)");
      }
    };
    fetchRegisteredUsers();
  }, []);

  // retrieves list of invited users 
  async function getInvitedUsers() {
    try {
      const response = await fetch(`http://localhost:3001/api/events/${id}/invitedUsers`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.authToken}` }
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "wonder where they are...");
      }

      return data;

    } catch (error) {
      console.log(error);
    }
  };

  // retrieve invited users on render
  useEffect(() => {
    const fetchInvitedUsers = async () => {
      try {
        const myInvitedUsers = await getInvitedUsers();
        console.log("hello invited users ", myInvitedUsers);
      } catch (error) {
        console.log("cooked (invite)");
      }
    };
    fetchInvitedUsers();
  }, []);

  // ------------- FRIENDS LIST -------------
  const [friendsList, setFriendsList] = useState([]);

  // retrieve friends
  async function fetchFriends() {
    try {
      const response = await fetch(`http://localhost:3001/api/users/friends`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${localStorage.authToken}` }
      }
      );
      const data = await response.json();
      //console.log("your friends:", data);

      if (!response.ok) {
        throw new Error(data.error || "where yo friends at boy");
      }
      return data.users;

    } catch (error) {
      console.log(error);
    }
  };

  // retrieve friends list from the db on render
  useEffect(() => {
    const fetchMyFriends = async () => {
      try {
        const myFriends = await fetchFriends();
        setFriendsList(myFriends);
        console.log("hello friends ", myFriends);
      } catch (error) {
        console.log("cooked");
      }
    };
    fetchMyFriends();
  }, []);

  // Mobile Layout
  const MobileLayout = () => (
    // Page Container
    <Box
      component="section"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflowY: "auto",
      }}
    >
      {/* Top App Bar */}
      <Box
        component="section"
        sx={{
          width: "100%",
          height: "5%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000,
        }}
      >
        <AppBar position="static">
          <Toolbar
            sx={{
              color: "secondary",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <IconButton
                onClick={
                  onEditPage
                    ? () => navigate(`/editEvent/${id}/`)
                    : () => navigate("/createEvent")
                }
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
              Invite Guests
            </Typography>
            <Box>
              <IconButton
                onClick={
                  onEditPage
                    ? () => navigate(`/editEvent/${id}/newGuests`)
                    : () => navigate("/createEvent/newGuests")
                }
                edge="start"
                color="inherit"
                aria-label="back"
                sx={{ mr: 2 }}
              >
                <PersonAddIcon sx={{ color: "white" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Forms */}
      <Box component="form" sx={{ width: "85%", height: "100%", pt: 8, pb: 8 }}>
        <Stack
          direction="column"
          spacing={2}
          sx={{ height: "100%", padding: 2 }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <div className="mobile-container">
              <TextField
                variant="outlined"
                placeholder="Search contacts..."
                size="small"
                sx={{
                  flexGrow: 1, // Ensures the search bar takes available space
                  marginLeft: 0,
                  marginRight: 0,
                  minWidth: "150px",
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: "24px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "24px",
                    "&:hover": {
                      borderColor: "black",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <ul className="mobile-contactList">
                {friendsList.map((contact) => (
                  <li
                    key={contact.id}
                    className="mobile-contactItem"
                    onClick={() => handleSelect(contact.id)}
                  >
                    <div className="mobile-contactInfo">
                      <div className="mobile-avatar">
                        {contact.firstname[0].toUpperCase()}
                        {contact.lastname[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="mobile-name">{contact.firstname.concat(" ", contact.lastname)}</p>
                        <p className="mobile-phone">{contact.email}</p>
                      </div>
                    </div>
                    <Checkbox
                      checked={invitedGuests.includes(contact.id)}
                      inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                      icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                      checkedIcon={<CheckCircleIcon />} // Circular checked icon
                    />
                  </li>
                ))}
              </ul>
            </div>
          </Box>

          <Box sx={{ position: 'relative', bottom: 0, width: '100%', mb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={
                onEditPage
                  ? () => navigate(`/editEvent/${id}/reviewEvent`)
                  : () => navigate("/createEvent/reviewEvent")
              }
              sx={{
                borderRadius: "10px",
                backgroundColor: "#F68F8D",
                "&:hover": {
                  backgroundColor: "#A50B07",
                },
              }}
            >
              Review Event Details
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="desktop-container">
      <div className="desktop-content">
        <div className="desktop-search-and-add">
          <TextField
            variant="outlined"
            placeholder="Search contacts..."
            size="small"
            //onChange={(event) => onSearchChange(event.target.value)}
            sx={{
              flexGrow: 1, // Ensures the search bar takes available space
              marginLeft: 0,
              marginRight: 0,
              minWidth: "150px",
              width: "100%",
              backgroundColor: "white",
              borderRadius: "24px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "24px",
                "&:hover": {
                  borderColor: "black",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "black",
                },
              },
            }}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          <BottomNavigationAction
            icon={<PersonAddIcon />}
            className="add-icon"
            onClick={
              onEditPage
                ? () => navigate(`/editEvent/${id}/newGuests`)
                : () => navigate("/createEvent/newGuests")
            }
          />
        </div>

        <h2 className="your-friends-text">Your Friends</h2>
        {/* {message && <p>{message}</p>} */}

        <div className="desktop-contactGrid">
          {friendsList.map((contact) => (
            <div
              key={contact.id}
              className="desktop-contactCard"
              onClick={() => handleSelect(contact.id)}
            >
              <Checkbox
                checked={invitedGuests.includes(contact.id)}
                inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                checkedIcon={<CheckCircleIcon />} // Circular checked icon
              />
              <div className="desktop-avatar">
                {contact.firstname[0].toUpperCase()}
                {contact.lastname[0].toUpperCase()}
              </div>
              <div>
                <p className="desktop-name">{contact.firstname.concat(" ", contact.lastname)}</p>
                <p className="desktop-phone">{contact.email}</p>
              </div>
            </div>
          ))}
        </div>

        <Box
          sx={{
            display: "flex", // enables flexbox for centering
            justifyContent: "center", // horizontally centers the button
            alignItems: "center", // vertically centers the button
            pl: 10, // optional padding on the left, remove or adjust as needed
            pt: 20,
          }}
        >
          <Button
            variant="contained"
            onClick={
              onEditPage
                ? () => navigate(`/editEvent/${id}/reviewEvent`)
                : () => navigate("/createEvent/reviewEvent")
            } // should also complete the 2nd step in DesktopProgressBar
            sx={{
              borderRadius: "10px",
              width: "25%", // button width
              padding: "1rem", // button height
              backgroundColor: "#F68F8D",
              "&:hover": {
                backgroundColor: "#A50B07",
              },
            }}
          >
            Review Event Details
          </Button>
        </Box>
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;

  return (
    <Box sx={{ margin: 10, zIndex: 2 }}>
      {/* add code here */}

      {/* can ignore this below for now I think */}
      {onEditPage ? (
        <div>hello edit guest list page (edit)</div>
      ) : (
        <div>hello add guest list page (create)</div>
      )}
    </Box>
  );
}
