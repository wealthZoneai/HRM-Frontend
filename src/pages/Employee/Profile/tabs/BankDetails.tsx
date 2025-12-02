import { useState } from 'react';
import { motion } from 'framer-motion';

// --- Types ---
// Simplified type for display-only data from the image
type BankAccount = {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch: string;
  confirmAccountNumber: string;
};

// --- Reusable Helper Component (Internal) ---
/**
 * A clean, display-only field matching the reference image style.
 * It shows a label above a value with a bottom border.
 */
const DetailField = ({ label, value }: { label: string; value: string }) => (
  <div className="py-2">
    <label className="block text-sm font-medium text-slate-600">
      {label}
    </label>
    <p className="mt-1 text-sm text-slate-900 font-medium border-b border-slate-300 pb-2 h-9">
      {/* If value is an empty string, it will just render an empty space */}
      {value}
    </p>
  </div>
);

// --- Main Component ---
const BankDetails = () => {
  // State is now set to the static content from the reference image
  const [account] = useState<BankAccount>({
    bankName: 'UCO BANK',
    accountNumber: '************8852',
    ifscCode: 'UCB0022581',
    branch: '', // Kept empty as seen in the image
    confirmAccountNumber: '************8852', // Using the same masked number
  });

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
        {/* Edit Button and all related logic has been removed */}
      </div>

      {/* --- Divider --- */}
      <hr className="border-slate-200" />

      {/* --- Static Details Display --- */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">

          {/* Left Column */}
          <div className="space-y-4">
            <DetailField label="Bank Name" value={account.bankName} />
            <DetailField label="Bank IFSC Code" value={account.ifscCode} />
            <DetailField label="Branch Name" value={account.branch} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <DetailField
              label="Bank Account Number"
              value={account.accountNumber}
            />
            <DetailField
              label="Confirm A/C Number"
              value={account.confirmAccountNumber}
            />
          </div>

        </div>
      </div>
      {/* All form elements, edit state, and buttons have been removed */}
    </motion.div>
  );
};

export default BankDetails;