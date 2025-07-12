import '../App.css';
import { useNavigate, Link } from 'react-router-dom';

const ActionCard = ({ title, icon }) => (
  <div className="action-card">
    <div className="action-card-icon">{icon}</div>
    <h3>{title}</h3>
  </div>
);

export const AdminHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="home-btn">Home</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Disaster Resource Co-ordination System</h1>
        <p>Stay informed. Stay safe. Respond faster.</p>
      </header >

      <section className="alert-section">
        <h2>Latest Alerts</h2>
        <ul className="alert-list">
          <li>⚠️ Flood warning issued in Kerala (Jul 9, 2025)</li>
          <li>⚠️ Heatwave alert in North India</li>
          <li>⚠️ Cyclone Burevi has weakened - All clear issued</li>
        </ul>
      </section>

      <div className="action-grid">
        <Link to="/report">
          <ActionCard title="Report Disaster" icon="📝" />
        </Link>
        <Link to="/live-updates">
          <ActionCard title="Live Updates" icon="🚨" />
        </Link>
        <Link to="/volunteer">
          <ActionCard title="Volunteer Registration" icon="🤝" />
        </Link>
        <Link to="/victim-support">
          <ActionCard title="Victim Registration" icon="🆘" />
        </Link>
        <Link to="/relief-camp">
          <ActionCard title="Relief Camp" icon="🧰" />
        </Link>
        <Link to="/resource-allocation">
          <ActionCard title="Resource Allocation" icon="📦" />
        </Link>
        <Link to="/safety-tips">
          <ActionCard title="Safety Tips" icon="💡" />
        </Link>
        <Link to="/emergency-contacts">
          <ActionCard title="Emergency Contacts" icon="📞" />
        </Link>
      </div>

      <footer>
        © 2025 Disaster Management System | Built with ❤️ Young Professionals
      </footer>
    </div >
  );
};

export const PublicHome = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div>
      <header className="header-container">
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Disaster Resource Co-ordination System</h1>
        <p>Stay informed. Stay safe. Respond faster.</p>
      </header>

      <section className="alert-section">
        <h2>Latest Alerts</h2>
        <ul className="alert-list">
          <li>⚠️ Flood warning issued in Kerala (Jul 9, 2025)</li>
          <li>⚠️ Heatwave alert in North India</li>
          <li>⚠️ Cyclone Burevi has weakened - All clear issued</li>
        </ul>
      </section>

      <section className="action-grid p">
        <Link to="/live-updates">
          <ActionCard title="Live Updates" icon="🚨" />
        </Link>
        <Link to="/volunteer">
          <ActionCard title="Volunteer" icon="🤝" />
        </Link>
        <Link to="/victim-support">
          <ActionCard title="Victim Support" icon="🆘" />
        </Link>
        <Link to="/relief-camp">
          <ActionCard title="Relief Camp" icon="🧰" />
        </Link>
        <Link to="/safety-tips">
          <ActionCard title="Safety Tips" icon="💡" />
        </Link>
        <Link to="/emergency-contacts">
          <ActionCard title="Emergency Contacts" icon="📞" />
        </Link>
      </section>

      <footer>
        © 2025 Disaster Management System | Built with ❤️ Young Professionals
      </footer>
    </div>
  );
};