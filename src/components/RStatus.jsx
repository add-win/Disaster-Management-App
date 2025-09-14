import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const ReliefStatusUpdates = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rcId: '',
        rcstatus: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            rcId: '',
            rcstatus: ''
        });
    };
    const handleBack = () => {
        navigate(-1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/status-relief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Relief Camp Status Updated Successfully!`);
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

    return (
        <div>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Update Relief Camp Status</h1>
                <p>Please provide the current Status of the relief camp.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Relief Camp ID:</label>
                    <input type="number" name="rcId" required value={formData.rcId} onChange={handleChange} placeholder='Enter Relief Camp ID' />
                </div>

                <div className="form-group">
                    <label>Status:</label>
                    <select name="rcstatus" required value={formData.rcstatus} onChange={handleChange}>
                        <option value="">--Select a status--</option>
                        <option value="Active">Open</option>
                        <option value="Inactive">Closed</option>
                        <option value="Maintenance">Under Maintenance</option>
                    </select>
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

export default ReliefStatusUpdates;