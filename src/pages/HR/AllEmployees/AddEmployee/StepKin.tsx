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
  disabled, // Added disabled prop
  required, // Added required
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  type?: string;
  error?: string | null;
  max?: string;
  disabled?: boolean;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      max={max}
      disabled={disabled} // Applied disabled
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
        focus:outline-none focus:ring-2 
        ${disabled ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""} 
        ${error
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
const StepKin = ({ showErrors }: { showErrors: boolean }) => {
  const { state, dispatch } = useAddEmployee();
  const kin = state.kin;

  /* --------------------------
      FORM VALIDATION STATE
  -------------------------- */
  const [errors, setErrors] = useState({
    role: "",
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
      case "role":
        if (!value.trim()) errorMsg = "Role is required";
        break;

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
    // UPDATED: Auto-select employment type if Role is Intern
    if (field === "role" && value === "intern") {
      dispatch({ type: "SET_KIN", payload: { role: value, employmentType: "internship" } });
      validate("role", value);
      setErrors(prev => ({ ...prev, role: "", employmentType: "" }));
      return;
    }

    // UPDATED: Clear Team Lead if Role is TL
    if (field === "role" && value === "tl") {
      dispatch({ type: "SET_KIN", payload: { role: value, teamLead: "" } }); // Clear team lead
      validate("role", value);
      setErrors(prev => ({ ...prev, role: "" }));
      return;
    }

    dispatch({ type: "SET_KIN", payload: { [field]: value } });
    validate(field, value);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* --- NEW ROLE DROPDOWN --- */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Role <span className="text-red-500">*</span>
            </label>
            <select
              value={kin.role || ""}
              onChange={(e) => updateField("role", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${showErrors && !kin.role
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
                }`}
            >
              <option value="">Select Role</option>
              <option value="employee">Employee</option>
              <option value="hr">HR</option>
              <option value="delivery_manager">Delivery Manager</option>
              <option value="project_manager">Project Manager</option>
              <option value="tl">Team Leader</option>
              <option value="intern">Intern</option>
            </select>
            {showErrors && !kin.role && (
              <span className="text-red-500 text-xs">Role is required</span>
            )}
          </div>

          {/* JOB TITLE */}
          <InputField
            label="Job Title"
            value={kin.jobTitle}
            required
            error={
              errors.jobTitle ||
              (showErrors && !kin.jobTitle ? "Job Title is required" : "")
            }
            onChange={(v) => updateField("jobTitle", v.replace(/[0-9]/g, ""))}
          />

          {/* DEPARTMENT */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Department <span className="text-red-500">*</span>
            </label>
            <select
              value={kin.department || ""}
              onChange={(e) => updateField("department", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${showErrors && !kin.department
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "focus:ring-blue-500 focus:border-blue-500"
                }`}
            >
              <option value="">Select Department</option>
              <option value="Python">Python</option>
              <option value="QA">QA</option>
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

          {/* TEAM LEAD - Hidden if Role is Team Leader */}
          {kin.role !== "tl" && (
            <InputField
              label="Team Lead"
              value={kin.teamLead}
              error={errors.teamLead}
              onChange={(v) => updateField("teamLead", v.replace(/[0-9]/g, ""))}
            />
          )}

          {/* EMPLOYMENT TYPE */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">
              Employment Type <span className="text-red-500">*</span>
            </label>
            {kin.role === "intern" ? (
              <input
                type="text"
                value="Intern"
                disabled
                className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg shadow-sm text-gray-500 cursor-not-allowed focus:outline-none"
              />
            ) : (
              <select
                value={kin.employmentType || ""}
                onChange={(e) => updateField("employmentType", e.target.value)}
                className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                  ${showErrors && !kin.employmentType
                    ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                    : "focus:ring-blue-500 focus:border-blue-500"
                  }`}
              >
                <option value="">Select Type</option>
                <option value="full_time">Full time</option>
                <option value="contract">Contract</option>
                {kin.role !== "tl" && <option value="internship">Intern</option>}
              </select>
            )}
            {showErrors && !kin.employmentType && (
              <span className="text-red-500 text-xs">Employment Type is required</span>
            )}
          </div>

          {/* START DATE */}
          <InputField
            type="date"
            label="Start Date"
            value={kin.startDate}
            required
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
              Location <span className="text-red-500">*</span>
            </label>
            <select
              value={kin.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 
                ${showErrors && !kin.location
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