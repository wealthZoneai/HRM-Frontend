import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import EmployeeLogin from "./pages/Employee/dashboard/Employee/EmployeeLogin";
import EmployeeDashboard from "./pages/Employee/dashboard/Employee/EmployeeDashboard";
import Profile from "./pages/Employee/Profile/Profile";
import Performance from "./pages/Employee/performance/Performance";
import ProjectStatus from "./pages/Employee/projectStatus/ProjectStatus";
import Attendance from "./pages/Employee/attendance/Attendance";
import Notifications from "./pages/Employee/notifications/Notifications";
import LeaveManagement from "./pages/Employee/leave-management/LeaveManagement";
import ApplyLeaveFormPage from "./pages/Employee/leave-management/Apply-Leave/ApplyLeaveFormPage";
import ApplyLeaveSuccess from "./pages/Employee/leave-management/Apply-Leave/ApplyLeaveSuccess";
import Payroll from "./pages/Employee/payroll/Payroll";
import WelcomePage from "./components/auth/Welcome";
import Sidebar from "./pages/HR/Sidebar";

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
        <Route path="/employee/attendances" element={<Attendance />} />
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
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/hr" element={<Sidebar />} />
      </Routes>
    </Router>
  );
}

export default App;
