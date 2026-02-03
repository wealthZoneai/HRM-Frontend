import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Check, X } from 'lucide-react';

// --- Types ---
type BankAccount = {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  accountName: string;
};

// --- Helper Functions ---
const maskAccountNumber = (accNum: string) => {
  // 1. Safety check: Convert to string to prevent errors if it's a number type
  const str = String(accNum || "");
  
  if (!str || str === "N/A") return "N/A";
  
  // 2. If length is 4 or less, show the whole thing (can't mask)
  if (str.length <= 4) return str;
  
  // 3. Masking Logic: Hide everything except the last 4 digits
  const last4 = str.slice(-4);
  const stars = "*".repeat(str.length - 4);
  
  return `${stars}${last4}`;
};

// --- Components ---

// 1. View Mode Component (Read-Only)
const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div className="py-2 w-full">
    <label 
      className="block text-sm font-medium text-slate-600 whitespace-nowrap overflow-hidden text-ellipsis"
      title={label}
    >
      {label}
    </label>
    <p className="mt-1 text-sm text-slate-900 font-medium border-b border-slate-300 pb-2 h-9 flex items-center">
      {value || "N/A"}
    </p>
  </div>
);

// 2. Edit Mode Component (Input)
const EditField = ({ 
  label, 
  name, 
  value, 
  onChange,
  type = "text" 
}: { 
  label: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div className="py-2 w-full">
    <label 
      className="block text-sm font-medium text-slate-700 whitespace-nowrap overflow-hidden text-ellipsis"
      title={label}
    >
      {label}
    </label>
    <div className="h-9 flex items-center border-b border-blue-500 mt-1 pb-2">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full bg-transparent text-sm text-slate-900 focus:outline-none placeholder-slate-400"
        placeholder={`Enter ${label}`}
      />
    </div>
  </div>
);

// --- Main Component ---
const BankDetails = ({ data }: { data?: any }) => {
  const [isEditing, setIsEditing] = useState(false);

  // Holds the live data (always stores the UNMASKED, Real Number)
  const [account, setAccount] = useState<BankAccount>({
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    branch: '',
    accountName: '',
  });

  const [backup, setBackup] = useState<BankAccount>(account);

  useEffect(() => {
    if (data) {
      const bankData = data.bank || data;
      const initialData = {
        bankName: bankData.bank_name || '',
        accountNumber: bankData.account_number || '', // Expected: Full Number (e.g., "1234567890")
        ifscCode: bankData.ifsc_code || '',
        branch: bankData.branch || '',
        accountName: bankData.account_holder_name || '',
      };
      setAccount(initialData);
      setBackup(initialData);
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setBackup(account);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setAccount(backup);
    setIsEditing(false);
  };

  const handleSave = () => {
    console.log("Saving Updated Data:", account);
    setIsEditing(false); // Switching to false triggers re-render of View Mode
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl"
    >
      {/* --- Component Header --- */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">
          Banking Details
        </h2>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Edit <Pencil size={14} />
          </button>
        )}
      </div>

      <hr className="border-slate-200" />

      {/* --- Form Section --- */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">

          {/* Left Column */}
          <div className="space-y-4">
            {isEditing ? (
              <>
                <EditField label="Bank Name" name="bankName" value={account.bankName} onChange={handleChange} />
                <EditField label="Account Holder Name" name="accountName" value={account.accountName} onChange={handleChange} />
                <EditField label="Branch Name" name="branch" value={account.branch} onChange={handleChange} />
              </>
            ) : (
              <>
                <DetailField label="Bank Name" value={account.bankName} />
                <DetailField label="Account Holder Name" value={account.accountName} />
                <DetailField label="Branch Name" value={account.branch} />
              </>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {isEditing ? (
              <>
                {/* EDIT MODE: Shows FULL NUMBER (Input) */}
                <EditField 
                  label="Bank Account Number" 
                  name="accountNumber" 
                  value={account.accountNumber} 
                  onChange={handleChange} 
                  type="number" // Optional: Forces number keypad on mobile
                />
                <EditField label="Bank IFSC Code" name="ifscCode" value={account.ifscCode} onChange={handleChange} />
              </>
            ) : (
              <>
                {/* VIEW MODE: Shows MASKED NUMBER (Text) */}
                <DetailField 
                  label="Bank Account Number" 
                  value={maskAccountNumber(account.accountNumber)} 
                />
                <DetailField label="Bank IFSC Code" value={account.ifscCode} />
              </>
            )}
          </div>

        </div>
      </div>

      {/* --- Footer Buttons --- */}
      {isEditing && (
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-slate-100">
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
          >
            <X size={16} /> Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-md transition-all active:scale-95"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}

    </motion.div>
  );
};

export default BankDetails;