import React, { useState, useEffect } from 'react';
import HomeContent from '../Contents/HomeContent';
import './home.css'; // Ensure correct path and name

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    'https://content.wepik.com/statics/14558807/preview-page0.jpg',
    'https://img.freepik.com/free-psd/world-teacher-s-day-youtube-banner_23-2150744494.jpg',
    'https://content.wepik.com/statics/733560586/preview-page0.jpg',
    'https://content.wepik.com/statics/194431635/preview-page0.jpg',
  ];

  useEffect(() => {
    // Load blog posts from localStorage
    const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
    setBlogs(storedBlogs);

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
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
        {/* Static Text Section */}
        <section className="intro-section">
          <div className="intro-content">
            <h1>Welcome to Our Inspiring Blog</h1>
            <p>
              Discover insightful articles, tutorials, and stories that help you stay informed and inspired. 
              Our blog covers a variety of topics—from technology and personal growth to lifestyle and creativity.
            </p>
            <p>
              Join our community of thinkers, creators, and doers. Stay updated with our latest posts and engage in
              conversations that matter to you!
            </p>
            <button className="explore-button">Explore Our Blog</button>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="carousel-section">
          <div className="carousel">
            <img src={images[currentImageIndex]} alt="Blog Banner" className="carousel-image" />
          </div>
        </section>

        {/* Blog Section */}
        <section className="blog-section">
          <h2>Latest Blogs</h2>
          <HomeContent blogs={blogs} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}

export default Home;
