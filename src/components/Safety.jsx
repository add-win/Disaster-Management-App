import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const safetyTips = [
  {
    title: "Flood Safety",
    icon: "🌊",
    tips: [
      "Move to higher ground immediately.",
      "Avoid walking or driving through flood waters.",
      "Turn off electricity if water enters your home.",
      "Boil water before drinking."
    ]
  },
  {
    title: "Earthquake Safety",
    icon: "🌍",
    tips: [
      "Drop, cover, and hold under a sturdy table.",
      "Stay away from windows and exterior walls.",
      "Do not use elevators.",
      "After shaking stops, evacuate safely."
    ]
  },
  {
    title: "Fire Safety",
    icon: "🔥",
    tips: [
      "Stop, drop, and roll if clothes catch fire.",
      "Use stairs, not elevators, during fire evacuation.",
      "Keep fire extinguishers accessible.",
      "Install smoke detectors and check them regularly."
    ]
  },
  {
    title: "Cyclone Safety",
    icon: "🌀",
    tips: [
      "Stay indoors during the cyclone.",
      "Keep emergency kit ready.",
      "Avoid low-lying areas and beaches.",
      "Disconnect electrical appliances."
    ]
  }
];

const SafetyTips = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className='logout-wrapper'>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Safety Tips</h1>
        <p>Basic safety instructions during natural disasters.</p>
      </header>

      <section className="tips-grid">
        {safetyTips.map((category, index) => (
          <div className="contact-card" key={index}>
            <div className="contact-icon text-4xl">{category.icon}</div>
            <h3>{category.title}</h3>
            <ul>
              {category.tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <footer>
        © 2025 Disaster Management System | Be alert. Stay safe.
      </footer>
    </div>
  );
};

export default SafetyTips;
