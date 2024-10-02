import React from "react";
import "./HomePage.css";
import defaultPhoto from "../../../Assets/ProfilePic.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);

      //profile-page-loding
      navigate("/profile");
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="home-outer-container">
      <div className="home-container">
        <div className="home-box">
          {/* Profile Image */}
          <div className="profile-image-container">
            <img
              src={defaultPhoto}
              alt="User Profile"
              className="profile-image"
            />
          </div>
          <h1>Welcome, User!</h1>
          <button onClick={fetchProfile} className="profile-btn">
            Go to Profile
          </button>
          <button className="logout-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
