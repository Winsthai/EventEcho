import { useMediaQuery, Box, Stack, Button, Typography } from "@mui/material";
import "./UserCardStyles.css";
import { useNavigate } from "react-router-dom";

const UserCard = ({ user }) => {
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!user) {
    return <></>;
  }

  if (isMobile) {
    return (
      <Box
        className="adminUserBox"
      >
        <Stack className="adminUserDetails" sx={{justifyContent: "space-between"}}>
          {/* Id */}
          <Box color="text.secondary">
            <span style={{fontWeight: "bold"}}>User ID: </span> {user.id}
          </Box>

          {/* Name */}
          <Box
            alignItems="center"
            color="text.secondary"
          >
            <span style={{fontWeight: "bold"}}>Name: </span> {user.name}
          </Box>

          {/* Phone Number */}
          <Box
            alignItems="center"
            color="text.secondary"
          >
            <span style={{fontWeight: "bold"}}>Phone Number: </span> {user.phone}
          </Box>

            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                //onClick=
              >
                Remove
              </Button>
            </Box>
        </Stack>
      </Box>
    );
  } else {
    return (
        <Box
        className="adminUserBoxDesktop"
      >
        <Stack direction="row" className="adminUserDetailsDesktop">
          {/* Id */}
          <Box color="text.secondary" sx={{gap: "4px"}}>
            <span style={{fontWeight: "bold"}}>User ID: </span> {user.id}
          </Box>

          {/* Name */}
          <Box
            alignItems="center"
            color="text.secondary"
            sx={{gap: "4px"}}
          >
            <span style={{fontWeight: "bold"}}>Name: </span>
            <Typography component="span">{user.name}</Typography>
          </Box>

          {/* Phone Number */}
          <Box
            alignItems="center"
            color="text.secondary"
            sx={{gap: "4px"}}
          >
            <span style={{fontWeight: "bold"}}>Phone Number: </span> {user.phone}
          </Box>

            <Box>
              <Button
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  height: "80%",
                  backgroundColor: "#A50B07",
                  marginRight: "3vw",
                  textTransform: "none",
                }}
                //onClick=
              >
                Remove
              </Button>
            </Box>
        </Stack>
      </Box>
    );
  }
};

export default UserCard;
