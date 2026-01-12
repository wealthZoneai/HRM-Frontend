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
    FiEdit2,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Save, DollarSign, Loader2, XCircle } from "lucide-react";
import { 
    GetEmployeeById, 
    UpdateEmployeeContact, 
    UpdateEmployeeJobAndBank 
} from "../../../Services/apiHelpers"; 

// --- HELPER COMPONENT ---
const EditableField = ({ 
    label, 
    name, 
    value, 
    icon: Icon, 
    placeholder, 
    fullWidth = false,
    isEditing,       
    onChange         
}: any) => {
    return (
        <div className={`p-3 bg-white shadow-sm rounded-xl ${fullWidth ? 'col-span-1 sm:col-span-2' : ''}`}>
            <div className="flex items-center gap-3">
                {Icon && <Icon className="text-blue-500 shrink-0" />}
                <div className="w-full">
                    <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                    {isEditing ? (
                        <input
                            type="text"
                            name={name}
                            value={value || ""}
                            onChange={onChange}
                            placeholder={placeholder}
                            className="w-full border-b border-blue-300 focus:border-blue-600 outline-none py-1 text-gray-800 bg-blue-50/50 px-2 rounded-lg transition-colors"
                        />
                    ) : (
                        <p className="text-gray-700 font-medium truncate">{value || "—"}</p>
                    )}
                </div>
            </div>
        </div>
    );
};

// Simple Info Card Component
const InfoCard = ({ icon: Icon, title, value, className = "" }: any) => (
    <div className={`p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 ${className}`}>
        <div className="flex items-center gap-3">
            <Icon className="w-6 h-6 text-blue-600" />
            <div>
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-lg font-semibold text-gray-800">{value || "—"}</p>
            </div>
        </div>
    </div>
);

