import React, { useState } from "react";
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
        ${error ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 focus:border-blue-500"}
      `}
    />
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

/* ==========================
   MAIN COMPONENT
========================== */
const StepKin: React.FC = () => {
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
            error={errors.jobTitle}
            onChange={(v) => updateField("jobTitle", v.replace(/[0-9]/g, ""))}
          />

          {/* DEPARTMENT */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">Department *</label>
            <select
              value={kin.department || ""}
              onChange={(e) => updateField("department", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Department</option>
              <option value="Product">Product</option>
              <option value="Software">IT & Software</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
              <option value="HR">Human Resources</option>
              <option value="Finance">Finance</option>
            </select>
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
            <label className="text-gray-700 font-medium text-sm">Employment Type *</label>
            <select
              value={kin.employmentType || ""}
              onChange={(e) => updateField("employmentType", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Type</option>
              <option value="full_time">Full time</option>
              <option value="contract">Contract</option>
              {/* Backend currently only supports full_time and contract */}
              {/* <option value="part_time">Part time</option>
              <option value="internship">Internship</option> */}
            </select>
          </div>

          {/* START DATE */}
          <InputField
            type="date"
            label="Start Date *"
            value={kin.startDate}
            error={errors.startDate}
            max={new Date().toISOString().split("T")[0]}
            onChange={(v) => updateField("startDate", v)}
          />

          {/* LOCATION */}
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">Location *</label>
            <select
              value={kin.location || ""}
              onChange={(e) => updateField("location", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Location</option>
              <option value="Head Office">Head Office</option>
              <option value="Branch Office">Branch Office</option>
              <option value="Remote">Remote</option>
            </select>
          </div>

          {/* WORK EMAIL */}
          {/* <InputField
            label="Work Email *"
            value={kin.email}
            error={errors.email}
            onChange={(v) => updateField("email", v)}
          /> */}

          {/* EMPLOYEE ID */}
          {/* <InputField
            label="Employee ID *"
            value={kin.employeeId}
            error={errors.employeeId}
            onChange={(v) => updateField("employeeId", v)}
          /> */}

          {/* SYSTEM ROLE (HIDDEN or OPTIONAL?) - Keeping it out as per request, but can be added if needed */}

        </div>

        {/* JOB DESCRIPTION */}
        <div className="mt-6">
          <div className="flex flex-col gap-1">
            <label className="text-gray-700 font-medium text-sm">Job Description</label>
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
