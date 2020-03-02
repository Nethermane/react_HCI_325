import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
  return (
    <ul className="sideNav">
      <li className="item">
        <Link className="text" to="./addgoal">
          Add Goal
        </Link>
      </li>
      <li className="item">
        <Link className="text" to="./addexpense">
          Add Expense
        </Link>
      </li>
      <li className="item">
        <Link className="text" to="./addincome">
          dd Income
        </Link>
      </li>
    </ul>
  );
}

export default SideNav;
