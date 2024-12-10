// src/Contents/HomeContent.js
import React from 'react';
import './content.css';

function HomeContent({ blogs }) {
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeContent;
