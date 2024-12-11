import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './view.css';

function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    const selectedBlog = storedBlogs.find(blog => blog.id === id);
    setBlog(selectedBlog);
  }, [id]);

  if (!blog) {
    return <div className="not-found">Blog not found</div>;
  }

  return (
    <div className="view-blog-container">
      <h1 className="blog-title">{blog.title}</h1>
      <div className="blog-content">
        <div className="image-container">
          <img
            src={blog.image || 'https://via.placeholder.com/800x400'}
            alt={blog.title}
            className="blog-image"
          />
        </div>
        <p className="blog-text">{blog.content}</p>
      </div>
      <div className="blog-footer">
        <span className="author">Published by: {blog.author}</span>
        <div className="social-share">
          <button className="share-button">Share</button>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
