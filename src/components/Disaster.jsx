import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const Report = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/admin-login');
    };
    
    return (
        <div>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Report Disaster</h1>
                <p>Please provide the details of the disaster you want to report.</p>
            </header>

            <form className="report-form">
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                </div>

                <div className="form-group">
                    <label htmlFor="disaster-type">Disaster Type:</label>
                    <select id="disaster-type" name="disaster-type" required>
                        <option value="">--Select a type--</option>
                        <option value="earthquake">Earthquake</option>
                        <option value="flood">Flood</option>
                        <option value="fire">Fire</option>
                        <option value="storm">Storm</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location Name / Area:</label>
                    <input type="text" id="location" name="location" placeholder="e.g. Thrissur" required />
                </div>

                <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <select id="district" name="district" required>
                        <option value="">--Select a district--</option>
                        <option value="Thiruvananthapuram">Thiruvananthapuram</option>
                        <option value="Kollam">Kollam</option>
                        <option value="Pathanamthitta">Pathanamthitta</option>
                        <option value="Alappuzha">Alappuzha</option>
                        <option value="Kottayam">Kottayam</option>
                        <option value="Idukki">Idukki</option>
                        <option value="Ernakulam">Ernakulam</option>
                        <option value="Thrissur">Thrissur</option>
                        <option value="Palakkad">Palakkad</option>
                        <option value="Malappuram">Malappuram</option>
                        <option value="Kozhikode">Kozhikode</option>
                        <option value="Wayanad">Wayanad</option>
                        <option value="Kannur">Kannur</option>
                        <option value="Kasaragod">Kasaragod</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="latitude">Latitude:</label>
                    <input type="number" id="latitude" name="latitude" step="any" placeholder="e.g. 10.5276" required />
                </div>

                <div className="form-group">
                    <label htmlFor="longitude">Longitude:</label>
                    <input type="number" id="longitude" name="longitude" step="any" placeholder="e.g. 76.2144" required />
                </div>

                <div className="form-group">
                    <div className='form-buttons'>
                        <Link to="/admin-home">
                            <button className='login-button black'>Back</button>
                        </Link>
                        <button type="submit" className='login-button green'>Submit</button>
                        <button type="reset" className='login-button red'>Reset</button>
                    </div>
                </div>
            </form>

            <footer>
                © 2025 Disaster Management System | United for safety.
            </footer>
        </div>
    );
};

export default Report;
