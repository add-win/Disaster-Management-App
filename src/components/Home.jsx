import '../App.css';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const ActionCard = ({ title, icon }) => (
  <div className="action-card">
    <div className="action-card-icon">{icon}</div>
    <h3>{title}</h3>
  </div>
);

export const AdminHome = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editMessage, setEditMessage] = useState("");
  // eslint-disable-next-line 
  const [editDate, setEditDate] = useState("");

  const handleLogout = () => navigate('/admin-login');
  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);

  const handleEdit = (index, alert) => {
    setEditIndex(index);
    setEditMessage(alert.message);
    setEditDate(alert.date.split("T")[0]);
  };

  const handleSave = async (id) => {
    if (!editMessage) {
      alert("Message cannot be empty");
      return;
    }

    const currentDate = new Date().toISOString().split("T")[0]; // yyyy-mm-dd

    try {
      const res = await fetch(`http://localhost:5000/alerts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: editMessage, date: currentDate }),
      });

      if (res.ok) {
        const updatedAlerts = alerts.map((alert, idx) =>
          idx === editIndex ? { ...alert, message: editMessage, date: currentDate } : alert
        );
        setAlerts(updatedAlerts);
        setEditIndex(null);
        setEditMessage("");
      } else {
        alert("Failed to update alert");
      }
    } catch (error) {
      console.error("Error updating alert:", error);
    }
  };

  return (
    <div>
      <header className="header-container1">
        <div className="back-wrapper">
          <button onClick={handleBack} className="home-btn">Home</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Disaster Resource Co-ordination System</h1>
        <p>Stay informed. Stay safe. Respond faster.</p>
      </header>

      <section className="alert-section">
        <h2>Latest Alerts</h2>
        <ul className="alert-list">
          {alerts.length > 0 ? (
            alerts.map((alert, index) => (
              <li key={alert.id}>
                ⚠️{" "}
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editMessage}
                      onChange={(e) => setEditMessage(e.target.value)}
                      className="edit-input"
                    />
                    <button onClick={() => handleSave(alert.id)} className="edit-btn">Save</button>
                    <button onClick={() => setEditIndex(null)} className="edit-btn cancel-btn">Cancel</button>
                  </>
                ) : (
                  <>
                    {alert.message} ({new Date(alert.date).toDateString()})
                    <button onClick={() => handleEdit(index, alert)} className="edit-btn">Edit</button>
                  </>
                )}

              </li>
            ))
          ) : (
            <li>No alerts available</li>
          )}
        </ul>
      </section>
      <div className="action-grid">
        <Link to="/report">
          <ActionCard title="Report New Disaster" icon="📝" />
        </Link>
        <Link to="/live-updates">
          <ActionCard title="List of Active Disasters" icon="🚨" />
        </Link>
        <Link to="/status-updates">
          <ActionCard title="Update Disaster Current Status" icon="🔄" />
        </Link>
        <Link to="/list-disasters">
          <ActionCard title="List of Disasters Occurred" icon="📋" />
        </Link>
        <Link to='/user-registrations'>
          <ActionCard title="New User Registration" icon="👥" />
        </Link>

        <Link to="/volunteer">
          <ActionCard title="Volunteer Registration" icon="🤝" />
        </Link>
        <Link to='/volunteer-count'>
          <ActionCard title="Volunteer Distribution" icon="📊" />
        </Link>
        <Link to="/volunteer-update">
          <ActionCard title="Update Volunteer Role" icon="🆙" />
        </Link>
        <Link to='/volunteer-list'>
          <ActionCard title="List of Active Volunteers" icon="📋" />
        </Link>
        <Link to='/check-user'>
          <ActionCard title="Check User Existence" icon="🔍" />
        </Link>
        <Link to="/victim-support">
          <ActionCard title="Victim Registration" icon="🆘" />
        </Link>
        <Link to='/victim-update'>
          <ActionCard title="Update Victim Status" icon="🆙" />
        </Link>
        <Link to='/victim-list'>
          <ActionCard title="Victims of Current Disaster" icon="📋" />
        </Link>
        <Link to="/relief-user-reg">
          <ActionCard title="Camp Victim Registration" icon="🏕️" />
        </Link>
        <Link to="/camp-public-list">
          <ActionCard title="Relief Camp Residents List" icon="📋" />
        </Link>

        <Link to='/relief-reg'>
          <ActionCard title="Relief Camp Registration" icon="🆕" />
        </Link>
        <Link to="/relief-camp">
          <ActionCard title="Relief Camp Details" icon="🧰" />
        </Link>
        <Link to="/relief-status">
          <ActionCard title="Relief Camp Status Update" icon="🔄" />
        </Link>
        <Link to="/relief-camp-update">
          <ActionCard title="Update Relief Camp Details" icon="✏️" />
        </Link>
        <Link to="/resource-allocation">
          <ActionCard title="Camp Resource Allocation" icon="📦" />
        </Link>

        <Link to="/resource-update">
          <ActionCard title="Update Resource Availability" icon="📝" />
        </Link>
        <Link to="/resource-donation">
          <ActionCard title="Donate Resources" icon="🎁" />
        </Link>
        <Link to="/donation-list">
          <ActionCard title="Donation Offer List" icon="📋" />
        </Link>
        <Link to="/accept-donation">
          <ActionCard title="Accept Donation Offer" icon="🤝" />
        </Link>
        <Link to="/safety-tips">
          <ActionCard title="Tips for Staying Safe" icon="💡" />
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
    navigate('/public-login');
  };

  const [alerts, setAlerts] = useState([]);

  const handleBack = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch("http://localhost:5000/alerts");
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error("Error fetching alerts:", error);
      }
    };
    fetchAlerts();
  }, []);
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
      </header>

      <section className="alert-section">
        <h2>Latest Alerts</h2>
        <ul className="alert-list">
          {alerts.length > 0 ? (
            alerts.map((alert) => (
              <li key={alert.id}>
                ⚠️ {alert.message} ( {new Date(alert.date).toDateString()} )
              </li>
            ))
          ) : (
            <li>No alerts available</li>
          )}
        </ul>
      </section>

      <div className="action-grid">
        <Link to="/profile-view" style={{ textDecoration: 'none' }}>
            <ActionCard title ="Profile View"  icon="👤" />
        </Link>
        <Link to="/live-updates">
          <ActionCard title="List of Active Disasters" icon="🚨" />
        </Link>
        <Link to="/list-disasters">
          <ActionCard title="List of Disasters Occurred" icon="📋" />
        </Link>
        <Link to="/volunteer">
          <ActionCard title="Volunteer Registration" icon="🤝" />
        </Link>
        <Link to='/volunteer-count'>
          <ActionCard title="Volunteer Distribution" icon="📊" />
        </Link>
        <Link to="/volunteer-update">
          <ActionCard title="Update Volunteer Role" icon="🆙" />
        </Link>
        <Link to='/volunteer-list'>
          <ActionCard title="List of Active Volunteers" icon="📋" />
        </Link>
        <Link to='/check-user'>
          <ActionCard title="Check User Existence" icon="🔍" />
        </Link>
        <Link to="/victim-support">
          <ActionCard title="Victim Registration" icon="🆘" />
        </Link>
        <Link to='/victim-update'>
          <ActionCard title="Update Victim Status" icon="🆙" />
        </Link>
        <Link to='/victim-list'>
          <ActionCard title="Victims of Current Disaster" icon="📋" />
        </Link>
        <Link to="/camp-public-list">
          <ActionCard title="Relief Camp Residents List" icon="📋" />
        </Link>
        <Link to="/relief-camp">
          <ActionCard title="Relief Camp Details" icon="🧰" />
        </Link>

        <Link to="/resource-allocation">
          <ActionCard title="Camp Resource Allocation" icon="📦" />
        </Link>
        <Link to="/resource-donation">
          <ActionCard title="Donate Resources" icon="🎁" />
        </Link>
        <Link to="/donation-list">
          <ActionCard title="Donation Offer List" icon="📋" />
        </Link>
        <Link to="/safety-tips">
          <ActionCard title="Tips for Staying Safe" icon="💡" />
        </Link>
        <Link to="/emergency-contacts">
          <ActionCard title="Emergency Contacts" icon="📞" />
        </Link>
        <ActionCard title="Be Safe, Stay Safe" icon="🏠" />
        <ActionCard title="Help is on the Way!" icon="🚑" />
      </div>

      <footer className="home-footer">
        © 2025 Disaster Management System | Built with ❤️ Young Professionals
      </footer>
    </div >
  );
};