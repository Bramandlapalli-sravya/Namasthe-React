import React from "react";
import logo from "../assets/swiggy-logo.png";
import "../Header/style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container">
        <img src={logo} loading="lazy" width={260} height={80} />
      </div>
      <div className="nav-items">
        <ul>
          <li>Home</li>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
