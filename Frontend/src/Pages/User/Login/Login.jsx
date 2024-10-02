import React from 'react'
import './Login.css'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <form>
          <input type="text" placeholder="username" className="input-field" />
          <input type="password" placeholder="password" className="input-field" />
          <button type="submit" className="login-btn">LOGIN</button>
        </form>
        <div className="signup-link">
          <p>Not registered? <a href="#">Create an account</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
