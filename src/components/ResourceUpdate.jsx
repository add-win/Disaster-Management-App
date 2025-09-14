import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const ResourcesUpdates = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        rnumber: '',
        commodity: '',
        amount: ''
    });
    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            rnumber: '',
            commodity: '',
            amount: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/update-resources", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Resource Updated Successfully!`);
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
                <h1>Update Resource in Relief Camp</h1>
                <p>Please provide the updated details of the resource.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Relief Camp ID:</label>
                    <input type="number" name="rnumber" required value={formData.rnumber} onChange={handleChange} placeholder='Enter Relief Camp ID' />
                </div>

                <div className="form-group">
                    <label>Select Donating Object:</label>
                    <select name="commodity" required value={formData.commodity} onChange={handleChange}>
                        <option value="">--Select an Object--</option>
                        <option value="Rice">Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Dal (Lentils)">Dal (Lentils)</option>
                        <option value="Vegetable - Cabbage">Vegetable - Cabbage</option>
                        <option value="Vegetable - Carrot">Vegetable - Carrot</option>
                        <option value="Vegetable - Potato">Vegetable - Potato</option>
                        <option value="Vegetable - Onion">Vegetable - Onion</option>
                        <option value="Vegetable - Tomato">Vegetable - Tomato</option>
                        <option value="Milk">Milk</option>
                        <option value="Eggs">Eggs</option>
                        <option value="Bread">Bread</option>
                        <option value="Water Bottles">Water Bottles</option>
                        <option value="Blankets">Blankets</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Soap">Soap</option>
                        <option value="Sanitary Pads">Sanitary Pads</option>
                        <option value="Toothpaste">Toothpaste</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Enter Quantity:</label>
                    <input type="number" name="amount" required value={formData.amount} onChange={handleChange} placeholder='Enter Quantity here' />
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

export default ResourcesUpdates;