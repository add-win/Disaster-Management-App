import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const List = () => {
  const [updates, setUpdates] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-disasters");
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
    <div className='live-div'>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>List of Disasters Occured</h1>
        <p>Showing all  Disasters which had occured.</p>
      </header>

      <div className="divider1 live-updates-page">
        {updates.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Type</th>
                <th>Location</th>
                <th>District</th>
                <th>Latitude</th>
                <th>Longitude</th>
                <th>Date</th>
                <th>Time</th>
                <th>Death Count</th>
              </tr>
            </thead>
            <tbody>
              {updates.map((u) => (
                <tr key={u.did}>
                  <td>{u.did}</td>
                  <td>{u.dtype}</td>
                  <td>{u.dlocation}</td>
                  <td>{u.ddistrict}</td>
                  <td>{u.dlatitude}</td>
                  <td>{u.dlongtitude}</td>
                  <td>
                    {new Date(u.reported_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{new Date(u.reported_at).toLocaleTimeString()}</td>
                  <td>{u.ddeathcount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No disaster yet.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default List;