import React, { useState, useEffect } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const VolunteerUpdate = () => {
    const navigate = useNavigate();

    const [disaster, setDisasters] = useState([]);
    const [formData, setFormData] = useState({
        id: "",
        disasterid: "",
        role: "",
        willing: false
    });

    useEffect(() => {
        fetch("http://localhost:5000/live-updates")
            .then(res => res.json())
            .then(data => {
                setDisasters(data);
            })
            .catch(err => console.error("Fetch Error:", err));
    }, []);

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
            alert("Please fill checkbox to update your status!");
            return;
        }

        else {
            try {
                const res = await fetch("http://localhost:5000/update-volunteers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();
                if (data.success) {
                    alert("Volunteer Status Updated Successfully!");
                    navigate("/admin-home");
                } else {
                    alert("Update failed. Check your details and try again.");
                }
            } catch (err) {
                console.error("Submit Error:", err);
            }
        }
    };

    const handleLogout = () => {
        navigate('/admin-login');
    };

    const handleReset = () => {
        setFormData({
            id: "",
            disasterid: "",
            role: "",
            willing: false
        });
    };

    return (
        <div>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Volunteer Status Updation</h1>
                <p>Please provide your details to update your status as a volunteer.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="number"
                        name="id"
                        value={formData.id}
                        onChange={handleChange}
                        placeholder="e.g. 12345"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Disaster Name & Type:</label>
                    <select
                        name="disasterid"
                        value={formData.disastername}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select Active Disaster --</option>
                        {disaster.map(d => (
                            <option key={d.did} value={d.did}>
                                {d.dlocation} - {d.dtype}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Preferred Role:</label>
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">-- Select --</option>
                        <option value="Rescue">Rescue Operations</option>
                        <option value="Medical">Medical Aid</option>
                        <option value="Logistics">Logistics Support</option>
                        <option value="Food">Food & Supply</option>
                        <option value="General">General Assistance</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group-inline">
                    <input
                        type="checkbox"
                        name="willing"
                        checked={formData.willing}
                        onChange={handleChange}
                        style={{ width: "1.2rem", height: "1.2rem" }}
                    />
                    <label htmlFor="willing">
                        I here by declare that the information provided is true.
                    </label>
                </div>

                <div className="form-group">
                    <div className='form-buttons'>
                        <Link to="/admin-home">
                            <button type="button" className='login-button black'>Back</button>
                        </Link>
                        <button
                            type="submit"
                            className='login-button green'
                        >
                            Submit
                        </button>
                        <button type="reset" className='login-button red' onClick={handleReset}>Reset</button>
                    </div>
                </div>

            </form>

            <footer>
                © 2025 Disaster Management System | With you in every step of recovery.
            </footer>
        </div>
    );
};

export default VolunteerUpdate;