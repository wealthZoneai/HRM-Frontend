import React, { useState } from "react";
import { motion } from "framer-motion";
import LoginImg from "../../assets/Login.png";
import Logo from "../../assets/logo_svg.svg";
import { useNavigate } from "react-router-dom";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();

  const handleOTP = () => {
    navigate('/resetpassword')
  }

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input automatically
    if (value && index < 3) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (otp.some((val) => val.trim() === "")) {
      alert("Please enter the complete OTP");
      return;
    }

    alert("OTP Verified (dummy flow)");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f6f7fb] px-6">
      <motion.div
        className="
          w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden
          grid grid-cols-1 md:grid-cols-2 relative
        "
        style={{
          backgroundImage: `url(${LoginImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* LEFT SECTION */}
        <div className="relative text-center z-10 hidden md:flex flex-col mt-[20vh] items-center p-10 space-y-6">
          <div></div>

          <div>
            <h2
              className="text-3xl font-semibold tracking-tight text-blue-700 text-center -mb-4"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
            >
              OTP Verification
            </h2>

            <div className="flex justify-center">
              <img
                src={Logo}
                className="w-[90%] max-w-md h-auto object-contain"
                alt="logo"
              />
            </div>

            <p
              className="text-blue-700 font-medium text-lg tracking-wider"
              style={{ textShadow: "2px 2px 6px rgba(0,0,0,0.5)" }}
            >
              Secure Your Login Access
            </p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6 text-center">
            <h2 className="text-2xl font-bold text-white mb-1">Verify OTP</h2>
            <p className="text-white text-sm opacity-80 mb-8">
              Enter the 4-digit OTP we sent to your registered email.
            </p>

            {/* OTP INPUTS */}
            <div className="flex justify-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e.target.value, index)}
                  className="
                    w-14 h-14 text-center text-2xl font-bold
                    bg-gray-100 rounded-lg outline-none
                    focus:ring-2 focus:ring-blue-500
                  "
                />
              ))}
            </div>

            {/* BUTTON */}
            <button
            onClick={handleOTP}
              type="submit"
              className="w-full py-3 mt-4 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Verify OTP
            </button>

            <p className="text-white mt-5 text-sm">
              Didn't receive the OTP?{" "}
              <span className="underline cursor-pointer">Resend</span>
            </p>

            <p className="text-white text-sm mt-2">
              Wrong email?{" "}
              <span
                className="underline cursor-pointer"
                onClick={() => (window.location.href = "/forgot-password")}
              >
                Go Back
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;
