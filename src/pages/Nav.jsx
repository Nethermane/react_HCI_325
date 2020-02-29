import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navBar">
      <div className="header">
        <h1 style={{ color: "purple" }}>StüPay</h1>
      </div>
      <ul className="navItems">
        <Link className="navItem" to="/home">
          <li>HOME</li>
        </Link>
        <Link className="navItem" to="/expenses">
          <li>EXPENSES</li>
        </Link>
        <Link className="navItem" to="/account">
          <li>ACCOUNT</li>
        </Link>
      </ul>
    </div>
  );
}

export default Nav;
