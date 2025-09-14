import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const CampPublicList = () => {
  const [residents, setResidents] = useState([]);
  const [formData, setFormData] = useState({ campId: '' });
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => navigate('/');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => setFormData({ campId: '' });
  const handleBack = () => {
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearched(true);
    try {
      const response = await fetch(
        `http://localhost:5000/camp-users-list?campId=${formData.campId}`
      );
      const data = await response.json();

      if (data.success) {
        setResidents(data.residents);
      } else {
        setResidents([]);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching camp residents:", error);
      alert("Something went wrong. Please try again!");
    }
  };

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
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Camp Residents</h1>
        <p>Search and display residents in a particular relief camp.</p>
      </header>

      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Enter Camp ID:</label>
          <input
            type="number"
            name="campId"
            required
            value={formData.campId}
            onChange={handleChange}
            placeholder="Enter Camp ID here"
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
            <button type="reset" className="login-button red" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>

      <div className="live-updates-page">
        {residents.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Resident ID</th>
                <th>Full Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Address</th>
                <th>Location</th>
                <th>Age</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {residents.map((r) => (
                <tr key={r.idpublic}>
                  <td>{r.idpublic}</td>
                  <td>{r.username}</td>
                  <td>{r.userph}</td>
                  <td>{r.usermail}</td>
                  <td>{r.userhouse}</td>
                  <td>{r.userlocation}</td>
                  <td>{calculateAge(r.userdob || r.dob)}</td>
                  <td>{r.usergender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          searched && <p>No Residents found for this camp.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default CampPublicList;
