import SearchBar from "../SearchBar";
import { Box, Stack, Button, useMediaQuery} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import './HomePageStyles.css';
const HomePage = () => {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (isMobile) {
    // Mobile Component
    return (
      <Box
        id="homeBox"
      >
        <Stack
          direction="row"
          id="homeHeaderStack"
        >
          <h1>Events</h1>
          <Box>
            <Button variant="contained" sx={{borderRadius:"20px",}}>
              <Box
                id="homeLoginButton"
              >
               <AccountCircleIcon></AccountCircleIcon>Login
              </Box>
              
            </Button>
          </Box>
          
        </Stack>
  
        <Stack
          id="homeEventsStack"
        >
          <SearchBar></SearchBar>
          <Stack
            direction="row"
          >
            <Box id="homeFiltersBox">
              <Button variant="contained" sx={{borderRadius:"20px",}}>Login</Button>
            </Box>
          </Stack>

          
        </Stack>
        
      </Box>
      
    );
  } else {
    return (
      <div>in progress</div>
    );
  }
  
};

export default HomePage;
