import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import AddUserModal from "../AddUserModal/AddUserModal";
import axios from "axios";
import DeleteUserModal from "../DeleteUserModal/DeleteUserModal";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import EditUserModal from "../EditUserModal/EditUserModal";

const Dashboard = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [editPlaceholder, setEditPlaceholder] = useState({});

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

  // Handle search query
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const handleAddUser = (newUser) => {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setAddModalOpen(false); // Close the modal after adding user
  };

  const handleEditUser = (userId, username, email) => {
    setEditModalOpen(true);
    setUserId(userId);
    setEditPlaceholder({username, email});
  };

  const handleUserEdit = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      )
    );
    setEditModalOpen(false);
  };

  const handleUserDeleted = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
  };

  const handleDeleteUser = (userId) => {
    setDeleteModalOpen(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfull");

    navigate("/admin_login");
  };

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery)
  );

  return (
    <div className="admin-dashboard-container">
      <div className="container">
        <button className="admin-logout-btn" onClick={handleLogout}>
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
          <button
            className="add-user-btn"
            onClick={() => setAddModalOpen(true)}
          >
            Add User
          </button>
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
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleEditUser(user._id, user.username, user.email)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteUser(user._id)}
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
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
        onAddUser={handleAddUser}
      />
      <DeleteUserModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        userId={userId}
        onUserDeleted={handleUserDeleted}
      />
      <EditUserModal
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        userId={userId}
        onEditUser={handleUserEdit}
        userDetails={editPlaceholder}
      />
    </div>
  );
};

export default Dashboard;
