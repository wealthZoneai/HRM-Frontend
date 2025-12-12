import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ===================
   Reusable Components
=================== */
const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  ...props
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  type?: string;
  [key: string]: any;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">{label}</label>
    <input
      type={type}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full px-4 py-2 bg-white border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all shadow-sm
      "
      {...props}
    />
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">{label}</label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className="
        w-full px-4 py-2 bg-white border rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
        transition-all shadow-sm
      "
    >
      {children}
    </select>
  </div>
);

/* ===================
   MAIN COMPONENT
=================== */
const StepPersonal: React.FC = () => {
  const { state, dispatch } = useAddEmployee();
  const personal = state.contact;

  // Calculate max date (18 years ago from today)
  const getMaxDob = () => {
    const today = new Date();
    const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    return maxDate.toISOString().split('T')[0];
  };

  const maxDate = getMaxDob();

  const handleDobChange = (v: string) => {
    if (v && v > maxDate) {
      alert("Employee must be at least 18 years old.");
      return;
    }
    dispatch({ type: "SET_PERSONAL", payload: { dob: v } });
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="First Name *"
            value={personal.firstName}
            onChange={(v) => {
              if (/^[^0-9]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { firstName: v } });
              }
            }}
          />

          <TextField
            label="Middle Name"
            value={personal.middleName}
            onChange={(v) => {
              if (/^[^0-9]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { middleName: v } });
              }
            }}
          />

          <TextField
            label="Last Name *"
            value={personal.lastName}
            onChange={(v) => {
              if (/^[^0-9]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { lastName: v } });
              }
            }}
          />

          <TextField
            label="Personal Email"
            value={personal.personalEmail}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { personalEmail: v } })
            }
          />

          <TextField
            label="Phone Number *"
            value={personal.phone}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { phone: v } })
            }
          />

          <TextField
            label="Alternative Number"
            value={personal.alternativeNumber}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { alternativeNumber: v } })
            }
          />

          <TextField
            label="Date of Birth"
            type="date"
            value={personal.dob}
            onChange={handleDobChange}
            max={maxDate}
          />

          <TextField
            label="Blood Group"
            value={personal.bloodGroup}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { bloodGroup: v } })
            }
          />

          <SelectField
            label="Gender"
            value={personal.gender}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { gender: v } })
            }
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </SelectField>

          <SelectField
            label="Marital Status"
            value={personal.maritalStatus}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { maritalStatus: v } })
            }
          >
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
            <option value="Widowed">Widowed</option>
          </SelectField>


        </div>
      </div>
    </div>
  );
};

export default StepPersonal;
