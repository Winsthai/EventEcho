import { BottomNavigation } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const MobileNavBar = () => {
  const location = useLocation();

  const [value, setValue] = useState(null);

  useEffect(() => {
    const basePath = location.pathname.split("/")[1];

    if (basePath === "") {
      setValue(0);
    } else if (basePath === "createEvent") {
      setValue(1);
    } else if (basePath === "login" || basePath === "signUp") {
      setValue(2);
    }
  }, [location.pathname]);

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
        component={Link}
        to={`/`}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
        }}
      />
      <BottomNavigationAction
        label="Create Event"
        icon={<AddCircleOutlineIcon />}
        component={Link}
        to={`/createEvent`}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
          textWrap: "nowrap",
        }}
      />
      <BottomNavigationAction
        label="Profile"
        icon={<AccountCircleIcon />}
        component={Link}
        to={`/login`}
        sx={{
          "&.Mui-selected": {
            color: "#F0534F",
          },
        }}
      />
    </BottomNavigation>
  );
};

export default MobileNavBar;
