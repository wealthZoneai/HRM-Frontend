import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import LoginImg from "../../assets/Login.png";
import LoginMobile from "../../assets/Login Mobile.png";
import Logo from "../../assets/logo_svg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { OTPVerify, ForgotPassword as ResendOTP } from "../../Services/apiHelpers";
import { showSuccess, showError, showWarning } from "../../utils/toast";

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get email passed from ForgotPassword page
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      showWarning("Email not found. Please try again.");
      navigate("/forgot-password");
    }
  }, [email, navigate]);

  const handleResend = async () => {
    if (!email) return;

    try {
      await ResendOTP(email);
      showSuccess("OTP has been resent successfully");
    } catch (error) {
      console.error("Resend OTP error", error);
      showError("Failed to resend OTP");
    }
  };

  const handleOTP = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const otpString = otp.join("");
    if (otpString.length !== 4) {
      showWarning("Please enter the complete 4-digit OTP");
      return;
    }

    setIsLoading(true);

    try {
      // Backend expects { "email": "...", "otp": "..." }
      const response = await OTPVerify({ email, otp: otpString });

      if (response.status === 200 || response.status === 201) {
        showSuccess("OTP Verified Successfully!");
        localStorage.setItem("resetEmail", email);
        // Navigate to Reset Password page, passing email and otp (or token)
        navigate('/resetpassword', { state: { email, otp: otpString } });
      }
    } catch (error: any) {
      console.error("OTP Verification Error:", error);
      const errorMessage = error.response?.data?.otp?.[0] ||
        error.response?.data?.detail ||
        "Invalid OTP. Please try again.";
      showError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

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

  // Handle backspace to move to previous input
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
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
          <form onSubmit={(e) => handleOTP(e)} className="space-y-6 text-center">
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
                  onKeyDown={(e) => handleKeyDown(e, index)}
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
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-4 text-white font-bold rounded-md transition shadow-sm ${isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
                }`}
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>

            <p className="text-white mt-5 text-sm">
              Didn't receive the OTP?{" "}
              <span onClick={handleResend} className="underline cursor-pointer hover:text-blue-200">
                Resend
              </span>
            </p>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default OTPVerification;