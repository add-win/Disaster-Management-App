import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const Victims = () => {
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
                <h1>Victim Registration</h1>
                <p>Please provide your details to register as a victim.</p>
            </header>

            <form className="report-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="e.g. John Doe" required />
                </div>

                <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" placeholder="e.g. 30" required />
                </div>

                <div className="form-group">
                    <label htmlFor="location">Location Name / Area:</label>
                    <input type="text" id="location" name="location" placeholder="e.g. Thrissur" required />
                </div>

                <div className="form-group">
                    <label htmlFor="district">District:</label>
                    <input type="text" id="district" name="district" placeholder="e.g. Thrissur" required />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email ID:</label>
                    <input type="email" id="email" name="email" placeholder="e.g. john.doe@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" placeholder="e.g. +1 234 567 8901" required />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Current Status:</label>
                    <select id="status" name="status" required>
                        <option value="">--Select your status--</option>
                        <option value="help">Need Urgent Help</option>
                        <option value="missing">Missing</option>
                        <option value="rescued">Rescued</option>
                        <option value="available">Relief-Camp</option>
                        <option value="deceased">Deceased</option>
                        <option value="hospitalized">Hospitalized</option>
                        <option value="safe">Safe</option>
                        <option value="unharmed">Unharmed</option>
                        <option value="not-available">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cause">Part of Which Disaster:</label>
                    <select id="cause" name="cause" required>
                        <option value="">--Select name of affected Disaster--</option>
                        <option value="flood">Flood</option>
                        <option value="earthquake">Earthquake</option>
                        <option value="fire">Fire</option>
                        <option value="landslide">Landslide</option>
                        <option value="storm">Storm</option>
                        <option value="tsunami">Tsunami</option>
                        <option value="drought">Drought</option>
                        <option value="cyclone">Cyclone</option>
                        <option value="volcanic-eruption">Volcanic Eruption</option>
                        <option value="other">Other</option>
                    </select>
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
                © 2025 Disaster Management System | With you in every step of recovery.
            </footer>
        </div>
    );
};

export default Victims;
