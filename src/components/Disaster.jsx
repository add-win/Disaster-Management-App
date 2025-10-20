import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const Report = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: '',
        disasterType: '',
        location: '',
        district: '',
        latitude: '',
        longitude: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            date: '',
            disasterType: '',
            location: '',
            district: '',
            latitude: '',
            longitude: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/report-disaster", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Disaster Reported Successfully!\nReport ID: ${data.reportId}`);
                handleReset();
                navigate('/admin-home')
            } else {
                alert(`${data.message}`);
            }
        } catch (error) {
            console.error("Error Submitting Report:", error);
            alert("Something Went Wrong. Please Try Again!");
        }
    };

    const handleLogout = () => {
        navigate('/');
    };
    const handleBack = () => {
        navigate(-1); 
    };
    return (
        <div className="report-disaster">
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Report Disaster</h1>
                <p>Please provide the details of the disaster you want to report.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="date" name="date" required value={formData.date} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Disaster Type:</label>
                    <select name="disasterType" required value={formData.disasterType} onChange={handleChange}>
                        <option value="">--Select a type--</option>
                        <option value="Earthquake">Earthquake</option>
                        <option value="Flood">Flood</option>
                        <option value="Fire">Fire</option>
                        <option value="Storm">Storm</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Location Name / Area:</label>
                    <input type="text" name="location" placeholder="e.g. Thrissur" required value={formData.location} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>District:</label>
                    <select name="district" required value={formData.district} onChange={handleChange}>
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
                    <label>Latitude:</label>
                    <input type="number" name="latitude" step="any" placeholder="e.g. 10.5276" required value={formData.latitude} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Longitude:</label>
                    <input type="number" name="longitude" step="any" placeholder="e.g. 76.2144" required value={formData.longitude} onChange={handleChange} />
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
                © 2025 Disaster Management System | United for safety.
            </footer>
        </div>
    );
};

export default Report;
