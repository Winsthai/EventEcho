import SearchBar from "../SearchBar";
import { Box, Stack, Button, useMediaQuery} from "@mui/material";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import GroupsIcon from '@mui/icons-material/Groups';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

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
            <Button variant="contained" sx={{borderRadius:"20px",}} startIcon={<AccountCircleIcon/>}>
              <Box id="homeLoginButton"> Login </Box>   
            </Button>
          </Box>
          
        </Stack>
  
        <Stack
          id="homeEventsStack"
        >
          <SearchBar></SearchBar>
          <Stack
            direction="row"
            id="homeFiltersStack"
          >
            <Box id="homeFiltersBox">
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<SportsBasketballIcon/>}
              >
                Sports 
              </Button>

              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", 
                backgroundColor:"#ff7474"}} 
                startIcon={<MusicNoteIcon/>}
              > 
                Music 
              </Button>

              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<LocalDiningIcon/>}
              > 
                Food 
              </Button>
              
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<ColorLensIcon/>}
              > 
                Art
              </Button>
              
              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}}
                startIcon={<GroupsIcon/>}
              > 
                Hangout
              </Button>

              <Button 
                variant="contained" 
                sx={{borderRadius:"20px", backgroundColor:"#ff7474"}} 
                startIcon={<SportsEsportsIcon/>}
              > 
                Gaming
              </Button>
            </Box>           
          </Stack>

          <Box>
            <h1> Upcoming Events</h1>
          </Box>
        
          
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
