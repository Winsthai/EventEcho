import * as React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
  FormControl, FormGroup, FormControlLabel, InputLabel,
  Select, MenuItem, InputAdornment, Switch,
  Box, TextField, Stack, Button, useMediaQuery, Checkbox
} from '@mui/material';
import { BottomNavigationAction } from "@mui/material";
import "./DesktopInviteGuests.css";
import "./MobileInviteGuests.css";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useParams, useNavigate } from 'react-router-dom';

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];


export default function DesktopAddGuestsPage() {
  const onEditPage = location.pathname.includes("edit");
  const navigate = useNavigate();
  // const [eventType, setEventType] = React.useState('');
  // const [eventPhotoName, setEventPhotoName] = React.useState('');

  const [selectedContacts, setSelectedContacts] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  // const handleChange = (event) => {
  //   setEventType(event.target.value);
  // };

  // const handleFileChange = (event) => {
  //   if (event.target.files && event.target.files.length > 0) {
  //     setEventPhotoName(event.target.files[0].name);
  //   }
  // }

  const handleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const handleReview = () => {
    alert(`Selected contacts: ${selectedContacts.join(", ")}`);
  };

  // Mobile Layout
  const MobileLayout = () => (
    // Page Container
    <Box component="section"
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        overflowY: "auto"
      }}
    >
      {/* Top App Bar */}
      <Box component="section"
        sx={{
          width: "100%",
          height: "5%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1000
        }}
      >
        <AppBar position="static">
          <Toolbar sx={{ color: "secondary" }}>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <IconButton
                onClick={() => navigate('/createEvent')}
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
            <BottomNavigationAction
              icon={<PersonAddIcon sx={{ color: "white" }} />}
              className="add-icon"
              onClick={() => navigate('/createEvent/newGuests')}
            />
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
          <div className="mobile-container">
            <input
              type="text"
              placeholder="  🔍  Search contacts"
              className="mobile-searchInput"
            />
            <ul className="mobile-contactList">
              {contacts.map((contact) => (
                <li key={contact.id} className="mobile-contactItem">
                  <div className="mobile-contactInfo">
                    <div className="mobile-avatar">{contact.name[0]}</div>
                    <div>
                      <p className="mobile-name">{contact.name}</p>
                      <p className="mobile-phone">{contact.phone}</p>
                    </div>
                  </div>
                  <Checkbox
                    checked={selectedContacts.includes(contact.id)}
                    onChange={() => handleSelect(contact.id)}
                    inputProps={{ 'aria-label': `Select ${contact.name}` }}
                    icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                    checkedIcon={<CheckCircleIcon />}   // Circular checked icon
                  />
                </li>
              ))}
            </ul>
          </div>

          <Button variant='contained'
            onClick={() => navigate('/createEvent/reviewEvent')}
            sx={{
              borderRadius: '10px',
              backgroundColor: "#F68F8D",
              "&:hover": {
                backgroundColor: "#A50B07",
              }
            }}
          >
            Review Event Details
          </Button>
        </Stack>
      </Box>
    </Box>
  );


  // Desktop Layout
  const DesktopLayout = () => (
    <div className="desktop-container">
      <div className="desktop-content">
        <div className="desktop-search-and-add">
          <input
            type="text"
            placeholder="   Search Contacts"
            className="search-input"
          />
          <BottomNavigationAction
            icon={<PersonAddIcon />}
            className="add-icon"
            onClick={() => navigate('/createEvent/newGuests')}
          />
        </div>

        <h2 className="your-friends-text">Your Friends</h2>


        <div className="desktop-contactGrid">
          {contacts.map((contact) => (
            <div key={contact.id} className="desktop-contactCard">
              <Checkbox
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleSelect(contact.id)}
                inputProps={{ 'aria-label': `Select ${contact.name}` }}
                icon={<RadioButtonUncheckedIcon />} // Circular unchecked icon
                checkedIcon={<CheckCircleIcon />}   // Circular checked icon
              />
              <div className="desktop-avatar">{contact.name[0]}</div>
              <div>
                <p className="desktop-name">{contact.name}</p>
                <p className="desktop-phone">{contact.phone}</p>
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
            onClick={() => navigate('/createEvent/reviewEvent')} // should also complete the 2nd step in DesktopProgressBar
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
      {onEditPage ? <div>hello edit guest list page (edit)</div> : <div>hello add guest list page (create)</div>}
    </Box>

  );
};
