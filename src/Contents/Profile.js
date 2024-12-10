import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
    } else {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [navigate]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Your Profile</h2>
      <div className="profile-card">
        <img
          src={user.profilePic || 'https://via.placeholder.com/150'}
          alt="Profile"
          className="profile-img"
        />
        <div className="profile-details">
          <h3>{user.fullName}</h3>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
          <p><strong>Address:</strong> {user.address}</p>
          <p><strong>About Me:</strong> {user.aboutMe}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
