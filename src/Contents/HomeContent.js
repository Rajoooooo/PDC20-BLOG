import React from 'react';
import './content.css';
import { Link } from 'react-router-dom'; // Import Link to navigate

// Function to truncate text after the first 5 words
const truncateContent = (content, wordLimit = 5) => {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
};

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
              <p>{truncateContent(blog.content)}</p> {/* Display truncated content */}
              <Link to={`/view-blog/${index}`} className="view-button">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomeContent;