export default function EmployeeDetailsModal({ open, onClose, employee }: any) {
    const [fullData, setFullData] = useState<any>(null);
    const [formData, setFormData] = useState<any>({}); 
    const [loading, setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [status, setStatus] = useState("Active");

    useEffect(() => {
        if (open && employee?.id) {
            fetchEmployeeDetails(employee.id);
            setIsEditing(false); 
        } else {
            setFullData(null);
            setFormData({});
            setError(null);
        }
    }, [open, employee?.id]);

    const fetchEmployeeDetails = async (id: string) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GetEmployeeById(id);
            setFullData(response.data);
            setFormData(response.data);
            setStatus(response.data.status || "Active");
        } catch (err: any) {
            console.error("Error fetching employee details:", err);
            setError("Failed to load employee details.");
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({ ...prev, [name]: value }));
    };

    // --- UPDATED SAVE LOGIC TO MATCH BACKEND ---
    const handleSave = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Contact Payload (Matches EmployeeHRContactUpdateSerializer)
            const contactPayload = {
                phone_number: formData.phone_number,
                // Note: Your backend serializer expects 'personal_email' but UI shows 'work_email'.
                // If you want to update work_email, you must add it to the backend serializer fields.
                // For now, I'm sending it in case you fixed the backend.
                work_email: formData.work_email, 
            };

            // 2. Job & Bank Payload (Matches EmployeeJobBankUpdateSerializer)
            const jobBankPayload = {
                // LOCATION is in this serializer in your backend, NOT in Contact
                location: formData.location, 
                
                // Bank Details
                bank_name: formData.bank_name,
                account_number: formData.account_number,
                ifsc_code: formData.ifsc_code,
                branch: formData.branch, // Added Branch
                
                // Job Description
                job_description: formData.job_description,
            };

            // 3. API CALLS
            await Promise.all([
                UpdateEmployeeContact(employee.id, contactPayload),
                UpdateEmployeeJobAndBank(employee.id, jobBankPayload),
            ]);

            setFullData(formData); 
            setIsEditing(false);
            console.log("Details updated successfully");
        } catch (error) {
            console.error("Failed to save", error);
            setError("Failed to save changes.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setFormData(fullData); 
        setIsEditing(false);
        setError(null);
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

    const fallbackAvatar = `https://ui-avatars.com/api/?background=random&name=${employee.name.replace(" ", "+")}`;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            {/* MODAL WRAPPER */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col transform transition-all duration-300 scale-100">
                
                {/* HEADER */}
                <div className="p-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10 border-b">
                    <div className="flex items-center gap-4">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {isEditing ? "Editing Profile" : `Employee Profile: ${employee.name}`}
                        </h2>
                        {!loading && !error && !isEditing && (
                            <button 
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition text-sm font-semibold border border-blue-200"
                            >
                                <FiEdit2 size={14} /> Edit
                            </button>
                        )}
                    </div>
                    <button className="text-gray-500 hover:text-red-500 transition" onClick={onClose}>
                        <FiX size={28} />
                    </button>
                </div>

                {loading ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 gap-4">
                        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
                        <p className="text-gray-500 font-medium">Processing...</p>
                    </div>
                ) : error ? (
                    <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
                        <p className="text-red-600 font-semibold">{error}</p>
                        <button onClick={() => fetchEmployeeDetails(employee.id)} className="mt-4 text-blue-600 underline">Try Again</button>
                    </div>
                ) : (
                    /* MAIN CONTENT */
                    <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-3">
                        
                        {/* LEFT COLUMN: PROFILE SUMMARY */}
                        <div className="lg:col-span-1 bg-gray-100 p-6 space-y-8 shadow-inner-r">
                            <div className="text-center">
                                <img
                                    src={fullData?.protected_profile_photo_url || employee.imageUrl || fallbackAvatar}
                                    className="w-36 h-36 mx-auto rounded-full object-cover ring-4 ring-blue-500 shadow-xl"
                                    alt={employee.name}
                                />
                                
                                {/* READ-ONLY Name & Role */}
                                <div className="mt-4 space-y-2">
                                    <h3 className="text-3xl font-extrabold text-gray-900">{fullData?.name || employee.name}</h3>
                                    <p className="text-blue-600 text-xl font-medium">{fullData?.job_title || employee.role}</p>
                                </div>
                                
                                <p className="text-sm text-gray-500 mt-1">Employee ID: <span className="font-bold text-gray-800">{fullData?.emp_id || employee.employeeId}</span></p>

                                <div className="mt-4 inline-block">
                                    <span className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider ${statusColor} shadow-md`}>
                                        {status}
                                    </span>
                                </div>
                            </div>

                            {/* CORE INFO (READ-ONLY) */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                                    <FiUsers className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Department</p>
                                        <p className="font-medium text-gray-800">{fullData?.department || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                                    <FiCalendar className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Joining Date</p>
                                        <p className="font-medium text-gray-800">{fullData?.start_date || "—"}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                                    <FiBriefcase className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-500">Reports To</p>
                                        <p className="font-medium text-gray-800">{fullData?.team_lead?.display || "—"}</p>
                                    </div>
                                </div>
                            </div>

                            {/* STATUS TOGGLE */}
                            <div className="pt-4 border-t border-gray-200">
                                <button
                                    onClick={toggleStatus}
                                    className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition duration-300 
                                    ${status === "Active" ? "bg-red-50 hover:bg-red-100 text-red-600" : "bg-green-50 hover:bg-green-100 text-green-600"}`}
                                >
                                    {status === "Active" ? <><FiToggleLeft size={20} /> Deactivate</> : <><FiToggleRight size={20} /> Activate</>}
                                </button>
                            </div>
                        </div>

                        {/* RIGHT COLUMN: DETAILED INFO */}
                        <div className="lg:col-span-2 p-6 space-y-8">
                            
                            {/* METRICS (READ-ONLY) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                                <InfoCard icon={FiClock} title="Work Type" value={fullData?.employment_type?.replace("_", " ").toUpperCase()} />
                                <InfoCard icon={FiAward} title="Gender" value={fullData?.gender} />
                                <InfoCard icon={FiFolder} title="Marital Status" value={fullData?.marital_status} />
                                <InfoCard icon={DollarSign} title="Blood Group" value={fullData?.blood_group} />
                            </div>

                            {/* --- EDITABLE CONTACT SECTION --- */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                                    <FiPhone className="text-blue-600" /> Contact & Location
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <EditableField 
                                        icon={FiMail} 
                                        label="Work Email" 
                                        name="work_email" 
                                        value={formData?.work_email} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                    <EditableField 
                                        icon={FiPhone} 
                                        label="Phone Number" 
                                        name="phone_number" 
                                        value={formData?.phone_number} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                    {/* Location moved here in UI but sent to JobBank API in background */}
                                    <EditableField 
                                        icon={FiMapPin} 
                                        label="Current Location" 
                                        name="location" 
                                        value={formData?.location} 
                                        fullWidth={true}
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* --- EDITABLE BANKING SECTION --- */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                                    <DollarSign className="text-blue-600" /> Banking Details
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <EditableField 
                                        label="Bank Name" 
                                        name="bank_name" 
                                        value={formData?.bank_name} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                    {/* Removed Account Holder Name (Missing in Backend) */}
                                    {/* Added Branch (Required in Backend) */}
                                    <EditableField 
                                        label="Branch Name" 
                                        name="branch" 
                                        value={formData?.branch} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                    <EditableField 
                                        label="Account Number" 
                                        name="account_number" 
                                        value={formData?.account_number} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                    <EditableField 
                                        label="IFSC Code" 
                                        name="ifsc_code" 
                                        value={formData?.ifsc_code} 
                                        isEditing={isEditing} 
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            {/* JOB DESCRIPTION (Editable TextArea) */}
                            <div>
                                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                                    <FiBriefcase className="text-blue-600" /> Job Description
                                </h3>
                                <div className="p-5 bg-white shadow-inner border border-gray-100 rounded-2xl">
                                    {isEditing ? (
                                        <textarea
                                            name="job_description"
                                            value={formData?.job_description || ""}
                                            onChange={handleInputChange}
                                            rows={5}
                                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-700"
                                        />
                                    ) : (
                                        <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                                            {formData?.job_description || "No job description added."}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* FOOTER BUTTONS */}
                <div className="p-4 flex justify-end gap-3 bg-gray-50 shadow-inner-t sticky bottom-0 border-t">
                    {!isEditing ? (
                        <>
                            <button
                                onClick={onClose}
                                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-blue-700 transition shadow-md"
                            >
                                <FiEdit2 size={18} /> Edit Profile
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={handleCancelEdit}
                                className="px-6 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition font-medium flex items-center gap-2"
                            >
                                <XCircle size={18} /> Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className="px-6 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-green-700 transition shadow-md disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} 
                                Save Changes
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}