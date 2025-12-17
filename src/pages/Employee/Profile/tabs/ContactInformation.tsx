import { useState, useEffect } from "react";
import { Pencil, X, Check, } from "lucide-react";

// Existing component for display mode
const UnderlineField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-gray-900">{value}</p>
        <div className="w-full h-px bg-gray-300" />
    </div>
);

// Modified EditLineField to accept an optional prefix (e.g., for currency or dates)
const EditLineField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    prefix, // New prop for prefix
    disabled = false,
}: {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    prefix?: string; // Optional prefix
    disabled?: boolean;
}) => (
    <div className="space-y-1">
        <label className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}>{label}</label>
        <div className={`flex items-center border-b ${disabled ? "border-gray-200" : "border-gray-300 focus-within:border-blue-500"} transition-colors`}>
            {prefix && (
                <span className={`pr-2 py-1 text-base ${disabled ? "text-gray-400" : "text-gray-500"}`}>
                    {prefix}
                </span>
            )}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`w-full py-1 focus:outline-none bg-transparent ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"}`}
            />
        </div>
    </div>
);

// New component for Phone Number with India Country Code logic
const PhoneNumberField = ({
    label,
    name,
    value,
    onChange,
    disabled = false,
}: {
    label: string;
    name: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}) => (
    <EditLineField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type="tel" // Use tel type for mobile input keyboards
        prefix="+91" // India Country Code
        disabled={disabled}
    />
);


// Existing CustomSelect component (no changes needed)
// const CustomSelect = ({
//   label,
//   name,
//   value,
//   options,
//   onChange,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   options: string[];
//   onChange: (name: string, value: string) => void;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="space-y-1 relative" ref={dropdownRef}>
//       <label className="text-sm font-medium text-gray-700">{label}</label>
//       <div
//         className="w-full border-b border-gray-300 py-1 text-gray-900 cursor-pointer flex justify-between items-center"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className={!value ? "text-gray-500" : ""}>
//           {value || `Select ${label}`}
//         </span>
//         <ChevronDown
//           size={16}
//           className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
//             }`}
//         />
//         
//       </div>

//       {isOpen && (
//         <div className="absolute z-50 w-full bg-white shadow-xl rounded-lg mt-1 py-1 border border-gray-100 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
//           {options.map((option) => (
//             <div
//               key={option}
//               className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === option
//                 ? "bg-blue-50 text-blue-600 font-medium"
//                 : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               onClick={() => {
//                 onChange(name, option);
//                 setIsOpen(false);
//               }}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


