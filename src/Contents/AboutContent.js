import React, { useState } from 'react';
import './about.css';
import RafaelImage from '../Contents/rafael.jpg'; 
import JansenImage from '../Contents/jansen.jpg';
import NhetImage from '../Contents/nhet.png';

const About = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: 'Rafael John Castro',
      role: 'Lead Developer',
      contribution: 'Responsible for coding and implementing core features like React Router and state management for blog posts. Also ensured responsiveness and user-friendly UI.',
      comments: 'Found the role rewarding but stressful, managing multiple parts of the project under tight deadlines. Enjoyed the leadership opportunity and problem-solving challenges.',
      learnings: 'Gained a deeper understanding of React.js, state management, and component-based design. Developed leadership skills in guiding the team and ensuring progress despite challenges.',
      image: RafaelImage,
    },
    {
      name: 'Nhet Amurao',
      role: 'Documentation Lead',
      contribution: 'Led the documentation efforts, organizing project details, and ensuring accuracy and structure in the narrative report.',
      comments: 'Found the documentation process insightful yet challenging, especially in presenting technical details in an understandable way.',
      learnings: 'Realized the importance of teamwork and well-crafted documentation in a project\'s success, highlighting how it makes the project accessible and understandable for others.',
      image: NhetImage,
    },
    {
      name: 'Jansen Earl G. Venal',
      role: 'Contributor',
      contribution: 'Assisted with documentation and contributed minor code updates, including bug fixes and validation.',
      comments: 'Found balancing documentation and coding tasks challenging but rewarding, appreciating the well-rounded experience of the project.',
      learnings: 'Learned the importance of aligning code with documentation and the significance of teamwork and clear communication to maintain consistency and project success.',
      image: JansenImage,
    }
  ];

  const handleClick = (member) => {
    setSelectedMember(member);
  };

  return (
    <div className="about-container">
      <h1 className="about-title">About Us</h1>
      <p className="about-description">
        Welcome to <b>React Chronicles: A Journey in PDC</b>! This blog is a collaborative project for our React subject in PDC. It showcases the knowledge we've gained and allows us to apply what we've learned in a meaningful way.
      </p>
      <p className="about-mission">
        Our mission is to share insights, tips, and experiences from our journey in learning React. We hope to foster a community of learners and developers who can grow together.
      </p>
      <div className="team-section">
        <h2 className="team-title">Meet Our Team</h2>
        <div className="team-members">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member" onClick={() => handleClick(member)}>
              <div className="image-frame">
                <img src={member.image} alt={member.name} />
              </div>
              <p className="member-name">{member.name}</p>
            </div>
          ))}
        </div>
        {selectedMember && (
          <div className="team-member-info">
            <h3>{selectedMember.name}</h3>
            <p><strong>Role:</strong> {selectedMember.role}</p>
            <p><strong>Contribution:</strong> {selectedMember.contribution}</p>
            <p><strong>Comments:</strong> {selectedMember.comments}</p>
            <p><strong>Learnings:</strong> {selectedMember.learnings}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;