// src/components/Layout.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    // Clear the user data from local storage and redirect to login page
    localStorage.removeItem('user');
    window.location.href = '/login'; // or use react-router's useHistory if needed
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="layout-container">
      <header className="navbar">
        <div className="logo">My Website</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div className="user-info" onClick={toggleDropdown}>
          <img
            src={storedUser?.profilePic || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="profile-pic"
          />
          <span>{storedUser?.username}</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;
