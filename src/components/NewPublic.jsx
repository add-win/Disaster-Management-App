import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const PublicRegistrations = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        mailId: '',
        phoneNumber: '',
        houseName: '',
        location: '',
        panchayathName: '',
        district: '',
        state: '',
        gender: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({
            name: '',
            dob: '',
            mailId: '',
            phoneNumber: '',
            houseName: '',
            location: '',
            panchayathName: '',
            district: '',
            state: '',
            gender: '',
            password: ''
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/new-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                alert(`New User Registered Successfully!\nUser ID: ${data.userId}`);
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
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <div>
            <header className="header-container">
                <h1>New User Registration</h1>
                <p>Please provide the details to register.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder='Enter Name' />
                </div>

                <div className="form-group">
                    <label>Date of Birth:</label>
                    <input type="date" name="dob" required value={formData.dob} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Mail ID:</label>
                    <input type="text" name="mailId" placeholder="e.g. user@example.com" required value={formData.mailId} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Phone Number:</label>
                    <input type="text" name="phoneNumber" placeholder="e.g. 1234567890" required value={formData.phoneNumber} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>House Name:</label>
                    <input type="text" name="houseName" placeholder="e.g. ABC Villa" required value={formData.houseName} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Location Name / Area:</label>
                    <input type="text" name="location" placeholder="e.g. Thrissur" required value={formData.location} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label>Panchayath Name:</label>
                    <input type="text" name="panchayathName" placeholder="e.g. ABC Panchayath" required value={formData.panchayathName} onChange={handleChange} />
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
                    <label>Gender:</label>
                    <select name="gender" required value={formData.gender} onChange={handleChange}>
                        <option value="">--Select Gender--</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Password: (⚠️ Remember this password for future logins)</label>
                    <input type="password" name="password" placeholder="Enter your password" required value={formData.password} onChange={handleChange} />
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

export default PublicRegistrations;