import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const camps = [
  {
    id: 1,
    name: "St. Thomas School",
    location: "Kottayam, Kerala",
    image: "logo.png",
    people: 150,
    male: 70,
    female: 80
  },
  {
    id: 2,
    name: "Govt College Camp",
    location: "Alappuzha, Kerala",
    image: "logo.png",
    people: 230,
    male: 120,
    female: 110
  },
  {
    id: 3,
    name: "Community Hall Camp",
    location: "Thrissur, Kerala",
    image: "logo.png",
    people: 98,
    male: 40,
    female: 58
  },
  {
    id: 3,
    name: "Community Hall Camp",
    location: "Thrissur, Kerala",
    image: "logo.png",
    people: 98,
    male: 40,
    female: 58
  }
];

const ReliefCamp = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  return (
    <div className="relief-camp-page">
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Relief Camps</h1>
        <p>Here are the currently active relief camps and their status.</p>
      </header>

      <section className="action-grid">
        {camps.map((camp) => (
          <div className="action-card" key={camp.id}>
            <img src={camp.image} alt={camp.name} className="camp-img" />
            <h3>{camp.name}</h3>
            <p><strong>📍 Location:</strong> {camp.location}</p>
            <p><strong>👥 People:</strong> {camp.people}</p>
            <p><strong>👨 Male:</strong> {camp.male}</p>
            <p><strong>👩 Female:</strong> {camp.female}</p>
          </div>
        ))}
      </section>

      <footer>
        © 2025 Disaster Management System | Together we survive.
      </footer>
    </div>
  );
};

export default ReliefCamp;
