import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import db from "../utils/db";

export default function Home() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch contacts from Firestore when the component loads
    const contactRef = collection(db, "contacts");

    getDocs(contactRef).then((querySnapshot) => {
      const contactList = [];

      querySnapshot.forEach((doc) => {
        contactList.push({
          id: doc.id,
          ...doc.data()
        });
      });

      contactList.sort((a, b) => a.lastName.localeCompare(b.lastName));
      setContacts(contactList);
    });
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    `${contact.firstName} ${contact.lastName}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );
  // Filter the contact list based on the search input

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="mb-0">Contacts</h3>
          <Link to="/add" className="btn btn-outline-primary btn-sm">+</Link>
        </div>

        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <ul className="list-group">
          {filteredContacts.length > 0 ? (
            filteredContacts.map((contact) => (
              <li key={contact.id} className="list-group-item">
                <Link to={`/contact/${contact.id}`} className="text-decoration-none text-dark">
                  {contact.firstName} {contact.lastName}
                </Link>
                {/*  Link to view this contact's details */}
              </li>
            ))
          ) : (
            <li className="list-group-item text-muted">No contacts found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
