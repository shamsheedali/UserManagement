import React from 'react';
import './Signup.css';

const Signup = () => {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <form>
          <input type="text" placeholder="username" className="input-field" />
          <input type="email" placeholder="email" className="input-field" />
          <input type="password" placeholder="password" className="input-field" />
          <button type="submit" className="signup-btn">SIGN UP</button>
        </form>
        <div className="login-link">
          <p>Already a user? <a href="#">Login here</a></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
