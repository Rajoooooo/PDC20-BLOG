// src/Contents/HomeContent.js
import React from 'react';
import './content.css';
import { Link } from 'react-router-dom'; // Import Link to navigate

function HomeContent({ blogs, onDelete }) {
  return (
    <div className="content-container">
      <h1>Blogs</h1>
      <div className="blogs-grid">
        {blogs.map((blog, index) => (
          <div key={index} className="blog-card">
            <img src={blog.image || 'https://via.placeholder.com/300'} alt={blog.title} className="blog-image" />
            <div className="blog-details">
              <h3>{blog.title}</h3>
              <p>{blog.content}</p>
              <Link to={`/view-blog/${index}`} className="view-button">
                View
              </Link>
              {/* Add Delete Button */}
              <button onClick={() => onDelete(index)} className="delete-button">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeContent;
