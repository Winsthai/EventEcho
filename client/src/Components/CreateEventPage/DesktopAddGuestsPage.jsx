import * as React from 'react';
import { Box } from '@mui/material';
import { useMediaQuery, Stack } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import "./MobileInviteGuests.css";
import "./DesktopInviteGuests.css";
import arrowIcon from '../../images/arrow button.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {useState} from "react";

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];


export default function DesktopAddGuestsPage() {
  const onEditPage = location.pathname.includes("edit");
  console.log(onEditPage);

  const [selectedContacts, setSelectedContacts] = useState([]);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleSelect = (id) => {
    setSelectedContacts((prev) =>
      prev.includes(id)
        ? prev.filter((contactId) => contactId !== id)
        : [...prev, id]
    );
  };

  const handleReview = () => {
    alert(`Selected contacts: ${selectedContacts.join(", ")}`);
  };

  // Mobile Layout
  const MobileLayout = () => (
    <div className="mobile-container">
        <Stack direction="row">
        <button className="header-button">
                <img src={arrowIcon} alt="Arrow"/>
        </button>
            <h2>Invite Guests</h2>
        </Stack>
      <input
        type="text"
        placeholder="Search contacts"
        className="mobile-searchInput"
      />
      <ul className="mobile-contactList">
        {contacts.map((contact) => (
          <li key={contact.id} className="mobile-contactItem">
            <div className="mobile-contactInfo">
              <div className="mobile-avatar">{contact.name[0]}</div>
              <div>
                <p className="mobile-name">{contact.name}</p>
                <p className="mobile-phone">{contact.phone}</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => handleSelect(contact.id)}
              className="mobile-checkbox"
            />
          </li>
        ))}
      </ul>
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="desktop-container">
      <div className="desktop-content">
        <div className="desktop-search-and-add">
            <input
                type="text"
                placeholder="Search Contacts"
                className="search-input"
            />
            <BottomNavigationAction
                icon={<PersonAddIcon />}
                className="add-icon"
            />
        </div>

        <h2 className = "your-friends-text">Your Friends</h2>

        
        <div className="desktop-contactGrid">
          {contacts.map((contact) => (
            <div key={contact.id} className="desktop-contactCard">
                <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleSelect(contact.id)}
                className="desktop-checkbox"
              />
              <div className="desktop-avatar">{contact.name[0]}</div>
              <div>
                <p className="desktop-name">{contact.name}</p>
                <p className="desktop-phone">{contact.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;

  return (
    <Box sx={{ margin: 10, zIndex: 2 }}>
      {/* add code here */}


      {/* can ignore this below for now I think */}
      {onEditPage ? <div>hello edit guest list page (edit)</div> : <div>hello add guest list page (create)</div>}
    </Box>

  );
};
