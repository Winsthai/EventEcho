import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PasswordBox from '../PasswordBox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import './LoginPageStyles.css';

import logo from '../../images/logo.png'

const LoginPage = () => {
  return (
    <Box 
      component="section"
      sx={{
        width:"100%",
        height: "100%",
        display: "flex",
        justifyContent:"center",
        alignItems: "center", 
        textAlign:"center",
      }}
    >
      <Box
        component="form"
        sx={{
          width: "85%",
          height: "100%"
        }}
      >
        <Stack
          direction="column"
          spacing={5.5}
          sx={{
            height:"100%",
            marginTop: "10vh",
          }}
        >
          <h1 id='loginHeader'>EventEcho</h1>

          <div>
            <img src={logo} alt="EventEcho Logo" style={{width:'150px', marginBottom:'-4vh'}}/>
          </div>

          <TextField id="loginUser" label="Username" variant="standard" />
          <PasswordBox></PasswordBox>

          <Stack 
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button variant="text">Create Account</Button>
            <Button variant="contained">Next</Button>
          </Stack>
          
          <Button variant="text">Stay on Guest Mode</Button>
          
        </Stack>
      
      </Box>
    </Box>
  );
};


export default LoginPage;
