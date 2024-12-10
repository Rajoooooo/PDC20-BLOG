// src/Blog/CreateBlog.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { title, content, image: imageUrl };

    // Get existing blogs from localStorage, or initialize an empty array
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];

    // Save the new blog in localStorage
    storedBlogs.push(newBlog);
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));

    // Redirect to Home page
    navigate('/');
  };

  return (
    <div className="create-blog-container">
      <h1>Create Blog</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Submit Blog</button>
      </form>
    </div>
  );
}

export default CreateBlog;
