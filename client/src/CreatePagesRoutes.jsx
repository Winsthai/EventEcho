import { Routes, Route } from "react-router-dom";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopCreateEventPage from "./Components/CreateEventPage/DesktopCreateEventPage";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import DesktopReviewEventPage from "./Components/CreateEventPage/DesktopReviewEventPage";

function CreatePagesRoutes() {
  return (
    <>
      <DesktopProgressBar />
      <Routes>
        <Route path="/" element={<DesktopCreateEventPage></DesktopCreateEventPage>}></Route>
        <Route path="/addGuests" element={<DesktopAddGuestsPage></DesktopAddGuestsPage>}></Route>
        <Route path="/reviewEvent" element={<DesktopReviewEventPage></DesktopReviewEventPage>}></Route>
      </Routes>
    </>
  );
}

export default CreatePagesRoutes;