import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./Components/EventPage/EventPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import EditEventPage from "./Components/EditEventPage/EditEventPage";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";
import { useMediaQuery } from "@mui/material";

function App() {
  // Use media query to check if screen width is less than 600px (mobile view)
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      <BrowserRouter>
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
          <Route path="/login" element={<LoginPage></LoginPage>}></Route>
          <Route path="/signUp" element={<SignUpPage></SignUpPage>}></Route>
          <Route path="*" element={<div>Page not found</div>}></Route>
        </Routes>
        {isMobile ? <NavBar></NavBar> : <></>}
      </BrowserRouter>
    </>
  );
}

export default App;
