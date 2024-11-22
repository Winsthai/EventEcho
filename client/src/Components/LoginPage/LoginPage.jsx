import {Box, TextField, Button, Stack, useMediaQuery} from "@mui/material";
import PasswordBox from '../PasswordBox';
import { useNavigate } from "react-router-dom";


import './LoginPageStyles.css';

import logo from '../../images/logo.png'

const LoginPage = () => {

  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  const isMobile = useMediaQuery("(max-width:600px)");

  if (isMobile) {
    // Mobile component
    return (
      <Box 
        component="section"
        id="loginBox"
      >
        <Box
          component="form"
          id="loginFormBox"
        >
          <Stack
            direction="column"
            spacing={6.5}
            id="loginFormStack"
          >
            <h1 id='loginHeader'>EventEcho</h1>
  
            <Box>
              <img src={logo} alt="EventEcho Logo" style={{width:'150px', margin:'-3vh'}}/>
            </Box>
  
            <TextField id="loginUser" label="Username" variant="standard" />
            <PasswordBox></PasswordBox>
  
            <Stack 
              direction="row"
              id="loginButtonStack"
            >
              <Button variant="text" onClick={() => handleClick("/signUp")}>Create Account</Button>
              <Button variant="contained" sx={{borderRadius:"15px", padding:"2vw 5vw 2vw 5vw",}}>Next</Button>
            </Stack>
            
            <Box>
              <Button variant="text">Stay on Guest Mode</Button>
            </Box>   
          </Stack>
        </Box>
      </Box>
    );
  } else {
    // Desktop Component
    return (
      <Box 
        component="section"
        id="loginBox"
      >
        <Box
          component="form"
          id="loginFormBox"
        >
          <Stack
            direction="column"
            spacing={10}
            id="loginFormStack"
          >
            <Stack direction="row" id="loginHeaderStack">
                <img src={logo} alt="EventEcho Logo" id="loginLogoDesktop"/>
                <h1 id='loginHeader'>EventEcho</h1>
            </Stack>
  
            <TextField id="loginUser" label="Username" variant="standard" />
            <PasswordBox></PasswordBox>
  
            <Stack 
              direction="row"
              id="loginButtonStack"
            >
              <Button variant="text">Stay on Guest Mode</Button>
              <Box>
                <Button variant="text" onClick={() => handleClick("/signUp")}>Create Account</Button>
                <Button variant="contained" sx={{marginLeft:"1.5vw"}}>Next</Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }
  
};


export default LoginPage;
