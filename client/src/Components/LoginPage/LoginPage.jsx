import { Box, TextField, Button, Stack, useMediaQuery } from "@mui/material";
import PasswordBox from "../PasswordBox";
import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "./LoginPageStyles.css";

import logo from "../../images/logo.png";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To display errors
  const [showPopup, setShowPopup] = useState(false); // Popup state
  const location = useLocation(); // Get location to access navigation state

  useEffect(() => {
    // Check if accountCreated flag is present in state
    if (location.state?.accountCreated) {
      setShowPopup(true);

      // Hide popup after 3 seconds
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);

      // Cleanup timeout on unmount
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Send username and password as JSON
      });

      const data = await response.json(); // Parse JSON response

      if (!response.ok) {
        // If the response is not successful, show an error
        throw new Error(data.error || "An unexpected error occurred");
      }

      // Save the token, username, and id (e.g., in localStorage)
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("username", data.username);

      // Navigate to the next page after successful login
      navigate(`/user`);
    } catch (err) {
      // Set the error message to display on the UI
      setError(err.message);
    }
  };

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
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        {showPopup && (
          <Box
            sx={{
              position: "fixed",
              top: "5%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "darkred",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              zIndex: 1000,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              width: "80%", // Makes it responsive on mobile
              maxWidth: "400px", // Ensures it doesn’t get too wide on large screens
              minWidth: "250px", // Ensures it’s not too narrow
            }}
          >
            Account created successfully! Please log in.
          </Box>
        )}
        <Box component="form" id="loginFormBox">
          <Stack direction="column" spacing={6.5} id="loginFormStack">
            <h1 id="loginHeader" style={{ marginTop: "20px" }}>
              EventEcho
            </h1>

            <Box>
              <img
                src={logo}
                alt="EventEcho Logo"
                style={{ width: "150px", margin: "-3vh" }}
              />
            </Box>

            <TextField
              id="loginUser"
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordBox
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <Stack direction="row" id="loginButtonStack">
              <Button variant="text" onClick={() => handleClick("/signUp")}>
                Create Account
              </Button>
              <Button
                variant="contained"
                sx={{ borderRadius: "15px", padding: "2vw 5vw 2vw 5vw" }}
                onClick={handleLogin}
              >
                Next
              </Button>
            </Stack>

            <Box>
              <Button variant="text" onClick={() => handleClick("/")}>
                Stay on Guest Mode
              </Button>
            </Box>
          </Stack>
        </Box>
      </Box>
    );
  } else {
    // Desktop Component
    return (
      <Box component="section" id="loginBox">
        {showPopup && (
          <Box
            sx={{
              position: "fixed",
              top: "10%",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "darkred",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              zIndex: 1000,
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
            }}
          >
            Account created successfully! Please log in.
          </Box>
        )}
        <Box component="form" id="loginFormBox">
          <Stack direction="column" spacing={10} id="loginFormStack">
            <Stack direction="row" id="loginHeaderStack">
              <img src={logo} alt="EventEcho Logo" id="loginLogoDesktop" />
              <h1 id="loginHeader">EventEcho</h1>
            </Stack>

            <TextField
              id="loginUser"
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <PasswordBox
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}

            <Stack direction="row" id="loginButtonStack">
              <Button variant="text" onClick={() => handleClick("/")}>
                Stay on Guest Mode
              </Button>
              <Box>
                <Button variant="text" onClick={() => handleClick("/signUp")}>
                  Create Account
                </Button>
                <Button
                  variant="contained"
                  sx={{ marginLeft: "1.5vw" }}
                  onClick={handleLogin}
                >
                  Next
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </Box>
    );
  }
};

export default LoginPage;
