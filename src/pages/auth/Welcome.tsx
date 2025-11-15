import { useNavigate } from "react-router-dom";
import welcome from '../../assets/welcome.png';
import Logo from '../../assets/WG_logo.png';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <img
        src={welcome}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover" 
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Main Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 text-center max-w-3xl w-[90%]">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="WZG AI Logo" className="h-32 drop-shadow-xl" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Welcome to <span className="text-blue-600">WZG AI</span>
        </h1>
        <p className="text-black text-lg font-medium mb-10 tracking-wide">
          Human Resource Management System
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "Admin", route: "/admin-login" },
            { label: "HR", route: "/hr-login" },
            { label: "Employee", route: "/employee-login" },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="py-3 rounded-xl bg-linear-to-r from-blue-700 to-blue-500 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}