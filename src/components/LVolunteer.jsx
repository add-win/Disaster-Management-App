import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const VolunteerList = () => {
  const [volunteers, setVolunteers] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
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

  const groupByDisaster = (volunteers) => {
    return volunteers.reduce((groups, v) => {
      const key = `${v.disaster_type+" at "+v.disaster_name} (ID: ${v.did})`;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(v);
      return groups;
    }, {});
  };

  const groupedVolunteers = groupByDisaster(volunteers);

  return (
    <div className='live-div'>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>List of Volunteers</h1>
        <p>Grouped by disaster name and ID.</p>
      </header>

      <div className="live-updates-page">
        {Object.keys(groupedVolunteers).length > 0 ? (
          Object.entries(groupedVolunteers).map(([disasterKey, vols]) => (
            <div key={disasterKey} className="disaster-section">
              <h2>{disasterKey}</h2>
              <table className="disaster-table">
                <thead>
                  <tr>
                    <th>Volunteer ID</th>
                    <th>Role</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>District</th>
                    <th>Age</th>
                    <th>Gender</th>
                  </tr>
                </thead>
                <tbody>
                  {vols.map((v) => (
                    <tr key={v.idpublic}>
                      <td>{v.idpublic}</td>
                      <td>{v.role}</td>
                      <td>{v.username}</td>
                      <td>{v.usermail}</td>
                      <td>{v.userph}</td>
                      <td>{v.userlocation}</td>
                      <td>{v.userdistrict}</td>
                      <td>{calculateAge(v.userdob)}</td>
                      <td>{v.usergender}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
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