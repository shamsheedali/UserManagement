import React, { useState } from 'react';
import './AddUserModal.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddUserModal = ({ isOpen, onClose, onAddUser  }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const formData = {
    username,
    email,
    password
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/signup', formData); 
      if(response.status === 201){
        toast.success("New User Added!");
        console.log("new user added");
        localStorage.setItem('token', response.data.token)

        
        setUsername('');
        setEmail('');
        setPassword('');
        onAddUser(response.data.newUser);
        onClose();
      }
    } catch (error) {
      console.error("Error Adding user:", error);
      toast.error("Error Adding New User!!!.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add User</h2>
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
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="submit-btn">Add User</button>
            <button type="button" className="close-btn" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
