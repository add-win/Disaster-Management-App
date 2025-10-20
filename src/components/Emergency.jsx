import '../App.css';
import { useNavigate } from 'react-router-dom';

const contacts = [
  {
    title: "National Disaster Response Force (NDRF)",
    icon: "🛡️",
    number: "011-24363260 / 1078",
    description: "24x7 helpline for disaster response across India."
  },
  {
    title: "Fire Department",
    icon: "🔥",
    number: "101",
    description: "Call in case of fire emergencies."
  },
  {
    title: "Ambulance",
    icon: "🚑",
    number: "102 / 108",
    description: "Emergency medical services."
  },
  {
    title: "Police",
    icon: "🚓",
    number: "100",
    description: "Contact for law and order emergencies."
  },
  {
    title: "Disaster Control Room - Kerala",
    icon: "📞",
    number: "1070 / 0471-2331639",
    description: "State control room for natural disasters."
  },
  {
    title: "District Collector Office - Thrissur",
    icon: "🏢",
    number: "0487-2331234",
    description: "Local authority for disaster and relief coordination."
  }
];

const EmergencyContacts = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className='live-div'>
      <header className="header-container">
        <div className="back-wrapper">
          <button onClick={handleBack} className="back-btn">Back</button>
        </div>
        <div className="logout-wrapper">
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
        <h1>Emergency Contacts</h1>
        <p>Call these numbers for immediate assistance during disasters.</p>
      </header>

      <section className="contacts-grid">
        {contacts.map((contact, index) => (
          <div className="contact-card" key={index}>
            <div className="contact-icon">{contact.icon}</div>
            <h3>{contact.title}</h3>
            <p><strong>📞 {contact.number}</strong></p>
            <p>{contact.description}</p>
          </div>
        ))}
      </section>

      <footer>
        © 2025 Disaster Management System | Emergency Help At Hand
      </footer>
    </div>
  );
};

export default EmergencyContacts;
