import { useState } from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Input Component
========================== */
const InputField = ({  
  label,
  value,
  onChange,
  type = "text",
  error,
  max,
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  type?: string;
  error?: string | null;
  max?: string;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">{label}</label>
    <input
      type={type}
      max={max}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
        focus:outline-none focus:ring-2 
        ${
          error
            ? "border-red-500 focus:ring-red-500 focus:border-red-500"
            : "focus:ring-blue-500 focus:border-blue-500"
        }
      `}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

/* ==========================
   MAIN COMPONENT
========================== */
// Updated to accept showErrors prop
const StepKin = ({ showErrors }: { showErrors: boolean }) => {
  const { state, dispatch } = useAddEmployee();
  const kin = state.kin;

  /* --------------------------
      FORM VALIDATION STATE
  -------------------------- */
  const [errors, setErrors] = useState({
    email: "",
    employeeId: "",
    startDate: "",
    jobTitle: "",
    department: "",
    employmentType: "",
    location: "",
    teamLead: "",
  });

  /* --------------------------
      VALIDATION LOGIC
  -------------------------- */
  const validate = (field: string, value: string) => {
    let errorMsg = "";

    switch (field) {
      case "email":
        if (!value.trim()) errorMsg = "Work Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          errorMsg = "Enter a valid email address";
        break;

      case "employeeId":
        if (!value.trim()) errorMsg = "Employee ID is required";
        break;

      case "startDate":
        if (!value.trim()) errorMsg = "Start date is required";
        break;

      case "jobTitle":
        if (!value.trim()) errorMsg = "Job Title is required";
        break;

      case "location":
        if (!value.trim()) errorMsg = "Location is required";
        break;

      default:
        errorMsg = "";
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  /* --------------------------
      UPDATE FIELD + VALIDATE
  -------------------------- */
  const updateField = (field: string, value: string) => {
    dispatch({ type: "SET_KIN", payload: { [field]: value } });
    validate(field, value);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Job Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* JOB TITLE */}
          <InputField
            label="Job Title *"
            value={kin.jobTitle}
            // Check both internal error state AND external showErrors trigger
            error={
              errors.jobTitle ||
              (showErrors && !kin.jobTitle ? "Job Title is required" : "")
            }
            onChange={(v) => updateField("jobTitle", v.replace(/[0-9]/g, ""))}
          />

          {/* DEPARTMENT */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Department *
            </label>
            <select
              value={kin.department || ""}
              onChange={(e) => updateField("department", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${
                  showErrors && !kin.department
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                }`}
            >
              <option value="">Select Department</option>
              <option value="Python">Python</option>
              <option value="Testing">Testing</option>
              <option value="Java">Java</option>
              <option value="UI/UX">UI/UX</option>
              <option value="React">React</option>
              <option value="Cyber Security">Cyber Security</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="HR">HR</option>
              <option value="BDM">BDM</option>
              <option value="Networking">Networking</option>
              <option value="Cloud">Cloud (AWS / DevOps)</option>
            </select>
            {showErrors && !kin.department && (
              <span className="text-red-500 text-xs">Department is required</span>
            )}
          </div>

          {/* TEAM LEAD */}
          <InputField
            label="Team Lead"
            value={kin.teamLead}
            error={errors.teamLead}
            onChange={(v) => updateField("teamLead", v.replace(/[0-9]/g, ""))}
          />

          {/* EMPLOYMENT TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Employment Type *
            </label>
            <select
              value={kin.employmentType || ""}
              onChange={(e) => updateField("employmentType", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${
                  showErrors && !kin.employmentType
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                }`}
            >
              <option value="">Select Type</option>
              <option value="full_time">Full time</option>
              <option value="contract">Contract</option>
            </select>
            {showErrors && !kin.employmentType && (
              <span className="text-red-500 text-xs">Employment Type is required</span>
            )}
          </div>

          {/* START DATE */}
          <InputField
            type="date"
            label="Start Date *"
            value={kin.startDate}
            error={
              errors.startDate ||
              (showErrors && !kin.startDate ? "Start date is required" : "")
            }
            max={new Date().toISOString().split("T")[0]}
            onChange={(v) => updateField("startDate", v)}
          />

          {/* LOCATION */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Location *
            </label>
            <select
              value={kin.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${
                  showErrors && !kin.location
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                }`}
            >
              <option value="">Select Location</option>
              <option value="Head Office">Head Office</option>
              <option value="Branch Office">Branch Office</option>
              <option value="Remote">Remote</option>
            </select>
            {showErrors && !kin.location && (
              <span className="text-red-500 text-xs">Location is required</span>
            )}
          </div>
        </div>

        {/* JOB DESCRIPTION */}
        <div className="mt-6">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Job Description
            </label>
            <textarea
              value={kin.jobDescription || ""}
              onChange={(e) => updateField("jobDescription", e.target.value)}
              rows={4}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepKin;