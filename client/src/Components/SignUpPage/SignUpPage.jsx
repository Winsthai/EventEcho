import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, TextField, Chip, Stack, Button } from "@mui/material";
import PasswordBox from '../PasswordBox';
import logo from '../../images/logo.png';

import './SignUpPageStyles.css';

const chipStyle = {
    backgroundColor: "darkred",
    color: "white",
    width: "200px",
    height: "40px",
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "darkred",
        opacity: 0.8,
    },
};

const SignUpPage = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phonenum, setPhonenum] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    };

    const isMobile = window.innerWidth <= 600; // Determines if the user is on a mobile device

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        console.log("password changed");
        if (confirmPassword && e.target.value !== confirmPassword) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        console.log("password changed");
        if (password && e.target.value !== password) {
            setError(true);
        } else {
            setError(false);
        }
    };

    const handleCreateAccount = async () => {
        if (!username || !password || !confirmPassword || !firstname || !lastname) {
          console.log(`username: ${username}, password: ${password}, phonenum: ${phonenum}, confirm: ${confirmPassword}`);
          setFormError("Please fill out all required fields.");
          return;
        }
        if (password !== confirmPassword) {
          setFormError("Passwords do not match.");
          return;
        }
    
        // Reset the error state
        setFormError("");

        try {
            const response = await fetch("http://localhost:3001/api/users", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username,
                firstname,
                lastname,
                email,
                phonenum,
                password,
              }),
            });
      
            if (!response.ok) {
              const errorData = await response.json();
              setFormError(errorData.error || "Failed to create account.");
              return;
            }
      
            const data = await response.json();
            console.log("Account created:", data);
      
            // Navigate to the login page with a state flag
        navigate("/login", { state: { accountCreated: true } });
          } catch (error) {
            console.log(`in the error: username: ${username}, password: ${password}, phonenum: ${phonenum}, confirm: ${confirmPassword}`);
            console.error("Error creating account:", error);
            setFormError("An unexpected error occurred. Please try again.");
          }
        };    

    if (isMobile) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                }}
            >
                <Box sx={{ width: "85%"}}>
                    <Stack spacing={5.5} sx={{ marginTop: "10vh", marginBottom:"10vh" }}>
                    <h1 id='signupHeader'style={{ marginTop: "20px" }}>EventEcho</h1>
                        <Box>
                            <img src={logo} alt="EventEcho Logo" style={{ width: '150px', margin: '-3vh' }} />
                        </Box>

                        <TextField 
                        label="Username*" 
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}  />

                        <TextField 
                        label="First Name*" 
                        variant="standard"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}  />

                        <TextField 
                        label="Last Name*" 
                        variant="standard"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}  />
                        
                        <PasswordBox label="Password*" onChange={handlePasswordChange} />
                        <PasswordBox label="Confirm Password*" onChange={handleConfirmPasswordChange} />
                        <TextField
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                        label="Phone Number"
                        variant="standard"
                        value={phonenum}
                        onChange={(e) => setPhonenum(e.target.value)}
                        />

                        {formError && <p style={{ color: "red" }}>{formError}</p>}


                        <Box>
                            <Chip label="Create Account" sx={chipStyle} onClick={handleCreateAccount} />
                        </Box>

                        <div>
                            <label>Already have an account? </label>
                            <Button variant="text" onClick={() => handleClick("/login")}>
                                Login
                            </Button>
                        </div>

                        <Box>
                          <Button variant="text" onClick={() => handleClick("/")}>Stay on Guest Mode</Button>
                        </Box>
                    </Stack>
                </Box>
            </Box>
        );
    } else {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    paddingBottom: "5vh"
                }}
            >
                <Box sx={{ width: "50%" }}>
                    <Stack spacing={5.5} sx={{ marginTop: "10vh" }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                            <img src={logo} alt="EventEcho Logo" style={{ width: '200px', marginBottom: '-4vh' }} />
                            <h1 id ='signupHeader'>EventEcho</h1>
                        </Stack>

                        <TextField 
                        label="Username*" 
                        variant="standard"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}  />

                        <TextField 
                        label="First Name*" 
                        variant="standard"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}  />

                        <TextField 
                        label="Last Name*" 
                        variant="standard"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}  />
                        
                        <PasswordBox label="Password*" onChange={handlePasswordChange} />
                        <PasswordBox label="Confirm Password*" onChange={handleConfirmPasswordChange} />
                        <TextField
                        label="Email"
                        variant="standard"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                        label="Phone Number"
                        variant="standard"
                        value={phonenum}
                        onChange={(e) => setPhonenum(e.target.value)}
                        />

                        {formError && <p style={{ color: "red" }}>{formError}</p>}


                        <Stack direction="row" justifyContent="space-between">
                            <div>
                                <label>Already have an account? </label>
                                <Button variant="text" onClick={() => handleClick("/login")}>
                                    Login
                                </Button>
                            </div>

                            <Chip label="Create Account" sx={chipStyle} onClick={handleCreateAccount} />                        </Stack>
                        <Box>
                          <Button variant="text" onClick={() => handleClick("/")}>Stay on Guest Mode</Button>
                        </Box>
                        
                    </Stack>
                </Box>
            </Box>
        );
    }
};

export default SignUpPage;
