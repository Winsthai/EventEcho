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
  Icon,
  Card, CardContent, Container
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

export default function DesktopAddGuestsPage({ invitedGuests, setInvitedGuests, nonUserGuests }) {
  const location = useLocation();
  const onEditPage = location.pathname.includes("edit");
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(nonUserGuests);

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSelect = (id) => {
    if (onEditPage) {
      if (!invitedUsers.find(user => user.id === id) && !registeredUsers.find(user => user.id === id)) {
        setInvitedGuests((prev) =>
          prev.includes(id)
            ? prev.filter((contactId) => contactId !== id)
            : [...prev, id]
        );
        console.log("new guest checked: ", invitedGuests);
      }
      else {
        console.log("this guest already invited previously or already registered");
      }
    }
    else {
      setInvitedGuests((prev) =>
        prev.includes(id)
          ? prev.filter((contactId) => contactId !== id)
          : [...prev, id]
      );
      console.log("new guest checked: ", invitedGuests);
    }

  };

  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [invitedUsers, setInvitedUsers] = useState([]);

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


      return data.users;

    } catch (error) {
      console.log(error);
    }
  };

  // retrieve registered users on render
  useEffect(() => {
    if (onEditPage) {
      const fetchRegisteredUsers = async () => {
        try {
          const myRegisteredUsers = await getRegisteredUsers();
          setRegisteredUsers(myRegisteredUsers);
          console.log("hello registered users ", myRegisteredUsers);

        } catch (error) {
          console.log("cooked (register)");
        }
      };
      fetchRegisteredUsers();
    }

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
    if (onEditPage) {
      const fetchInvitedUsers = async () => {
        try {
          const myInvitedUsers = await getInvitedUsers();
          setInvitedUsers(myInvitedUsers);
          console.log("hello invited users ", myInvitedUsers);

          if (myInvitedUsers) {
            setInvitedGuests(() => {
              let guestlist = [];
              for (const user of myInvitedUsers) {
                guestlist.push(user.id);
              }
              return guestlist;
            });
          }


        } catch (error) {
          console.log("cooked (invite)");
        }
      };
      fetchInvitedUsers();
    }

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

  function displayUsers(id) {
    if (onEditPage) {
      if (invitedUsers.find(user => user.id === id) || registeredUsers.find(user => user.id === id)) {
        return true; // user already attending or invited
      }
    }
    return false; // user can be invited
  };

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
          <Toolbar sx={{ color: "secondary" }}>
            <Typography variant="h6" component="div"
              sx={{
                flexGrow: 1,
                textAlign: 'center',
                position: 'absolute',
                left: 0,
                right: 0,
                margin: 'auto'
              }}>
              Invite Guests
            </Typography>

            <IconButton
              onClick={onEditPage ?
                () => navigate(`/editEvent/${id}/`) :
                () => navigate("/createEvent")
              }
              edge="start"
              color="inherit"
              aria-label="back"
              sx={{ mr: 2 }}
            >
              <ArrowBackIcon />
            </IconButton>
            <Box sx={{ flexGrow: 1 }}>
            </Box>

          </Toolbar>
        </AppBar>
      </Box>

      {/* Forms */}
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: "90%",
          height: "100%",
          pt: 12,
          pb: 8
        }}
      >
        {/* <Stack
          direction="column"
          spacing={4}
          sx={{ height: "100%", padding: 2 }}
        > */}

        <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
          <div className="mobile-container">
            {/* ---------- Search Bar ---------- */}
            <TextField
              variant="outlined"
              placeholder="Search friends..."
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
            {/* ---------- Check if have friends ---------- */}
            {friendsList.length === 0 ?
              (<Box sx={{ pt: 2, display: "flex", justifyContent: "center", flexDirection: "column" }}>
                {/* ---------- No Friends Card ---------- */}
                <Card
                  sx={{
                    backgroundColor: "#ffecec",
                    borderRadius: 2,
                    mt: 2,
                    mb: 4,
                    padding: 0,
                  }}
                >
                  <CardContent>
                    <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
                      Go add some friends to invite to your event!
                    </Typography>
                    <Button
                      variant="contained"
                      color="darkSecondary"
                      onClick={() => navigate("/user/friends")}
                      sx={{
                        borderRadius: 3,
                        padding: "8px 16px",
                        textTransform: "none",
                        width: "50vw",
                        maxWidth: "220px",
                        fontSize: "inherit",
                      }}
                    >
                      Find Friends
                    </Button>
                  </CardContent>
                </Card>
              </Box>
              ) : (
                // ---------- friends list -----------
                <ul className="mobile-contactList">
                  {friendsList.map((contact) => (
                    <li
                      key={contact.id}
                      className="mobile-contactItem"
                      onClick={() => handleSelect(contact.id)}
                    >
                      {/* -------- Mobile Avatar -------- */}
                      <div className="mobile-contactInfo">
                        <div className="mobile-avatar">
                          {contact.firstname[0].toUpperCase()}
                          {contact.lastname[0].toUpperCase()}
                        </div>
                        {/* -------- Name and Email -------- */}
                        <div>
                          <p className="mobile-name">{contact.firstname.concat(" ", contact.lastname)}</p>
                          <p className="mobile-phone">{contact.email}</p>
                        </div>
                      </div>
                      {displayUsers(contact.id) ?
                        (
                          // -------- Users already checked off --------
                          <Checkbox
                            checked={displayUsers(contact.id)}
                            disabled={true}
                            inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                            icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                            checkedIcon={<CheckCircleIcon />} // Circular checked icon
                          />
                        ) :
                        // -------- Can check users off --------
                        <Checkbox
                          checked={invitedGuests.includes(contact.id)}
                          inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                          icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                          checkedIcon={<CheckCircleIcon />} // Circular checked icon
                        />}
                    </li>
                  ))}
                </ul>
              )
            }
          </div>
        </Box>

        <Box sx={{ mt: 'auto', padding: 2 }}>
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
        {/* </Stack> */}
      </Container>
    </Box>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="desktop-container">
      <div className="desktop-content">
        <div className="desktop-search-and-add">
          <TextField
            variant="outlined"
            placeholder="Search friends..."
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
              {displayUsers(contact.id) ?
                (
                  // -------- Users already checked off --------
                  <Checkbox
                    checked={displayUsers(contact.id)}
                    disabled={true}
                    inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                    icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                    checkedIcon={<CheckCircleIcon />} // Circular checked icon
                  />
                ) :
                // -------- Can check users off --------
                <Checkbox
                  checked={invitedGuests.includes(contact.id)}
                  inputProps={{ "aria-label": `Select ${contact.firstname}` }}
                  icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                  checkedIcon={<CheckCircleIcon />} // Circular checked icon
                />}
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

}
