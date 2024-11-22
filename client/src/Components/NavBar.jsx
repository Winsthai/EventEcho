import { Box, TextField, Chip, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

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

  const handleClick = (url) => {
    navigate(url);
  };

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
        zIndex: 1000
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
        <Chip
          icon={<AddIcon />}
          label="Create event"
          onClick={() => handleClick("/createEvent")}
          sx={chipStyle}
        />
        <Chip
          icon={<PersonIcon />}
          label="Login"
          onClick={() => handleClick("/login")}
          sx={chipStyle}
        />
      </Box>
    </Box>
  );
};

export default NavBar;
