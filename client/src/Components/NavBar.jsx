import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const NavBar = () => {
  const [value, setValue] = useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      sx={{
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 1000, // Ensure it stays above other content
      }}
    >
      <BottomNavigationAction
        label="Events"
        icon={<CalendarTodayIcon />}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
        }}
      />
      <BottomNavigationAction
        label="Create Event"
        icon={<AddCircleOutlineIcon />}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
        }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
        }}
      />
    </BottomNavigation>
  );
};

export default NavBar;
