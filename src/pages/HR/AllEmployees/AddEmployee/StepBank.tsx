import React, { useState } from "react";
import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Field Component
========================== */
const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string | null;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-800 font-medium text-sm">{label}</label>
    {children}
    {error && <span className="text-red-500 text-xs">{error}</span>}
  </div>
);

/* ==========================
      MAIN COMPONENT
========================== */
const StepBank: React.FC = () => {
  const { state, dispatch } = useAddEmployee();
  const bank = state.bankAccounts[0] || {};

  /* --------------------------
        VALIDATION STATE
  -------------------------- */
  const [errors, setErrors] = useState({
    bankName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    accountName: "",
    ifscCode: "",
  });

  /* --------------------------
        VALIDATION LOGIC
  -------------------------- */
  const validateField = (key: string, value: string) => {
    let msg = "";

    if (key === "bankName" && !value.trim()) msg = "Bank name is required";

    if (key === "accountNumber") {
      if (!value.trim()) msg = "Account number is required";
      else if (!/^\d{9,18}$/.test(value))
        msg = "Enter a valid account number (9-18 digits)";
    }

    if (key === "confirmAccountNumber") {
      if (!value.trim()) msg = "Please confirm your account number";
      else if (value !== bank.accountNumber)
        msg = "Account numbers do not match";
    }

    if (key === "accountName" && !value.trim())
      msg = "Account holder name is required";

    if (key === "ifscCode") {
      if (!value.trim()) msg = "IFSC Code is required";
      else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(value))
        msg = "Enter a valid IFSC Code";
    }

    setErrors((prev) => ({ ...prev, [key]: msg }));
  };

  /* --------------------------
        UPDATE BANK STATE
  -------------------------- */
  const setBankField = (key: string, value: string) => {
    dispatch({
      type: "SET_BANK",
      payload: { index: 0, data: { [key]: value } },
    });

    validateField(key, value);

    if (key === "accountNumber" && bank.confirmAccountNumber) {
      validateField("confirmAccountNumber", bank.confirmAccountNumber);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Bank Account Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* BANK NAME */}
          <Field label="Bank Name *" error={errors.bankName}>
            <select
              value={bank.bankName || ""}
              onChange={(e) => setBankField("bankName", e.target.value)}
              onBlur={(e) => validateField("bankName", e.target.value)}
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
          <Field label="Account Holder Name *" error={errors.accountName}>
            <input
              value={bank.accountName || ""}
              onChange={(e) => {
                if (/^[^0-9]*$/.test(e.target.value)) {
                  setBankField("accountName", e.target.value);
                }
              }}
              onBlur={(e) => validateField("accountName", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>

          {/* BRANCH NAME */}
          <Field label="Branch Name" error={null}>
            <input
              value={bank.branchName || ""}
              onChange={(e) => setBankField("branchName", e.target.value)}
              className="w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>

          {/* ACCOUNT NUMBER */}
          {/* ACCOUNT NUMBER */}
          <Field label="Account Number *" error={errors.accountNumber}>
            <input
              value={bank.accountNumber || ""}
              onChange={(e) => setBankField("accountNumber", e.target.value)}
              onBlur={(e) =>
                validateField("accountNumber", e.target.value)
              }
              disabled={!bank.bankName}
              placeholder={!bank.bankName ? "Select Bank Name first" : "Enter Account Number"}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 ${!bank.bankName ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}`}
            />
          </Field>

          {/* CONFIRM ACCOUNT NUMBER */}
          <Field
            label="Confirm Account Number *"
            error={errors.confirmAccountNumber}
          >
            <input
              value={bank.confirmAccountNumber || ""}
              onChange={(e) =>
                setBankField("confirmAccountNumber", e.target.value)
              }
              onBlur={(e) =>
                validateField("confirmAccountNumber", e.target.value)
              }
              disabled={!bank.bankName}
              placeholder={!bank.bankName ? "Select Bank Name first" : "Confirm Account Number"}
              className={`w-full px-4 py-2 bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500 ${!bank.bankName ? 'bg-gray-100 cursor-not-allowed text-gray-400' : ''}`}
            />
          </Field>

          {/* IFSC CODE */}
          <Field label="IFSC Code *" error={errors.ifscCode}>
            <input
              value={bank.ifscCode || ""}
              onChange={(e) => setBankField("ifscCode", e.target.value)}
              onBlur={(e) => validateField("ifscCode", e.target.value)}
              className="w-full px-4 py-2 uppercase bg-white border rounded-lg shadow-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </Field>
        </div>
      </div>
    </div>
  );
};

export default StepBank;
