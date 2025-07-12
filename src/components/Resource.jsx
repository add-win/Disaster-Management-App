import React from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const camps = ["St. Thomas School", "Govt College", "Community Hall"];

const resources = [
  { item: "Water Bottles", stock: [120, 200, 80] },
  { item: "Food Packets", stock: [300, 450, 220] },
  { item: "Medicines", stock: [50, 60, 30] },
  { item: "Blankets", stock: [100, 150, 70] },
  { item: "Sanitary Kits", stock: [80, 90, 40] },
];

const ResourceAllocation = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
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
        <h1>Resource Allocation</h1>
        <p>View current resource stock across all relief camps.</p>
      </header>

      <div className="resource-table-container">
        <table className="resource-table">
          <thead>
            <tr>
              <th>Item</th>
              {camps.map((camp, index) => (
                <th key={index}>{camp}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {resources.map((res, idx) => (
              <tr key={idx}>
                <td>{res.item}</td>
                {res.stock.map((qty, i) => (
                  <td key={i}>{qty}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer>
        © 2025 Disaster Management System | Resources tracked efficiently.
      </footer>
    </div>
  );
};

export default ResourceAllocation;
