import React from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const Volunteers = () => {
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
                <h1>Volunteer Registration</h1>
                <p>Please provide your details to register as a volunteer.</p>
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
                    <label htmlFor="email">Email ID:</label>
                    <input type="email" id="email" name="email" placeholder="e.g. john.doe@example.com" required />
                </div>

                <div className="form-group">
                    <label htmlFor="phone">Phone Number:</label>
                    <input type="tel" id="phone" name="phone" placeholder="e.g. +1 234 567 8901" required />
                </div>

                <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" required>
                        <option value="">--Select your status--</option>
                        <option value="available">Available</option>
                        <option value="not-available">Not Available</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="role">Preferred Role:</label>
                    <select id="role" name="role" required>
                        <option value="">-- Select --</option>
                        <option value="rescue">Rescue Operations</option>
                        <option value="medical">Medical Aid</option>
                        <option value="logistics">Logistics Support</option>
                        <option value="food">Food & Supply</option>
                        <option value="general">General Assistance</option>
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
                © 2025 Disaster Management System | Every hand counts.
            </footer>
        </div>
    );
};

export default Volunteers;
