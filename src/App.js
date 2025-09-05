import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import PublicLogin from './components/PublicLogin.jsx';
import { AdminHome, PublicHome } from './components/Home.jsx';
import Report from './components/Disaster.jsx';
import LiveUpdates from './components/Live.jsx';
import StatusUpdates from './components/Status.jsx';
import List from './components/list.jsx';
import UserRegistrations from './components/User.jsx';
import CheckUser from './components/CheckUser.jsx';

import Volunteers from './components/Volunter.jsx';
import Victims from './components/Victim.jsx';
import ReliefCamp from './components/Relief.jsx';
import ResourceAllocation from './components/Resource.jsx';
import SafetyTips from './components/Safety.jsx';
import EmergencyContacts from './components/Emergency.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/admin-login' element={<AdminLogin />} />
        <Route path='/public-login' element={<PublicLogin />} />
        <Route path='/admin-home' element={<AdminHome />} />
        <Route path='/public-home' element={<PublicHome />} />
        <Route path='/report' element={<Report />} />
        <Route path='/live-updates' element={<LiveUpdates />} />
        <Route path='/status-updates' element={<StatusUpdates />} />
        <Route path='/list-disasters' element={<List />} />
        <Route path='/user-registrations' element={<UserRegistrations />} />
        <Route path='/check-user' element={<CheckUser />} />
        
        <Route path='/volunteer-registrations' element={<Volunteers />} />
        <Route path='/victim-support' element={<Victims />} />
        <Route path='/relief-camp' element={<ReliefCamp />} />
        <Route path='/resource-allocation' element={<ResourceAllocation />} />
        <Route path='/safety-tips' element={<SafetyTips />} />
        <Route path='/emergency-contacts' element={<EmergencyContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
