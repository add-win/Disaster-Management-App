import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const ProfileView = () => {
  const [profile, setProfile] = useState({
    username: '',
    usermail: '',
    userph: '',
    userhouse: '',
    userlocation: '',
    userdob: '',
    usergender: ''
  });
  const [originalProfile, setOriginalProfile] = useState(null); // Store original data
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const identifier = localStorage.getItem('publicIdentifier');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`http://localhost:5000/profile?identifier=${identifier}`);
        const data = await res.json();
        if (data.success) {
          setProfile(data.profile);
          setOriginalProfile(data.profile); // Save original data
        } else {
          setError(data.message || 'Unable to load profile.');
        }
      } catch (err) {
        setError('Server error. Please try again later.');
      }
    };
    if (identifier) fetchProfile();
    else setError('No user logged in.');
  }, [identifier]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setMessage('');
    setError('');
    try {
      const res = await fetch('http://localhost:5000/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const data = await res.json();
      if (data.success) {
        setMessage('✅ Profile updated successfully!');
        setEditMode(false);
        setOriginalProfile(profile); // Update original data after save
      } else {
        setError(data.message || 'Update failed.');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile); // Restore original data
    setEditMode(false);
    setMessage('');
    setError('');
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/public-login');
  };

  const handleBack = () => {
    navigate('/public-home');
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Profile Details</h1>
        <p>View and edit your profile information below.</p>
      </header>
      <div className="newuserprofile">
        <div className="profile-card">
          {message && <p className="success-msg">{message}</p>}
          {error && <p className="error-msg">{error}</p>}

          <form className="profile-form">
            <div className="form-group">
              <label>User ID</label>
              <input type="number" name="idpublic" value={profile.idpublic} onChange={handleChange} disabled />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input type="text" name="username" value={profile.username} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                Date of Birth
                {profile.userdob && (
                  <span style={{ color: "#1976d2", fontWeight: 500 }}>
                    {new Date(profile.userdob).toLocaleDateString("en-GB")}
                  </span>
                )}
              </label>

              <input
                type="date"
                name="userdob"
                value={profile.userdob ? profile.userdob : ""}
                onChange={handleChange}
                disabled={!editMode}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="usermail" value={profile.usermail} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input type="text" name="userph" value={profile.userph} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="userhouse" value={profile.userhouse} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="userlocation" value={profile.userlocation} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>Panchayath</label>
              <input type="text" name="userpanchayath" value={profile.userpanchayath} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>District</label>
              <input type="text" name="userdistrict" value={profile.userdistrict} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>State</label>
              <input type="text" name="userstate" value={profile.userstate} onChange={handleChange} disabled={!editMode} />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                name="usergender"
                value={profile.usergender}
                onChange={handleChange}
                disabled={!editMode}
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </form>

          <div className="form-actions">
            {!editMode ? (
              <button className="btn btn-edit" onClick={() => setEditMode(true)}>✏️ Edit</button>
            ) : (
              <>
                <button className="btn btn-save" onClick={handleSave}>💾 Save</button>
                <button className="btn btn-cancel" onClick={handleCancel} style={{ marginLeft: '1rem' }}>❌ Cancel</button>
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="profile-footer">
        © 2025 Disaster Management System | Your profile, your control.
      </footer>
    </div>
  );
};

export default ProfileView;