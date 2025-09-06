import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const VictimList = () => {
  const [victims, setVictims] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  useEffect(() => {
    const fetchVictims = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-victims");
        const data = await response.json();
        setVictims(data);
      } catch (error) {
        console.error("Error fetching victims:", error);
      }
    };

    fetchVictims();
    const interval = setInterval(fetchVictims, 10000);
    return () => clearInterval(interval);
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>List of Victims</h1>
        <p>Showing all registered victims with public details.</p>
      </header>

      <div className="live-updates-page">
        {victims.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Victim ID</th>
                <th>Victim Status</th>
                <th>Disaster Name</th>
                <th>Disaster Type</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>District</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {victims.map((v) => (
                <tr key={v.idpublic}>
                  <td>{v.idpublic}</td>
                  <td>{v.status}</td>
                  <td>{v.disaster_name}</td>
                  <td>{v.disaster_type}</td>
                  <td>{v.username}</td>
                  <td>{v.usermail}</td>
                  <td>{v.userph}</td>
                  <td>{v.userlocation}</td>
                  <td>{v.userdistrict}</td>
                  <td>{calculateAge(v.userdob)}</td>
                  <td>{v.usergender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No victims found.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default VictimList;