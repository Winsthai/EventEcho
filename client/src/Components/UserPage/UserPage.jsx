import { useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import NoCreatedEvents from "./Components/NoCreatedEvents";
import NoUpcomingEvents from "./Components/NoUpcomingEvents";
import EventCard from "../EventCard/EventCard";
import SearchBar from "../SearchBar";

// Test data for now, getting users not implemented in backend yet so params could change
const testUsers = [
  {
    id: 1,
    username: "Steven",
    registeredEvents: [
      {
        id: "1",
        title: "Football Game",
        eventtype: "Sports",
        description: "A friendly neighborhood football game.",
        address: "123 Stadium Rd, City",
        coordinates: {
          x: 40.7128,
          y: -74.006,
        },
        startdate: "2024-11-15T00:00:00.000Z",
        starttime: "15:00:00+00",
        enddate: "2024-11-15T00:00:00.000Z",
        endtime: "17:00:00+00",
        visibility: true,
        image:
          "https://m.media-amazon.com/images/M/MV5BOWZiNzZkZGEtMWEwOS00NjZkLWFmYTctZmQyMDY3NGU0OWZjXkEyXkFqcGc@._V1_.jpg", // temporary
      },
      {
        id: "2",
        title: "Jazz Concert",
        eventtype: "Music",
        description: "Live jazz performance.",
        address: "456 Music Hall Ave, City",
        coordinates: {
          x: 40.7306,
          y: -73.9352,
        },
        startdate: "2024-12-01T00:00:00.000Z",
        starttime: "19:00:00+00",
        enddate: "2024-12-01T00:00:00.000Z",
        endtime: "21:00:00+00",
        visibility: true,
        image:
          "https://www.horizonsmusic.co.uk/cdn/shop/articles/image1_1600x1600.jpg?v=1621417277", // temporary
      },
    ],
    createdEvents: [
      {
        id: "3",
        title: "Food Festival",
        eventtype: "Food",
        description: "A festival with foods from around the world.",
        address: "789 Gourmet St, City",
        coordinates: {
          x: 40.7612,
          y: -73.9822,
        },
        startdate: "2024-11-20T00:00:00.000Z",
        starttime: "11:00:00+00",
        enddate: "2024-11-20T00:00:00.000Z",
        endtime: "16:00:00+00",
        visibility: false,
        image:
          "https://i.ytimg.com/vi/BLsQyx604Yc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAYWKCLjjwlIHVaM6MGC9bvpVLe_A", // temporary
      },
    ],
  },
  { id: 2, username: "Shaun", registeredEvents: [], createdEvents: [] },
];

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab

  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (id) {
      const currUser = testUsers.find((elem) => elem.id == id);
      setUser(currUser);
    }
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

  // Temporarily add this so it waits for the user to be found, possibly change when implementing backend
  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <Box
      sx={{
        padding: 4,
        paddingLeft: "5vw",
        paddingRight: "5vw",
        textAlign: "left",
      }}
    >
      {/* Header */}
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        Hello {user.username}!
      </Typography>

      {/* Search bar */}
      {(user.createdEvents.length !== 0 && selectedTab == 0) ||
      (user.registeredEvents.length !== 0 && selectedTab == 1) ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar noMargin={true} />
        </Box>
      ) : (
        <></>
      )}

      {/* Tabs for switching between Hosted and Upcoming Events */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Event Tabs"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Hosted Events" />
        <Tab label="Upcoming Events" />
      </Tabs>

      {/* Hosted Events Section */}
      {selectedTab === 0 && (
        <>
          {user.createdEvents.length !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Your Hosted Events
              </Typography>
              {user.createdEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="hosted" />
              ))}
            </>
          ) : (
            <NoCreatedEvents />
          )}
        </>
      )}

      {/* Upcoming Events Section */}
      {selectedTab === 1 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Your Upcoming Events
          </Typography>
          {user.registeredEvents.length !== 0 ? (
            <>
              {user.registeredEvents.map((event) => (
                <EventCard key={event.id} event={event} variant="upcoming" />
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
        </>
      )}
    </Box>
  );
};

export default UserPage;
