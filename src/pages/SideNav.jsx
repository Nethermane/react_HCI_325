import React from "react";
import { Link } from "react-router-dom";
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
        <Link className="text" to="./addgoal">
          <div className="icon">
            <FontAwesomeIcon icon={faBullseye} />
          </div>
          Add Goal
        </Link>
      </li>
      <li className="item">
        <Link className="text" to="./addexpense">
          <div className="icon">
            <FontAwesomeIcon icon={faMoneyCheckAlt} />
          </div>
          Add Expense
        </Link>
      </li>
      <li className="item">
        <Link className="text" to="./addincome">
          <div className="icon">
            <FontAwesomeIcon icon={faSuitcase} />
          </div>
          Add Income
        </Link>
      </li>
    </ul>
  );
}

export default SideNav;
