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

import {  showWarning } from "../../utils/toast";
// showLoginError, showLoginSuccess,
// import { loginUser } from "../../Services/apiHelpers";
// import { setUserData } from "../../store/slice/userData";
// import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [role,] = useState<"employee" | "hr" | "admin">("employee");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      showWarning("Please fill in all fields");
      return;
    }
navigate(`/hr/dashboard`);
    // try {
    //   const response = await loginUser({ username, password });
    //   console.log(response)
    //   if (response.status === 200) {
    //     localStorage.setItem("access", response.data.access);
    //     localStorage.setItem("refresh", response.data.refresh);
    //     if (response.data.role === "admin" || response.data.role === "hr") {
    //       navigate(`/hr/dashboard`);
    //     } else if(response.data.role === "employee" || response.data.role === "intern") {
    //       navigate(`/employee/dashboard`);
    //     }
    //     dispatch(setUserData({
    //       token: response.data.access,
    //       role: response.data.role,
    //       userName: response.data.username
    //     }));

    //     // Show success toast with username
    //     showLoginSuccess(response.data.username);

    //   }

    // } catch (error) {
    //   console.error(error);
    //   showLoginError("Invalid credentials. Please check your email and password.");
    // }
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
        <div className="relative z-10 p-8 md:p-12 flex flex-col justify-center">
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
              className="w-full py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition shadow-sm"
            >
              Login
            </button>

            <p className="text-center text-sm text-white">
              Don't remember your password?{" "}
              <span className="text-white underline cursor-pointer" onClick={handleForgotPassword}>
                Click here
              </span>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;





// import React, { useState } from "react";
// import { motion } from "framer-motion";
// // Switched from 'react-icons/hi' to 'lucide-react' to resolve the import error.
// import {
//   Mail,
//   Lock,
//   Eye,
//   EyeOff,
//   AlertCircle,
// } from "lucide-react";
// // IMPORTANT: You will need to re-import your local images.
// // I've used placeholders as I cannot access your local files.
// // import Logo from "../../assets/logo_svg.svg";
// // import LoginImg from "../../assets/Login.png";
// import { useNavigate } from "react-router-dom";

// // Placeholder URLs - SWAP THESE BACK
// const Logo = "https://placehold.co/150x50/007bff/white?text=Your+Logo";
// const LoginImg = "https://placehold.co/1000x1200/6366f1/f1f5f9?text=Login+Image";

// const Login: React.FC = () => {
//   const navigate = useNavigate();

//   const [role, setRole] = useState<"employee" | "hr" | "admin">("employee");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState(""); // For inline error messages

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     setError(""); // Clear previous errors

//     if (!username.trim() || !password.trim()) {
//       setError("Please fill in both email and password.");
//       return;
//     }

//     // On successful login
//     console.log("Logging in as:", role, "with user:", username);
//     navigate(`/${role}/dashboard`);
//   };

//   // Animation variants for staggering children
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//       },
//     },
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">
//       <motion.div
//         className="
//           w-full max-w-6xl shadow-2xl rounded-3xl overflow-hidden
//           flex flex-col md:flex-row
//         "
//         initial={{ opacity: 0, y: 25 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       >
//         {/* LEFT SECTION (IMAGE) */}
//         <div
//           className="relative hidden md:flex md:w-1/2"
//           style={{
//             backgroundImage: `url(${LoginImg})`, // Use placeholder or your LoginImg
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//           }}
//         >
//           {/* You can add an overlay or text here if needed, but clean is good */}
//           <div className="absolute inset-0 bg-blue-700/30"></div>
//         </div>

//         {/* RIGHT SECTION (FORM) */}
//         <motion.div
//           className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Logo */}
//           <motion.div variants={itemVariants} className="flex justify-center mb-6">
//             <img
//               src={Logo} // Use placeholder or your Logo
//               className="h-10" // Adjust size as needed
//               alt="Wealth Zone Group AI"
//             />
//           </motion.div>

//           <motion.h2
//             variants={itemVariants}
//             className="text-3xl font-bold text-gray-900 text-center mb-2"
//           >
//             Welcome Back
//           </motion.h2>
//           <motion.p
//             variants={itemVariants}
//             className="text-gray-600 text-center mb-8"
//           >
//             Login to access your account.
//           </motion.p>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* ROLE SELECTION */}
//             <motion.div variants={itemVariants}>
//               <label className="block mb-2 text-sm font-medium text-gray-700">
//                 Login As
//               </label>
//               <div className="flex bg-gray-100 rounded-lg p-1">
//                 {["admin", "hr", "employee"].map((r) => (
//                   <button
//                     key={r}
//                     type="button"
//                     onClick={() => setRole(r as any)}
//                     className={`w-full py-2.5 rounded-md text-sm font-semibold transition-all duration-300
//                       ${
//                         role === r
//                           ? "bg-white text-blue-600 shadow-sm"
//                           : "text-gray-500 hover:text-gray-900"
//                       }`}
//                   >
//                     {r.charAt(0).toUpperCase() + r.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </motion.div>

//             {/* USERNAME */}
//             <motion.div variants={itemVariants}>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type="email"
//                   className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-lg text-gray-900
//                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   placeholder="you@company.com"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>
//             </motion.div>

//             {/* PASSWORD */}
//             <motion.div variants={itemVariants}>
//               <div className="flex justify-between items-center mb-2">
//                 <label className="block text-sm font-medium text-gray-700">
//                   Password
//                 </label>
//                 <a
//                   href="#"
//                   className="text-sm text-blue-600 hover:underline font-medium"
//                 >
//                   Forgot Password?
//                 </a>
//               </div>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className="w-full bg-gray-50 border border-gray-300 p-3 pl-10 rounded-lg text-gray-900
//                            focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                   placeholder="••••••••"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5" />
//                   ) : (
//                     <Eye className="h-5 w-5" />
//                   )}
//                 </button>
//               </div>
//             </motion.div>

//             {/* ERROR MESSAGE */}
//             {error && (
//               <motion.div
//                 className="flex items-center p-3 rounded-lg bg-red-50 text-red-700"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
//                 <p className="text-sm font-medium">{error}</p>
//               </motion.div>
//             )}

//             {/* LOGIN BUTTON */}
//             <motion.div variants={itemVariants}>
//               <button
//                 type="submit"
//                 className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg
//                            hover:bg-blue-700 transition-colors duration-300
//                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
//                            shadow-lg shadow-blue-500/30"
//               >
//                 Login
//               </button>
//             </motion.div>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;