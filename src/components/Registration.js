import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';

function Register() {
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    personalInfo: {
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
    },
    contactInfo: {
      email: '',
      phone: '',
      address: '',
    },
    accountInfo: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    additionalDetails: {
      aboutMe: '',
      profilePic: null,
    },
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const tabs = [
    'Personal Information',
    'Contact Information',
    'Account Information',
    'Additional Details',
  ];

  const handleInputChange = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const validateTab = () => {
    const { personalInfo, contactInfo, accountInfo } = formData;
    let isValid = true;
    let message = '';

    switch (currentTab) {
      case 0:
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.dob || !personalInfo.gender) {
          message = 'All fields in Personal Information are required.';
          isValid = false;
        }
        break;
      case 1:
        if (!contactInfo.email || !contactInfo.phone || !contactInfo.address) {
          message = 'All fields in Contact Information are required.';
          isValid = false;
        }
        break;
      case 2:
        if (!accountInfo.username || !accountInfo.password || !accountInfo.confirmPassword) {
          message = 'All fields in Account Information are required.';
          isValid = false;
        } else if (accountInfo.password !== accountInfo.confirmPassword) {
          message = 'Passwords do not match.';
          isValid = false;
        }
        break;
      default:
        break;
    }

    setError(message);
    return isValid;
  };

  const handleNavigation = (direction) => {
    if (direction === 'next' && validateTab()) {
      setError('');
      setCurrentTab((prev) => prev + 1);
    } else if (direction === 'previous') {
      setError('');
      setCurrentTab((prev) => prev - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateTab()) {
      const { personalInfo, contactInfo, additionalDetails, accountInfo } = formData;

      const newUser = {
        ...personalInfo,
        ...contactInfo,
        ...additionalDetails,
        username: accountInfo.username,
        password: accountInfo.password,
        fullName: `${personalInfo.firstName} ${personalInfo.lastName}`,
      };

      const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
      if (existingUsers.some((user) => user.username === accountInfo.username)) {
        setError('Username already exists. Please choose another one.');
        return;
      }

      existingUsers.push(newUser);
      localStorage.setItem('users', JSON.stringify(existingUsers));
      navigate('/login');
    }
  };

  return (
    <div className="register-container">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`tab-button ${index === currentTab ? 'active' : ''}`}
            onClick={() => setCurrentTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="tab-content">
          {currentTab === 0 && (
            <div className="tab-section">
              <h3>Personal Information</h3>
              <input
                type="text"
                placeholder="First Name"
                value={formData.personalInfo.firstName}
                onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={formData.personalInfo.lastName}
                onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
              />
              <input
                type="date"
                value={formData.personalInfo.dob}
                onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
              />
              <select
                value={formData.personalInfo.gender}
                onChange={(e) => handleInputChange('personalInfo', 'gender', e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          )}
          {currentTab === 1 && (
            <div className="tab-section">
              <h3>Contact Information</h3>
              <input
                type="email"
                placeholder="Email"
                value={formData.contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={formData.contactInfo.address}
                onChange={(e) => handleInputChange('contactInfo', 'address', e.target.value)}
              />
            </div>
          )}
          {currentTab === 2 && (
            <div className="tab-section">
              <h3>Account Information</h3>
              <input
                type="text"
                placeholder="Username"
                value={formData.accountInfo.username}
                onChange={(e) => handleInputChange('accountInfo', 'username', e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={formData.accountInfo.password}
                onChange={(e) => handleInputChange('accountInfo', 'password', e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={formData.accountInfo.confirmPassword}
                onChange={(e) => handleInputChange('accountInfo', 'confirmPassword', e.target.value)}
              />
            </div>
          )}
          {currentTab === 3 && (
            <div className="tab-section">
              <h3>Additional Details</h3>
              <textarea
                placeholder="About Me"
                value={formData.additionalDetails.aboutMe}
                onChange={(e) => handleInputChange('additionalDetails', 'aboutMe', e.target.value)}
              />
              <input
                type="file"
                onChange={(e) =>
                  handleInputChange('additionalDetails', 'profilePic', e.target.files[0])
                }
              />
              {formData.additionalDetails.profilePic && (
                <p>Uploaded: {formData.additionalDetails.profilePic.name}</p>
              )}
            </div>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          {currentTab > 0 && (
            <button type="button" onClick={() => handleNavigation('previous')}>
              Previous
            </button>
          )}
          {currentTab < tabs.length - 1 ? (
            <button type="button" onClick={() => handleNavigation('next')}>
              Next
            </button>
          ) : (
            <button type="submit">Register</button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
