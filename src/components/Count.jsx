import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const List = () => {
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch("http://localhost:5000/volunteer-count");
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();

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
        <h1>Count of Volunteers</h1>
        <p>Showing count of volunteers by disaster and role.</p>
      </header>

      <div className="live-updates-page">
        {updates.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Disaster ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>Role</th>
                <th>Male</th>
                <th>Female</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((u, index) => (
                <tr key={index}>
                  <td>{u.did}</td>
                  <td>{u.dtype}</td>
                  <td>{u.dlocation}</td>
                  <td>{u.role}</td>
                  <td>{u.male_count}</td>
                  <td>{u.female_count}</td>
                  <td>{u.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No volunteer count data yet.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default List;