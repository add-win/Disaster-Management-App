import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';

const PublicLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleReset = () => {
    setUsername('');
    setPassword('');
    setError('');
  };

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/public-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('publicIdentifier', username);
        navigate("/public-home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="admin-login-page">
      {/* This CSS block contains the Deep Sapphire Blue theme styles.
        It is placed here to make the component self-contained and runnable.
      */}
     
      <div className="admin-login-card">
        
        <div className='login-header'>
          <img src='../images/admin2.png' alt='Public Icon' className='user-icon' />
          <h3>Public Login</h3>
        </div>

        {/* 💡 This wrapper applies the internal padding for the form content */}
        <div className='login-content'>
            {error && <p className="error-msg">{error}</p>}

            <form onSubmit={handleLogin}>
              <div className="form-group-login">
                <label>Username:</label>
                <input 
                  type="text" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)} 
                  required 
                  placeholder='Username/Email ID/Phone Number'
                />
              </div>

              <div className="form-group-login">
                <label>Password:</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  placeholder='Password'
                />
              </div>

              {/* Note: form-group here ensures consistent vertical spacing before buttons */}
              <div className="form-group-login">
                <div className='form-buttons'>
                  <Link to="/">
                    <button className='login-button black'>Back</button>
                  </Link>
                  <button type="submit" className="login-button blue">Login</button>
                  <button type="reset" onClick={handleReset} className='login-button red'>Reset</button>
                </div>
              </div>

              {/* Navigational Links using the styled CSS classes - Now stacked vertically */}
              <div className="login-links-container">
                {/* Registration link is now first */}
                <Link to="/new-user-registrations" className="login-link">
                  New User Registration
                </Link>
                {/* Forgot Password link is now stacked below it */}
                <Link to="/forgot-password" className="login-link">
                  Forgot Password?
                </Link>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default PublicLogin;