import * as React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
  Box, Stack, Button, useMediaQuery, Checkbox, TextField,
  Avatar
} from '@mui/material';
import { BottomNavigationAction } from "@mui/material";
import "./DesktopInviteGuests.css";
import "./MobileInviteGuests.css";
//import arrowIcon from '../../images/arrow button.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useState} from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];


export default function DesktopAddGuestsPage() {
  const onEditPage = location.pathname.includes("edit");
  console.log(onEditPage);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
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
            <IconButton edge="start" color="inherit" aria-label="back" sx={{ mr: 2 }}>
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
            Add New Guest
          </Typography>
          <BottomNavigationAction
                
            />
        </Toolbar>
      </AppBar>
    </Box>

    <Box component="form" sx={{ width: "85%", height: "100%", pt: 12, pb: 8 }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ height: "100%", padding: 2 }}
          >

          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%",
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "center", // Center vertically inside the stack
              alignItems: "center",    // Center horizontally inside the stack
               }}
          >
            <Avatar
          sx={{
            width: 200,
            height: 200,
            backgroundColor: '#FFB4B4',
            fontSize: 42,
            color: '#EC3E39',
            fontWeight: 'bold',    
          }}
        >
          Guest
        </Avatar>
      </Stack>

        
        {/* Camera Icon Overlay */}
        <IconButton
          sx={{
            position: 'fixed', // Use fixed positioning for the screen
            top: '22%',        // Center vertically
            left: '57%',       // Center horizontally
            backgroundColor: 'white',
            border: '1px solid #ccc',
          }}
          size="large"
        >
          <PhotoCameraIcon fontSize="small" />
        </IconButton>
            <Box sx={{ display: "flex", justifyContent: "left" }}>
              Name *
            </Box>

            <TextField fullWidth required id="event-title" label="Enter name" variant="outlined" sx={{ width: "100%" }} />

            <Box sx={{ display: "flex", justifyContent: "left" }}>
              E-mail *
            </Box>

            <TextField fullWidth required id="event-title" label="Enter e-mail address" variant="outlined" sx={{ width: "100%" }} />

            <Box sx={{ display: "flex", justifyContent: "left" }}>
              Phone
            </Box>

            <TextField fullWidth required id="event-title" label="Enter phone" variant="outlined" sx={{ width: "100%" }} />
            <Button variant='contained'
          sx={{
            borderRadius: '10px',
            backgroundColor: "#F68F8D",
            "&:hover": {
              backgroundColor: "#A50B07",
            }
          }}
        >
          Save Guest
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
            />
        </div>

        <h2 className = "your-friends-text">Your Friends</h2>

        
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
};
