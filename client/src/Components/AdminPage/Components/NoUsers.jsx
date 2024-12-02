import { Box, Typography } from "@mui/material";
import UserIcon from "../images/UserIcon.svg";

const NoUsers = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f9f9f9",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        margin: "auto",
      }}
    >
      {/* Left: SVG Icon */}
      <Box
        sx={{
          flexShrink: 0,
          marginRight: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Replace with your SVG */}
        <img
          src={UserIcon}
          style={{ width: "15vw", minWidth: "50px", maxWidth: "80px" }}
        ></img>
      </Box>

      {/* Right: Text */}
      <Box>
        <Typography
          variant="h6"
          sx={{ fontWeight: "600", color: "text.primary" }}
        >
          No Users
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", marginTop: 0.5 }}
        >
          No users found.
        </Typography>
      </Box>
    </Box>
  );
};

export default NoUsers;
