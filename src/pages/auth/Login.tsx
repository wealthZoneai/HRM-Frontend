import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Logo from "../../assets/logo_svg.svg";
import LoginImg from "../../assets/Login.png";
import LoginMobile from "../../assets/Login Mobile.png";
import { useNavigate } from "react-router-dom";
import { showLoginError, showLoginSuccess, showWarning, } from "../../utils/toast";
import { loginUser } from "../../Services/apiHelpers";
import { setUserData } from "../../store/slice/userData";
import { useDispatch } from "react-redux";
 
 
const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  const [workMode, setWorkMode] = useState<"WFO" | "WFH">("WFO");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
 
  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 
    if (isLoading) return;
 
    if (!username.trim() || !password.trim()) {
      showWarning("Please fill in all fields");
      return;
    }
 
    setIsLoading(true);
 
    try {
      const response = await loginUser({ username, password });
     
      if (response.status === 200) {
        // Save critical auth data
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        localStorage.setItem("userName", response.data.username);
        if (response.data.role === "admin" || response.data.role === "hr") {
          navigate(`/hr/dashboard`);
        } else if (response.data.role === "tl") {
          navigate(`/employee/dashboard`);
        } else if (response.data.role === "employee" || response.data.role === "intern") {
          navigate(`/employee/dashboard`);
        } else if (response.data.role === "dm") {
          navigate(`/dm/dashboard`);
        } else if (response.data.role === "pm") {
          navigate(`/pm/dashboard`);
        }
        dispatch(setUserData({
          token: response.data.access,
          role: response.data.role,
          userName: response.data.username
        }));

        // Show success toast with username
        showLoginSuccess(response.data.username);

        // Debug log to check available fields
        console.log("Login Response Data:", response.data);


        // Save User ID/Employee ID (Adjust field name based on debug log if needed: id, user_id, employee_id)
        if (response.data.id) {
          localStorage.setItem("userId", response.data.id);
        } else if (response.data.employee_id) {
          localStorage.setItem("userId", response.data.employee_id);
        } else if (response.data.user_id) {
          localStorage.setItem("userId", response.data.user_id);
        }
 
        if (response.data.emp_id) {
          localStorage.setItem("empId", response.data.emp_id);
        }

      }

    } catch (error) {
      showLoginError("Invalid credentials. Please check your email and password.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
 
 
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f6f7fb] px-6">
      <motion.div
        className="
          w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden
          grid grid-cols-1 md:grid-cols-2 relative
        "
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Backgrounds: desktop and mobile variants */}
        <div
          className="hidden md:block absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${LoginImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          className="md:hidden absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage: `url(${LoginMobile})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        />
        {/* LEFT SECTION */}
        <div className="relative text-center z-10 hidden md:flex flex-col mt-[20vh] items-center p-10 space-y-6">
          <div></div>
          <div>
            <h2
              className="text-3xl font-semibold tracking-tight text-[#0047AB] text-center -mb-4"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
 
            >
              Human Resource
              <br /> Management System
            </h2>
 
            <div className="flex justify-center">
              <img
                src={Logo}
                className="w-[90%] max-w-md h-auto object-contain"
                alt="logo"
              />
            </div>
 
            <h2
              className="text-3xl tracking-wide font-bold text-[#0047AB]"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
 
            >
              WEALTH ZONE GROUP AI
            </h2>
 
            <p
              className="text-[#0047AB] font-medium text-2xl tracking-tight"
              style={{ textShadow: "0px 4px 4px rgba(0,0,0,0.25)" }}
 
            >
              INTERNATIONAL PRIVATE LIMITED
            </p>
          </div>
        </div>
 
        {/* RIGHT SECTION */}
        <div className="relative z-10 p-8 md:p-12 top-[30px] flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
 
            {/* USERNAME */}
            <div>
              <label className="block text-sm text-white mb-2">Username</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
 
            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-white mb-2">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>







            {/* WORK MODE SELECTION */}
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${workMode === "WFO" ? "border-white" : "border-gray-400 group-hover:border-white"
                  }`}>
                  {workMode === "WFO" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  name="workMode"
                  value="WFO"
                  checked={workMode === "WFO"}
                  onChange={() => setWorkMode("WFO")}
                  className="hidden"
                />
                <span className={`text-sm font-medium transition-colors ${workMode === "WFO" ? "text-white" : "text-gray-500 group-hover:text-white"
                  }`}>
                  Work From Office
                </span>
              </label>
 
              <label className="flex items-center  gap-2 cursor-pointer group">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${workMode === "WFH" ? "border-white" : "border-gray-400 group-hover:border-white"
                  }`}>
                  {workMode === "WFH" && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                </div>
                <input
                  type="radio"
                  name="workMode"
                  value="WFH"
                  checked={workMode === "WFH"}
                  onChange={() => setWorkMode("WFH")}
                  className="hidden"
                />
                <span className={`text-sm font-medium transition-colors ${workMode === "WFH" ? "text-white" : "text-gray-500 group-hover:text-white"
                  }`}>
                  Work From Home
                </span>
              </label>
            </div>
 
            {/* LOGIN BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
 
            <p className="text-center text-sm text-white">
              Don't remember your password?{" "}
              <span className="text-white underline cursor-pointer" onClick={handleForgotPassword}>
                Click here
              </span>
            </p>
 
            <div className="mt-8 text-center pt-4 border-t border-white/20">
              <p className="text-white/80 text-sm">
                Have a query?{" "}
                <a
                  href="mailto:support@wealthzone.com"
                  className="text-white font-semibold hover:underline decoration-blue-300"
                >
                  Connect with Support
                </a>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};
 
export default Login;