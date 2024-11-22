import { Routes, Route } from "react-router-dom";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopCreateEventPage from "./Components/CreateEventPage/DesktopCreateEventPage";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import DesktopReviewEventPage from "./Components/CreateEventPage/DesktopReviewEventPage";

import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import ReviewEventPage from "./Components/ReviewEventPage/ReviewEventPage";
import { useMediaQuery } from "@mui/material";
import AddGuestsNewPage from "./Components/CreateEventPage/AddNewGuestPage";

function CreatePagesRoutes() {
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isMobile ? <></> : <DesktopProgressBar />}
      <Routes>
        <Route path="/" element={<CreateEventPage></CreateEventPage>}></Route>
        <Route path="/addGuests" element={<DesktopAddGuestsPage></DesktopAddGuestsPage>}></Route>
        <Route path="/newGuests" element={<AddGuestsNewPage></AddGuestsNewPage>}></Route>
        <Route path="/reviewEvent" element={<ReviewEventPage></ReviewEventPage>}></Route>
      </Routes>
    </>
  );
}

export default CreatePagesRoutes;