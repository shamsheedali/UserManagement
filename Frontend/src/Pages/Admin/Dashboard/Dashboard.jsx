import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import AddUserModal from "../AddUserModal/AddUserModal";
import axios from "axios";

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      <div className="container">
        <button className="logout-btn">
          Logout
        </button>

        <h2>Admin Dashboard</h2>

        <div className="top-bar">
          <div className="search-box">
            <input
              type="text"
              id="search"
              placeholder="Search users..."
              onChange={handleSearchChange}
            />
            <button>Search</button>
          </div>
          <button className="add-user-btn">Add User</button>
        </div>

        <table id="userTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user.id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddUserModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
};

export default Dashboard;
