import React from 'react'
import './AdminLogin.css'

const AdminLogin = () => {
  return (
    <div className="admin-login-container">
    <div className="admin-login-box">
      <h1>Admin Login</h1>
      <form className="admin-login-form">
        <label>
          <span>Username:</span>
          <input type="text" placeholder="Username" className="input-field" />
        </label>
        <label>
          <span>Password:</span>
          <input type="password" placeholder="Password" className="input-field" />
        </label>
        <button type="submit" className="admin-login-btn">LOGIN</button>
      </form>
    </div>
  </div>
  )
}

export default AdminLogin
