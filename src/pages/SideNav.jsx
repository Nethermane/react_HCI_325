import React from "react";
import { Link } from "react-router-dom";
import "./SideNav.css";

function SideNav() {
  return (
    <ul className="sideNav">
      <li className="item">
        <Link className="text" to="./addgoal">
          <i class="fa fa-bullseye"></i>
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
          Add Income
        </Link>
      </li>
    </ul>
  );
}

export default SideNav;
