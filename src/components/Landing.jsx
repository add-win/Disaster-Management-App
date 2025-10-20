import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header className="landing-header fade-in delay-1">
        <h1 className="landing-title">Disaster Resource Co-ordination System</h1>
      </header>

      <main className="login-options fade-in delay-2">
        <Link to="/admin-login">
          <button className="login-button-landing blue">Admin Login</button>
        </Link>
        <Link to="/public-login">
          <button className="login-button-landing green">Public Login</button>
        </Link>
      </main>

      <footer className="landing-footer fade-in delay-3">
        © 2025 Disaster Resource Co-ordination System | Empowering communities in times of crisis.
      </footer>

    </div>
  );
};

export default LandingPage;