import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMail } from "react-icons/hi";
import LoginImg from "../../assets/Login.png";
import LoginMobile from "../../assets/Login Mobile.png";
import Logo from "../../assets/logo_svg.svg";
import { useNavigate } from "react-router-dom";
import { showSuccess, showWarning, showError } from "../../utils/toast";
import { ForgotPassword as ForgotPasswordApi } from "../../Services/apiHelpers";

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email");
      return;
    }

    //Basic email validation
    const trimmedEmail = email.trim(); // Trim whitespace
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      showWarning("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await ForgotPasswordApi(trimmedEmail);

      if (response.status === 200 || response.status === 201) {
        showSuccess("OTP sent successfully");
        navigate('/otpverify', { state: { email: trimmedEmail } });
      }
    } catch (err: any) {
      console.error("Forgot password error: ", err);

      const errorMessage = err.response?.data?.email?.[0] || err.response?.data?.detail || "Failed to send OTP. Please try again.";
      showError(errorMessage);
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

            <h2 className="text-2xl font-bold text-white text-center mb-2">
              Forgot Password?
            </h2>
            <p className="text-white text-center text-sm mb-6 opacity-80">
              An OTP will be sent to your registered Email ID
            </p>

            {/* EMAIL INPUT */}
            <div>
              <label className="block text-sm text-white mb-2">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* SUBMIT */}
            <button
              disabled={isLoading}
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm"
            // onClick={handleOTP}
            >
              Send OTP
            </button>

            {/* <p className="text-center text-sm text-white mt-4">
              Remembered your password?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => (window.location.href = "/login")}
              >
                Go Back to Login
              </span>
            </p> */}

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
