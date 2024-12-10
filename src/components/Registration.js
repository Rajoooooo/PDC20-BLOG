import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';

function Register() {
  const [currentTab, setCurrentTab] = useState(0);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    gender: '',
  });

  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: '',
  });

  const [accountInfo, setAccountInfo] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [additionalDetails, setAdditionalDetails] = useState({
    aboutMe: '',
    profilePic: null,
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
    switch (section) {
      case 'personalInfo':
        setPersonalInfo({ ...personalInfo, [field]: value });
        break;
      case 'contactInfo':
        setContactInfo({ ...contactInfo, [field]: value });
        break;
      case 'accountInfo':
        setAccountInfo({ ...accountInfo, [field]: value });
        break;
      case 'additionalDetails':
        setAdditionalDetails({ ...additionalDetails, [field]: value });
        break;
      default:
        break;
    }
  };

  const validateTab = () => {
    let isValid = true;

    switch (currentTab) {
      case 0:
        if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.dob || !personalInfo.gender) {
          setError('All fields in Personal Information are required.');
          isValid = false;
        }
        break;
      case 1:
        if (!contactInfo.email || !contactInfo.phone || !contactInfo.address) {
          setError('All fields in Contact Information are required.');
          isValid = false;
        }
        break;
      case 2:
        if (!accountInfo.username || !accountInfo.password || !accountInfo.confirmPassword) {
          setError('All fields in Account Information are required.');
          isValid = false;
        }
        if (accountInfo.password !== accountInfo.confirmPassword) {
          setError('Passwords do not match.');
          isValid = false;
        }
        break;
      default:
        break;
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateTab()) {
      setError('');
      setCurrentTab((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setError('');
    setCurrentTab((prev) => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateTab()) {
      const userData = {
        ...personalInfo,
        ...contactInfo,
        ...additionalDetails,
        username: accountInfo.username,
        password: accountInfo.password,
      };

      // Save user data in localStorage
      localStorage.setItem('user', JSON.stringify(userData));

      // Redirect to login page
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
                value={personalInfo.firstName}
                onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={personalInfo.lastName}
                onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
              />
              <input
                type="date"
                placeholder="Date of Birth"
                value={personalInfo.dob}
                onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
              />
              <select
                value={personalInfo.gender}
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
                value={contactInfo.email}
                onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
              />
              <input
                type="tel"
                placeholder="Phone"
                value={contactInfo.phone}
                onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
              />
              <input
                type="text"
                placeholder="Address"
                value={contactInfo.address}
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
                value={accountInfo.username}
                onChange={(e) => handleInputChange('accountInfo', 'username', e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                value={accountInfo.password}
                onChange={(e) => handleInputChange('accountInfo', 'password', e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={accountInfo.confirmPassword}
                onChange={(e) => handleInputChange('accountInfo', 'confirmPassword', e.target.value)}
              />
            </div>
          )}
          {currentTab === 3 && (
            <div className="tab-section">
              <h3>Additional Details</h3>
              <textarea
                placeholder="About Me"
                value={additionalDetails.aboutMe}
                onChange={(e) => handleInputChange('additionalDetails', 'aboutMe', e.target.value)}
              />
              <input
                type="file"
                onChange={(e) =>
                  handleInputChange('additionalDetails', 'profilePic', e.target.files[0])
                }
              />
            </div>
          )}
        </div>
        {error && <p className="error">{error}</p>}
        <div className="button-group">
          {currentTab > 0 && (
            <button type="button" className="nav-button" onClick={handlePrevious}>
              Previous
            </button>
          )}
          {currentTab < tabs.length - 1 && (
            <button type="button" className="nav-button" onClick={handleNext}>
              Next
            </button>
          )}
          {currentTab === tabs.length - 1 && (
            <button type="submit" className="submit-button">
              Register
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Register;
