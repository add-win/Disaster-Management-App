import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const DonateList = () => {
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
        const response = await fetch("http://localhost:5000/list-donation");
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();

    const interval = setInterval(fetchUpdates, 10000);
    return () => clearInterval(interval);
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
        <h1>Reported Donations</h1>
        <p>Showing all Reported Donations.</p>
      </header>

      <div className="live-updates-page">
        {updates.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Camp Number</th>
                <th>Object</th>
                <th>Quantity(kg/Nos)</th>
                <th>Name of Person</th>
                <th>Contact of Person</th>
                <th>Date of Delivery</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((u) => (
                <tr key={u.cid}>
                  <td>{u.cid}</td>
                  <td>{u.object}</td>
                  <td>{u.amount}</td>
                  <td>{u.person}</td>
                  <td>{u.phperson}</td>
                  <td>
                    {new Date(u.dedate).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Donations yet.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default DonateList;