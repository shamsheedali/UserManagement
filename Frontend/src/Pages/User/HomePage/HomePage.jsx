import React, { useEffect, useState } from "react";
import "./HomePage.css";
import defaultPhoto from "../../../Assets/ProfilePic.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    username: "user",
    profileImage: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("/api/user/profile-data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data);
        setUserData({
          username: response.data.username,
          profileImage: response.data.profileImage,
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const profileImageSrc = userData.profileImage
    ? `data:image/jpeg;base64,${userData.profileImage}`
    : defaultPhoto;

  return (
    <div className="home-outer-container">
      <div className="home-container">
        <div className="home-box">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img
              src={profileImageSrc}
              alt="User Profile"
              className="profile-image"
            />
          </div>
          <h1>Welcome, {userData.username}!</h1>
          <button onClick={handleProfileClick} className="profile-btn">
            Go to Profile
          </button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
