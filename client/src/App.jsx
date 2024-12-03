import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./Components/EventPage/EventPage";
import MobileNavBar from "./Components/MobileNavBar";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import AdminPage from "./Components/AdminPage/AdminPage";
import { useMediaQuery } from "@mui/material";
import NavBar from "./Components/NavBar";
import UserPage from "./Components/UserPage/UserPage";
import CreatePagesRoutes from "./CreatePagesRoutes";
import EditPagesRoutes from "./EditPagesRoutes";
import FriendsPage from "./Components/FriendsPage/FriendsPage";

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
            path="/editEvent/:id/*"
            element={<EditPagesRoutes></EditPagesRoutes>}
          ></Route>
          <Route
            path="/createEvent/*"
            element={<CreatePagesRoutes></CreatePagesRoutes>}
          ></Route>

          {/* <Route path="/createEvent/reviewEvent" element={<ReviewEventPage></ReviewEventPage>}></Route> */}
          <Route path="/user" element={<UserPage></UserPage>}></Route>
          <Route path="/user/:id/friends" element={<FriendsPage></FriendsPage>}></Route>
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
          <Route path="*" element={<div>Page not found</div>}></Route>
        </Routes>
        {isMobile ? <MobileNavBar></MobileNavBar> : <></>}
      </BrowserRouter>
    </>
  );
}

export default App;
