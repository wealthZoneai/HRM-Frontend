import { useState, useEffect } from "react";
import { Pencil, X, Check } from "lucide-react";
import { GetMyProfile, UpdateContactDetails } from "../../../../Services/apiHelpers";
import { showSuccess, showError } from "../../../../utils/toast";

/* =====================
   DISPLAY COMPONENT
===================== */
const UnderlineField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-gray-900 min-h-6">{value || "N/A"}</p>
    <div className="w-full h-px bg-gray-300" />
  </div>
);

/* =====================
   EDIT FIELD COMPONENT
===================== */
const EditLineField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  prefix,
  disabled = false,
  options,
}: any) => (
  <div className="space-y-1">
    <label className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}>
      {label}
    </label>

    <div
      className={`flex items-center border-b ${
        disabled ? "border-gray-200" : "border-gray-300 focus-within:border-blue-500"
      } transition-colors`}
    >
      {prefix && (
        <span className={`pr-2 py-1 ${disabled ? "text-gray-400" : "text-gray-500"}`}>
          {prefix}
        </span>
      )}

      {options ? (
        <select
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-1 bg-transparent focus:outline-none ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"
          }`}
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map((opt: string) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full py-1 bg-transparent focus:outline-none ${
            disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"
          }`}
        />
      )}
    </div>
  </div>
);

/* =====================
   PHONE FIELD
===================== */
const PhoneNumberField = (props: any) => (
  <EditLineField {...props} type="tel" prefix="+91" />
);

/* =====================
   MAIN COMPONENT
===================== */
const ContactInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

  const [backup, setBackup] = useState(dataState);

  /* ---------- Fetch & Load Data ---------- */
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const response = await GetMyProfile();
      const data = response.data;

      // Map backend flat structure to state
      const state = {
        employeeId: data.emp_id || "",
        firstName: data.first_name || "",
        middleName: data.middle_name || "",
        lastName: data.last_name || "",
        workMail: data.work_email || "",
        personalMail: data.personal_email || "",
        phone: data.phone_number || "",
        alternativeNumber: data.alternate_number || "",
        dob: data.dob || "",
        bloodGroup: data.blood_group || "",
        gender: data.gender || "",
        maritalStatus: data.marital_status || "",
      };

      setData(state);
      setBackup(state);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      showError("Failed to load contact information.");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- Change Handler ---------- */
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // Validation: Middle Name (Characters only)
    if (name === "middleName" && !/^[a-zA-Z\s]*$/.test(value)) return;

    // Validation: Alternative Number (Numbers only)
    if (name === "alternativeNumber" && !/^\d*$/.test(value)) return;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  /* ---------- Edit Controls ---------- */
  const handleEdit = () => {
    setBackup(dataState);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setData(backup);
    setIsEditing(false);
  };

  /* ---------- Submit ---------- */
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (dataState.alternativeNumber && dataState.alternativeNumber.length !== 10) {
      showError("Alternative number must be exactly 10 digits");
      return;
    }

    // Prepare payload matching backend keys
    const payload = {
      middle_name: dataState.middleName,
      alternate_number: dataState.alternativeNumber,
      blood_group: dataState.bloodGroup,
      marital_status: dataState.maritalStatus,
      // Add personal_email if your API allows updating it here
      // personal_email: dataState.personalMail 
    };

    try {
      await UpdateContactDetails(payload);
      showSuccess("Contact information updated successfully");
      setIsEditing(false);
      setBackup(dataState);
    } catch (error) {
      console.error("Update failed:", error);
      showError("Failed to update profile");
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-gray-500">Loading Contact Information...</div>;
  }

  /* =====================
       RENDER
   ===================== */
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>

        {!isEditing && (
          <button
            type="button"
            onClick={handleEdit}
            className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2"
          >
            Edit <Pencil size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {isEditing ? (
          <>
            <EditLineField label="First Name" name="firstName" value={dataState.firstName} disabled />
            <EditLineField label="Middle Name" name="middleName" value={dataState.middleName} onChange={handleChange} />
            <EditLineField label="Last Name" name="lastName" value={dataState.lastName} disabled />
            
            <EditLineField label="Work Email" name="workMail" value={dataState.workMail} disabled />
            <EditLineField label="Personal Email" name="personalMail" value={dataState.personalMail} disabled />
            
            <PhoneNumberField label="Phone Number" name="phone" value={dataState.phone} disabled />
            <PhoneNumberField label="Alternative Number" name="alternativeNumber" value={dataState.alternativeNumber} onChange={handleChange} />
            
            <EditLineField label="Date of Birth" name="dob" value={dataState.dob} disabled />
            
            <EditLineField 
              label="Blood Group" 
              name="bloodGroup" 
              value={dataState.bloodGroup} 
              onChange={handleChange}
              options={["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]}
            />
            
            <EditLineField label="Gender" name="gender" value={dataState.gender} disabled />
            
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
            <UnderlineField label="First Name" value={dataState.firstName} />
            <UnderlineField label="Middle Name" value={dataState.middleName} />
            <UnderlineField label="Last Name" value={dataState.lastName} />
            <UnderlineField label="Work Email" value={dataState.workMail} />
            <UnderlineField label="Personal Email" value={dataState.personalMail} />
            <UnderlineField label="Phone Number" value={dataState.phone ? `+91 ${dataState.phone}` : "N/A"} />
            <UnderlineField label="Alternative Number" value={dataState.alternativeNumber ? `+91 ${dataState.alternativeNumber}` : "N/A"} />
            <UnderlineField label="Date of Birth" value={dataState.dob} />
            <UnderlineField label="Blood Group" value={dataState.bloodGroup} />
            <UnderlineField label="Gender" value={dataState.gender} />
            <UnderlineField label="Marital Status" value={dataState.maritalStatus} />
          </>
        )}
      </div>

      {isEditing && (
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 border border-slate-300"
          >
            <X size={16} /> Cancel
          </button>
          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ContactInformation;