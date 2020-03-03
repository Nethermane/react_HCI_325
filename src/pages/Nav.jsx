import React from "react";
import "./Nav.css";
import { Link } from "react-router-dom";
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
          <Link className="navItem" to="/home">
            <div className="icon">
              <FontAwesomeIcon icon={faHome} />
            </div>
            HOME
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/reports">
            <div className="icon">
              <FontAwesomeIcon icon={faClipboardList} />
            </div>
            REPORTS
          </Link>
        </li>
        <li>
          <Link className="navItem" to="/cashflows">
            <div className="icon">
              <FontAwesomeIcon icon={faWallet} />
            </div>
            CASH FLOWS
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
