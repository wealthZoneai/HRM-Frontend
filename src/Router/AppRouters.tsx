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
import ResetPassword from "../pages/auth/ResetPassword";
import HRLayout from "../pages/HR/HRLayout";
import LeadStatus from "../pages/Team Lead/LeadStatus";
import HRProfile from "../pages/HR/Profile/HRProfile";
import HRPolicies from "../pages/HR/Policy/HRPolicies";
import ManagerLayout from "../pages/Manager/ManagerLayout";
import ManagerDashboard from "../pages/Manager/ManagerDashboard";
import CreateProject from "../pages/Manager/CreateProject";
import CreateModule from "../pages/Manager/CreateModule";

import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearAttendance } from "../store/slice/attendanceSlice";

function AppRouters() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const currentTime = Date.now();
        const timeElapsed = currentTime - parseInt(loginTime);
        const twelveHours = 12 * 60 * 60 * 1000;

        if (timeElapsed > twelveHours) {
          // Clear all auth & user data
          localStorage.clear();

          // Dispatch Redux action
          dispatch(clearAttendance());

          navigate("/login");
        }
      }
    };

    // Check immediately
    checkLoginStatus();

    // Check every minute
    const interval = setInterval(checkLoginStatus, 60000);

    return () => clearInterval(interval);
  }, [navigate, dispatch]);

  return (
    <Routes>
      {/* Redirect root → login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<EmployeeLogin />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otpverify" element={<OTPVerification />} />
      <Route path="resetpassword" element={<ResetPassword />} />

      {/* ---------------- EMPLOYEE ROUTES ---------------- */}
      <Route
        path="/employee/*"
        element={
          // ✅ FIXED: Enabled Protection with backend role values
          <ProtectedRoute allowedRoles={["employee", "intern", "tl"]}>
            <DashboardLayout>
              <Outlet />
            </DashboardLayout>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="profile" element={<Profile />} />
        <Route path="performance" element={<Performance />} />
        <Route path="project-status" element={<ProjectStatus />} />
        <Route path="attendances" element={<Attendance />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="leave-management" element={<LeaveManagement />} />
        <Route path="leave-management/apply" element={<ApplyLeaveFormPage />} />
        <Route path="leave-management/success" element={<ApplyLeaveSuccess />} />
        <Route path="payroll" element={<Payroll />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="policy" element={<Policies />} />

        {/* TL specific route accessible if role is 'tl' */}
        <Route path="lead-status" element={<LeadStatus />} />
      </Route>

      {/* ---------------- HR ROUTES ---------------- */}
      <Route
        path="/hr/*"
        element={
          // ✅ FIXED: Enabled Protection for HR
          <ProtectedRoute allowedRoles={["hr", "admin"]}>
            <HRLayout>
              <Outlet />
            </HRLayout>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<HRHomeDashboard />} />
        <Route path="Holidays" element={<HolidayCard />} />
        <Route path="Employees" element={<EmployeeScreen />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="Announcements" element={<AnnouncementsScreen />} />
        <Route path="salary" element={<SalaryManagement />} />
        <Route path="attendance" element={<AttendanceScreen />} />
        <Route path="leave-management" element={<HrLeaveManagement />} />
        <Route path="addEmployeeWizard" element={<AddEmployeeWizard />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="policy" element={<HRPolicies />} />
        <Route path="profile" element={<HRProfile />} />
      </Route>

      {/* ---------------- MANAGER (DM/PM) ROUTES ---------------- */}
      <Route
        path="/dm/*"
        element={
          // ✅ FIXED: Enabled Protection for DM
          <ProtectedRoute allowedRoles={["dm"]}>
            <ManagerLayout>
              <Outlet />
            </ManagerLayout>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="create-module" element={<CreateModule />} />
      </Route>

      <Route
        path="/pm/*"
        element={
          // ✅ FIXED: Enabled Protection for PM
          <ProtectedRoute allowedRoles={["pm"]}>
            <ManagerLayout>
              <Outlet />
            </ManagerLayout>
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<ManagerDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="create-module" element={<CreateModule />} />
      </Route>

      {/* Fallback for unauthorized or 404 */}
      <Route path="/unauthorized" element={<div className="p-10 text-center text-red-600 font-bold">403 - Unauthorized Access</div>} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
}

export default AppRouters;