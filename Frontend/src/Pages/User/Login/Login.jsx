import React, { useState } from "react";
import "./Login.css";
import SignupAndLogin from "../../../Components/Buttons/SignupAndLogin";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/user/login", formData);
      console.log(response.data);

      if (response.status === 200) {
        alert("Login Successfull");
        console.log("Login Successfull");

        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error("Error Loging in", error);
      alert("Login Failed. Try again");
    }
  };

  return (
    <div className="login-outer-container">
      <div className="login-container">
        <div className="login-box">
          <form onSubmit={handleSubmit}>
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
            <SignupAndLogin />
          </form>
          <div className="signup-link">
            <p>
              Not registered? <Link to={"/signup"}>Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
