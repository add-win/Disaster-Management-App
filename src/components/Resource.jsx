import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const ResourceTable = () => {
  const [resources, setResources] = useState([]);
  const [campName, setCampName] = useState("");
  const [campId, setCampId] = useState("");
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  const handleBack = () => {
    navigate(-1);
  };
  const fetchResources = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/list-resources/${id}`);
      const json = await response.json();
      if (json.error) {
        setError(json.error);
        setResources([]);
        setCampName("");
      } else {
        setResources(json.resources);
        setCampName(json.campName);
        setError("");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
      setError("Unable to fetch resources.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearched(true);
    if (campId.trim() !== "") {
      fetchResources(campId);
    }
  };

  const handleReset = () => {
    setCampId("");
    setResources([]);
    setCampName("");
    setError("");
    setSearched(false);
  };

  return (
    <div>
      <header className="header-container">
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Resource Allocation</h1>
        <p>Check available commodities in a specific relief camp.</p>
      </header>

      <div>
        <form onSubmit={handleSubmit} className="report-form">
          <div className="form-group">
            <label>Enter Camp ID: </label>
            <input
              type="number"
              value={campId}
              onChange={(e) => setCampId(e.target.value)}
              placeholder="e.g., 1"
            />
          </div>
          <div className="form-group">
            <div className="form-buttons">
              <button
                type="button"
                className="login-button black"
                onClick={handleBack}
              >
                Back
              </button>
              <button type="submit" className="login-button green">Check</button>
              <button
                type="reset"
                className="login-button red"
                onClick={handleReset}
              >
                Reset
              </button>
            </div>
          </div>
        </form>

        {error && <p style={{ color: "red", textAlign: 'center' }}>{error}</p>}

        {resources.length > 0 ? (
          <div className="table-wrapper">
            <h2 className="camp-title">Camp: {campName}</h2>

            <div className="table-split">
              <table className="disaster-table fancy-table">
                <thead>
                  <tr>
                    <th>Commodity</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.slice(0, Math.ceil(resources.length / 2)).map((row, i) => (
                    <tr key={i}>
                      <td>{row.item}</td>
                      <td
                        className={row.stock > 0 ? "stock-yes" : "stock-no"}
                      >
                        {row.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <table className="disaster-table fancy-table">
                <thead>
                  <tr>
                    <th>Commodity</th>
                    <th>Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {resources.slice(Math.ceil(resources.length / 2)).map((row, i) => (
                    <tr key={i}>
                      <td>{row.item}</td>
                      <td
                        className={row.stock > 0 ? "stock-yes" : "stock-no"}
                      >
                        {row.stock}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          searched && !error && <p>No resources available. Please enter a valid camp ID.</p>
        )}

      </div>

      <footer>
        © 2025 Disaster Management System | Resources tracked efficiently.
      </footer>
    </div>
  );
};

export default ResourceTable;