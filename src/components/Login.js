import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleGoogleLogin = () => {
    alert('Google login functionality');
    // Add Google login functionality here
  };

  const handleFacebookLogin = () => {
    alert('Facebook login functionality');
    // Add Facebook login functionality here
  };

  const handleRegisterRedirect = () => {
    navigate('/register');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>

      <div className="signup-prompt">
        <p>Don't have an account? 
          <button onClick={handleRegisterRedirect}>Register here</button>
        </p>
      </div>

      <div className="social-login">
        <button onClick={handleGoogleLogin} className="google-login">Login with Google</button>
        <button onClick={handleFacebookLogin} className="facebook-login">Login with Facebook</button>
      </div>
    </div>
  );
}

export default Login;
