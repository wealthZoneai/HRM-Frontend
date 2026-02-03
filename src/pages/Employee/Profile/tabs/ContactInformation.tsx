import { useState, useEffect } from "react";
import { Pencil, X, Check } from "lucide-react";
import { UpdateContactDetails } from "../../../../Services/apiHelpers";
import { showSuccess, showError } from "../../../../utils/toast";

// Existing component for display mode
const UnderlineField = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        <p className="text-gray-900 min-h-6">{value || "N/A"}</p>
        <div className="w-full h-px bg-gray-300" />
    </div>
);

// Modified EditLineField
const EditLineField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    prefix,
    disabled = false,
    options,
}: {
    label: string;
    name: string;
    value: string;
    type?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    prefix?: string;
    disabled?: boolean;
    options?: string[];
}) => (
    <div className="space-y-1">
        <label className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}>{label}</label>
        <div className={`flex items-center border-b ${disabled ? "border-gray-200" : "border-gray-300 focus-within:border-blue-500"} transition-colors`}>
            {prefix && (
                <span className={`pr-2 py-1 text-base ${disabled ? "text-gray-400" : "text-gray-500"}`}>
                    {prefix}
                </span>
            )}
            {options ? (
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    className={`w-full py-1 focus:outline-none bg-transparent ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"}`}
                >
                    <option value="" disabled>Select {label}</option>
                    {options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
                    disabled={disabled}
                    className={`w-full py-1 focus:outline-none bg-transparent ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"}`}
                />
            )}
        </div>
    </div>
);

// Phone Number Component
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
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    disabled?: boolean;
}) => (
    <EditLineField
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        type="tel"
        prefix="+91"
        disabled={disabled}
    />
);

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

        // Validation for numbers
        if (name === "alternativeNumber" || (allowFullEdit && name === "phone")) {
            if (/^\d{0,10}$/.test(value)) {
                setData((prev) => ({ ...prev, [name]: value }));
            }
            return;
        }

        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleEdit = () => {
        setBackup(dataState); // Save current state as backup
        setIsEditing(true);
    };

    const handleCancel = () => {
        setData(backup);
        setIsEditing(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const {
            alternativeNumber = "",
            phone = "",
        } = dataState;

        if (alternativeNumber.trim() && alternativeNumber.length !== 10) {
            showError("Alternative number must be exactly 10 digits if provided.");
            return;
        }

        if (allowFullEdit && phone.trim() && phone.length !== 10) {
            showError("Phone number must be exactly 10 digits.");
            return;
        }

        const payload = {
            phone_number: phone,
            alternate_number: alternativeNumber,
            marital_status: dataState.maritalStatus,
            gender: dataState.gender, // Added gender to payload
        };

        UpdateContactDetails(payload)
            .then(() => {
                showSuccess("Profile updated successfully");
                setIsEditing(false);
                setBackup(dataState);
            })
            .catch((err) => {
                console.error(err);
                showError("Failed to update profile");
            });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

            {/* PERSONAL INFORMATION */}
            <div className="rounded-lg sm:rounded-xl p-4 sm:p-4">
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
                            <EditLineField 
                                label="First Name" 
                                name="firstName" 
                                value={dataState.firstName} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* MIDDLE NAME */}
                            <EditLineField
                                label="Middle Name"
                                name="middleName"
                                value={dataState.middleName}
                                onChange={handleChange}
                            />

                            {/* LAST NAME */}
                            <EditLineField 
                                label="Last Name" 
                                name="lastName" 
                                value={dataState.lastName} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* WORK MAIL */}
                            <EditLineField 
                                label="Work mail" 
                                name="workMail" 
                                value={dataState.workMail} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* EMPLOYEE ID */}
                            <EditLineField 
                                label="Employee ID" 
                                name="employeeId" 
                                value={dataState.employeeId} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* PERSONAL MAIL */}
                            <EditLineField 
                                label="Personal mail ID" 
                                name="personalMail" 
                                value={dataState.personalMail} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* PHONE NUMBER */}
                            <PhoneNumberField 
                                label="Phone number (10 Digits)" 
                                name="phone" 
                                value={dataState.phone} 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* ALTERNATIVE NUMBER */}
                            <PhoneNumberField
                                label="Alternative Number (10 Digits)"
                                name="alternativeNumber"
                                value={dataState.alternativeNumber}
                                onChange={handleChange}
                            />

                            {/* DATE OF BIRTH */}
                            <EditLineField 
                                label="Date of Birth" 
                                name="dob" 
                                value={dataState.dob} 
                                type="date" 
                                onChange={handleChange} 
                                disabled={!allowFullEdit} 
                            />

                            {/* BLOOD GROUP */}
                            <EditLineField
                                label="Blood Group"
                                name="bloodGroup"
                                value={dataState.bloodGroup}
                                onChange={handleChange}
                            />

                            {/* GENDER - UPDATED TO DROPDOWN & EDITABLE */}
                            <EditLineField
                                label="Gender"
                                name="gender"
                                value={dataState.gender}
                                onChange={handleChange}
                                options={["Male", "Female", "Others", "Prefer not to say"]}
                                disabled={false} // Always editable when in Edit Mode
                            />

                            {/* MARITAL STATUS */}
                            <EditLineField
                                label="Marital Status"
                                name="maritalStatus"
                                value={dataState.maritalStatus}
                                onChange={handleChange}
                                options={["Single", "Married", "Divorced", "Widowed"]}
                            />

                        </>
                    ) : (
                        <>
                            {/* VIEW MODE */}
                            <UnderlineField label="First Name" value={dataState.firstName} />
                            <UnderlineField label="Middle Name" value={dataState.middleName} />
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

            {/* BUTTONS */}
            {isEditing && (
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
            )}
        </form >
    );
};

export default ProfileDetails;