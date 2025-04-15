import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import db from "../utils/db";

export default function AddContact() {
  const navigate = useNavigate();

// State for the form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  // Add the new contact to Firestore
  const handleSubmit = (e) => {

    e.preventDefault();

    const contactsRef = collection(db, "contacts");

    addDoc(contactsRef, {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert("Something went wrong. Please try again.");
        console.error(error);
      });
  };

  return (
    <div>
      <h2>Add New Contact</h2>
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
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
}
