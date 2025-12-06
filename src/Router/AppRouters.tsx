import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import EmployeeLogin from "../pages/auth/Login";
import EmployeeDashboard from "../pages/Employee/dashboard/Employee/EmployeeDashboard";
import Profile from "../pages/Employee/Profile/Profile";
import Performance from "../pages/Employee/performance/Performance";
import ProjectStatus from "../pages/Employee/projectStatus/ProjectStatus";
import Attendance from "../pages/Employee/attendance/Attendance";
import Notifications from "../pages/Employee/notifications/Notifications";
import LeaveManagement from "../pages/Employee/leave-management/LeaveManagement";
import ApplyLeaveFormPage from "../pages/Employee/leave-management/Apply-Leave/ApplyLeaveFormPage";
import ApplyLeaveSuccess from "../pages/Employee/leave-management/Apply-Leave/ApplyLeaveSuccess";
import Payroll from "../pages/Employee/payroll/Payroll";
import { Outlet } from "react-router-dom";
import DashboardLayout from "../pages/Employee/dashboard/DashboardLayout";
// import HRLayout from "../pages/HR/HRLayout";
import HRHomeDashboard from "../pages/HR/HrDashboard/HRHomeDashboard";
import HolidayCard from "../pages/HR/HolidayCard/HolidayCard";
import Calendar from "../pages/Employee/calendar/Calendar";
import Policies from "../pages/Employee/policies/Policies";
import EmployeeScreen from "../pages/HR/AllEmployees/EmployeeScreen";
import AnnouncementsScreen from "../pages/HR/Announcement/AnnouncementsScreen";
import SalaryManagement from "../pages/HR/SalaryManagement/SalaryManagement";
import AttendanceScreen from "../pages/HR/Attendance/AttendanceScreen";
import HrLeaveManagement from "../pages/HR/Leave/LeaveManagement";
import AddEmployeeWizard from "../pages/HR/AllEmployees/AddEmployee/AddEmployeeWizard";
import ForgotPassword from "../pages/auth/ForgotPassword";
import OTPVerification from "../pages/auth/OTPVerification";
import ResetPassword from "../pages/auth/RestPassword";
import HRLayout from "../pages/HR/HRLayout";
import LeadStatus from "../pages/Team Lead/LeadStatus";
// import UploadPage from "../pages/Employee/Profile/tabs/UploadPage";

function AppRouters() {
  return (
    <Routes>
      {/* Redirect root → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Login */}
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otpverify" element={<OTPVerification />} />
      <Route path="resetpassword" element={<ResetPassword />} />

      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee/*"
        element={
          // Wrap with Protected Route to check role
          //   <ProtectedRoute allowedRole="EMPLOYEE">
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
          //   </ProtectedRoute>
        }
      >
        {/* ---------- Employee Pages ---------- */}
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="performance" element={<Performance />} />
        <Route path="project-status" element={<ProjectStatus />} />
        <Route path="attendances" element={<Attendance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="leave-management" element={<LeaveManagement />} />
        <Route path="leave-management/apply" element={<ApplyLeaveFormPage />} />
        <Route
          path="leave-management/success"
          element={<ApplyLeaveSuccess />}
        />
        <Route path="payroll" element={<Payroll />} />
      </Route>
      {/* EMPLOYEE ROUTES */}
      <Route
        path="/employee/*"
        element={
          // Wrap with Protected Route to check role
          //   <ProtectedRoute allowedRole="EMPLOYEE">
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
          //   </ProtectedRoute>
        }
      >
        {/* ---------- Employee Pages ---------- */}
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="performance" element={<Performance />} />
        <Route path="project-status" element={<ProjectStatus />} />
        <Route path="attendances" element={<Attendance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="leave-management" element={<LeaveManagement />} />
        <Route
          path="leave-management/success"
          element={<ApplyLeaveSuccess />}
        />
        <Route path="payroll" element={<Payroll />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="leave-management/apply" element={<ApplyLeaveFormPage />} />
        <Route path="leave-management/success" element={<ApplyLeaveSuccess />} />

        <Route path="policy" element={<Policies />} />
        <Route path="lead-status" element={<LeadStatus />} />
        {/* <Route path="/upload/:type" element={<UploadPage />} /> */}
      </Route>

      {/* HR ROUTES */}

      {/* <Route
        path="/hr/*"
        element={
          // <ProtectedRoute allowedRole="HR">
          <HRLayout>
            <Outlet />
          </HRLayout>
          // </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<HRHomeDashboard />} />
        <Route path="Holidays" element={<HolidayCard />} />
      </Route> */}
      <Route
        path="/hr/*"
        element={
          // <ProtectedRoute allowedRole="HR">
          <HRLayout>
            <Outlet />
          </HRLayout>
          // </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<HRHomeDashboard />} />
        <Route path="Holidays" element={<HolidayCard />} />
        <Route path="Employees" element={<EmployeeScreen />} />
        <Route path="Announcements" element={<AnnouncementsScreen />} />
        <Route path="salary" element={<SalaryManagement />} />
        <Route path="attendance" element={<AttendanceScreen />} />
        <Route path="leave-management" element={<HrLeaveManagement />} />
        <Route path="addEmployeeWizard" element={<AddEmployeeWizard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* ADMIN ROUTES */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <div>ADMIN HOME (Add Admin Layout Here)</div>
          </ProtectedRoute>
        }
      >
        {/* Add Admin Routes */}
      </Route>
    </Routes>
  );
}

export default AppRouters;
