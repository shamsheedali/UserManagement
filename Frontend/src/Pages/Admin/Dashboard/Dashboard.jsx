import React, { useState } from "react";
import "./Dashboard.css";
import AddUserModal from "../AddUserModal/AddUserModal";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { id: 1, username: 'user1', email: 'user1@example.com' },
    { id: 2, username: 'user2', email: 'user2@example.com' },
    { id: 3, username: 'user3', email: 'user3@example.com' },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditUser = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="add-user-btn" onClick={() => setModalOpen(true)}>Add User</button>
      </div>
      <table className="user-list">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter(user => user.username.includes(searchQuery) || user.email.includes(searchQuery))
            .map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditUser(user.id)}>Edit</button>
                  <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );};

export default Dashboard;
