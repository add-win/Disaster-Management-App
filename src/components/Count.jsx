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
        const response = await fetch("http://localhost:5000/volunteer-count");
        const data = await response.json();
        setUpdates(data);
      } catch (error) {
        console.error("Error fetching updates:", error);
      }
    };

    fetchUpdates();
  }, []);

  const groupedData = updates.reduce((acc, item) => {
    const key = `${item.did}-${item.dtype}-${item.dlocation}`;
    if (!acc[key]) {
      acc[key] = {
        did: item.did,
        dtype: item.dtype,
        dlocation: item.dlocation,
        rows: [],
      };
    }
    acc[key].rows.push(item);
    return acc;
  }, {});

  return (
    <div className='live-div'>
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

      <div className="divider1 live-updates-page">
        {updates.length > 0 ? (
          Object.values(groupedData).map((group, i) => (
            <div key={i} className="disaster-section">
              <h2>
                Disaster ID: {group.did} - {group.dtype} ({group.dlocation})
              </h2>
              <table className="disaster-table">
                <thead>
                  <tr>
                    <th>Role</th>
                    <th>Male</th>
                    <th>Female</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((u, idx) => (
                    <tr key={idx}>
                      <td>{u.role}</td>
                      <td>{u.male_count}</td>
                      <td>{u.female_count}</td>
                      <td>{u.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
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
