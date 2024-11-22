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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);

    const navigate = useNavigate();

    const handleClick = (url) => {
        navigate(url);
    };

    const isMobile = window.innerWidth <= 600; // Determines if the user is on a mobile device

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
                    <h1 id='signupHeader'>EventEcho</h1>
                        <Box>
                            <img src={logo} alt="EventEcho Logo" style={{ width: '150px', margin: '-3vh' }} />
                        </Box>

                        <TextField label="Username" variant="standard" />
                        <PasswordBox onChange={handlePasswordChange} />
                        <PasswordBox label="Confirm Password" onChange={handleConfirmPasswordChange} />

                        <Box>
                            <Chip label="Create Account" sx={chipStyle} onClick={() => console.log("Account Created")} />
                        </Box>

                        <div>
                            <label>Already have an account? </label>
                            <Button variant="text" onClick={() => handleClick("/login")}>
                                Login
                            </Button>
                        </div>

                        <Box>
                          <Button variant="text">Stay on Guest Mode</Button>
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
                }}
            >
                <Box sx={{ width: "50%" }}>
                    <Stack spacing={5.5} sx={{ marginTop: "10vh" }}>
                        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                            <img src={logo} alt="EventEcho Logo" style={{ width: '200px', marginBottom: '-4vh' }} />
                            <h1 id ='signupHeader'>EventEcho</h1>
                        </Stack>

                        <TextField label="Username" variant="standard" />
                        <PasswordBox onChange={handlePasswordChange} />
                        <PasswordBox label="Confirm Password" onChange={handleConfirmPasswordChange} />

                        <Stack direction="row" justifyContent="space-between">
                            <div>
                                <label>Already have an account? </label>
                                <Button variant="text" onClick={() => handleClick("/login")}>
                                    Login
                                </Button>
                            </div>

                            <Chip label="Create Account" sx={chipStyle} onClick={() => console.log("Account Created")} />
                        </Stack>
                        <Box>
                          <Button variant="text">Stay on Guest Mode</Button>
                        </Box>
                        
                    </Stack>
                </Box>
            </Box>
        );
    }
};

export default SignUpPage;
