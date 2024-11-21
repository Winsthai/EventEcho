import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { BottomNavigationAction } from "@mui/material";
import "./MobileInviteGuests.css";
import "./DesktopInviteGuests.css";
import arrowIcon from '../../images/arrow button.png';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];

function CreateEventPageInvite() {
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
        <div className="mobile-header">
            <button className="header-button">
                <img src={arrowIcon} alt="Arrow"/>
            </button>
            <h2>Invite Guests</h2>
        </div>
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
      <button onClick={handleReview} className="mobile-reviewButton">
        Review Event Details
      </button>
    </div>
  );

  // Desktop Layout
  const DesktopLayout = () => (
    <div className="desktop-container">
      <div className="desktop-content">
        <h2>Create a New Event</h2>
        <div className="desktop-progress">
          <span>Event Details</span>
          <span className="desktop-activeStep">Invite Guests</span>
          <span>Review and Post</span>
        </div>
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
        <button onClick={handleReview} className="desktop-reviewButton">
          Review Event Details
        </button>
      </div>
    </div>
  );

  return isMobile ? <MobileLayout /> : <DesktopLayout />;
}

export default CreateEventPageInvite;
