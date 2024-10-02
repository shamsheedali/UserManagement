import React from "react";
import "./Button.css";

const Button = ({label}) => {
  return (
    <div>
      <button type="submit" className="login-btn">
        {label}
      </button>
    </div>
  );
};

export default Button;
