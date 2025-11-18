import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

const StepKin: React.FC = () => {
  const { state, dispatch } = useAddEmployee();
  const kin = state.kin;

  // Premium input component
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
          w-full px-4 py-2 bg-white border rounded-lg shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          transition-all
        "
      />
    </div>
  );

  return (
    <div className="w-full">

      {/* UNIC STYLE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Next of Kin Information
        </h3>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <TextField
            label="Full Name *"
            value={kin.name}
            onChange={(v) =>
              dispatch({ type: "SET_KIN", payload: { name: v } })
            }
          />

          <TextField
            label="Phone Number"
            value={kin.phone}
            onChange={(v) =>
              dispatch({ type: "SET_KIN", payload: { phone: v } })
            }
          />

          <TextField
            label="Relation"
            value={kin.relation}
            onChange={(v) =>
              dispatch({ type: "SET_KIN", payload: { relation: v } })
            }
          />

          {/* Address full width */}
          <div className="md:col-span-2">
            <TextField
              label="Address"
              value={kin.address}
              onChange={(v) =>
                dispatch({ type: "SET_KIN", payload: { address: v } })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepKin;
