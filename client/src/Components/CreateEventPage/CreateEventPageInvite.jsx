import React, { useState } from "react";

const contacts = [
  { id: 1, name: "Steven Nguyen", phone: "(403)-000-0000" },
  { id: 2, name: "Winston Thai", phone: "(403)-111-1111" },
  { id: 3, name: "Shaun Tapiau", phone: "(403)-222-2222" },
  { id: 4, name: "Ahmed Elshabasi", phone: "(403)-333-3333" },
  { id: 5, name: "Desmond Lau", phone: "(403)-444-4444" },
];

function CreateEventPageInvite() {
  const [selectedContacts, setSelectedContacts] = useState([]);

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

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Invite Guests</h2>
      <input
        type="text"
        placeholder="Search contacts"
        style={styles.searchInput}
      />
      <ul style={styles.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id} style={styles.contactItem}>
            <div style={styles.contactInfo}>
              <div style={styles.avatar}>{contact.name[0]}</div>
              <div>
                <p style={styles.name}>{contact.name}</p>
                <p style={styles.phone}>{contact.phone}</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={selectedContacts.includes(contact.id)}
              onChange={() => handleSelect(contact.id)}
              style={styles.checkbox}
            />
          </li>
        ))}
      </ul>
      <button style={styles.reviewButton}>
        Review Event Details
      </button>
    </div>
  );
}

const styles = {
  container: {
    padding: "16px",
    fontFamily: "'Arial', sans-serif",
  },
  header: {
    fontSize: "24px",
    marginBottom: "16px",
  },
  searchInput: {
    width: "100%",
    padding: "8px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "4px",
  },
  contactList: {
    listStyleType: "none",
    padding: 0,
  },
  contactItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
    borderBottom: "1px solid #ddd",
  },
  contactInfo: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "40px",
    height: "40px",
    backgroundColor: "#f2f2f2",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "8px",
  },
  name: {
    fontSize: "16px",
    margin: 0,
  },
  phone: {
    fontSize: "12px",
    color: "#888",
    margin: 0,
  },
  checkbox: {
    width: "20px",
    height: "20px",
  },
  reviewButton: {
    width: "100%",
    padding: "12px",
    marginTop: "16px",
    backgroundColor: "#ff5c5c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default CreateEventPageInvite;
