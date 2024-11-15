import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import EventPage from "./Components/EventPage/EventPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import EditEventPage from "./Components/EditEventPage/EditEventPage";
import NavBar from "./Components/NavBar";
import LoginPage from "./Components/LoginPage/LoginPage";
import SignUpPage from "./Components/SignUpPage/SignUpPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar></NavBar>
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
      </BrowserRouter>
    </>
  );
}

export default App;
