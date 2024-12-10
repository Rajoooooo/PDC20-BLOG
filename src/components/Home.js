import React, { useState, useEffect } from 'react';
import HomeContent from '../Contents/HomeContent';
import '../Contents/content.css'; // Ensure correct path and name

function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);
  }, []);

  // Handle deleting a blog
  const handleDelete = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (confirmDelete) {
      const updatedBlogs = blogs.filter((_, i) => i !== index); // Remove blog at given index
      setBlogs(updatedBlogs); // Update state
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs)); // Update localStorage
    }
  };

  return (
    <div className="home-container">
      <main>
        <HomeContent blogs={blogs} onDelete={handleDelete} />
      </main>
    </div>
  );
}

export default Home;
