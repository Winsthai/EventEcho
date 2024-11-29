import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoFriendsCard = ({ setSelectedTab }) => {
  const navigate = useNavigate();

  // Change tab function for button
  const handleButtonClick = () => {
    setSelectedTab(1);
  };

  return (
    <Card
      sx={{
        backgroundColor: "#ffecec",
        borderRadius: 2,
        mb: 4,
        padding: 0,
      }}
    >
      <CardContent>
        <Typography variant="body1" color="text.primary" sx={{ mb: 4 }}>
          Now that you are all set, <br />
          Let&apos;s start filling up your friends list!
        </Typography>
        <Button
          variant="contained"
          color="darkSecondary"
          onClick={handleButtonClick}
          sx={{
            borderRadius: 3,
            padding: "8px 16px",
            textTransform: "none",
            width: "50vw",
            maxWidth: "220px",
            fontSize: "inherit",
          }}
        >
          Find Friends
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoFriendsCard;
