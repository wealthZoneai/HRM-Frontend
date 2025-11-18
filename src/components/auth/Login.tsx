import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from "react-icons/hi";
import Logo from "../../../../assets/WG_logo.png";
// import Illustration from "../../assets/login_illustration.jpg";
// import LoginImg from "../../assets/Login.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState<"employee" | "hr" | "admin">("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }
      navigate(`/hr/dashboard`);

    navigate(`/employee/dashboard`);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f6f7fb] px-6">
      <motion.div
        className="bg-white w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* LEFT SECTION */}
        <div className="hidden md:flex flex-col justify-center items-center p-10">
          {/* <img
            src={Illustration}
            className="w-full h-auto object-cover rounded-md mb-8"
            alt="illustration"
          /> */}
          <h2 className="text-3xl font-bold text-gray-700">
            Human Resource Management
          </h2>
          <p className="text-blue-500 font-medium mt-2">
            A Smarter Way to Manage Workforce
          </p>
        </div>

        {/* RIGHT SECTION */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="flex justify-center mb-8">
            <img src={Logo} alt="logo" className="h-24" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ROLE SELECTION */}
            <div>
              <label className="block mb-2 text-sm text-gray-600 font-medium">
                Login As
              </label>
              <div className="flex gap-3">
                {["admin", "hr", "employee"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold border transition 
                      ${
                        role === r
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
                      }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* USERNAME */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Email</label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-sm text-gray-600 mb-2">Password</label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            {/* LOGIN BUTTON */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Login
            </button>

            <p className="text-center text-sm text-gray-500">
              Forgot your password?{" "}
              <span className="text-blue-600 underline cursor-pointer">
                Reset it
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
