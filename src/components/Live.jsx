import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const LiveUpdates = () => {
  const [updates, setUpdates] = useState([]);

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  useEffect(() => {

    const sampleUpdates = [
      { time: '10:30 AM', message: 'Relief camps set up in Kozhikode' },
      { time: '11:00 AM', message: 'Water levels rising in Bharathapuzha river' },
      { time: '11:15 AM', message: 'Rescue teams deployed in Alappuzha' },
      { time: '12:00 PM', message: 'Cyclone warning for coastal Tamil Nadu' },
    ];
    setUpdates(sampleUpdates);
  }, []);

  return (
    <div>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Live Updates</h1>
        <p>Real-time updates on disaster events and rescue operations.</p>
      </header>

      <div className="live-updates-page">
        <section className="live-updates-list">
          {updates.map((update, index) => (
            <div key={index} className="update-card">
              <span className="update-time">🕒 {update.time}</span>
              <p className="update-msg">{update.message}</p>
            </div>
          ))}
        </section>

        <footer>
          © 2025 Disaster Management System | Stay informed, stay safe.
        </footer>
      </div>
    </div>
  );
};

export default LiveUpdates;
