import React, { useState } from 'react';
import './contact.css';

function ContactContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setNotification(`Contact Form Submitted:
      \nName: ${name}
      \nEmail: ${email}
      \nMessage: ${message}`);

    // Clear form
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="contact-container container mt-5">
      <div className="row">
        {/* Form Section */}
        <div className="col-md-6">
          <div className="form-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your Name"
                  className="form-control"
                />
              </div>
              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Your Email"
                  className="form-control"
                />
              </div>
              <div className="form-field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Your Message"
                  className="form-control"
                />
              </div>
              <button type="submit" className="submit-btn btn btn-primary">Send Message</button>
            </form>
          </div>
        </div>

        {/* Image Section */}
        <div className="col-md-6">
          <div className="image-container">
            <img
              src="https://cdn3d.iconscout.com/3d/premium/thumb/contact-us-3d-illustration-download-in-png-blend-fbx-gltf-file-formats--call-logo-customer-service-center-digital-marketing-pack-business-illustrations-4379019.png?f=webp"
              alt="Contact Us"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="notification mt-3">
          <h3>Form Submission Details:</h3>
          <p>{notification}</p>
        </div>
      )}
    </div>
  );
}

export default ContactContent;
