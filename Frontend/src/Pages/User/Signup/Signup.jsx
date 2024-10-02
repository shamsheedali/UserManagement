import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    username,
    email,
    password,
  };

  //handleing submit and sending data
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/signup", formData);
      console.log(response.data); // Handle success

      if (response.status === 201) {
        alert("Signup Successfull");
        console.log("Signup Successfull");

        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Signup Failed. Try again.");
    }
  };

  return (
    <div className="signup-outer-container">
      <div className="signup-container">
        <div className="signup-box">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="username"
              className="input-field"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="signup-btn">
              SIGN UP
            </button>
          </form>
          <div className="login-link">
            <p>
              Already a user? <Link to={"/login"}>Login here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
