import { Routes, Route } from "react-router-dom";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopCreateEventPage from "./Components/CreateEventPage/DesktopCreateEventPage";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import DesktopEditEventPage from "./Components/EditEventPage/DesktopEditEventPage";

function CreatePagesRoutes() {
  return (
    <>
      <DesktopProgressBar />
      <Routes>
        <Route path="/" element={<DesktopCreateEventPage></DesktopCreateEventPage>}></Route>
        <Route path="/addGuests" element={<DesktopAddGuestsPage></DesktopAddGuestsPage>}></Route>
      </Routes>
    </>
  );
}

export default CreatePagesRoutes;