// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">My App</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/users">All Users</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">Add User</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/statistics">Statistics</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
