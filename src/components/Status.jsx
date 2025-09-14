import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const StatusUpdates = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        reportId: '',
        status: '',
        deathCount: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            reportId: '',
            status: '',
            deathCount: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/status-disaster", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Disaster Status Updated Successfully!`);
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
        <div>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Update Disaster Status</h1>
                <p>Please provide the update of the disaster.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Report ID:</label>
                    <input type="number" name="reportId" required value={formData.reportId} onChange={handleChange} placeholder='Enter Report ID' />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select name="status" required value={formData.status} onChange={handleChange}>
                        <option value="">--Select a status--</option>
                        <option value="Active">Active</option>
                        <option value="Progress">Rescue In Progress</option>
                        <option value="Completed">Rescue Completed</option>
                        <option value="Inactive">Disaster Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Death Count:</label>
                    <input type="number" name="deathCount" required value={formData.deathCount} onChange={handleChange} placeholder='Enter Death Count' />
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

export default StatusUpdates;