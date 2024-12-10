import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('create'); // New state to manage active tab
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

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const getBlogs = () => {
    return JSON.parse(localStorage.getItem('blogs')) || [];
  };

  const deleteBlog = (index) => {
    const storedBlogs = getBlogs();
    storedBlogs.splice(index, 1);
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    // Force a re-render after deletion
    setActiveTab('view');
  };

  return (
    <div className="create-blog-container">
      <h1>{activeTab === 'create' ? 'Create Blog' : 'View Blogs'}</h1>
      <div className="tabs">
        <button onClick={() => handleTabSwitch('create')}>Create Blog</button>
        <button onClick={() => handleTabSwitch('view')}>View Blogs</button>
      </div>
      
      {activeTab === 'create' ? (
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
      ) : (
        <div className="blog-list">
          {getBlogs().length === 0 ? (
            <p>No blogs yet!</p>
          ) : (
            <ul>
              {getBlogs().map((blog, index) => (
                <li key={index}>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  {blog.image && <img src={blog.image} alt={blog.title} />}
                  <button onClick={() => deleteBlog(index)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateBlog;
