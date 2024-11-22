import { Card, CardContent, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NoCreatedEvents = () => {
  const navigate = useNavigate();

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
          Let&apos;s make your events extraordinary, starting right here!
        </Typography>
        <Button
          variant="contained"
          color="darkSecondary"
          onClick={() => navigate("/createEvent")}
          sx={{
            borderRadius: 3,
            padding: "8px 16px",
            textTransform: "none",
            width: "50vw",
            maxWidth: "220px",
            fontSize: "inherit",
          }}
        >
          Plan an Event
        </Button>
      </CardContent>
    </Card>
  );
};

export default NoCreatedEvents;
