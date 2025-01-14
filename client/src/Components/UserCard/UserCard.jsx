import { useMediaQuery, Box, Stack, Button, Typography } from "@mui/material";
import "./UserCardStyles.css";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user, variant = "", onBanButton, onUnbanButton}) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!user) {
    return <></>;
  }

  if (isMobile) {
    return (
      <Box className="adminUserBox">
        <Stack
          className="adminUserDetails"
          sx={{ justifyContent: "space-between" }}
        >
          {/* Username */}
          <Box alignItems="center" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Username: </span>{" "}
            {user.username}
          </Box>

          {/* Email */}
          <Box color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Email: </span> {user.email}
          </Box>

          {/* Name */}
          <Box alignItems="center" color="text.secondary">
            <span style={{ fontWeight: "bold" }}>Name: </span> {user.firstname}{" "}
            {user.lastname}
          </Box>

          

          <Box>
            {variant === "banned" ? (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                onClick={() => onUnbanButton(user.id)}
              >
                Unban
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                onClick={() => onBanButton(user.id)}
              >
                Ban
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    );
  } else {
    return (
      <Box className="adminUserBoxDesktop">
        <Stack direction="row" className="adminUserDetailsDesktop">
          {/* Username */}
          <Box alignItems="center" color="text.secondary" sx={{ gap: "4px" }}>
            <span style={{ fontWeight: "bold" }}>Username: </span>{" "}
            {user.username}
          </Box>

          {/* Email */}
          <Box color="text.secondary" sx={{ gap: "4px" }}>
            <span style={{ fontWeight: "bold" }}>Email: </span> {user.email}
          </Box>

          {/* Name */}
          <Box alignItems="center" color="text.secondary" sx={{ gap: "4px" }}>
            <span style={{ fontWeight: "bold" }}>Name: </span>
            <Typography component="span">
              {user.firstname} {user.lastname}
            </Typography>
          </Box>

          

          <Box>
            {variant === "banned" ? (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                onClick={() => onUnbanButton(user.id)}
              >
                Unban
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                onClick={() => onBanButton(user.id)}
              >
                Ban
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    );
  }
};

export default UserCard;
