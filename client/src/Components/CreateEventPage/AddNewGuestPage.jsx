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
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';


export default function DesktopAddGuestsPage() {
  const onEditPage = location.pathname.includes("edit");
  console.log(onEditPage);
  const isMobile = useMediaQuery("(max-width:600px)");


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
              justifyContent: "center", 
              alignItems: "center",    
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
            position: 'fixed', 
            top: '22%',        
            left: '57%',       
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
    <Box component="form" sx={{
      width:"100%",
      height: "100%",
      pt: 12,
      pb: 8,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center", 
      alignItems: "center",    
    }}>
          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "40%", height: "100%", padding: 2 }}
          >

          <Stack
            direction="column"
            spacing={2}
            sx={{ width: "100%",
              height: "100%",
              padding: 2,
              display: "flex",
              justifyContent: "center", 
              alignItems: "center",    
               }}
          >
            <Typography variant="h5" component="div" sx={{ flexGrow: 0, pb: 3 }}>
                Add New Guest
              </Typography>
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
            position: 'fixed', 
            top: '32%',        
            left: '57%',       
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
            
          <Stack
              direction="row"
              spacing={8}
              sx={{ width: "100%",
                height: "100%",
                padding: 2,
                display: "flex",
                justifyContent: "center", 
                alignItems: "center",    
                }}
            >
            <Button variant='contained'
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

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
};
