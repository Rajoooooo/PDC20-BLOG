import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './registration.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MdPerson, MdGroup, MdAccountCircle, MdInfo } from 'react-icons/md';

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
    { title: 'Personal Info', icon: <MdPerson /> },
    { title: 'Contact Info', icon: <MdGroup /> },
    { title: 'Account Info', icon: <MdAccountCircle /> },
    { title: 'Additional Details', icon: <MdInfo /> },
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

  const handleFileChange = (section, field, file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: reader.result, 
        },
      }));
    };
    if (file) {
      reader.readAsDataURL(file);
    }
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

      localStorage.setItem('currentUser', JSON.stringify(newUser));

      navigate('/profile');
    }
  };

  return (
    <div className="container register-container mt-5">
      <h2 className="text-left mb-4">Register here</h2>
      <div className="row">
        <div className="col-md-4">
          <div className="list-group">
            {tabs.map((tab, index) => (
              <button
                key={index}
                className={`list-group-item list-group-item-action ${index === currentTab ? 'active' : ''}`}
                onClick={() => setCurrentTab(index)}
              >
                <span className="me-2">{tab.icon}</span>
                {tab.title}
              </button>
            ))}
          </div>
        </div>

        <div className="col-md-8">
          <div className="tab-content">
            {currentTab === 0 && (
              <div className="tab-section">
                <h3>Personal Information</h3>
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="First Name"
                  value={formData.personalInfo.firstName}
                  onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Last Name"
                  value={formData.personalInfo.lastName}
                  onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
                />
                <input
                  type="date"
                  className="form-control mb-3"
                  value={formData.personalInfo.dob}
                  onChange={(e) => handleInputChange('personalInfo', 'dob', e.target.value)}
                />
                <select
                  className="form-control mb-3"
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
                  className="form-control mb-3"
                  placeholder="Email"
                  value={formData.contactInfo.email}
                  onChange={(e) => handleInputChange('contactInfo', 'email', e.target.value)}
                />
                <input
                  type="tel"
                  className="form-control mb-3"
                  placeholder="Phone"
                  value={formData.contactInfo.phone}
                  onChange={(e) => handleInputChange('contactInfo', 'phone', e.target.value)}
                />
                <input
                  type="text"
                  className="form-control mb-3"
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
                  className="form-control mb-3"
                  placeholder="Username"
                  value={formData.accountInfo.username}
                  onChange={(e) => handleInputChange('accountInfo', 'username', e.target.value)}
                />
                <input
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                  value={formData.accountInfo.password}
                  onChange={(e) => handleInputChange('accountInfo', 'password', e.target.value)}
                />
                <input
                  type="password"
                  className="form-control mb-3"
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
                  className="form-control mb-3"
                  placeholder="About Me"
                  value={formData.additionalDetails.aboutMe}
                  onChange={(e) => handleInputChange('additionalDetails', 'aboutMe', e.target.value)}
                />
                <input
                  type="file"
                  className="form-control mb-3"
                  onChange={(e) =>
                    handleFileChange('additionalDetails', 'profilePic', e.target.files[0])
                  }
                />
                {formData.additionalDetails.profilePic && (
                  <img
                    src={formData.additionalDetails.profilePic}
                    alt="Uploaded Preview"
                    style={{ width: '100px', height: '100px' }}
                  />
                )}
              </div>
            )}
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div className="button-group mt-3">
            {currentTab > 0 && (
              <button type="button" className="btn btn-secondary me-2" onClick={() => handleNavigation('previous')}>
                Previous
              </button>
            )}
            {currentTab < tabs.length - 1 ? (
              <button type="button" className="btn btn-primary" onClick={() => handleNavigation('next')}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success" onClick={handleSubmit}>
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
