import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navBar">
      <div className="header">
        <h1 style={{ color: "purple" }}>Büdge-it</h1>
      </div>
      <ul className="navItems">
        <Link className="navItem" to="/home">
          <li>HOME</li>
        </Link>
        <Link className="navItem" to="/report">
          <li>REPORT</li>
        </Link>
        <Link className="navItem" to="/cashflow">
          <li>CASH FLOW</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
