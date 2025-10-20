import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const ItemDonate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        cid: '',  
        commodity: '',
        donatingPersonName: '',
        donatingQuantity: '',
        deliveryDate: '',
        phoneNumber: '',
        willing: false,
    });

    const handleReset = () => {
        setFormData({
            cid: '',
            commodity: '',
            donatingPersonName: '',
            donatingQuantity: '',
            deliveryDate: '',
            phoneNumber: '',
            willing: false,
        });
    };

    const handleLogout = () => {
        navigate('/');
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
            alert("Please check the box to confirm your donation!");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/accept-donation", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            if (data.success) {
                alert("Donation Registered Successfully!");
                navigate("/admin-home");
            } else {
                alert(data.message || "Registration failed. Check your details and try again.");
            }
        } catch (err) {
            console.error("Submit Error:", err);
        }
    };
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div className='change-background-color'>
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Resource Donation</h1>
                <p>Please provide the details of the resource you want to donate.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Camp Number:</label>
                    <input
                        type="number"
                        name="cid" 
                        required
                        value={formData.cid}
                        onChange={handleChange}
                        placeholder='Enter Camp Number'
                    />
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
                    <label>Donating Quantity/Number:</label>
                    <input
                        type="number"
                        name="donatingQuantity"
                        placeholder="e.g. 100"
                        required
                        value={formData.donatingQuantity}
                        onChange={handleChange}
                    />
                </div>

                <div className='form-group'>
                    <label>Name of Donating Person:</label>
                    <input
                        type="text"
                        name="donatingPersonName"
                        placeholder="Enter Name"
                        required
                        value={formData.donatingPersonName}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Phone Number of Donating Person:</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter Phone Number"
                        required
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Date of Delivery:</label>
                    <input
                        type="date"
                        name="deliveryDate"
                        required
                        value={formData.deliveryDate}
                        onChange={handleChange}
                    />
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
                        I am willing to Donate the Selected Object.
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
                © 2025 Disaster Management System | United for safety.
            </footer>
        </div>
    );
};

export default ItemDonate;