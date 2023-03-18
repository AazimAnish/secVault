import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="Sidebar">
      <nav>
        <ul>
          <li>
            <NavLink activeClassName="active" exact to="/">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/upload">
              Upload
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/inbox">
              Inbox
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/settings">
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
