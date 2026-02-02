import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Field Component
========================== */
const Field = ({
  label,
  children,
  error, // New prop for error state
}: {
  label: string;
  children: React.ReactNode;
  error?: boolean; // Type definition
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

  // Helper to check if the specific bank form is "active" (user started typing)
  // If the step is optional, we usually only show errors if they started filling it out but didn't finish.
  // However, based on your request, we strictly apply showErrors logic here.
  // Since WizardInner currently returns 'true' for validation on step 2, showErrors might not trigger often,
  // but this code prepares it for when you enforce validation.

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* BANK NAME */}
          <Field label="Bank Name" error={showErrors && !bank.bankName}>
            <select
              value={bank.bankName || ""}
              onChange={(e) => setBankField("bankName", e.target.value)}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.bankName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            >
              <option value="">Select Bank</option>
              <option value="Bank Of Baroda">Bank of Baroda</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="SBI">State Bank of India</option>
            </select>
          </Field>

          {/* ACCOUNT HOLDER NAME (Alphabets Only) */}
          <Field
            label="Account Holder Name"
            error={showErrors && !bank.accountName}
          >
            <input
              value={bank.accountName || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(v)) {
                  setBankField("accountName", v);
                }
              }}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.accountName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
          </Field>

          {/* BRANCH NAME (Alphabets Only) */}
          <Field label="Branch Name" error={showErrors && !bank.branchName}>
            <input
              value={bank.branchName || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^[a-zA-Z\s]*$/.test(v)) {
                  setBankField("branchName", v);
                }
              }}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.branchName
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }`}
            />
          </Field>

          {/* ACCOUNT NUMBER (Numbers Only) */}
          <Field label="Account Number" error={showErrors && !bank.accountNumber}>
            <input
              value={bank.accountNumber || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) {
                  setBankField("accountNumber", v);
                }
              }}
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name first"
                  : "Enter Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.accountNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }
              ${
                !bank.bankName
                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
          </Field>

          {/* CONFIRM ACCOUNT NUMBER (Numbers Only) */}
          <Field
            label="Confirm Account Number"
            error={showErrors && !bank.confirmAccountNumber}
          >
            <input
              value={bank.confirmAccountNumber || ""}
              onChange={(e) => {
                const v = e.target.value;
                if (/^\d*$/.test(v)) {
                  setBankField("confirmAccountNumber", v);
                }
              }}
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name first"
                  : "Confirm Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.confirmAccountNumber
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }
              ${
                !bank.bankName
                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
          </Field>

          {/* IFSC CODE (Alphanumeric - No specific restriction requested, but kept standard) */}
          <Field label="IFSC Code" error={showErrors && !bank.ifscCode}>
            <input
              value={bank.ifscCode || ""}
              onChange={(e) => setBankField("ifscCode", e.target.value)}
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName ? "Select Bank Name first" : "Enter IFSC Code"
              }
              className={`w-full px-4 py-2 uppercase bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 
              ${
                showErrors && !bank.ifscCode
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500 border-gray-300"
              }
              ${
                !bank.bankName
                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default StepBank; 