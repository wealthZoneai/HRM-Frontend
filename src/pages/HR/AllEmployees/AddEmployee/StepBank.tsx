import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Field Component
========================== */
const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-800 font-medium text-sm">{label}</label>
    {children}
  </div>
);

/* ==========================
      MAIN COMPONENT
========================== */
const StepBank: React.FC = () => {
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

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Bank Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* BANK NAME */}
          <Field label="Bank Name">
            <select
              value={bank.bankName || ""}
              onChange={(e) => setBankField("bankName", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Bank</option>
              <option value="Bank Of Baroda">Bank of Baroda</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="SBI">State Bank of India</option>
            </select>
          </Field>

          {/* ACCOUNT HOLDER NAME */}
          <Field label="Account Holder Name">
            <input
              value={bank.accountName || ""}
              onChange={(e) =>
                setBankField("accountName", e.target.value)
              }
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>

          {/* BRANCH NAME */}
          <Field label="Branch Name">
            <input
              value={bank.branchName || ""}
              onChange={(e) =>
                setBankField("branchName", e.target.value)
              }
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>

          {/* ACCOUNT NUMBER */}
          <Field label="Account Number">
            <input
              value={bank.accountNumber || ""}
              onChange={(e) =>
                setBankField("accountNumber", e.target.value)
              }
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name first"
                  : "Enter Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !bank.bankName
                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
          </Field>

          {/* CONFIRM ACCOUNT NUMBER */}
          <Field label="Confirm Account Number">
            <input
              value={bank.confirmAccountNumber || ""}
              onChange={(e) =>
                setBankField("confirmAccountNumber", e.target.value)
              }
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name first"
                  : "Confirm Account Number"
              }
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                !bank.bankName
                  ? "bg-gray-100 cursor-not-allowed text-gray-400"
                  : ""
              }`}
            />
          </Field>

          {/* IFSC CODE */}
          <Field label="IFSC Code">
            <input
              value={bank.ifscCode || ""}
              onChange={(e) =>
                setBankField("ifscCode", e.target.value)
              }
              disabled={!bank.bankName}
              placeholder={
                !bank.bankName
                  ? "Select Bank Name first"
                  : "Enter IFSC Code"
              }
              className={`w-full px-4 py-2 uppercase bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 ${
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
