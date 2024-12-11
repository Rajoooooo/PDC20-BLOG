import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profile.css';

function Profile() {
  const [user, setUser] = useState(null);
  const [blogCount, setBlogCount] = useState(0); // To store the number of blogs
  const navigate = useNavigate();

  useEffect(() => {
    // Get the stored user from localStorage
    const storedUser = JSON.parse(localStorage.getItem('currentUser'));
    if (storedUser) {
      setUser(storedUser);
      // Get the number of blogs published by the current user
      const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      const userBlogs = blogs.filter(blog => blog.author === storedUser.username);
      setBlogCount(userBlogs.length); // Set the blog count
    } else {
      // Redirect to login if no user is found
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

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
          <p><strong>Blogs Published:</strong> {blogCount}</p> {/* Display blog count */}
        </div>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Profile;
