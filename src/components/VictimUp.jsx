import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Victimu = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userid: "",
    status: "",
    willing: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.willing) {
      alert("Please tick the declaration checkbox before submitting!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/update-victims", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message || "Victim Status Updated Successfully!");
        navigate("/admin-home");
      } else {
        alert(data.message || "Update failed. Check your details and try again.");
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Server error. Please try again later.");
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleReset = () => {
    setFormData({
      userid: "",
      status: "",
      willing: false
    });
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className='change-background-color'>
      <header className="header-container">
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Victim Status Updation</h1>
        <p>Please provide your details to update your status as a victim.</p>
      </header>
      <div className="divider">
      <form className="report-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>User ID:</label>
          <input
            type="number"
            name="userid"
            value={formData.userid}
            onChange={handleChange}
            placeholder="e.g. 12345"
            required
          />
        </div>

        <div className="form-group">
          <label>Current Status:</label>
          <select
            name="status"
            required
            value={formData.status}
            onChange={handleChange}
          >
            <option value="">--Select your status--</option>
            <option value="Help">Need Urgent Help</option>
            <option value="Missing">Missing</option>
            <option value="Rescued">Rescued</option>
            <option value="Relief-Camp">Relief-Camp</option>
            <option value="Deceased">Deceased</option>
            <option value="Unharmed">Unharmed</option>
            <option value="Safe">Safe</option>
            <option value="Injured">Injured</option>
            <option value="Hospitalized">Hospitalized</option>
            <option value="Not-Available">Other</option>
          </select>
        </div>

        <div className="form-group-inline">
          <input
            type="checkbox"
            id="willing"
            name="willing"
            checked={formData.willing}
            onChange={handleChange}
            style={{ width: "1.2rem", height: "1.2rem" }}
          />
          <label htmlFor="willing">
            I hereby declare that the information provided is true.
          </label>
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
            <button type="submit" className="login-button green">Submit</button>
            <button type="reset" className="login-button red" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>
      </div>

      <footer>
        © 2025 Disaster Management System | With you in every step of recovery.
      </footer>
    </div>
  );
};

export default Victimu;