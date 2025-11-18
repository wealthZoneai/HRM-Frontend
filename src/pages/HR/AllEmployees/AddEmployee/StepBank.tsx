import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

const StepBank: React.FC = () => {
  const { state, dispatch } = useAddEmployee();

  const setBankField = (index: number, key: string, value: string) => {
    dispatch({ type: "SET_BANK", payload: { index, data: { [key]: value } } });
  };

  // Premium Reusable Field
  const Field = ({
    label,
    children,
  }: {
    label: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-1">
      <label className="text-gray-700 font-medium text-sm">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="w-full">

      {/* UNIC Main Card */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Bank Account Information
        </h3>

        <div className="flex flex-col gap-6">

          {state.bankAccounts.map((b, i) => (
            <div
              key={i}
              className="
                bg-gradient-to-br from-gray-50 to-gray-100
                p-5 rounded-xl shadow-sm border border-gray-200
              "
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-semibold text-gray-700">
                  Account {i + 1}
                </span>

                {state.bankAccounts.length > 1 && (
                  <button
                    onClick={() =>
                      dispatch({
                        type: "SET_ALL_BANKS",
                        payload: state.bankAccounts.filter((_, idx) => idx !== i),
                      })
                    }
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Remove
                  </button>
                )}
              </div>

              {/* GRID FIELDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                {/* Bank Name */}
                <Field label="Bank Name *">
                  <select
                    value={b.bankName || ""}
                    onChange={(e) => setBankField(i, "bankName", e.target.value)}
                    className="
                      w-full px-4 py-2 bg-white border rounded-lg shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                  >
                    <option value="">Select Bank</option>
                    <option value="Bank Of Baroda">Bank of Baroda</option>
                    <option value="HDFC">HDFC</option>
                    <option value="ICICI">ICICI</option>
                    <option value="SBI">State Bank of India</option>
                  </select>
                </Field>

                {/* Account Number */}
                <Field label="Account Number">
                  <input
                    value={b.accountNumber || ""}
                    onChange={(e) =>
                      setBankField(i, "accountNumber", e.target.value)
                    }
                    className="
                      w-full px-4 py-2 bg-white border rounded-lg shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                  />
                </Field>

                {/* Account Name */}
                <Field label="Account Holder Name">
                  <input
                    value={b.accountName || ""}
                    onChange={(e) =>
                      setBankField(i, "accountName", e.target.value)
                    }
                    className="
                      w-full px-4 py-2 bg-white border rounded-lg shadow-sm
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    "
                  />
                </Field>
              </div>
            </div>
          ))}

          {/* Add Account Button */}
          <button
            onClick={() =>
              dispatch({
                type: "SET_ALL_BANKS",
                payload: [...state.bankAccounts, {}],
              })
            }
            className="
              w-full md:w-auto px-5 py-2
              bg-blue-600 hover:bg-blue-700
              text-white rounded-lg shadow-md
              transition-all
            "
          >
            + Add Another Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepBank;
