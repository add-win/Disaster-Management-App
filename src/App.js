import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/Landing.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import PublicLogin from './components/PublicLogin.jsx';
import { AdminHome, PublicHome } from './components/Home.jsx';
import Report from './components/Disaster.jsx';
import Volunteers from './components/Volunter.jsx';
import Victims from './components/Victim.jsx';
import LiveUpdates from './components/Live.jsx';
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
        <Route path='/public-login' element={<PublicLogin/>}/>
        <Route path='/admin-home' element={<AdminHome/>}/>
        <Route path='/public-home' element={<PublicHome/>}/>
        <Route path='/report' element={<Report />} />
        <Route path='/volunteer' element={<Volunteers />} />
        <Route path='/victim-support' element={<Victims />} />
        <Route path='/live-updates' element={<LiveUpdates />} />
        <Route path='/relief-camp' element={<ReliefCamp />} />
        <Route path='/resource-allocation' element={<ResourceAllocation />} />
        <Route path='/safety-tips' element={<SafetyTips />} />
        <Route path='/emergency-contacts' element={<EmergencyContacts/>}/>
      </Routes>
    </Router>
  );
}

export default App;
