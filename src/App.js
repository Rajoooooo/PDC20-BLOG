import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
import Home from './components/Home';
import CreateBlog from './Blog/CreateBlog'; // Import CreateBlog
import ViewBlog from './Blog/ViewBlog'; // Import ViewBlog
import Layout from './components/Layout'; // Import Layout
import About from './Contents/AboutContent';
import ContactContent from './Contents/ContactContent'; // Import ContactContent (contact form)

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Layout><CreateBlog /></Layout>} /> {/* This is for creating a blog */}
          <Route path="/view-blog/:id" element={<Layout><ViewBlog /></Layout>} /> {/* View blog by ID */}
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><ContactContent /></Layout>} /> {/* New route for the contact form */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
