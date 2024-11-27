import { Routes, Route } from "react-router-dom";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import ReviewEventPage from "./Components/ReviewEventPage/ReviewEventPage";
import { useMediaQuery } from "@mui/material";
import AddGuestsNewPage from "./Components/CreateEventPage/AddNewGuestPage";
import { useState } from "react";

function CreatePagesRoutes() {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [eventDetails, setEventDetails] = useState({
    title: '',
    eventtype: '',
    description: '',
    address: '',
    coordinates: { x: 0, y: 0 },
    startdate: '',
    starttime: '',
    enddate: '',
    endtime: '',
    visibility: true
  });

  return (
    <>
      {isMobile ? <></> : <DesktopProgressBar />}
      <Routes>
        <Route path="/" element={<CreateEventPage eventDetails={eventDetails} setEventDetails={setEventDetails}></CreateEventPage>}></Route>
        <Route path="/addGuests" element={<DesktopAddGuestsPage eventDetails={eventDetails} ></DesktopAddGuestsPage>}></Route>
        <Route path="/newGuests" element={<AddGuestsNewPage></AddGuestsNewPage>}></Route>
        <Route path="/reviewEvent" element={<ReviewEventPage></ReviewEventPage>}></Route>
      </Routes>
    </>
  );
}

export default CreatePagesRoutes;