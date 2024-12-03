import { Box, Chip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import { useState, useEffect } from "react";

const chipStyle = {
  backgroundColor: "primary.main",
  color: "white",
  "& .MuiChip-icon": {
    color: "white",
  },
  "&:hover": {
    backgroundColor: "primary.dark",
    cursor: "pointer",
  },
};

const NavBar = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false);
  const [error, setError] = useState("");

  const authToken = localStorage.getItem("authToken");

  const handleClick = (url) => {
    navigate(url);
  };

  const handleUserProfile = (url) => {
    navigate(url);
  };

  async function authenticateAdmin() {
    {
      // Generate API Url
      const APIUrl = `http://localhost:3001/api/admin`;

      try {
        // Fetch and store results from API URL
        const response = await fetch(APIUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();

        // Error message
        if (!response.ok) {
          throw new Error(data.error || "An unexpected error occurred");
        }

        return data;
      } catch (e) {
        setError(e.message);
      }
    }
  }

  // Fetch admin status on startup
  useEffect(() => {
    const fetchAuthenticateAdmin = async () => {
      try {
        setError(null);

        const result = await authenticateAdmin();
        if (result.message === "Admin authenticated") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } catch (e) {
        setIsAdmin(false);
        setError(e.message);
      }
    };

    fetchAuthenticateAdmin();
  }, [authToken]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
        backgroundColor: "white",
        borderBottom: "1px solid #ddd",
        gap: "16px",
        overflow: "hidden", // Prevents content from spilling out
        zIndex: 1000,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          whiteSpace: "nowrap",
          display: "inline-block",
          cursor: "pointer",
        }}
        onClick={() => handleClick("/")} // Handle click event to navigate
      >
        EventEcho
      </Box>

      {/* Chips */}
      <Box
        sx={{
          display: "flex",
          gap: "8px", // Adds spacing between chips
          flexShrink: 0, // Prevents chips from resizing or shrinking
        }}
      >
        {isAdmin && authToken ? (
          <Chip
            icon={<AdminPanelSettingsIcon />}
            label="Admin"
            onClick={() => handleClick(authToken ? "/admin" : "/login")}
            sx={chipStyle}
          />
        ) : (
          <></>
        )}

        <Chip
          icon={<AddIcon />}
          label="Create event"
          onClick={() => handleClick(authToken ? "/createEvent" : "/login")}
          sx={chipStyle}
        />
        {authToken ? (
          <Chip
            icon={<PersonIcon />}
            label="User Profile"
            onClick={() => handleUserProfile("/user")}
            sx={chipStyle}
          />
        ) : (
          <Chip
            icon={<PersonIcon />}
            label="Login"
            onClick={() => handleClick("/login")}
            sx={chipStyle}
          />
        )}
      </Box>
    </Box>
  );
};

export default NavBar;
