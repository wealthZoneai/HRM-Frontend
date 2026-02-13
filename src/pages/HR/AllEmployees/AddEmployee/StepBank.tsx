import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Field Component
========================== */
const Field = ({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: boolean;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-800 font-medium text-sm">
      {label} {error && <span className="text-red-500">*</span>}
    </label>
    {children}
    {error && <span className="text-xs text-red-500">Required</span>}
  </div>
);

/* ==========================
      MAIN COMPONENT
========================== */
const StepBank = ({ showErrors }: { showErrors: boolean }) => {
  const { state, dispatch } = useAddEmployee();
  const bank = state.bankAccounts[0] || {};

  /* --------------------------
        UPDATE BANK STATE
  -------------------------- */
  const setBankField = (key: string, value: string) => {
    dispatch({
      type: "SET_BANK",
      payload: { index: 0, data: { [key]: value } },
    });
  };

  /**
   * Logic for the "Heavy but less opaque" placeholder
   * We use font-semibold for weight and a lighter gray/opacity 
   * to ensure it's not "too bold" or distracting.
   */
  const placeholderStyle = bank.bankName 
    ? "placeholder:font-semibold placeholder:text-gray-400/80" 
    : "placeholder:text-gray-300 font-normal";

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BANK NAME */}
          <Field label="Bank Name" error={showErrors && !bank.bankName}>
            <input
              type="text"
              placeholder="Enter Bank Name"
              value={bank.bankName || ""}
              onChange={(e) => setBankField("bankName", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg ${placeholderStyle} shadow-sm focus:outline-none focus:ring-2
    ${
      showErrors && !bank.bankName
        ? "border-red-500 focus:ring-red-500"
        : "border-gray-300 focus:ring-blue-500"
    }`}
            />
          </Field>

          {/* ACCOUNT HOLDER NAME */}
          <Field
            label="Account Holder Name"
            error={showErrors && !bank.accountName}
          >
            <input
              value={bank.accountName || ""}
              placeholder="Enter Account Holder Name"
              onChange={(e) => {
                const v = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(v)) setBankField("accountName", v);
              }}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${placeholderStyle} 
              ${showErrors && !bank.accountName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 border-gray-300"}`}
            />
          </Field>

          {/* BRANCH NAME */}
          <Field label="Branch Name" error={showErrors && !bank.branchName}>
            <input
              value={bank.branchName || ""}
              placeholder="Enter Branch Name"
              onChange={(e) => {
                const v = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(v)) setBankField("branchName", v);
              }}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${placeholderStyle}
              ${showErrors && !bank.branchName ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 border-gray-300"}`}
            />
          </Field>

          {/* ACCOUNT NUMBER */}
          <Field
            label="Account Number"
            error={showErrors && !bank.accountNumber}
          >
            <input
              value={bank.accountNumber || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setBankField("accountNumber", v);
              }}
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name First"
                  : "Enter Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${placeholderStyle}
              ${showErrors && !bank.accountNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 border-gray-300"}
              ${!bank.bankName ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
            />
          </Field>

          {/* CONFIRM ACCOUNT NUMBER */}
          <Field
            label="Confirm Account Number"
            error={showErrors && !bank.confirmAccountNumber}
          >
            <input
              value={bank.confirmAccountNumber || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) setBankField("confirmAccountNumber", v);
              }}
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name First"
                  : "Confirm Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${placeholderStyle}
              ${showErrors && !bank.confirmAccountNumber ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500 border-gray-300"}
              ${!bank.bankName ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
            />
          </Field>

          {/* IFSC CODE */}
          <Field label="IFSC Code" error={showErrors && !bank.ifscCode}>
            <input
              value={bank.ifscCode || ""}
              onChange={(e) =>
                setBankField("ifscCode", e.target.value.toUpperCase())
              }
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName ? "Select Bank Name First" : "Enter IFSC Code"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${placeholderStyle}
    ${
      showErrors && !bank.ifscCode
        ? "border-red-500 focus:ring-red-500"
        : "focus:ring-blue-500 border-gray-300"
    }
    ${!bank.bankName ? "bg-gray-100 cursor-not-allowed text-gray-400" : ""}`}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default StepBank;