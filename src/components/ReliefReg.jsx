import { useState } from 'react';
import '../App.css';
import { Link, useNavigate } from 'react-router-dom';

const ReliefRegistrations = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        campName: '',
        location: '',
        panchayathName: '',
        district: '',
        state: '',
        capacity: '',
        wardNumber: '',
        phoneNumber: '',
        rooms: '',
        washrooms: '',
        kitchen: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            campName: '',
            location: '',
            panchayathName: '',
            district: '',
            state: '',
            capacity: '',
            wardNumber: '',
            phoneNumber: '',
            rooms: '',
            washrooms: '',
            kitchen: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/new-camp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`New Camp Registered Successfully!\nCamp ID: ${data.campId}`);
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
                <h1>New Relief Camp Registration</h1>
                <p>Please provide the details of the camp you want to register.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="campName" required value={formData.campName} onChange={handleChange} placeholder='Enter Name' />
                </div>

                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder='Enter Location' />
                </div>

                <div className="form-group">
                    <label>Name of Panchayath:</label>
                    <input type="text" name="panchayathName" required value={formData.panchayathName} onChange={handleChange} placeholder='Enter Panchayath Name' />
                </div>

                <div className="form-group">
                    <label>Ward Number:</label>
                    <input type="number" name="wardNumber" required value={formData.wardNumber} onChange={handleChange} placeholder='Enter Ward Number' />
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
                    <label>State:</label>
                    <select name="state" required value={formData.state} onChange={handleChange}>
                        <option value="">--Select a state--</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Goa">Goa</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Bihar">Bihar</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" placeholder="e.g. 1234567890" required value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Number of People can be Accommodated:</label>
                    <input type="number" name="capacity" placeholder="Enter Capacity" required value={formData.capacity} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Number of Rooms:</label>
                    <input type="number" name="rooms" placeholder="e.g. 5" required value={formData.rooms} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Number of Washrooms:</label>
                    <input type="number" name="washrooms" placeholder="e.g. 2" required value={formData.washrooms} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Number of Kitchen:</label>
                    <input type="number" name="kitchen" placeholder="e.g. 1" required value={formData.kitchen} onChange={handleChange} />
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

export default ReliefRegistrations;
