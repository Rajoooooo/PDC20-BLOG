import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './registration.css';

function Home() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">My Website</div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
        <div
          className="user-info"
          onClick={() => setDropdownVisible(!dropdownVisible)}
        >
          <img
            src={storedUser?.profilePic || 'https://via.placeholder.com/40'}
            alt="Profile"
            className="profile-pic"
          />
          <span>{storedUser?.username}</span>
          <div className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      </header>
      <main>
        <h1>Welcome to the Home Page</h1>
        <p>
          You are logged in as <strong>{storedUser?.username}</strong>.
        </p>
      </main>
    </div>
  );
}

export default Home;
