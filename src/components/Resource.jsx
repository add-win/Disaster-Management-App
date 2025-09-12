import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ResourceTable = () => {
  const [data, setData] = useState({ camps: [], resources: [] });
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/admin-login");
  };

  const handleBack = () => {
    navigate("/admin-home");
  };

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await fetch("http://localhost:5000/list-resources");
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.error("Error fetching resources:", error);
      }
    };

    fetchResources();
    const interval = setInterval(fetchResources, 10000);
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
        <h1>Resource Allocation</h1>
        <p>Showing available commodities across all relief camps.</p>
      </header>

      <div className="live-updates-page">
        {data.resources.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Commodity</th>
                {data.camps.map((camp, i) => (
                  <th key={i}>{camp}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.resources.map((row, i) => (
                <tr key={i}>
                  <td>{row.item}</td>
                  {row.stock.map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        ) : (
          <p>No resources available.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Resources tracked efficiently.
      </footer>
    </div>
  );
};

export default ResourceTable;
