import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import AddUserModal from "../AddUserModal/AddUserModal";
import axios from 'axios'

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/admin/get_users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data); 
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEditUser = (id) => {
    console.log(`Edit user with ID: ${id}`);
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
            .filter(user => user.username.includes(searchQuery))
            .map(user => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEditUser(user.id)}>Edit</button>
                  <button className="delete-btn">Delete</button>
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
