import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile";
import Performance from './pages/Employee/Performance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employeelogin" replace />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/performance" element={<Performance />} />
      </Routes>
    </Router>
  );
}

export default App;
