import React from "react";
import "./Header.css";
import { GoHome } from "react-icons/go";

const Header = ({ Title, Address }) => {
  return (
    <div className="head-title">
      <div className="head-left">{Title}</div>
      <div className="head-right">
        <GoHome /> <p>/ Dashboard</p> <span>/ {Address}</span>
      </div>
    </div>
  );
};

export default Header;
