import React, { useState } from "react";
import "./ProfilePage.css";
import Button from "../../../Components/Buttons/Button";

const ProfilePage = () => {
  const [profileImage, setProfileImage] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

  return (
    <div className="profile-outer-container">
      <div className="profile-container">
        <div className="profile-box">
          <h1>User Profile</h1>
          <div className="image-upload">
            <label htmlFor="file-upload" className="upload-label">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              ) : (
                <div className="upload-placeholder">Upload Profile Image</div>
              )}
            </label>
            <input
              id="file-upload"
              type="file"
              onChange={handleFileChange}
              className="file-input"
            />
          </div>
          <div className="profile-info">
            <label>
              <span>Username:</span>
              <input
                type="text"
                placeholder="Username"
                className="input-field"
              />
            </label>
            <label>
              <span>Email:</span>
              <input type="email" placeholder="Email" className="input-field" />
            </label>
            <Button label={"UPDATE"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
