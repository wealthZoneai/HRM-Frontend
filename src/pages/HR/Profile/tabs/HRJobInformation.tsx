import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// Adjust the import path based on your folder structure
import { GetMyProfile, GetAllEmployes } from '../../../../Services/apiHelpers';
import { showError } from '../../../../utils/toast';

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
                
                // 1. Robust ID Check (Same logic as Bank Details)
                let extractedId = data?.id;

                if (!extractedId && data?.emp_id) {
                    try {
                        const allEmpsResponse = await GetAllEmployes();
                        const allEmps = allEmpsResponse.data?.results || [];
                        const found = allEmps.find((e: any) => e.emp_id === data.emp_id);
                        if (found && found.id) {
                            extractedId = found.id;
                        }
                    } catch (err) {
                        console.error("Fallback ID lookup failed:", err);
                    }
                }

                if (!extractedId) {
                    // console.error("User ID is missing in profile response!");
                    // showError("Failed to identify user data.");
                }

                // 2. Correct Data Mapping based on Backend JSON
                setFormData({
                    jobTitle: data.job_title || data.role || '',
                    department: data.department || '',
                    teamLead: data.team_lead || data.reports_to || '', 
                    employmentType: data.employment_type || '',
                    // Backend uses 'start_date', fallback to 'date_of_joining'
                    startDate: data.start_date || data.date_of_joining || '',
                    location: data.location || '',
                    workEmail: data.work_email || data.email || '',
                    employeeId: data.emp_id || '',
                    jobDescription: data.job_description || '',
                });
            } catch (error) {
                console.error("Failed to load profile:", error);
                showError("Failed to load job information.");
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
                {/* Edit button removed as per previous request */}
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
