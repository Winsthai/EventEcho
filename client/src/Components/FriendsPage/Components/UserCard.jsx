import { useMediaQuery, Box, Stack, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import "./UserCard.css";

const UserCard = ({ user, variant = "", onAction }) => {
  // Use media query to check if screen width is less than 600px (mobile view)
  const isMobile = useMediaQuery("(max-width:600px)");

  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  // Used for displaying username and profile picture letter respectively
  // Can remove profileLetter if somehow we have customized profile pictures.
  const username = user.username;
  const firstLetter = user.firstname.charAt(0);
  const secondLetter = user.lastname.charAt(0);
  const profileLetters = `${firstLetter}${secondLetter}`;

  if (isMobile) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Distribute space between content
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <div id="UserCardProfilePicture">{profileLetters}</div>
          <Box
            sx={{ display: "flex", flexDirection: "column", marginLeft: "8px" }}
          >
            <h1 id="UserCardUserName">{username}</h1>
          </Box>
        </Box>

        {/* Button */}
        {variant === "remove" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
          >
            Remove Friend
          </Button>
        ) : variant === "add" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
          >
            Send Request
          </Button>
        ) : variant === "accept" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
          >
            Accept Request
          </Button>
        ) : (
          // No variant, do nothing
          <></>
        )}
      </Box>
    );
  } else {
    return (
      <Box
        sx={{
          width: "clamp(180px, 19%, 300px)", // Dynamically adjusts card size, might need to mess around with this more
          height: "auto",
          padding: "16px", // padding inside box
          backgroundColor: "#ffffff", // Background color of the card
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // center horizontally
          justifyContent: "space-between",
        }}
      >
        {/* Profile Picture */}
        <div id="UserCardProfilePictureDesktop"> {profileLetters} </div>

        {/* Username */}
        <h1 id="UserCardUserNameDesktop">{username}</h1>

        {/* Button based on variant */}
        {variant === "remove" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
            sx={{
              width: "100%",
              textTransform: "none",
            }}
          >
            Remove Friend
          </Button>
        ) : variant === "add" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
            sx={{
              width: "100%",
              textTransform: "none",
            }}
          >
            Send Request
          </Button>
        ) : variant === "accept" ? (
          <Button
            variant="contained"
            id="UserCardButton"
            onClick={onAction}
            sx={{
              width: "100%",
              textTransform: "none",
            }}
          >
            Accept Request
          </Button>
        ) : (
          <></> // No button if no variant
        )}
      </Box>
    );
  }
};

// Could be a source of errors, if the username field is changed to another name for some kind of reason
UserCard.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired, // Need username
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(["add", "remove", "accept"]),
  onAction: PropTypes.func.isRequired,
};

export default UserCard;
