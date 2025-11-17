import { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Types ---
type BankAccount = {
  id: string; // Kept for API/database consistency
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  accountHolderName: string;
  accountType: string;
  // isPrimary field removed
};

// --- Reusable Helper Components (from other files) ---
// (These components are unchanged)
const EditField = ({
  label,
  name,
  value,
  onChange,
  type = 'text',
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 mb-1"
    >
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
    />
  </div>
);

const EditSelectField = ({
  label,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-slate-700 mb-1"
    >
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
    >
      {children}
    </select>
  </div>
);

// --- Main Component ---
const BankDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  // State is now a single object, not an array
  const [account, setAccount] = useState<BankAccount>({
    id: '1',
    bankName: 'HDFC Bank',
    accountNumber: '123456789012',
    ifscCode: 'HDFC0001234',
    branch: 'Madhapur Branch',
    accountHolderName: 'Ravi Teja',
    accountType: 'Savings',
  });

  // Original state for "cancel" functionality
  const [originalAccount, setOriginalAccount] = useState(() => ({ ...account }));

  const handleEdit = () => {
    setOriginalAccount({ ...account }); // Create a copy for cancel
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAccount(originalAccount); // Restore from original
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here, sending the single 'account' object
    setIsEditing(false);
    setOriginalAccount({ ...account }); // Set new original state
  };

  /**
   * Handles text/select changes for the single account
   */
  const handleAccountChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    // No ID needed, just update the single account object
    const { name, value } = e.target;
    setAccount((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handleSetPrimary function is no longer needed

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200"
    >
      {/* --- Component Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">Bank Account</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 w-full sm:w-auto justify-center"
          >
            <Pencil size={16} />
            Edit Details
          </button>
        )}
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          {/* No .map() needed, just a ternary for edit/display mode */}
          {isEditing ? (
            // --- EDIT MODE CARD ---
            <div className="p-6 rounded-lg border border-slate-300 bg-slate-50/50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditField
                  label="Bank Name"
                  name="bankName"
                  value={account.bankName}
                  onChange={handleAccountChange}
                />
                <EditField
                  label="Account Holder Name"
                  name="accountHolderName"
                  value={account.accountHolderName}
                  onChange={handleAccountChange}
                />
                <EditField
                  label="Account Number"
                  name="accountNumber"
                  value={account.accountNumber}
                  onChange={handleAccountChange}
                />
                <EditField
                  label="IFSC Code"
                  name="ifscCode"
                  value={account.ifscCode}
                  onChange={handleAccountChange}
                />
                <EditField
                  label="Branch"
                  name="branch"
                  value={account.branch}
                  onChange={handleAccountChange}
                />
                <EditSelectField
                  label="Account Type"
                  name="accountType"
                  value={account.accountType}
                  onChange={handleAccountChange}
                >
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                  <option value="Salary">Salary</option>
                  <option value="NRE">NRE</option>
                  <option value="NRO">NRO</option>
                </EditSelectField>
              </div>
              {/* Primary Account Section Removed */}
            </div>
          ) : (
            // --- DISPLAY MODE CARD ---
            <div className="p-6 rounded-lg border border-slate-200">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-lg font-semibold text-slate-800">
                      {account.bankName}
                    </h3>
                    {/* Primary Badge Removed */}
                  </div>
                  <p className="text-sm text-slate-600 mt-1">
                    {account.accountHolderName} • {account.accountType}
                  </p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Account Number
                  </p>
                  <p className="font-medium text-slate-700">
                    •••• {account.accountNumber.slice(-4)}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    IFSC Code
                  </p>
                  <p className="font-medium text-slate-700">
                    {account.ifscCode}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Branch
                  </p>
                  <p className="font-medium text-slate-700">
                    {account.branch}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* --- Form Actions --- */}
        {isEditing && (
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
            >
              <Check size={16} />
              Save Changes
            </button>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default BankDetails;