import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../Blog/createblog.css';

function CreateBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageType, setImageType] = useState('url');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
  const getBlogs = () => JSON.parse(localStorage.getItem('blogs')) || [];

  const filterBlogsByUser = () =>
    getBlogs().filter(blog => blog.author === currentUser.username);

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = imageType === 'upload' ? uploadedImage : imageUrl;
    const newBlog = {
      id: editingId || Date.now().toString(),
      title,
      content,
      image,
      author: currentUser.username,
    };
    const storedBlogs = getBlogs();
    if (editingId !== null) {
      const blogIndex = storedBlogs.findIndex(blog => blog.id === editingId);
      if (blogIndex !== -1) {
        storedBlogs[blogIndex] = newBlog;
      }
    } else {
      storedBlogs.push(newBlog);
    }
    localStorage.setItem('blogs', JSON.stringify(storedBlogs));
    setEditingId(null);
    setActiveTab('view');
    navigate('/');
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const deleteBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const storedBlogs = getBlogs();
      const updatedBlogs = storedBlogs.filter(blog => blog.id !== id);
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
      setActiveTab('view');
    }
  };

  const handleEdit = (id) => {
    const blogToEdit = getBlogs().find(blog => blog.id === id);
    if (blogToEdit) {
      setTitle(blogToEdit.title);
      setContent(blogToEdit.content);
      setImageUrl(blogToEdit.image);
      setImageType(blogToEdit.image ? 'url' : 'upload');
      setEditingId(id);
      setActiveTab('create');
    }
  };

  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const blogToEdit = getBlogs().find(blog => blog.id === id);
      if (blogToEdit && blogToEdit.author === currentUser.username) {
        setTitle(blogToEdit.title);
        setContent(blogToEdit.content);
        setImageUrl(blogToEdit.image);
        setEditingId(blogToEdit.id);
        setActiveTab('create');
      } else {
        navigate('/');
      }
    }
  }, [id, currentUser.username, navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="enhanced-blog-container">
      <div className="header">
        <h1>{activeTab === 'create' ? 'Create Blog' : 'Your Blogs'}</h1>
      </div>
      <div className="tabs">
        <button className={`tab-button ${activeTab === 'create' && 'active'}`} onClick={() => handleTabSwitch('create')}>
          Create Blog
        </button>
        <button className={`tab-button ${activeTab === 'view' && 'active'}`} onClick={() => handleTabSwitch('view')}>
          My Blogs
        </button>
      </div>
      {activeTab === 'create' ? (
        <form className="blog-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Write your content here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Image Type:</label>
            <select value={imageType} onChange={(e) => setImageType(e.target.value)}>
              <option value="url">Image URL</option>
              <option value="upload">Upload Image</option>
            </select>
          </div>
          {imageType === 'url' ? (
            <div className="form-group">
              <input
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          ) : (
            <div className="form-group">
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>
          )}
          <button className="submit-button" type="submit">
            {editingId ? 'Update Blog' : 'Submit Blog'}
          </button>
        </form>
      ) : (
        <div className="blog-list">
          {filterBlogsByUser().length === 0 ? (
            <p>No blogs yet! Start by creating one.</p>
          ) : (
            <div className="grid-container">
              {filterBlogsByUser().map((blog) => (
                <div key={blog.id} className="blog-card">
                  <h3>{blog.title}</h3>
                  <p>{blog.content}</p>
                  {blog.image && <img src={blog.image} alt={blog.title} />}
                  <div className="card-actions">
                    <button onClick={() => handleEdit(blog.id)}>Edit</button>
                    <button onClick={() => deleteBlog(blog.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CreateBlog;
