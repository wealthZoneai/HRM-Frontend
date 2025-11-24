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
}: {
  label: string;
  value: string | undefined;
  onChange: (v: string) => void;
  type?: string;
  error?: string | null;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">{label}</label>
    <input
      type={type}
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
    username: "",
    password: "",
    email: "",
    employeeId: "",
    jobTitle: "",
    department: "",
    employmentType: "",
    role: "",
    startDate: "",
  });

  /* --------------------------
      VALIDATION LOGIC
  -------------------------- */
  const validate = (field: string, value: string) => {
    let errorMsg = "";

    switch (field) {
      case "username":
        if (!value.trim()) errorMsg = "Username is required";
        break;

      case "password":
        if (!value.trim()) errorMsg = "Password is required";
        else if (value.length < 6)
          errorMsg = "Password must be at least 6 characters";
        else if (!/[A-Z]/.test(value))
          errorMsg = "Include at least one uppercase letter";
        else if (!/[0-9]/.test(value))
          errorMsg = "Include at least one number";
        break;

      case "email":
        if (!value.trim()) errorMsg = "Email is required";
        else if (!/^\S+@\S+\.\S+$/.test(value))
          errorMsg = "Enter a valid email address";
        break;

      case "employeeId":
        if (!value.trim()) errorMsg = "Employee ID is required";
        break;

      case "startDate":
        if (!value.trim()) errorMsg = "Start date is required";
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
          Employee Account Details
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* USERNAME */}
          <InputField
            label="Username *"
            value={kin.username}
            error={errors.username}
            onChange={(v) => updateField("username", v)}
          />

          {/* PASSWORD */}
          <InputField
            label="Password *"
            type="password"
            value={kin.password}
            error={errors.password}
            onChange={(v) => updateField("password", v)}
          />

          {/* EMAIL */}
          <InputField
            label="Email *"
            value={kin.email}
            error={errors.email}
            onChange={(v) => updateField("email", v)}
          />

          {/* EMPLOYEE ID */}
          <InputField
            label="Employee ID *"
            value={kin.employeeId}
            error={errors.employeeId}
            onChange={(v) => updateField("employeeId", v)}
          />

          {/* JOB TITLE */}
          <InputField
            label="Job Title"
            value={kin.jobTitle}
            onChange={(v) => updateField("jobTitle", v)}
          />

          {/* DEPARTMENT */}
          <InputField
            label="Department"
            value={kin.department}
            onChange={(v) => updateField("department", v)}
          />

          {/* EMPLOYMENT TYPE */}
          <InputField
            label="Employment Type"
            value={kin.employmentType}
            onChange={(v) => updateField("employmentType", v)}
          />

          {/* ROLE */}
          <InputField
            label="Role"
            value={kin.role}
            onChange={(v) => updateField("role", v)}
          />

          {/* START DATE */}
          <InputField
            type="date"
            label="Start Date *"
            value={kin.startDate}
            error={errors.startDate}
            onChange={(v) => updateField("startDate", v)}
          />
        </div>
      </div>
    </div>
  );
};

export default StepKin;
