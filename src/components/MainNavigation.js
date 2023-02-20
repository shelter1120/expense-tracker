import React from "react";
import { NavLink } from "react-router-dom";
import "./MainNavigation.css"
const MainNavigation = () => {
  return (
    <div className='mainNav'>
      <nav>
        <ul>
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/expense">Expense</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profile</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MainNavigation;
