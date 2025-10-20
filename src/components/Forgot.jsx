import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [identifier, setIdentifier] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const navigate = useNavigate();

    const handleReset = () => {
        setIdentifier('');
        setNewPassword('');
        setMessage('');
        setError('');
        setShowPasswordInput(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        setShowPasswordInput(false);
        try {
            const response = await fetch('http://localhost:5000/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier }),
            });
            const data = await response.json();
            if (data.success) {
                setShowPasswordInput(true);
                setMessage(data.message);
            } else {
                setError(data.message || 'Unable to process request.');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            const response = await fetch('http://localhost:5000/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ identifier, newPassword }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Your Password has been Reset Successfully.');
                navigate('/public-login');
                setShowPasswordInput(false);
            } else {
                setError(data.message || 'Unable to Reset Password.');
            }
        } catch (err) {
            setError('Server error. Please try again later.');
        }
    };

    return (
        <div className="admin-login-page">
            <div className="admin-login-card">
                <h2>Forgot Password</h2>
                {message && <p className="success-msg">{message}</p>}
                {error && <p className="error-msg">{error}</p>}
                {!showPasswordInput ? (
                    <form onSubmit={handleSubmit}>
                        <div className="form-group-login">
                            <label>Enter your Email or Username:</label>
                            <input
                                type="text"
                                value={identifier}
                                name="identifier"
                                onChange={(e) => setIdentifier(e.target.value)}
                                required
                                placeholder="Email or Username"
                            />
                        </div>
                        <div className="form-group">
                            <div className='form-buttons'>
                                <Link to="/public-login">
                                    <button type='button' className='login-button black'>Back</button>
                                </Link>
                                <button type="submit" className='login-button green'>Verify</button>
                                <button type="reset" className='login-button red' onClick={handleReset}>Reset</button>
                            </div>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handlePasswordReset}>
                        <div className="form-group">
                            <label>Enter New Password:</label>
                            <input
                                type="text"
                                name="newPassword"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                placeholder="New Password"
                            />
                        </div>
                        <div className="form-group">
                            <div className='form-buttons'>
                                <Link to="/public-login">
                                    <button type='button' className='login-button black'>Back</button>
                                </Link>
                                <button type="submit" className='login-button green'>Submit</button>
                                <button type="reset" className='login-button red' onClick={handleReset}>Clear</button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;