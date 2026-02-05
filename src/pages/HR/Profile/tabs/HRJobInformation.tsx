import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Adjust the import path based on your folder structure
import { GetMyProfile } from '../../../../Services/apiHelpers';

// Reusable Display Field
const DisplayField = ({ label, value }: { label: string; value: string }) => (
    <div>
        <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
            {label}
        </label>
        <p className="mt-1 text-md font-semibold text-slate-700">{value || '-'}</p>
    </div>
);

const HRJobInformation = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState({
        jobTitle: '',
        department: '',
        teamLead: '',
        employmentType: '',
        startDate: '',
        location: '',
        workEmail: '',
        employeeId: '',
        jobDescription: '',
    });

    // Fetch Data from API on Load
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setIsLoading(true);
                const response = await GetMyProfile();
                const data = response.data;
                
                // Map API response to display fields
                setFormData({
                    jobTitle: data.role || '',
                    department: data.department || '',
                    teamLead: data.reports_to || '', 
                    employmentType: data.employment_type || '',
                    startDate: data.date_of_joining || '',
                    location: data.location || '',
                    workEmail: data.email || '',
                    employeeId: data.employee_id || '',
                    jobDescription: data.job_description || '',
                });
            } catch (error) {
                console.error("Failed to load profile:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (isLoading) {
        return <div className="p-8 text-center text-gray-500">Loading Job Information...</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl max-w-4xl mx-auto"
        >
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-base sm:text-xl font-semibold text-slate-800">Job Information</h2>
                {/* Edit button removed as per request */}
            </div>

            {/* Read-Only Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
                <DisplayField label="Job Title" value={formData.jobTitle} />
                <DisplayField label="Department" value={formData.department} />
                <DisplayField label="Team Lead" value={formData.teamLead} />
                <DisplayField label="Employment Type" value={formData.employmentType} />
                <DisplayField label="Start Date" value={formData.startDate} />
                <DisplayField label="Location" value={formData.location} />
                <DisplayField label="Work Email" value={formData.workEmail} />
                <DisplayField label="Employee ID" value={formData.employeeId} />
            </div>

            {/* Job Description - Read Only */}
            <div className="mt-6 pt-6 border-t border-slate-200">
                <div>
                    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
                        Job Description
                    </label>
                    <p className="mt-1 text-sm sm:text-base text-slate-700 whitespace-pre-line">
                        {formData.jobDescription || 'No description provided.'}
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default HRJobInformation;