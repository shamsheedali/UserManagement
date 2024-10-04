import React, { useEffect, useState } from "react";
import "./EditUserModal.css";
import axios from "axios";
import { toast } from "react-toastify";

const EditUserModal = ({ isOpen, onClose, userId, onEditUser, userDetails }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (userDetails) {
      setUsername(userDetails.username || "");
      setEmail(userDetails.email || "");
    }
  }, [userDetails]);

  const formData = {
    username,
    email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/admin/edit_user/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("User Details Updated");
        console.log("Updated User Data:", response.data.updatedUser);

        const updatedUser = response.data.updatedUser;
        onEditUser(updatedUser);
        setUsername("");
        setEmail("");
        onClose();
      }
    } catch (error) {
      console.error("Error Editing user:", error);
      toast.error("Error Editing New User!!!.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">
              Update
            </button>
            <button type="button" className="close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
