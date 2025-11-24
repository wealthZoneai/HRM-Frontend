import {
    FiX,
    FiPhone,
    FiMail,
    FiMapPin,
    FiToggleLeft,
    FiToggleRight,
    FiFolder,
    FiBriefcase,
    FiClock,
    FiCalendar,
    FiUsers,
    FiAward,
    FiCheckCircle, // New icon for attendance
    FiTarget, // New icon for goals/projects
} from "react-icons/fi";
import { useState } from "react";
import { Save, UserCheck, DollarSign, Activity } from "lucide-react"; // Activity icon for attendance

export default function EmployeeDetailsModal({ open, onClose, employee }: any) {
    if (!open || !employee) return null;

    const [status, setStatus] = useState(employee.status);

    const toggleStatus = () => {
        const newStatus = status === "Active" ? "Inactive" : "Active";
        setStatus(newStatus);
    };

    const statusColor =
        status === "Active"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white";

    // ENHANCED MOCK DATA
    const employeeDetails = {
        joiningDate: "2022-08-15",
        department: "Technology",
        reportsTo: "Jane Doe (CTO)",
        experience: "3 Years",
        salary: "₹ 6,00,000 CTC",
        lastAppraisal: "2024-04-01",
        projectsCompleted: 8,
        certifications: 3,
        // NEW DATA
        currentProject: "Client CRM Migration",
        projectCompletion: 75, // Percentage
        attendance: {
            presentDays: 20,
            totalDays: 22,
            lateEntries: 2,
            leavesTaken: 1,
            avgHours: "7.8 hrs",
        },
    };

    const InfoCard = ({ icon: Icon, title, value, className = "" }: any) => (
        <div className={`p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ${className}`}>
            <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-blue-600" />
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-lg font-semibold text-gray-800">{value}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">

            {/* MODAL WRAPPER */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col transform transition-all duration-300 scale-100">

                {/* HEADER */}
                <div className="p-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10">
                    <h2 className="text-2xl font-bold text-gray-800">Employee Profile: {employee.name}</h2>
                    <button className="text-gray-500 hover:text-red-500 transition" onClick={onClose}>
                        <FiX size={28} />
                    </button>
                </div>

                {/* SCROLLABLE SECTION - MAIN CONTENT */}
                <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-3">
                    
                    {/* LEFT COLUMN: PROFILE SUMMARY & STATUS */}
                    <div className="lg:col-span-1 bg-gray-100 p-6 space-y-8 shadow-inner-r"> 
                        
                        {/* PROFILE CARD */}
                        <div className="text-center">
                            <img
                                src={employee.imageUrl}
                                className="w-36 h-36 mx-auto rounded-full object-cover ring-4 ring-blue-500 shadow-xl"
                                alt={employee.name}
                            />
                            <h3 className="mt-4 text-3xl font-extrabold text-gray-900">{employee.name}</h3>
                            <p className="text-blue-600 text-xl font-medium">{employee.role}</p>
                            <p className="text-sm text-gray-500 mt-1">Employee ID: **{employee.employeeId}**</p>
                            
                            {/* STATUS PILL */}
                            <div className="mt-4 inline-block">
                                <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider ${statusColor} shadow-md`}>
                                    {status}
                                </span>
                            </div>
                        </div>

                        {/* CORE INFO */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <FiUsers className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Department</p>
                                    <p className="font-medium text-gray-800">{employeeDetails.department}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <FiCalendar className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Joining Date</p>
                                    <p className="font-medium text-gray-800">{employeeDetails.joiningDate}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                <FiBriefcase className="w-5 h-5 text-gray-500" />
                                <div>
                                    <p className="text-sm text-gray-500">Reports To</p>
                                    <p className="font-medium text-gray-800">{employeeDetails.reportsTo}</p>
                                </div>
                            </div>
                        </div>

                        {/* STATUS TOGGLE */}
                        <div className="pt-4 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-700 mb-2">Manage Status</h4>
                            <button
                                onClick={toggleStatus}
                                className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition duration-300 
                                    ${status === "Active" 
                                        ? "bg-red-50 hover:bg-red-100 text-red-600 shadow-sm"
                                        : "bg-green-50 hover:bg-green-100 text-green-600 shadow-sm"
                                    }`}
                            >
                                {status === "Active" ? (
                                    <>
                                        <FiToggleLeft size={20} /> **Deactivate** Employee
                                    </>
                                ) : (
                                    <>
                                        <FiToggleRight size={20} /> **Activate** Employee
                                    </>
                                )}
                            </button>
                        </div>

                    </div>

                    {/* RIGHT COLUMN: DETAILED INFO */}
                    <div className="lg:col-span-2 p-6 space-y-8">

                        {/* METRICS / KEY STATS */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            <InfoCard icon={FiClock} title="Experience" value={employeeDetails.experience} />
                            <InfoCard icon={FiAward} title="Certifications" value={employeeDetails.certifications} />
                            <InfoCard icon={FiFolder} title="Projects Done" value={employeeDetails.projectsCompleted} />
                            <InfoCard icon={DollarSign} title="Last Appraisal" value={employeeDetails.lastAppraisal} />
                        </div>

                        {/* PROJECT PERFORMANCE (NEW SECTION) */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><FiTarget className="text-blue-600" /> Project Performance</h3>
                            
                            <div className="p-5 bg-white shadow-lg rounded-xl">
                                <p className="text-lg font-medium text-gray-800 mb-2">Current Project: **{employeeDetails.currentProject}**</p>
                                
                                <div className="flex justify-between mb-1">
                                    <span className="text-sm font-medium text-blue-700">Completion Status</span>
                                    <span className="text-sm font-medium text-blue-700">{employeeDetails.projectCompletion}%</span>
                                </div>
                                {/* Progress Bar */}
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
                                        style={{ width: `${employeeDetails.projectCompletion}%` }}
                                    ></div>
                                </div>
                                
                                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                                    <p className="text-gray-600"><FiCalendar className="inline mr-1 text-green-500" /> Deadline: 2026-03-31</p>
                                    <p className="text-gray-600"><FiUsers className="inline mr-1 text-green-500" /> Team Size: 5 members</p>
                                </div>
                            </div>
                        </div>

                        {/* ATTENDANCE SUMMARY (ENHANCED SECTION) */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><Activity className="text-blue-600" /> Attendance Summary (Last Month)</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                <div className="p-4 bg-green-50 shadow-sm rounded-lg text-center">
                                    <FiCheckCircle className="w-6 h-6 mx-auto text-green-600 mb-1" />
                                    <p className="text-xs text-gray-500">Present</p>
                                    <p className="text-lg font-bold text-gray-800">{employeeDetails.attendance.presentDays}/{employeeDetails.attendance.totalDays}</p>
                                </div>
                                <div className="p-4 bg-yellow-50 shadow-sm rounded-lg text-center">
                                    <FiClock className="w-6 h-6 mx-auto text-yellow-600 mb-1" />
                                    <p className="text-xs text-gray-500">Avg. Hours</p>
                                    <p className="text-lg font-bold text-gray-800">{employeeDetails.attendance.avgHours}</p>
                                </div>
                                <div className="p-4 bg-red-50 shadow-sm rounded-lg text-center">
                                    <FiToggleLeft className="w-6 h-6 mx-auto text-red-600 mb-1" />
                                    <p className="text-xs text-gray-500">Late Entries</p>
                                    <p className="text-lg font-bold text-gray-800">{employeeDetails.attendance.lateEntries}</p>
                                </div>
                                <div className="p-4 bg-blue-50 shadow-sm rounded-lg text-center">
                                    <FiCalendar className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                                    <p className="text-xs text-gray-500">Leaves Taken</p>
                                    <p className="text-lg font-bold text-gray-800">{employeeDetails.attendance.leavesTaken}</p>
                                </div>
                            </div>
                        </div>

                        {/* CONTACT & ADDRESS */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><FiPhone className="text-blue-600" /> Contact & Location</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg">
                                    <FiMail className="text-blue-500" />
                                    <p className="text-gray-700 truncate">{employee.name.split(" ")[0].toLowerCase()}@company.com</p>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg">
                                    <FiPhone className="text-blue-500" />
                                    <p className="text-gray-700">+91 98765 43210</p>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg col-span-1 sm:col-span-2">
                                    <FiMapPin className="text-blue-500" />
                                    <p className="text-gray-700">Hyderabad, Telangana, India</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* WORK & SALARY DETAILS */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><UserCheck className="text-blue-600" /> Employment & Financials</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                    <p className="text-sm text-gray-500">Annual CTC</p>
                                    <p className="text-lg font-bold text-gray-800">{employeeDetails.salary}</p>
                                </div>
                                <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                    <p className="text-sm text-gray-500">In-Hand Salary</p>
                                    <p className="text-lg font-bold text-gray-800">₹ 42,000 / month</p>
                                </div>
                                <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                    <p className="text-sm text-gray-500">Increment %</p>
                                    <p className="text-lg font-bold text-green-600">7%</p>
                                </div>
                            </div>
                        </div>

                        {/* DOCUMENTS */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><FiFolder className="text-blue-600" /> Documents Checklist</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                                {["Aadhaar Card", "PAN Card", "Resume / CV", "Offer Letter", "Experience Letters", "Form 16"].map((doc, index) => (
                                    <div key={index} className="flex items-center gap-2 text-gray-700 p-2 bg-white shadow-sm rounded-md hover:bg-blue-50 cursor-pointer">
                                        <FiFolder size={16} className="text-yellow-600" />
                                        <span>{doc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER BUTTONS */}
                <div className="p-4 flex justify-end gap-3 bg-gray-50 shadow-inner-t sticky bottom-0">
                    <button 
                        onClick={onClose} 
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                        Close
                    </button>
                    <button 
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition shadow-md"
                        // Add logic here to save changes (like status)
                    >
                        <Save size={18} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}