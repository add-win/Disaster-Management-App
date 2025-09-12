import { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const ItemDonate = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        campName: '',
        commodity: '',
        donatingPersonName: '',
        donatingQuantity: '',
        deliveryDate: '',
        phoneNumber: '',
        willing: false,
    });

    const handleReset = () => {
        setFormData({
            campName: '',
            commodity: '',
            donatingPersonName: '',
            donatingQuantity: '',
            deliveryDate: '',
            phoneNumber: '',
            willing: false,
        });
    };

    const handleLogout = () => {
        navigate('/admin-login');
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
            alert("Please fill checkbox to donate Object!");
            return;
        }

        else {
            try {
                const res = await fetch("http://localhost:5000/donate-resource", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData)
                });

                const data = await res.json();
                if (data.success) {
                    alert("Donation Registered Successfully!");
                    navigate("/admin-home");
                } else {
                    alert("Registration failed. Check your details and try again.");
                }
            } catch (err) {
                console.error("Submit Error:", err);
            }
        }
    };

    return (
        <div>
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
                    <input type="number" name="campName" required value={formData.campName} onChange={handleChange} placeholder='Enter Camp Number' />
                </div>

                <div className="form-group">
                    <label>Select Donating Object:</label>
                    <select name="commodity" required value={formData.commodity} onChange={handleChange}>
                        <option value="">--Select an Object--</option>
                        <option value="Rice">Rice</option>
                        <option value="Wheat">Wheat</option>
                        <option value="Dal">Dal (Lentils)</option>
                        <option value="Cabbage">Vegetable - Cabbage</option>
                        <option value="Carrot">Vegetable - Carrot</option>
                        <option value="Potato">Vegetable - Potato</option>
                        <option value="Onion">Vegetable - Onion</option>
                        <option value="Tomato">Vegetable - Tomato</option>
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
                    <input type="text" name="donatingQuantity" placeholder="e.g. 100 kg / 10 Nos." required value={formData.donatingQuantity} onChange={handleChange} />
                </div>

                <div className='form-group'>
                    <label>Name of Donating Person:</label>
                    <input type="text" name="donatingPersonName" placeholder="Enter Name" required value={formData.donatingPersonName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Phone Number of Donating Person:</label>
                    <input type="number" name="phoneNumber" placeholder="Enter Phone Number" required value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Date of Delivery:</label>
                    <input type="date" name="deliveryDate" required value={formData.deliveryDate} onChange={handleChange} />
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
                © 2025 Disaster Management System | United for safety.
            </footer>
        </div>
    );
};

export default ItemDonate;
