import * as React from 'react';
import {
  AppBar, Toolbar, IconButton, Typography,
  Box, Stack, Button, useMediaQuery, TextField,
  Avatar
} from '@mui/material';
import { BottomNavigationAction } from "@mui/material";
import "./DesktopInviteGuests.css";
import "./MobileInviteGuests.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useParams, useNavigate } from 'react-router-dom';

export default function AddNewGuestsPage({ nonUserGuests, setNonUserGuests }) {
  const onEditPage = location.pathname.includes("edit");
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");

  const [tempGuest, setTempGuest] = React.useState({
    name: '',
    email: '',
    phone: ''
  });

  const [requiredFieldsErrors, setRequiredFieldErrors] = React.useState({
    name: false,
    email: false,
    phone: false
  });

  // update details in tempGuest
  const updateDetails = (event) => {
    const { name, value } = event.target;
    setTempGuest({ ...tempGuest, [name]: value });
    console.log(tempGuest);
  }

  const checkFields = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{1,3}\d{10}$/;
    const validEmail = emailRegex.test(tempGuest.email);
    const validPhone = phoneRegex.test(tempGuest.phone);
    console.log(validEmail);
    console.log(validPhone);

    if (!validEmail && !validPhone) {
      console.log("invalid phone and email");
      setTempGuest({ ...tempGuest, email: '', phone: '' });
    }
    else if (!validEmail) {
      console.log("invalid email");
      setTempGuest({ ...tempGuest, email: '' });
    }
    else if (!validPhone) {
      console.log("invalid phone");
      setTempGuest({ ...tempGuest, phone: '' });
    }

    const newErrors = {
      name: !tempGuest.name,
      email: !tempGuest.email && tempGuest.email !== '',
      phone: !tempGuest.phone && tempGuest.phone !== ''
    };
    setRequiredFieldErrors(newErrors);

    return Object.values(newErrors).includes(true) || !validEmail || !validPhone;
  }

  // check fields first before adding to nonUserGuests
  const handleSave = (url) => {
    if (checkFields()) {
      alert("Some fields are missing or incorrect.");
    }
    else {
      console.log(tempGuest);
      setNonUserGuests({ ...nonUserGuests, tempGuest });
      console.log("good to go!");
      navigate(url);
    }
  };

  // Mobile Layout
  if (isMobile) {
    return (
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
                  onClick={onEditPage ?
                    () => navigate(`/editEvent/${id}/changeGuests`) :
                    () => navigate('/createEvent/addGuests')
                  } // should NOT save the guest and go back
                  edge="start"
                  color="inherit"
                  aria-label="back"
                  sx={{ mr: 2 }}
                >
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

        <Box component="form" sx={{ width: "85%", height: "100%", pt: 8, pb: 8 }}>
          <Stack direction="column" spacing={4}
            sx={{ height: "100%" }}
          >

            <Stack direction="column"
              sx={{
                width: "100%",
                height: "100%",
                pt: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ width: 250, height: 250, backgroundColor: '#F1F1F1' }}>
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
              </Avatar>
            </Stack>

            {/* Name */}
            <TextField fullWidth required variant="outlined"
              label="Enter name"
              name="name"
              value={tempGuest.name}
              onChange={updateDetails}
              sx={{ width: "100%" }}
              error={requiredFieldsErrors.name}
            />

            {/* Email */}
            <TextField fullWidth required variant="outlined"
              label="Enter e-mail address"
              name="email"
              value={tempGuest.email}
              onChange={updateDetails}
              sx={{ width: "100%" }}
              error={requiredFieldsErrors.email}
            />

            {/* Phone */}
            <TextField fullWidth required variant="outlined"
              label="Enter phone"
              name="phone"
              value={tempGuest.phone}
              onChange={updateDetails}
              sx={{ width: "100%" }}
              error={requiredFieldsErrors.phone}
            />

            <Button variant='contained'
              onClick={onEditPage ?
                () => handleSave(`/editEvent/${id}/changeGuests`) :
                () => handleSave('/createEvent/addGuests')
              } // should SAVE then return to add guests
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
  }

  // Desktop Layout
  else {
    return (
      <Box component="form" sx={{
        width: "100%",
        height: "100%",
        pt: 2,
        pb: 4,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Stack
          direction="column"
          spacing={4}
          sx={{ width: "40%", height: "100%" }}
        >

          <Stack
            direction="column"
            sx={{
              width: "100%",
              height: "100%",
              pt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography variant="h5" component="div" sx={{ flexGrow: 0 }}>
              Add New Guest
            </Typography>
            <Avatar sx={{ width: 200, height: 200, backgroundColor: '#F1F1F1' }}>
              <Avatar
                sx={{
                  width: 160,
                  height: 160,
                  backgroundColor: '#FFB4B4',
                  fontSize: 42,
                  color: '#EC3E39',
                  fontWeight: 'bold',
                  zIndex: 9
                }}
              >
                Guest
              </Avatar>
            </Avatar>
          </Stack>

          {/* Name */}
          <TextField fullWidth required variant="outlined"
            label="Enter name"
            name="name"
            value={tempGuest.name}
            onChange={updateDetails}
            sx={{ width: "100%" }}
            error={requiredFieldsErrors.name}
          />

          {/* Email */}
          <TextField fullWidth required variant="outlined"
            label="Enter e-mail address"
            name="email"
            value={tempGuest.email}
            onChange={updateDetails}
            sx={{ width: "100%" }}
            error={requiredFieldsErrors.email}
          />

          {/* Phone */}
          <TextField fullWidth required variant="outlined"
            label="Enter phone"
            name="email"
            value={tempGuest.email}
            onChange={updateDetails}
            sx={{ width: "100%" }}
            error={requiredFieldsErrors.phone}
          />

          <Stack
            direction="row"
            spacing={8}
            sx={{
              width: "100%",
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant='contained'
              onClick={onEditPage ?
                () => navigate(`/editEvent/${id}/changeGuests`) :
                () => navigate('/createEvent/addGuests')
              } // should NOT save then return to add guests
              sx={{
                borderRadius: '10px',
                backgroundColor: "#F68F8D",
                "&:hover": {
                  backgroundColor: "#A50B07",
                }
              }}
            >
              Cancel
            </Button>
            <Button variant='contained'
              onClick={onEditPage ?
                () => handleSave(`/editEvent/${id}/changeGuests`) :
                () => handleSave('/createEvent/addGuests')
              } // should SAVE then return to add guests
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
        </Stack>
      </Box>
    );
  }
  // return isMobile ? <MobileLayout /> : <DesktopLayout />;
};
