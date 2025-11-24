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
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
  type?: string;
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
  const personal = state.personal;

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
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { firstName: v } })
            }
          />


          <TextField
            label="Last Name *"
            value={personal.lastName}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { lastName: v } })
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
            label="Date of Birth"
            type="date"
            value={personal.dob}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { dob: v } })
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
            <option value="male">Male</option>
            <option value="female">Female</option>
          </SelectField>

          {/* <TextField
            label="Email Address"
            value={personal.email}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { email: v } })
            }
          /> */}

          <TextField
            label="Home Address"
            value={personal.homeAddress}
            onChange={(v) =>
              dispatch({ type: "SET_PERSONAL", payload: { homeAddress: v } })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default StepPersonal;
