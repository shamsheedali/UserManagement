import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formData = {
    email,
    password
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/admin/admin_login', formData);
      console.log(response);

      if(response.status === 200){
        toast.success("Login Successfull");
        console.log("Login Successfull");
        localStorage.setItem('token', response.data.token);

        setEmail("");
        setPassword("");

        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error("Error Loging in", error);
      toast.error("Login Failed. Try again");
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h1>Admin Login</h1>
        <form className="admin-login-form" onSubmit={handleSubmit}>
          <label>
            <input
              type="email"
              placeholder="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button type="submit" className="admin-login-btn">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
