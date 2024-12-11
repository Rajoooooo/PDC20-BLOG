import React from 'react';
import { Link } from 'react-router-dom';
import './homecontent.css';

const truncateContent = (content, wordLimit = 10) => {
  const words = content.split(' ');
  return words.length > wordLimit ? words.slice(0, wordLimit).join(' ') + '...' : content;
};

function HomeContent({ blogs, onDelete }) {
  return (
    <div className="content-container">
      <h1 className="section-title">Blogs</h1>
      <div className="blogs-grid">
        {blogs.length === 0 ? (
          <div className="loading">Loading...</div>
        ) : (
          blogs.map(blog => (
            <div key={blog.id} className="blog-card">
              <img
                src={blog.image || 'https://via.placeholder.com/300'}
                alt={blog.title}
                className="blog-image"
              />
              <div className="blog-card-content">
                <h3 className="blog-title">{blog.title}</h3>
                <p className="blog-excerpt">{truncateContent(blog.content)}</p>
                <div className="blog-card-footer">
                  <Link to={`/view-blog/${blog.id}`} className="view-button">Read More</Link>
                  {/* Uncomment if Delete functionality is needed */}
                  {/* <button onClick={() => onDelete(blog.id)} className="delete-button">Delete</button> */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeContent;
