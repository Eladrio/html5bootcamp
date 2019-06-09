import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="nav-wrapper">
        <ul>
          <li><NavLink to="/">Home</NavLink></li>
          <li><NavLink to="/addmovie">Add Movie</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar;