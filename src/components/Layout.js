import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="layout-container">
      <header className="navbar">
        <div className="logo">React Chronicles</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/profile">Profile</Link> {/* Profile link */}
        </nav>
        <div className="user-info" onClick={toggleDropdown}>
          <span>{storedUser?.username}</span>
          {isDropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

export default Layout;
