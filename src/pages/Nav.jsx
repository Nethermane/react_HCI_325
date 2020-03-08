import React from "react";
import "./Nav.css";
import { NavLink } from "react-router-dom";
import {
  faHome,
  faClipboardList,
  faWallet
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Nav() {
  return (
    <div className="navBar">
      <div className="header">
        <h1 style={{ color: "white" }}>Büdge-it</h1>
      </div>
      <ul className="navItems">
        <li>
          <NavLink className="navItem" to="/home" activeClassName="active" >
            <div className="icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            HOME
          </NavLink>
        </li>
        <li>
          <NavLink className="navItem" to="/reports" activeClassName="active">
            <div className="icon">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
            REPORTS
          </NavLink>
        </li>
        <li>
          <NavLink className="navItem" to="/cashflows" activeClassName="active">
            <div className="icon">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            CASH FLOWS
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
