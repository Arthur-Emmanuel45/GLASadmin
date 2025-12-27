import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from './AdminLogin/AdminLogin';
import AdminSignup from './AdminSignup/AdminSignup';
import DashBoard from './DashBoard/DashBoard';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/AdminSignup" element={<AdminSignup />} />
            <Route path="/DashBoard" element={<DashBoard />} />
          </Routes>
      </Router> 
    </div>
  );
}

export default App;
