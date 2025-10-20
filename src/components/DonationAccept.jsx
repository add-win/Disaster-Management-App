import React, { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const AcceptDonation = () => {
    const navigate = useNavigate();

    const [donation, setDonation] = useState([]);
    const [campId, setCampId] = useState("");
    const [formData, setFormData] = useState({
        donationid: "",
        willing: false
    });
    const handleBack = () => {
        navigate(-1);
    };
    const fetchDonations = async (cid) => {
        if (!cid) return;
        try {
            const res = await fetch(`http://localhost:5000/live-donation/${cid}`);
            const data = await res.json();
            setDonation(data);
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };

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
            alert("Please confirm Verification Checkbox!");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/accept-donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    donationid: formData.donationid,
                    campId: campId
                })
            });

            const data = await res.json();
            if (data.success) {
                alert("Donation Accepted and Resource Updated!");
                navigate("/admin-home");
            } else {
                alert("Failed to process donation.");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };

    const handleLogout = () => {
        navigate('/');
    };

    const handleReset = () => {
        setCampId("");
        setDonation([]);
        setFormData({
            donationid: "",
            willing: false
        });
    };

    return (
        <div className='change-background-color'>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Acceptance of Donation</h1>
                <p>Please accept donations to update resources.</p>
            </header>
            <div className='donation-form'>
                <form className="report-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Enter Camp Number:</label>
                        <input
                            type="text"
                            value={campId}
                            onChange={(e) => {
                                setCampId(e.target.value);
                                fetchDonations(e.target.value);
                            }}
                            placeholder='Enter Relief Camp Number '
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Donation Object:</label>
                        <select
                            name="donationid"
                            value={formData.donationid}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select Donation --</option>
                            {donation.map((d) => (
                                <option key={d.donationid} value={d.donationid}>
                                    {d.person} - {d.object} - Qty: {d.amount}
                                </option>
                            ))}
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
                            I verify that object has Delivered Successfully.
                        </label>
                    </div>

                    <div className="form-group">
                        <div className='form-buttons'>
                            <button
                                type="button"
                                className="login-button black"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                            <button type="submit" className='login-button green'>Submit</button>
                            <button type="reset" className='login-button red' onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </form>

                <footer>
                    © 2025 Disaster Management System | Every hand counts.
                </footer>
            </div>
        </div>
    );
};

export default AcceptDonation;
