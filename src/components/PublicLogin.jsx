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
      <div className="admin-login-card">
        <h2>Public Login</h2>

        {error && <p className="error-msg">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required placeholder='Username/Email ID/Phone Number'/>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder='Password'/>
          </div>

          <div className="form-group">
            <div className='form-buttons'>
              <Link to="/">
                <button className='login-button black'>Back</button>
              </Link>
              <button type="submit" className="login-button blue">Login</button>
              <button type="reset" onClick={handleReset} className='login-button red'>Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicLogin;