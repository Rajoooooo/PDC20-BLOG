import React from 'react';
import './about.css';
import RafaelImage from '../Contents/rafael.jpg'; 
import JansenImage from '../Contents/jansen.jpg';
import NhetImage from '../Contents/nhet.png'

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <b>React Chronicles: A Journey in PDC</b>! This blog is a collaborative project for our React subject in PDC. It showcases the knowledge we've gained and allows us to apply what we've learned in a meaningful way.
      </p>
      <div className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <div className="image-frame">
              <img src={RafaelImage} alt="Rafael John Castro" />
            </div>
            <p className="member-name">Rafael John Castro</p>
          </div>
          <div className="team-member">
            <div className="image-frame">
              <img src={NhetImage} alt="Nhet Amurao" />
            </div>
            <p className="member-name">Nhet Amurao</p>
          </div>
          <div className="team-member">
            <div className="image-frame">
              <img src={JansenImage} alt="Jansen Venal" />
            </div>
            <p className="member-name">Jansen Venal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
