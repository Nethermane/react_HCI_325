import React from "react";
import { NavLink } from "react-router-dom";
import "./SideNav.css";
import {
  faBullseye,
  faSuitcase,
  faMoneyCheckAlt
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function SideNav() {
  return (
    <ul className="sideNav">
      <li className="item">
        <NavLink className="text" to="./addgoal" activeClassName="active">
          <div className="icon">
            <FontAwesomeIcon icon={faBullseye} />
          </div>
          Add Goal
        </NavLink>
      </li>
      <li className="item">
        <NavLink className="text" to="./addexpense" activeClassName="active">
          <div className="icon">
            <FontAwesomeIcon icon={faMoneyCheckAlt} />
          </div>
          Add Expense
        </NavLink>
      </li>
      <li className="item">
        <NavLink className="text" to="./addincome" activeClassName="active">
          <div className="icon">
            <FontAwesomeIcon icon={faSuitcase} />
          </div>
          Add Income
        </NavLink>
      </li>
    </ul>
  );
}

export default SideNav;
