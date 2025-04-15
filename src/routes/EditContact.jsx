import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import db from "../utils/db";

export default function EditContact() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  useEffect(() => {
    const contactRef = doc(db, "contacts", id);

    getDoc(contactRef).then((docSnap) => {
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      } else {
        alert("Contact not found.");
        navigate("/");
      }
    });
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const contactRef = doc(db, "contacts", id);

    updateDoc(contactRef, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong while updating.");
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Edit Contact</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Contact</button>
      </form>
    </div>
  );
}
