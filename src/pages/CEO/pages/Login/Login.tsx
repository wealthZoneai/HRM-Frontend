import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    HiOutlineMail,
    HiOutlineLockClosed,
    HiOutlineEye,
    HiOutlineEyeOff,
} from "react-icons/hi";
import Logo from "../../assets/WG_logo.png"; // Using existing asset
import LoginImg from "../../assets/Login.png"; // Using existing asset as placeholder
import LoginMobile from "../../assets/Login Mobile.png"; // Using existing asset as placeholder
import { useNavigate } from "react-router-dom";


const Login: React.FC = () => {
    const navigate = useNavigate();
    // const dispatch = useDispatch();

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
            alert("Please fill in all fields"); // Basic alert for now
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            // Mock successful login
            localStorage.setItem("access", "mock_token");
            localStorage.setItem("refresh", "mock_refresh_token");
            localStorage.setItem("userName", username);
            localStorage.setItem("role", "ceo"); // Default to CEO for this task
            localStorage.setItem("empId", "CEO-001");

            // Navigate to Dashboard
            navigate('/');
            setIsLoading(false);
        }, 1000);
    };


    return (
        <div className="relative min-h-screen flex items-center justify-center px-6">
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
                            className="text-3xl font-semibold tracking-tight text-[#0047AB] text-center mb-4"
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
                            className="text-3xl tracking-wide font-bold text-[#0047AB] mt-4"
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
                <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl md:bg-transparent md:backdrop-blur-none md:border-none md:shadow-none">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* USERNAME */}
                        <div>
                            <label className="block text-sm text-white mb-2 font-semibold">Username</label>
                            <div className="relative">
                                <HiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    className="w-full bg-white md:bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
                                    placeholder="Enter your name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <label className="block text-sm text-white mb-2 font-semibold">Password</label>
                            <div className="relative">
                                <HiOutlineLockClosed className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full bg-white md:bg-gray-100 p-3 pl-10 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-gray-800"
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
