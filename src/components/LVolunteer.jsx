import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/admin-login');
  };

  const handleBack = () => {
    navigate('/admin-home');
  };

  useEffect(() => {
    const fetchVolunteers = async () => {
      try {
        const response = await fetch("http://localhost:5000/all-volunteers");
        const data = await response.json();
        setVolunteers(data);
      } catch (error) {
        console.error("Error fetching volunteers:", error);
      }
    };

    fetchVolunteers();
    const interval = setInterval(fetchVolunteers, 10000);
    return () => clearInterval(interval);
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "-";
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  return (
    <div>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>List of Volunteers</h1>
        <p>Showing all registered volunteers with public details.</p>
      </header>

      <div className="live-updates-page">
        {volunteers.length > 0 ? (
          <table className="disaster-table">
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Volunteer Role</th>
                <th>Disaster Name</th>
                <th>Disaster Type</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Location</th>
                <th>District</th>
                <th>Age</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((v) => (
                <tr key={v.idpublic}>
                  <td>{v.idpublic}</td>
                  <td>{v.role}</td>
                  <td>{v.disaster_name}</td>
                  <td>{v.disaster_type}</td>
                  <td>{v.username}</td>
                  <td>{v.usermail}</td>
                  <td>{v.userph}</td>
                  <td>{v.userlocation}</td>
                  <td>{v.userdistrict}</td>
                  <td>{calculateAge(v.userdob)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No volunteers found.</p>
        )}
      </div>

      <footer>
        © 2025 Disaster Management System | Stay informed, stay safe.
      </footer>
    </div>
  );
};

export default VolunteerList;