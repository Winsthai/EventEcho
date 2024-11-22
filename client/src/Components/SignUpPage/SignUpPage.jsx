import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PasswordBox from '../PasswordBox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import logo from '../../images/logo.png'
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleClick = (url) => {
    navigate(url);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (confirmPassword && e.target.value !== confirmPassword) {
      setError(true);
    } else {
      setError(false);
    }
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password && e.target.value !== password) {
      setError(true);
    } else {
      setError(false);
    }
  };
  
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
            <TextField
            label="Password"
            variant="standard"
            type="password"
            fullWidth
            value={password}
            onChange={handlePasswordChange}
            />
            <TextField
            label="Confirm Password"
            variant="standard"
            type="password"
            fullWidth
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={error}
            helperText={error ? 'Passwords do not match' : ''}
            />

          <Stack 
            direction="row"
            sx={{
              justifyContent: "space-between",
            }}
          >
            <Button variant="text" onClick={() => handleClick("/login")}>Already have an account? Login</Button>
            <Button variant="contained">Create Account</Button>
          </Stack>
          
          <Button variant="text">Stay on Guest Mode</Button>
          
        </Stack>
      
      </Box>
    </Box>
  );
};

export default SignUpPage;
