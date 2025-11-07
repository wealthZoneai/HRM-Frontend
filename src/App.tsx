import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeLogin from "./pages/Employee/EmployeeLogin";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile";
import Performance from "./pages/Employee/Performance";
import ProjectStatus from "./pages/Employee/ProjectStatus";
import AttendancePage from "./pages/Employee/Attendance";
import Notifications from "./pages/Employee/Notifications";
import LeaveManagement from "./pages/Employee/LeaveManagement";
import ApplyLeaveFormPage from "./components/leave-management/Apply-Leave/ApplyLeaveFormPage";
import ApplyLeaveSuccess from "./components/leave-management/Apply-Leave/ApplyLeaveSuccess";
import Payroll from "./pages/Employee/Payroll";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/employeelogin" replace />} />
        <Route path="/employeelogin" element={<EmployeeLogin />} />
        <Route path="/employee" element={<EmployeeDashboard />} />
        <Route path="/employee/profile" element={<Profile />} />
        <Route path="/employee/performance" element={<Performance />} />
        <Route path="/employee/project-status" element={<ProjectStatus />} />
        <Route path="/employee/attendances" element={<AttendancePage />} />
        <Route path="/employee/notifications" element={<Notifications />} />
        <Route path="/employee/leave-management" element={<LeaveManagement />} />
        <Route
          path="/leave-management/apply"
          element={<ApplyLeaveFormPage />}
        />
        <Route
          path="/leave-management/success"
          element={<ApplyLeaveSuccess />}
        />
        <Route path="/employee/payroll" element={<Payroll />} />
      </Routes>
    </Router>
  );
}

export default App;
