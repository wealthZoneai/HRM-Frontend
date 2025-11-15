import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from "../../assets/WG_logo.png";
import Illustration from "../../assets/login_illustration.jpg";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
// import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [role, setRole] = useState<'employee' | 'hr' | 'admin'>('employee');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert("Please fill all fields");
      return;
    }
      navigate(`/employee/dashboard`);

    // try {
    //   // 1️⃣ API REQUEST
    //   const res = await axios.post("http://127.0.0.1:8000/api/login/", {
    //     username,
    //     password,
    //     role,
    //   });

    //   // 2️⃣ Extract token + role from backend response
    //   const token = res.data?.token;
    //   const apiRole = res.data?.role?.toUpperCase(); // EMPLOYEE | HR | ADMIN

    //   if (!token || !apiRole) {
    //     alert("Invalid login response");
    //     return;
    //   }

    //   // 3️⃣ Save to localStorage (for ProtectedRoute)
    //   localStorage.setItem("authToken", token);
    //   localStorage.setItem("role", apiRole);

    //   // 4️⃣ Navigate dynamically
    //   // navigate(`/${apiRole.toLowerCase()}/dashboard`);

    // } catch (err: any) {
    //   alert(err?.response?.data?.message || "Login failed");
    // }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-10 px-6">
      <motion.div
        className="flex w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-2xl h-fit max-h-screen my-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        {/* LEFT SIDE ILLUSTRATION */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 bg-white">
          <img src={Illustration} className="w-full h-auto object-contain" />
          <h1 className="text-3xl text-black font-bold">Welcome to WZG AI</h1>
          <p className="mt-2 text-blue-500">Human Resource Management System</p>
        </div>

        {/* RIGHT: LOGIN FORM */}
        <div className="w-full p-6 md:w-1/2 md:p-8 flex flex-col justify-center">

          <div className="mb-6 flex justify-center">
            <img src={Logo} className="h-32" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* ROLE SELECTION BUTTONS */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Login As
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['admin', 'hr', 'employee'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as any)}
                    className={`py-3 rounded-lg font-semibold transition-all 
                        ${role === r ? 'bg-blue-600 text-white shadow-md scale-[1.03]' 
                                     : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* USERNAME */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <HiOutlineMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-100 rounded-md focus:ring-blue-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-3 top-3 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 pl-10 bg-gray-100 rounded-md focus:ring-blue-500"
                  placeholder="********"
                />
                <button type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-500">
                  {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                </button>
              </div>
            </div>

            {/* SUBMIT */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold shadow-md hover:scale-[1.02]"
            >
              Login
            </button>

          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
