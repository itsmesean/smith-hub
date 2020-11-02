import React from "react";
import Nav from "../components/Header/Nav";

function Header() {
  return (
    <header className="header">
      <div className="heading">
        <img src="/assets/cs_logo.png" alt="" />
      </div>
      <Nav />
    </header>
  );
}

export default Header;
