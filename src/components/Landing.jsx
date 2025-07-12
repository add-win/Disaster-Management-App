import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-header">
        <img
          src="./logo.png"
          alt="Disaster Management Logo"
          className="landing-logo"
        />
        <h1 className="landing-title">Disaster Resource Co-ordination System</h1>
      </div>
      <main className="login-options">
        <Link to="/admin-login">
          <button className="login-button blue">Admin Login</button>
        </Link>
        <Link to="/public-login">
          <button className="login-button green">Public Login</button>
        </Link>
      </main>

      <footer className="landing-footer">
        © 2025 Disaster Resource Co-ordination System | Empowering communities in times of crisis.
      </footer>
    </div>
  );
};

export default LandingPage;
