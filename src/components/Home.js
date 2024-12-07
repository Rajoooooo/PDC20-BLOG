import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to the Home Page</h1>
      <p>You are logged in!</p>
      <p>
        <Link to="/login">Log Out</Link>
      </p>
    </div>
  );
}

export default Home;
