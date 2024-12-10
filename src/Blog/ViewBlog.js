// src/Blog/ViewBlog.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // To get the blog ID from the URL
import './view.css'; // Assuming styles are in this file

function ViewBlog() {
  const { id } = useParams(); // Get the ID from the URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Retrieve the stored blogs from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = storedBlogs[id]; // Use the ID to get the selected blog
    setBlog(selectedBlog);
  }, [id]);

  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }

  return (
    <div className="view-blog-container">
      <div className="blog-header">
        <h1>{blog.title}</h1>
        <div className="author-info">
          <span className="author">By: {blog.author}</span>
        </div>
      </div>

      <div className="blog-content">
        <img src={blog.image || 'https://via.placeholder.com/800x400'} alt={blog.title} className="blog-image" />
        <p>{blog.content}</p>
      </div>
    </div>
  );
}

export default ViewBlog;
