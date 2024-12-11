import React from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Registration';
import Home from './components/Home';
import CreateBlog from './Blog/CreateBlog';
import ViewBlog from './Blog/ViewBlog';
import Layout from './components/Layout';
import About from './Contents/AboutContent';
import ContactContent from './Contents/ContactContent';
import Profile from './Contents/Profile'; // Import Profile page

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/blog" element={<Layout><CreateBlog /></Layout>} />
          <Route path="/view-blog/:id" element={<Layout><ViewBlog /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/contact" element={<Layout><ContactContent /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} /> {/* Profile route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
