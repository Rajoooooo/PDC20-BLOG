import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [activeTab, setActiveTab] = useState('create');
  const [editingId, setEditingId] = useState(null); // Track the blog ID being edited
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};

  const getBlogs = () => JSON.parse(localStorage.getItem('blogs')) || [];

  const filterBlogsByUser = () =>
    getBlogs().filter(blog => blog.author === currentUser.username);

  // Handle the submission of the new or edited blog
  const handleSubmit = (e) => {
    e.preventDefault();
    const newBlog = { id: editingId || Date.now().toString(), title, content, image: imageUrl, author: currentUser.username };

    const storedBlogs = getBlogs();

    if (editingId !== null) {
      // Edit existing blog
      const blogIndex = storedBlogs.findIndex(blog => blog.id === editingId);
      if (blogIndex !== -1) {
        storedBlogs[blogIndex] = newBlog;
      }
    } else {
      // Create a new blog
      storedBlogs.push(newBlog);
    }

    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setEditingId(null); // Clear the editing state
    setActiveTab('view'); // Switch to the "View" tab after submission
    navigate('/'); // Navigate back to the home page or blog list
  };

  // Switch between tabs (create or view)
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  // Delete blog with confirmation
  const deleteBlog = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      const storedBlogs = getBlogs();
      const updatedBlogs = storedBlogs.filter(blog => blog.id !== id); // Remove the selected blog by id
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      setActiveTab('view'); // Switch back to the "View" tab after deletion
    }
  };

  // Handle the edit of an existing blog
  const handleEdit = (id) => {
    const blogToEdit = getBlogs().find(blog => blog.id === id);
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImageUrl(blogToEdit.image);
      setEditingId(id); // Set the id of the blog being edited
      setActiveTab('create'); // Switch to the "Create" tab for editing
    }
  };

  // Pre-populate fields for editing if we're on the "edit" page
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const blogToEdit = getBlogs().find(blog => blog.id === id);
      if (blogToEdit && blogToEdit.author === currentUser.username) {
        setTitle(blogToEdit.title);
        setContent(blogToEdit.content);
        setImageUrl(blogToEdit.image);
        setEditingId(blogToEdit.id); // Set the id of the blog being edited
        setActiveTab('create'); // Switch to "create" tab for editing
      } else {
        navigate('/'); // Redirect if the blog is not found or is not authored by the current user
      }
    }
  }, [id, currentUser.username, navigate]);

  return (
    <div className="create-blog-container">
      <h1>{activeTab === 'create' ? (editingId !== null ? 'Edit Blog' : 'Create Blog') : 'View Blogs'}</h1>
      <div className="tabs">
        <button onClick={() => handleTabSwitch('create')}>Create Blog</button>
        <button onClick={() => handleTabSwitch('view')}>View Blogs</button>
      </div>
      {activeTab === 'create' ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Image URL:</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>
          <button type="submit">{editingId !== null ? 'Update Blog' : 'Submit Blog'}</button>
        </form>
      ) : (
        <div className="blog-list">
          {filterBlogsByUser().length === 0 ? (
            <p>No blogs yet!</p>
          ) : (
            <ul>
              {filterBlogsByUser().map((blog) => (
                <li key={blog.id}>
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  {blog.image && <img src={blog.image} alt={blog.title} />}
                  <button onClick={() => handleEdit(blog.id)}>Edit</button>
                  <button onClick={() => deleteBlog(blog.id)}>Delete</button>
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
