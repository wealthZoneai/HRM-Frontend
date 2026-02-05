import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Pencil, X, Check } from 'lucide-react';
// Correct relative imports based on your file structure
import { GetMyProfile, UpdateEmployeeJobAndBank, GetAllEmployes } from '../../../../Services/apiHelpers';
import { showSuccess, showError } from '../../../../utils/toast';

// --- Helper Functions ---
const maskAccountNumber = (accNum: string) => {
    const str = String(accNum || "");
    if (!str || str === "N/A") return "N/A";
    if (str.length <= 4) return str;
    const last4 = str.slice(-4);
    const stars = "*".repeat(str.length - 4);
    return `${stars}${last4}`;
};

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
            {value || '-'}
        </p>
    </div>
);

const HRBankDetails = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userId, setUserId] = useState<string | number | null>(null);

    const [data, setData] = useState({
        bankName: '',
        accountNumber: '',
        ifscCode: '',
        branch: '',
        accountName: '',
    });
    const [originalData, setOriginalData] = useState(data);

    // Fetch Data
    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const response = await GetMyProfile();
                const profile = response.data;

                // 1. ID Extraction (Robust check)
                let extractedId = profile?.id;

                if (!extractedId && profile?.emp_id) {
                    try {
                        const allEmpsResponse = await GetAllEmployes();
                        const allEmps = allEmpsResponse.data?.results || [];
                        const found = allEmps.find((e: any) => e.emp_id === profile.emp_id);
                        if (found && found.id) {
                            extractedId = found.id;
                        }
                    } catch (err) {
                        console.error("Fallback ID lookup failed:", err);
                    }
                }

                if (!extractedId) {
                    extractedId = profile?.emp_id || profile?.user_id;
                }

                if (extractedId) {
                    setUserId(extractedId);
                } else {
                    console.error("User ID is missing in profile response!");
                    showError("Failed to identify user.");
                }

                // 2. Correct Data Mapping (MATCHES YOUR BACKEND JSON)
                const mappedData = {
                    bankName: profile.bank_name || '',
                    // ✅ FIXED: Now looking for 'account_number' first
                    accountNumber: profile.account_number || profile.masked_account_number || '', 
                    ifscCode: profile.ifsc_code || '',
                    // ✅ FIXED: Now looking for 'branch' first
                    branch: profile.branch || profile.bank_branch || '', 
                    accountName: profile.account_holder_name || profile.first_name || '',
                };

                setData(mappedData);
                setOriginalData(mappedData);
            } catch (error) {
                console.error("Error fetching bank details:", error);
                showError("Failed to fetch bank details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    // Validation Logic
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Text-Only Validation
        if (name === 'bankName' || name === 'accountName' || name === 'branch') {
            if (!/^[a-zA-Z\s]*$/.test(value)) return;
        }

        // Number-Only Validation
        if (name === 'accountNumber') {
            if (!/^\d*$/.test(value)) return;
        }

        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!userId) {
            showError("Cannot save: User ID is missing.");
            return;
        }

        try {
            // 3. Correct Payload Keys for Update (MATCHES YOUR BACKEND JSON)
            const payload = {
                bank_name: data.bankName,
                account_number: data.accountNumber, // ✅ FIXED: Key matches backend
                ifsc_code: data.ifscCode,
                branch: data.branch,                // ✅ FIXED: Key matches backend
                account_holder_name: data.accountName
            };

            console.log("Sending Payload:", payload);

            await UpdateEmployeeJobAndBank(userId, payload);

            showSuccess("Bank Details updated successfully!");
            setOriginalData(data);
            setIsEditing(false);
        } catch (error: any) {
            console.error("Error saving bank details:", error);
            const errorMsg = error.response?.data?.detail || "Failed to update bank details.";
            showError(errorMsg);
        }
    };

    const handleCancel = () => {
        setData(originalData);
        setIsEditing(false);
    };

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading Bank Details...</div>;
    }

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
                {/* UNIFIED GRID LAYOUT */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {isEditing ? (
                        <>
                            <EditLineField label="Bank Name" name="bankName" value={data.bankName} onChange={handleChange} />
                            <EditLineField label="Account Holder Name" name="accountName" value={data.accountName} onChange={handleChange} />
                            
                            <EditLineField label="Bank Account Number" name="accountNumber" value={data.accountNumber} onChange={handleChange} />
                            <EditLineField label="Bank IFSC Code" name="ifscCode" value={data.ifscCode} onChange={handleChange} />
                            
                            <EditLineField label="Branch Name" name="branch" value={data.branch} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <DetailField label="Bank Name" value={data.bankName} />
                            <DetailField label="Account Holder Name" value={data.accountName} />
                            
                            <DetailField 
                                label="Bank Account Number" 
                                value={maskAccountNumber(data.accountNumber)} 
                            />
                            <DetailField label="Bank IFSC Code" value={data.ifscCode} />
                            
                            <DetailField label="Branch Name" value={data.branch} />
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