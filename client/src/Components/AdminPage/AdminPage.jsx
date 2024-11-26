import NoUpcomingEvents from "../HomePage/Components/NoUpcomingEvents";
import EventCard from "../EventCard/EventCard";
import UserCard from "../UserCard/UserCard";
import SearchBar from "../SearchBar";

import {
  Box,
  Tab,
  Tabs,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";

const events = [
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
];

const users = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];

const AdminPage = () => {
  const [selectedTab, setSelectedTab] = useState(0); // State to manage selected tab

  const isMobile = useMediaQuery("(max-width:600px)");

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue); // Update the selected tab
  };

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
        Admin Dashboard
      </Typography>

      {/* Search bar */}
      {events.length !== 0 && selectedTab == 0 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar noMargin={true} placeholder="Search for events..." />
        </Box>
      ) : (
        <></>
      )}

      {users.length !== 0 && selectedTab == 1 ? (
        <Box sx={{ display: "flex", paddingBottom: "2vh" }}>
          <SearchBar noMargin={true} placeholder="Search for users..." />
        </Box>
      ) : (
        <></>
      )}

      {/* Tabs for switching between Events and Users */}
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        aria-label="Event Tabs"
        sx={{ marginBottom: "2em" }}
      >
        <Tab label="Events" />
        <Tab label="Users" />
      </Tabs>

      {/* Events Section */}
      {selectedTab === 0 && (
        <>
          {events.length !== 0 ? (
            <>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                Events
              </Typography>
              {events.map((event) => (
                <EventCard key={event.id} event={event} variant="admin" />
              ))}
            </>
          ) : (
            <NoUpcomingEvents />
          )}
        </>
      )}

      {/* Users Section*/}
      {selectedTab === 1 && (
        <>
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Users
          </Typography>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </>
      )}
    </Box>
  );
};

export default AdminPage;
