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
    startdate: null,
    starttime: null,
    enddate: null,
    endtime: null,
    visibility: true,
    startdateraw: null,
    starttimeraw: null,
    enddateraw: null,
    endtimeraw: null,
    eventimage: null,
    imagename: '',
    imageform: null
  });

  const [detailsCompleted, setDetailsCompleted] = useState(false);

  const [invitedGuests, setInvitedGuests] = useState([]);

  return (
    <>
      {isMobile ? <></> : <DesktopProgressBar />}
      <Routes>
        <Route path="/" element={<CreateEventPage eventDetails={eventDetails} setEventDetails={setEventDetails} detailsCompleted={detailsCompleted} setDetailsCompleted={setDetailsCompleted}></CreateEventPage>}></Route>
        <Route path="/addGuests" element={<DesktopAddGuestsPage invitedGuests={invitedGuests} setInvitedGuests={setInvitedGuests} ></DesktopAddGuestsPage>}></Route>
        <Route path="/newGuests" element={<AddGuestsNewPage></AddGuestsNewPage>}></Route>
        <Route path="/reviewEvent" element={<ReviewEventPage eventDetails={eventDetails} setEventDetails={setEventDetails} detailsCompleted={detailsCompleted} invitedGuests={invitedGuests}></ReviewEventPage>}></Route>
      </Routes>
    </>
  );
}

export default CreatePagesRoutes;