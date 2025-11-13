import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Logo from "../../../assets/WG_logo.png";
import Illustration from "../../../assets/login_illustration.jpg";

import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const EmployeeLogin: React.FC = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<'employee' | 'hr' | 'admin'>('employee');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      alert('Please fill out all fields properly.');
      return;
    }

    try {
      const res = await axios.post("http://127.0.0.1:8000/api/login/", {
        username,
        password,
        role,
      });

      if (res.data && res.data.token) {
        localStorage.setItem("authToken", res.data.token);
        navigate(`/${role}`);
      } else {
        alert('Invalid response from server');
      }
    } catch (err: any) {
      const msg = err?.response?.data?.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 py-10 px-6">
      <motion.div
        className="flex w-full max-w-5xl overflow-hidden bg-white rounded-2xl shadow-2xl h-fit max-h-screen my-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left panel */}
        <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-12 bg-white">
          <div className="flex flex-col items-center space-y-6 max-w-sm w-full">
            <img
              src={Illustration}
              alt="HR Management Illustration"
              className="w-full h-auto object-contain"
            />
            <div>
              <h1 className="text-3xl text-black font-bold">Welcome to WZG AI</h1>
              <p className="mt-2 text-blue-500">
                Human Resource Management System
              </p>
            </div>
          </div>
        </div>

        {/* Right panel: Form */}
        <div className="w-full p-6 md:w-1/2 md:p-8 flex flex-col justify-center">
          <div className="mb-6 flex justify-center">
            <img src={Logo} alt="WZG Logo" className="h-32" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Login As Buttons */}
            <div>
              <label className="block mb-3 text-sm font-medium text-gray-700">
                Login As
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['admin', 'hr', 'employee'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r as 'employee' | 'hr' | 'admin')}
                    className={`py-3 rounded-lg font-semibold transition-all duration-300 ${
                      role === r
                        ? 'bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-md scale-[1.03]'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Username */}
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiOutlineMail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full p-3 pl-10 bg-gray-100 border-transparent rounded-md focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <HiOutlineLockClosed className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full p-3 pl-10 bg-gray-100 border-transparent rounded-md focus:ring-blue-500 focus:border-blue-500 focus:bg-white focus:outline-none"
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <HiOutlineEyeOff className="w-5 h-5" />
                  ) : (
                    <HiOutlineEye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full px-4 py-3 font-semibold text-white bg-linear-to-r from-blue-600 to-blue-700 rounded-md shadow-md hover:shadow-lg hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
              >
                Login
              </button>
            </div>

            {/* Forgot Password */}
            <div className="text-sm text-center text-gray-600">
              Forgot your password?{' '}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                Reset here
              </a>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployeeLogin;
