import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './layout.css';

function Layout({ children }) {
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="layout-container">
      <header className="navbar navbar-expand-lg navbar-dark bg-dark shadow">
        <div className="container">
          <Link to="/" className="navbar-brand logo">React Chronicles</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <nav className="me-auto">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/about" className="nav-link">About</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
            </nav>
            {/* Uncomment below if you want to use the user dropdown */}
            {/* <div className="user-info dropdown">
              <span className="nav-link dropdown-toggle" onClick={toggleDropdown} role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                {storedUser?.username}
              </span>
              <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuLink">
                <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </div>
            </div> */}
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="footer bg-dark text-white text-center py-3">
        <p className="mb-0">Copyright © 2020. PDC20-React-Blog.</p>
      </footer>
    </div>
  );
}

export default Layout;
