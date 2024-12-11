import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!user) {
      setError('Invalid username or password');
      return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    setError('');
    navigate('/');
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-image"></div>
        <div className="login-form-container">
          <h2 className="login-header">Sign in with</h2>
          <div className="social-login">
            <button className="social-btn fb">Facebook</button>
            <button className="social-btn twitter">Twitter</button>
            <button className="social-btn linkedin">LinkedIn</button>
          </div>
          <div className="divider">
            <span>Or</span>
          </div>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                placeholder="Enter your Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="error">{error}</p>}
            {/* <div className="form-actions">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div> */}
            <button type="submit" className="login-button">
              LOGIN
            </button>
          </form>
          <div className="signup-prompt">
            <p>
              Don't have an account?{' '}
              <button onClick={handleRegisterRedirect}>Register</button>
            </p>
          </div>
        </div>
      </div>
      <footer className="footer-login">
        <p>Copyright © 2020. PDC20 ReactBlog.</p>
      </footer>
    </div>
  );
}

export default Login;