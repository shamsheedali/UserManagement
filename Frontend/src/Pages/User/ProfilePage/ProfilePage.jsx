import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import Button from "../../../Components/Buttons/Button";
import defaultPhoto from "../../../Assets/ProfilePic.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    profileImage: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/user/profile-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUserData({
          profileImage: response.data.profileImage,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Create a preview URL for the uploaded image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("file-upload");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("/api/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      alert("Profile image uploaded successfully!");

      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Conditionally set the image source for preview (uploaded file or base64 image from server)
  const profileImageSrc = profileImage
    ? profileImage // If an image is selected, show the preview
    : userData.profileImage
    ? `data:image/jpeg;base64,${userData.profileImage}` // Otherwise, show the base64 image from server
    : defaultPhoto; // If neither, show the default image

  return (
    <div className="profile-outer-container">
      <div className="profile-container">
        <form className="profile-box" onSubmit={handleSubmit}>
          <h1>User Profile</h1>
          <div className="image-upload">
            <label htmlFor="file-upload" className="upload-label">
              <img
                src={profileImageSrc}
                alt="Profile"
                className="profile-image"
              />
            </label>
            <input
              id="file-upload"
              type="file"
              name="profileImage"
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              <span>Email:</span>
              <input
                type="email"
                placeholder="Email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <Button label={"UPDATE"} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
