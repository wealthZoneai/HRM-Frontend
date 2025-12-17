import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import LoginImg from "../../assets/Login.png";
import LoginMobile from "../../assets/Login Mobile.png";
import Logo from "../../assets/logo_svg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { showSuccess, showWarning, showError } from "../../utils/toast"; // Import toast helpers
import { ResetPassword as ResetPasswordAPI } from "../../Services/apiHelpers"; // Import the API function

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim() || !confirm.trim()) {
      showWarning("Please fill both fields");
      return;
    }

    if (password !== confirm) {
      showWarning("Passwords do not match");
      return;
    }

    // Retrieve email from localStorage (set during OTP verification)
    const storedEmail = localStorage.getItem("resetEmail");
    const stateEmail = location.state?.email;
    const email = storedEmail || stateEmail;

    // Retrieve OTP from location state
    const otp = location.state?.otp;

    if (!email || !otp) {
      showError("Session expired or invalid. Please start the process again.");
      navigate("/forgot-password");
      return;
    }

    try {
      const response = await ResetPasswordAPI({
        email: email,
        otp: otp,
        new_password: password,
        confirm_password: confirm,
      });

      if (response.status === 201 || response.status === 200) {
        showSuccess("Password has been changed successfully");
        localStorage.removeItem("resetEmail"); // Clean up
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        // Handle specific validation errors from backend
        const errorData = error.response.data;
        if (errorData.new_password) {
          showError(errorData.new_password[0]);
        } else if (errorData.confirm_password) {
          showError(errorData.confirm_password[0]);
        } else {
          showError("Failed to reset password. Please try again.");
        }
      } else {
        showError("An error occurred. Please try again.");
      }
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
        <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-2xl font-bold text-white text-center mb-3">
              Reset Your Password
            </h2>

            {/* NEW PASSWORD */}
            <div>
              <label className="block text-sm text-white mb-2">
                New Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label className="block text-sm text-white mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showConfirm ? "text" : "password"}
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Confirm new password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600"
                  onClick={() => setShowConfirm(!showConfirm)}
                >
                  {showConfirm ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Update Password
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;