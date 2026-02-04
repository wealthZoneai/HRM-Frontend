import { useState, useEffect } from "react";
import { Pencil, X, Check } from "lucide-react";
import { UpdateContactDetails } from "../../../../Services/apiHelpers";
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
const ProfileDetails = ({ data }: { data?: any }) => {
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

  const [backup, setBackup] = useState(dataState);

  /* ---------- Load data from backend ---------- */
  useEffect(() => {
    if (!data) return;

    const contact = data.contact || {};
    const state = {
      employeeId: data.emp_id || "",
      firstName: contact.first_name || "",
      middleName: contact.middle_name || "",
      lastName: contact.last_name || "",
      workMail: data.work_email || "",
      personalMail: contact.personal_email || "",
      phone: contact.phone_number || "",
      alternativeNumber: contact.alternate_number || "",
      dob: contact.dob || "",
      bloodGroup: contact.blood_group || "",
      gender: contact.gender || "",
      maritalStatus: contact.marital_status || "",
    };

    setData(state);
    setBackup(state);
  }, [data]);

  /* ---------- Change Handler ---------- */
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    // ✅ Only characters allowed for Middle Name
    if (name === "middleName" && !/^[a-zA-Z\s]*$/.test(value)) return;

    // ✅ Only numbers allowed for Alternative Number (max 10 digits)
    if (name === "alternativeNumber" && !/^\d{0,10}$/.test(value)) return;

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
  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (dataState.alternativeNumber && dataState.alternativeNumber.length !== 10) {
      showError("Alternative number must be exactly 10 digits");
      return;
    }

    const payload = {
      alternate_number: dataState.alternativeNumber,
      blood_group: dataState.bloodGroup,
      marital_status: dataState.maritalStatus,
    };

    UpdateContactDetails(payload)
      .then(() => {
        showSuccess("Profile updated successfully");
        setIsEditing(false);
        setBackup(dataState);
      })
      .catch(() => showError("Failed to update profile"));
  };

  /* =====================
     RENDER
  ===================== */
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold">Personal Information</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2"
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
              <EditLineField label="Personal Mail" name="personalMail" value={dataState.personalMail} disabled />
              <PhoneNumberField label="Phone Number" name="phone" value={dataState.phone} disabled />
              <PhoneNumberField label="Alternative Number" name="alternativeNumber" value={dataState.alternativeNumber} onChange={handleChange} />
              <EditLineField label="Date of Birth" name="dob" value={dataState.dob} disabled />
              <EditLineField label="Blood Group" name="bloodGroup" value={dataState.bloodGroup} onChange={handleChange} />
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
              <UnderlineField label="Personal Mail" value={dataState.personalMail} />
              <UnderlineField label="Phone Number" value={dataState.phone ? `+91 ${dataState.phone}` : "N/A"} />
              <UnderlineField label="Alternative Number" value={dataState.alternativeNumber ? `+91 ${dataState.alternativeNumber}` : "N/A"} />
              <UnderlineField label="Date of Birth" value={dataState.dob} />
              <UnderlineField label="Blood Group" value={dataState.bloodGroup} />
              <UnderlineField label="Gender" value={dataState.gender} />
              <UnderlineField label="Marital Status" value={dataState.maritalStatus} />
            </>
          )}
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-4 border-t pt-4">
          <button type="button" onClick={handleCancel} className="px-4 py-2 bg-gray-200 rounded-lg flex items-center gap-2">
            <X size={16} /> Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2">
            <Check size={16} /> Save
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileDetails;