const ProfileDetails = ({ allowFullEdit = false, data }: { allowFullEdit?: boolean; data?: any }) => {
    const [isEditing, setIsEditing] = useState(false);

    const [dataState, setData] = useState({
        employeeId: "",
        firstName: "",
        middleName: "",
        lastName: "",
        workMail: "",
        personalMail: "",
        phone: "",
        alternativeNumber: "",
        dob: "",
        bloodGroup: "",
        gender: "",
        maritalStatus: "",
    });

    useEffect(() => {
        if (data) {
            const contactData = data.contact || data;
            const newState = {
                employeeId: data.emp_id || contactData.emp_id || "",
                firstName: contactData.first_name || data.user?.first_name || "",
                middleName: contactData.middle_name || "",
                lastName: contactData.last_name || data.user?.last_name || "",
                workMail: data.work_email || data.user?.email || "",
                personalMail: contactData.personal_email || "",
                phone: contactData.phone_number || "",
                alternativeNumber: contactData.alternate_number || "",
                dob: contactData.dob || "",
                bloodGroup: contactData.blood_group || "",
                gender: contactData.gender || "",
                maritalStatus: contactData.marital_status || "",
            };
            setData(newState);
            setBackup(newState);
        }
    }, [data]);



    const [backup, setBackup] = useState(dataState);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        // ONLY apply validation/limits to the editable phone fields
        if (name === "alternativeNumber" || (allowFullEdit && name === "phone")) {
            // Allow only numbers and max length 10
            if (/^\d{0,10}$/.test(value)) {
                setData((prev) => ({ ...prev, [name]: value }));
            }
            return;
        }

        setData((prev) => ({ ...prev, [name]: value }));
    };

    //   const handleSelectChange = (name: string, value: string) => {
    //     setData((prev) => ({ ...prev, [name]: value }));
    //   };

    const handleEdit = () => {
        setBackup(data);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setData(backup);
        setIsEditing(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Only validate the fields that are actually being edited/updated (Alternative Number)

        // Check for EXACT 10 digits for the OPTIONAL alternative number, IF it is provided
        if (data.alternativeNumber.trim() && data.alternativeNumber.length !== 10) {
            alert("Alternative number must be exactly 10 digits if provided.");
            return;
        }

        if (allowFullEdit && data.phone.trim() && data.phone.length !== 10) {
            alert("Phone number must be exactly 10 digits.");
            return;
        }

        // Middle Name and Blood Group have no special validation (just text inputs)

        // If all validation passes
        setIsEditing(false);
        console.log("Data saved:", data);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

            {/* PERSONAL INFORMATION */}
            <div className=" rounded-lg sm:rounded-xl p-4 sm:p-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
                    <h2 className="text-base sm:text-lg font-semibold">Personal Information</h2>

                    {!isEditing && (
                        <button
                            type="button"
                            onClick={handleEdit}
                            className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                        >
                            Edit <Pencil size={16} />
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                    {isEditing ? (
                        <>

                            {/* FIRST NAME */}
                            {allowFullEdit ? (
                                <EditLineField label="First Name" name="firstName" value={dataState.firstName} onChange={handleChange} />
                            ) : (
                                <EditLineField label="First Name" name="firstName" value={dataState.firstName} disabled={true} />
                            )}

                            {/* MIDDLE NAME (Always Editable) */}
                            <EditLineField
                                label="Middle Name"
                                name="middleName"
                                value={dataState.middleName}
                                onChange={handleChange}
                            />

                            {/* LAST NAME */}
                            {allowFullEdit ? (
                                <EditLineField label="Last Name" name="lastName" value={dataState.lastName} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Last Name" name="lastName" value={dataState.lastName} disabled={true} />
                            )}

                            {/* WORK MAIL */}
                            {allowFullEdit ? (
                                <EditLineField label="Work mail" name="workMail" value={dataState.workMail} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Work mail" name="workMail" value={dataState.workMail} disabled={true} />
                            )}

                            {/* EMPLOYEE ID */}
                            {allowFullEdit ? (
                                <EditLineField label="Employee ID" name="employeeId" value={dataState.employeeId} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Employee ID" name="employeeId" value={dataState.employeeId} disabled={true} />
                            )}

                            {/* PERSONAL MAIL */}
                            {allowFullEdit ? (
                                <EditLineField label="Personal mail ID" name="personalMail" value={dataState.personalMail} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Personal mail ID" name="personalMail" value={dataState.personalMail} disabled={true} />
                            )}

                            {/* PHONE NUMBER */}
                            {allowFullEdit ? (
                                <PhoneNumberField label="Phone number (10 Digits)" name="phone" value={dataState.phone} onChange={handleChange} />
                            ) : (
                                <PhoneNumberField label="Phone number" name="phone" value={dataState.phone} disabled={true} />
                            )}

                            {/* ALTERNATIVE NUMBER (Always Editable) */}
                            <PhoneNumberField
                                label="Alternative Number (10 Digits)"
                                name="alternativeNumber"
                                value={dataState.alternativeNumber}
                                onChange={handleChange}
                            />

                            {/* DATE OF BIRTH */}
                            {allowFullEdit ? (
                                <EditLineField label="Date of Birth" name="dob" value={dataState.dob} type="date" onChange={handleChange} />
                            ) : (
                                <EditLineField label="Date of Birth" name="dob" value={dataState.dob} disabled={true} />
                            )}

                            {/* BLOOD GROUP (Always Editable) */}
                            <EditLineField
                                label="Blood Group"
                                name="bloodGroup"
                                value={dataState.bloodGroup}
                                onChange={handleChange}
                            />

                            {/* GENDER */}
                            {allowFullEdit ? (
                                <EditLineField label="Gender" name="gender" value={dataState.gender} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Gender" name="gender" value={dataState.gender} disabled={true} />
                            )}

                            {/* MARITAL STATUS */}
                            {allowFullEdit ? (
                                <EditLineField label="Marital Status" name="maritalStatus" value={dataState.maritalStatus} onChange={handleChange} />
                            ) : (
                                <EditLineField label="Marital Status" name="maritalStatus" value={dataState.maritalStatus} disabled={true} />
                            )}



                        </>
                    ) : (
                        <>
                            {/* VIEW MODE: All fields are UnderlineField */}
                            <UnderlineField label="First Name" value={dataState.firstName} />
                            <UnderlineField label="Middle Name" value={dataState.middleName || "N/A"} />
                            <UnderlineField label="Last Name" value={dataState.lastName} />
                            <UnderlineField label="Work mail" value={dataState.workMail} />
                            <UnderlineField label="Employee ID" value={dataState.employeeId} />
                            <UnderlineField label="Personal mail ID" value={dataState.personalMail} />

                            <UnderlineField label="Phone number" value={dataState.phone ? `+91 ${dataState.phone}` : "N/A"} />
                            <UnderlineField label="Alternative Number" value={dataState.alternativeNumber ? `+91 ${dataState.alternativeNumber}` : "N/A"} />

                            <UnderlineField label="Date of Birth" value={dataState.dob} />
                            <UnderlineField label="Blood Group" value={dataState.bloodGroup || "N/A"} />
                            <UnderlineField label="Gender" value={dataState.gender} />
                            <UnderlineField label="Marital Status" value={dataState.maritalStatus} />
                        </>
                    )}
                </div>
            </div>

            {/* GLOBAL SAVE/CANCEL */}
            {
                isEditing && (
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <X size={16} /> Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-2 text-sm sm:text-base"
                        >
                            <Check size={16} /> Save Changes
                        </button>
                    </div>
                )
            }
        </form >
    );
};

export default ProfileDetails;