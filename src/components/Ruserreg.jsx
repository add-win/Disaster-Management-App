import { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const ReliefUserRegistrations = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        id: '',
        rnumber: '',
        status: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            id: '',
            rnumber: '',
            status: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/new-user-relief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`New Person Registered Successfully!\n`);
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
        navigate('/admin-login');
    };

    return (
        <div>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Relief Camp New Victim Registration</h1>
                <p>Please provide the details of the user you want to register.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Victim ID:</label>
                    <input type="number" name="id" required value={formData.id} onChange={handleChange} placeholder='Enter Victim ID' />
                </div>

                <div className="form-group">
                    <label>Relief Camp Number:</label>
                    <input type="number" name="rnumber" placeholder="Enter Relief Camp Number" required value={formData.rnumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Current Status of Victim:</label>
                    <select name="status" required value={formData.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value="Safe">Safe</option>
                        <option value="Injured">Injured</option>
                        <option value="Hospitalized">Hospitalized</option>
                    </select>
                </div>

                <div className="form-group">
                    <div className='form-buttons'>
                        <Link to="/admin-home">
                            <button type='button' className='login-button black'>Back</button>
                        </Link>
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

export default ReliefUserRegistrations;