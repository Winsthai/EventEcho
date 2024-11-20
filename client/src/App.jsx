import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./Components/EventPage/EventPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import CreateEventPageInvite from "./Components/CreateEventPage/CreateEventPageInvite";
import EditEventPage from "./Components/EditEventPage/EditEventPage";
import MobileNavBar from "./Components/MobileNavBar";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";
import UserPage from "./Components/UserPage/UserPage";

function App() {
  // Use media query to check if screen width is less than 600px (mobile view)
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <BrowserRouter>
        {isMobile ? <></> : <NavBar></NavBar>}
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/event/:id" element={<EventPage></EventPage>}></Route>
          <Route
            path="/event/:id/edit"
            element={<EditEventPage></EditEventPage>}
          ></Route>
          <Route
            path="/createEvent"
            element={<CreateEventPage></CreateEventPage>}
          ></Route>
          <Route
            path="/createEventInvite"
            element={<CreateEventPageInvite></CreateEventPageInvite>}
          ></Route>
          <Route path="/user/:id" element={<UserPage></UserPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="*" element={<div>Page not found</div>}></Route>
        </Routes>
        {isMobile ? <MobileNavBar></MobileNavBar> : <></>}
      </BrowserRouter>
    </>
  );
}

export default App;
