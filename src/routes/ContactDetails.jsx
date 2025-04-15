import { useEffect, useState } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, useNavigate, Link } from "react-router-dom";
import db from "../utils/db";

export default function ContactDetails() {
  // Get the contact ID from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a reference to the specific contact in Firestore
    const contactRef = doc(db, "contacts", id);

    getDoc(contactRef).then((docSnap) => {
      if (docSnap.exists()) {
        setContact(docSnap.data());
      } else {
        navigate("/");
      }
      setLoading(false);
    });
  }, [id, navigate]);

  const handleDelete = () => {
      // Delete the contact from Firestore and go back to home
    deleteDoc(doc(db, "contacts", id)).then(() => {
      navigate("/");
    });
  };

  if (loading) return <p className="text-center mt-5">Loading contact...</p>;

  return (
    <div className="container mt-5">
      <div className="bg-white p-4 rounded shadow-sm" style={{ maxWidth: "500px", margin: "0 auto" }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <Link to="/" className="btn btn-link btn-sm text-decoration-none">&lt; Back</Link>
          <Link to={`/edit/${id}`} className="btn btn-outline-secondary btn-sm">Edit</Link>
        </div>

        <h4 className="mb-3">{contact.firstName} {contact.lastName}</h4>

        <p className="mb-2"><strong>Email:</strong><br />{contact.email}</p>
        <p className="mb-2"><strong>Phone:</strong><br />{contact.phone || "Not available"}</p>
        <p className="mb-4"><strong>Address:</strong><br />{contact.address || "Not available"}</p>

        <button className="btn btn-danger w-100" onClick={handleDelete}>Delete Contact</button>
      </div>
    </div>
  );
}
