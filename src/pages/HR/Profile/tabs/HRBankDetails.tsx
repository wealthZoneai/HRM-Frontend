import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, X, Check } from 'lucide-react';

// Reusable Edit Field
const EditLineField = ({ label, name, value, onChange }: { label: string, name: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
    <div className="space-y-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="w-full border-b border-gray-300 py-1 text-gray-900 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
        />
    </div>
);

// Reusable Display Field
const DetailField = ({ label, value }: { label: string; value: string }) => (
    <div className="py-2">
        <label className="block text-sm font-medium text-slate-600">
            {label}
        </label>
        <p className="mt-1 text-sm text-slate-900 font-medium border-b border-slate-300 pb-2 h-9">
            {value}
        </p>
    </div>
);

const HRBankDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [data, setData] = useState({
        bankName: 'UCO BANK',
        accountNumber: '************8852',
        ifscCode: 'UCB0022581',
        branch: 'Hyderabad Main',
        accountName: localStorage.getItem("userName") || 'HR Manager',
    });
    const [originalData, setOriginalData] = useState(data);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Saving Bank Details:", data);
        setOriginalData(data);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setData(originalData);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base sm:text-xl font-semibold text-slate-800">
                    Banking Details
                </h2>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2"
                    >
                        Edit <Pencil size={16} />
                    </button>
                )}
            </div>

            <hr className="border-slate-200" />

            <form onSubmit={handleSave} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {isEditing ? (
                        <>
                            <EditLineField label="Bank Name" name="bankName" value={data.bankName} onChange={handleChange} />
                            <EditLineField label="Account Holder Name" name="accountName" value={data.accountName} onChange={handleChange} />
                            <EditLineField label="Branch Name" name="branch" value={data.branch} onChange={handleChange} />
                            <EditLineField label="Bank Account Number" name="accountNumber" value={data.accountNumber} onChange={handleChange} />
                            <EditLineField label="Bank IFSC Code" name="ifscCode" value={data.ifscCode} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            {/* Left Column */}
                            <div className="space-y-4">
                                <DetailField label="Bank Name" value={data.bankName} />
                                <DetailField label="Account Holder Name" value={data.accountName} />
                                <DetailField label="Branch Name" value={data.branch} />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                <DetailField
                                    label="Bank Account Number"
                                    value={data.accountNumber}
                                />
                                <DetailField label="Bank IFSC Code" value={data.ifscCode} />
                            </div>
                        </>
                    )}
                </div>

                {/* Form Actions */}
                {isEditing && (
                    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-8 pt-6 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-100 border border-slate-300"
                        >
                            <X size={16} />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs sm:text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
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

export default HRBankDetails;
