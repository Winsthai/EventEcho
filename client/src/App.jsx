import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./Components/EventPage/EventPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import DesktopCreateEventPage from "./Components/CreateEventPage/DesktopCreateEventPage";
import EditEventPage from "./Components/EditEventPage/EditEventPage";
import DesktopEditEventPage from "./Components/EditEventPage/DesktopEditEventPage";
import MobileNavBar from "./Components/MobileNavBar";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";
import UserPage from "./Components/UserPage/UserPage";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import ReviewEventPage from "./Components/ReviewEventPage/ReviewEventPage";

function App() {
  // Use media query to check if screen width is less than 600px (mobile view)
  const isMobile = useMediaQuery("(max-width:600px)");

  const stepperPaths = ['/createEvent', 'event/:id/edit'];
  const showStepper = stepperPaths.includes(location.pathname);

  return (
    <>
      <BrowserRouter>
        {isMobile ? <></> : <NavBar></NavBar>}
        {showStepper && !isMobile && <DesktopProgressBar />}
        <Routes>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/event/:id" element={<EventPage></EventPage>}></Route>
          <Route
            path="/event/:id/edit"
            element={isMobile ? <EditEventPage></EditEventPage> : <DesktopEditEventPage></DesktopEditEventPage>}
          ></Route>
          <Route
            path="/createEvent"
            element={isMobile ? <CreateEventPage></CreateEventPage> : <DesktopCreateEventPage></DesktopCreateEventPage>}
          ></Route>
          <Route
            path="/createEvent/addGuests"
            element={isMobile ? <></> : <DesktopAddGuestsPage></DesktopAddGuestsPage>}
          >
          </Route>
          <Route path="/createEvent/addGuests/reviewEvent" element={<ReviewEventPage></ReviewEventPage>}></Route>

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
