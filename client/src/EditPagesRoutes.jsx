import { Routes, Route } from "react-router-dom";
import DesktopProgressBar from "./Components/DesktopProgressBar";
import DesktopAddGuestsPage from "./Components/CreateEventPage/DesktopAddGuestsPage";
import CreateEventPage from "./Components/CreateEventPage/CreateEventPage";
import ReviewEventPage from "./Components/ReviewEventPage/ReviewEventPage";
import { useMediaQuery } from "@mui/material";
import AddGuestsNewPage from "./Components/CreateEventPage/AddNewGuestPage";
import { useState } from "react";

function EditPagesRoutes() {
  const isMobile = useMediaQuery("(max-width:600px)");

  // pre populate fields and pull from API and insert here?
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
    imagenamemobile: '',
    imageform: null
  });

  const [nonUserGuests, setNonUserGuests] = useState([]);

  const [detailsCompleted, setDetailsCompleted] = useState(false);

  const [detailsChanged, setDetailsChanged] = useState(false);

  const [invitedGuests, setInvitedGuests] = useState([]);

  return (
    <>
      {isMobile ? <></> : <DesktopProgressBar />}
      <Routes>
        <Route path="/" element={<CreateEventPage
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          setDetailsCompleted={setDetailsCompleted}
          detailsChanged={detailsChanged}
          setDetailsChanged={setDetailsChanged}
        ></CreateEventPage>}></Route>

        <Route path="/changeGuests" element={<DesktopAddGuestsPage
          invitedGuests={invitedGuests}
          setInvitedGuests={setInvitedGuests}
          nonUserGuests={nonUserGuests}
        ></DesktopAddGuestsPage>}></Route>

        <Route path="/newGuests" element={<AddGuestsNewPage
          nonUserGuests={nonUserGuests}
          setNonUserGuests={setNonUserGuests}
        ></AddGuestsNewPage>}></Route>

        <Route path="/reviewEvent" element={<ReviewEventPage
          eventDetails={eventDetails}
          detailsCompleted={detailsCompleted}
          invitedGuests={invitedGuests}
        ></ReviewEventPage>}></Route>
      </Routes>
    </>
  );
}

export default EditPagesRoutes;