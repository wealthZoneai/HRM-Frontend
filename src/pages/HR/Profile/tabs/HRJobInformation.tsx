import { useState, useEffect } from 'react';
import { X, Check, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';

// Mock Data
const DUMMY_JOB_DATA = {
    jobTitle: 'HR Manager',
    department: 'Human Resources',
    teamLead: 'Director of Operations',
    employmentType: 'Full time',
    startDate: '2023-01-01',
    location: 'Head Office',
    workEmail: 'hr@wealthzone.com',
    employeeId: 'WZG-HR-001',
    jobDescription: `The HR Manager is responsible for overseeing all aspects of Human Resources practices and processes.`,
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
const DisplayField = ({ label, value }: { label: string; value: string }) => (
    <div>
        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
            {label}
        </label>
        <p className="mt-1 text-md font-semibold text-slate-700">{value}</p>
    </div>
);

const HRJobInformation = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(DUMMY_JOB_DATA);
    const [originalData, setOriginalData] = useState(DUMMY_JOB_DATA);

    // Initialize data
    useEffect(() => {
        setFormData(DUMMY_JOB_DATA);
        setOriginalData(DUMMY_JOB_DATA);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Updated HR Job Info:', formData);
        setIsEditing(false);
        setOriginalData(formData);
    };

    const handleCancel = () => {
        setFormData(originalData);
        setIsEditing(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl max-w-4xl mx-auto"
        >
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
                <h2 className="text-base sm:text-xl font-semibold text-slate-800">Job Information</h2>

                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        Edit <Pencil size={16} />
                    </button>
                )}
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
                    {isEditing ? (
                        <>
                            <EditLineField label="Job Title" name="jobTitle" value={formData.jobTitle} onChange={handleChange} />
                            <EditLineField label="Department" name="department" value={formData.department} onChange={handleChange} />
                            <EditLineField label="Team Lead" name="teamLead" value={formData.teamLead} onChange={handleChange} />
                            <EditLineField label="Employment Type" name="employmentType" value={formData.employmentType} onChange={handleChange} />
                            <EditLineField label="Start Date" name="startDate" value={formData.startDate} onChange={handleChange} />
                            <EditLineField label="Location" name="location" value={formData.location} onChange={handleChange} />
                            <EditLineField label="Work Email" name="workEmail" value={formData.workEmail} onChange={handleChange} />
                            <EditLineField label="Employee ID" name="employeeId" value={formData.employeeId} onChange={handleChange} />
                        </>
                    ) : (
                        <>
                            <DisplayField label="Job Title" value={formData.jobTitle} />
                            <DisplayField label="Department" value={formData.department} />
                            <DisplayField label="Team Lead" value={formData.teamLead} />
                            <DisplayField label="Employment Type" value={formData.employmentType} />
                            <DisplayField label="Start Date" value={formData.startDate} />
                            <DisplayField label="Location" value={formData.location} />
                            <DisplayField label="Work Email" value={formData.workEmail} />
                            <DisplayField label="Employee ID" value={formData.employeeId} />
                        </>
                    )}
                </div>

                {/* Job Description */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
                            Job Description
                        </label>
                        {isEditing ? (
                            <textarea
                                name="jobDescription"
                                value={formData.jobDescription}
                                onChange={(e) => setFormData(prev => ({ ...prev, jobDescription: e.target.value }))}
                                rows={4}
                                className="mt-2 w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 focus:outline-none focus:border-blue-500 transition-colors bg-transparent"
                            />
                        ) : (
                            <p className="mt-1 text-sm sm:text-base text-slate-700 whitespace-pre-line">
                                {formData.jobDescription}
                            </p>
                        )}
                    </div>
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

export default HRJobInformation;
