import { Link } from 'react-router-dom';
import React from 'react';

export const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light  bg-transparent">
      <div className="container-fluid">
        <Link to="/" className="text-white   text-decoration-none">Lab 5</Link>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/loadFile" className="text-white nav-link ">Load JSON</Link>
            </li>
            <li className="nav-item">
              <Link to="/jsonEditor" className="text-white nav-link">JSON editor</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
