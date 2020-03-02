import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="navBar">
      <div className="header">
        <h1 style={{ color: "purple" }}>StüPay</h1>
      </div>
      <ul className="navItems">
        <li>
          <Link className="navItem" to="/home">
            <i class="fa fa-home"></i>
            HOME
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/expenses">
            <i class="fa fa-sticky-note"></i>
            REPORTS
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/account">
            CASH FLOWS
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
