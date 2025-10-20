import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const ReliefCampUpdates = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); 
    };

    const [formData, setFormData] = useState({
        rnumber: '',
        label: '',
        inputValue: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            rnumber: '',
            label: '',
            inputValue: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/update-relief", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Relief Camp Details Updated Successfully!`);
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
        <div className='change-background-color'>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Update Relief Camp Details</h1>
                <p>Please provide the current details of the relief camp.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Relief Camp ID:</label>
                    <input type="number" name="rnumber" required value={formData.rnumber} onChange={handleChange} placeholder='Enter Relief Camp ID' />
                </div>

                <div className="form-group">
                    <label>Select the Label which is going to Update:</label>
                    <select name="label" required value={formData.label} onChange={handleChange}>
                        <option value="">--Select a label--</option>
                        <option value="rname">Camp Name</option>
                        <option value="rlocation">Camp Location</option>
                        <option value="rward">Ward Number</option>
                        <option value="rph">Contact Number</option>
                        <option value="rpeople">Number of People (Accommodated)</option>
                        <option value="rroom">Number of Rooms</option>
                        <option value="rwash">Number of Washrooms</option>
                        <option value="rkit">Number of Kitchen</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Enter Input:</label>
                    <input type="text" name="inputValue" required value={formData.inputValue} onChange={handleChange} placeholder='Enter your input here' />
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

export default ReliefCampUpdates;