import React from "react";
import Nav from "../components/Header/Nav";

function Header() {
  return (
    <div className="header">
      <div className="heading">
        <img src="/assets/cs_logo.png" alt="" />
      </div>
      <Nav />
    </div>
  );
}

export default Header;
