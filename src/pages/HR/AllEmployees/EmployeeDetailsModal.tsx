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
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Save, DollarSign, Loader2 } from "lucide-react";
import { GetEmployeeById } from "../../../Services/apiHelpers";

export default function EmployeeDetailsModal({ open, onClose, employee }: any) {
    const [fullData, setFullData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        if (open && employee?.id) {
            fetchEmployeeDetails(employee.id);
        } else {
            setFullData(null);
            setError(null);
        }
    }, [open, employee?.id]);

    const fetchEmployeeDetails = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GetEmployeeById(id);
            setFullData(response.data);
            setStatus(response.data.status || "Active");
        } catch (err: any) {
            console.error("Error fetching employee details:", err);
            setError("Failed to load employee details.");
        } finally {
            setLoading(false);
        }
    };

    if (!open || !employee) return null;

    const toggleStatus = () => {
        const newStatus = status === "Active" ? "Inactive" : "Active";
        setStatus(newStatus);
    };

    const statusColor =
        status === "Active"
            ? "bg-green-500 text-white"
            : "bg-red-500 text-white";

    const InfoCard = ({ icon: Icon, title, value, className = "" }: any) => (
        <div className={`p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 ${className}`}>
            <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-blue-600" />
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>
                    <p className="text-lg font-semibold text-gray-800">{value || "—"}</p>
                </div>
            </div>
        </div>
    );

    const fallbackAvatar = `https://ui-avatars.com/api/?background=random&name=${employee.name.replace(" ", "+")}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* MODAL WRAPPER */}
            <div className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col transform transition-all duration-300 scale-100">
                {/* HEADER */}
                <div className="p-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10 border-b">
                    <h2 className="text-2xl font-bold text-gray-800">Employee Profile: {employee.name}</h2>
                    <button className="text-gray-500 hover:text-red-500 transition" onClick={onClose}>
                        <FiX size={28} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 gap-4">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        <p className="text-gray-500 font-medium">Loading employee details...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200 mb-4 max-w-md">
                            <p className="font-semibold mb-1">Oops! Something went wrong.</p>
                            <p className="text-sm">{error}</p>
                        </div>
                        <button
                            onClick={() => fetchEmployeeDetails(employee.id)}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    /* SCROLLABLE SECTION - MAIN CONTENT */
                    <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-3">
                        {/* LEFT COLUMN: PROFILE SUMMARY & STATUS */}
                        <div className="lg:col-span-1 bg-gray-100 p-6 space-y-8 shadow-inner-r">
                            {/* PROFILE CARD */}
                            <div className="text-center">
                                <img
                                    src={fullData?.protected_profile_photo_url || employee.imageUrl || fallbackAvatar}
                                    className="w-36 h-36 mx-auto rounded-full object-cover ring-4 ring-blue-500 shadow-xl"
                                    alt={employee.name}
                                />
                                <h3 className="mt-4 text-3xl font-extrabold text-gray-900">{employee.name}</h3>
                                <p className="text-blue-600 text-xl font-medium">{fullData?.job_title || employee.role}</p>
                                <p className="text-sm text-gray-500 mt-1">Employee ID: <span className="font-bold text-gray-800">{fullData?.emp_id || employee.employeeId}</span></p>

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
                                        <p className="font-medium text-gray-800">{fullData?.department || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                    <FiCalendar className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Joining Date</p>
                                        <p className="font-medium text-gray-800">{fullData?.start_date || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                                    <FiBriefcase className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Reports To</p>
                                        <p className="font-medium text-gray-800">{fullData?.team_lead?.display || "—"}</p>
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
                                            <FiToggleLeft size={20} /> <span className="font-bold">Deactivate</span> Employee
                                        </>
                                    ) : (
                                        <>
                                            <FiToggleRight size={20} /> <span className="font-bold">Activate</span> Employee
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: DETAILED INFO */}
                        <div className="lg:col-span-2 p-6 space-y-8">
                            {/* METRICS / KEY STATS */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <InfoCard icon={FiClock} title="Work Type" value={fullData?.employment_type?.replace("_", " ").toUpperCase()} />
                                <InfoCard icon={FiAward} title="Gender" value={fullData?.gender?.charAt(0).toUpperCase() + fullData?.gender?.slice(1)} />
                                <InfoCard icon={FiFolder} title="Marital Status" value={fullData?.marital_status?.charAt(0).toUpperCase() + fullData?.marital_status?.slice(1)} />
                                <InfoCard icon={DollarSign} title="Blood Group" value={fullData?.blood_group} />
                            </div>

                            {/* CONTACT & ADDRESS */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><FiPhone className="text-blue-600" /> Contact & Location</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg">
                                        <FiMail className="text-blue-500" />
                                        <p className="text-gray-700 truncate">{fullData?.work_email || fullData?.personal_email || "—"}</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg">
                                        <FiPhone className="text-blue-500" />
                                        <p className="text-gray-700">{fullData?.phone_number || "—"}</p>
                                    </div>
                                    <div className="flex items-center gap-3 p-3 bg-white shadow-sm rounded-lg col-span-1 sm:col-span-2">
                                        <FiMapPin className="text-blue-500" />
                                        <p className="text-gray-700">{fullData?.location || "—"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* BANK DETAILS (Replacing Job Description if it's long) */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><DollarSign className="text-blue-600" /> Banking Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                        <p className="text-sm text-gray-500">Bank Name</p>
                                        <p className="text-lg font-bold text-gray-800">{fullData?.bank_name || "—"}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                        <p className="text-sm text-gray-500">Account Holder</p>
                                        <p className="text-lg font-bold text-gray-800">{fullData?.account_holder_name || "—"}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                        <p className="text-sm text-gray-500">Account Number</p>
                                        <p className="text-lg font-bold text-gray-800">{fullData?.account_number || "—"}</p>
                                    </div>
                                    <div className="p-4 bg-gray-50 shadow-sm rounded-lg">
                                        <p className="text-sm text-gray-500">IFSC Code</p>
                                        <p className="text-lg font-bold text-gray-800">{fullData?.ifsc_code || "—"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* JOB DESCRIPTION */}
                            {fullData?.job_description && (
                                <div>
                                    <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20"><FiBriefcase className="text-blue-600" /> Job Description</h3>
                                    <div className="p-5 bg-white shadow-inner border border-gray-100 rounded-xl">
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{fullData.job_description}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* FOOTER BUTTONS */}
                <div className="p-4 flex justify-end gap-3 bg-gray-50 shadow-inner-t sticky bottom-0 border-t">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium"
                    >
                        Close
                    </button>
                    {!loading && !error && (
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 font-medium hover:bg-blue-700 transition shadow-md"
                        >
                            <Save size={18} /> Save Changes
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}