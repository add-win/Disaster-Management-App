import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const ReliefCamp = () => {
  const [camps, setCamps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/reliefcamps")
      .then((res) => res.json())
      .then((data) => setCamps(data))
      .catch((err) => console.error("Error fetching camps:", err));
  }, []);

  const [formData, setFormData] = useState({
    label: '',
    inputValue: ''
  });

  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({ label: '', inputValue: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/check-relief?label=${formData.label}&inputValue=${formData.inputValue}`
      );

      const data = await response.json();

      if (data.success) {
        setUsers(data.users);
      } else {
        setUsers([]);
        alert(data.message);
      }
    } catch (error) {
      console.error("Error Submitting Report:", error);
      alert("Something Went Wrong. Please Try Again!");
    }
  };

  const handleLogout = () => {
    navigate('/admin-login');
  };

  return (
    <div className="relief-camp-page">
      <header className="header-container">
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Relief Camps</h1>
        <p>Here are the currently active relief camps and their status.</p>
      </header>
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select the Label which is going to Give as Input:</label>
          <select name="label" required value={formData.label} onChange={handleChange}>
            <option value="">--Select a label--</option>
            <option value="rnumber">Camp Number</option>
            <option value="rname">Camp Name</option>
            <option value="rlocation">Location</option>
            <option value="rpan">Local Self-Government</option>
            <option value="rward">Ward Number</option>
            <option value="rph">Contact Number</option>
          </select>
        </div>

        <div className="form-group">
          <label>Enter Input:</label>
          <input type="text" name="inputValue" required value={formData.inputValue} onChange={handleChange} placeholder='Enter your input here' />
        </div>

        <div className="form-group">
          <div className='form-buttons'>
            <Link to="/admin-home">
              <button type='button' className='login-button black'>Back</button>
            </Link>
            <button type="submit" className='login-button green'>Check</button>
            <button type="reset" className='login-button red' onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>

      {users.length > 0 && (
        <div className="user-details">
          <h2>Camp Details</h2>
          <table>
            <thead>
              <tr>
                <th>Camp Number</th>
                <th>Camp Name</th>
                <th>Location</th>
                <th>Local Self-Government</th>
                <th>Ward Number</th>
                <th>Contact Number</th>
                <th>Can Accommodate</th>
                <th>Number of Rooms</th>
                <th>Number of Washrooms</th>
                <th>Number of Kitchens</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.rnumber}</td>
                  <td>{user.rname}</td>
                  <td>{user.rlocation}</td>
                  <td>{user.rpan}</td>
                  <td>{user.rward}</td>
                  <td>{user.rph}</td>
                  <td>{user.rpeople}</td>
                  <td>{user.rroom}</td>
                  <td>{user.rwash}</td>
                  <td>{user.rkit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <section className="action-grid">
        {camps.map((camp) => (
          <div className="action-card" key={camp.rnumber}>
            <img src="logo.png" alt={camp.rname} className="camp-img" />
            <h3>{camp.rname}</h3>
            <p><strong>🏕 Camp Number:</strong> {camp.rnumber}</p>
            <p><strong>📍 Location:</strong> {camp.rlocation + " " + camp.rdis + " " + camp.rstate}</p>
            <p><strong>🏛 Local Self-Government:</strong> {camp.rpan}</p>
            <p><strong>👥 Ward Number:</strong> {camp.rward}</p>
            <p><strong>📞 Contact:</strong> {camp.rph}</p>
            <p><strong>👩‍👧‍👦 Can Accommodate:</strong> {camp.rpeople + " Peoples."}</p>
            <p><strong>🛏 Number of Rooms:</strong> {camp.rroom}</p>
            <p><strong>🚻 Number of Washrooms:</strong> {camp.rwash}</p>
            <p><strong>🍽 Number of Kitchens:</strong> {camp.rkit}</p>
          </div>
        ))}
      </section>

      <footer>
        © 2025 Disaster Management System | Together we survive.
      </footer>
    </div>
  );
};

export default ReliefCamp;
