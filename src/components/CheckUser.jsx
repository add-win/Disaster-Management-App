import { useState } from 'react';
import '../App.css';
import { useNavigate } from 'react-router-dom';

const CheckUser = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    const [formData, setFormData] = useState({
        label: '',
        inputValue: ''
    });

    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setFormData({ label: '', inputValue: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5000/check-user?label=${formData.label}&inputValue=${formData.inputValue}`
            );

            const data = await response.json();

            if (data.success) {
                setUsers(data.users);
            } else {
                setUsers([]);
                alert(data.message);
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
        <div className="change-background-color">
            <header className="header-container">
                <div className="logout-wrapper">
                    <button onClick={handleLogout} className="logout-btn">Logout</button>
                </div>
                <h1>Check User Details</h1>
                <p>Please provide the detail of the user to be checked.</p>
            </header>

            <form className="report-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Select the Label which is going to Give as Input:</label>
                    <select name="label" required value={formData.label} onChange={handleChange}>
                        <option value="">--Select a label--</option>
                        <option value="idpublic">User ID</option>
                        <option value="username">User Name</option>
                        <option value="usermail">Mail ID</option>
                        <option value="userph">Phone Number</option>
                        <option value="userhouse">House Name</option>
                        <option value="userlocation">Location</option>
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
                        <button type="submit" className='login-button green'>Check</button>
                        <button type="reset" className='login-button red' onClick={handleReset}>Reset</button>
                    </div>
                </div>
            </form>

            {users.length > 0 && (
                <div className="user-details">
                    <h2>User Details</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>User Name</th>
                                <th>Date of Birth</th>
                                <th>Mail ID</th>
                                <th>Phone Number</th>
                                <th>House Name</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.idpublic}</td>
                                    <td>{user.username}</td>
                                    <td>{new Date(user.userdob).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "numeric",
                                        year: "numeric",
                                    })}</td>
                                    <td>{user.usermail}</td>
                                    <td>{user.userph}</td>
                                    <td>{user.userhouse}</td>
                                    <td>{user.userlocation}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <footer>
                © 2025 Disaster Management System | United for safety.
            </footer>
        </div>
    );
};

export default CheckUser;
