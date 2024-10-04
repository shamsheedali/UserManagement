import React, { useState } from "react";
import './DeleteUserModal.css'
import axios from 'axios';
import { toast } from 'react-toastify';

const DeleteUserModal = ({ isOpen, onClose, userId, onUserDeleted  }) => {

    const handleSubmit = async(e) => {
      e.preventDefault();
      try {
        const token = localStorage.getItem('token') 
        const response = await axios.get(`/api/admin/delete_user/${userId}`, {
          headers:{
            Authorization: `Bearer ${token}`,
          }
        })
        if(response.status === 200){
          toast.success("User Deleted Successfully!!");
          console.log("User Deleted");
          onUserDeleted(userId);
          onClose();
        }
      } catch (error) {
        toast.error("Error Deleting User");
      }
    };
  
    if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="delete-modal-content">
        <h2>Delete User</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-actions">
            <button type="submit" className="close-btn">
              YES
            </button>
            <button type="button" className="submit-btn" onClick={onClose}>
              No
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteUserModal;
