import { useState, useEffect } from 'react';
import { X, Check, Pencil } from 'lucide-react';
import { motion } from 'framer-motion';
// import axios from 'axios'; // Import axios for API call (Commented out as requested)

// --- Helper Data and Components ---

/**
 * Mock data to simulate the response from an external API call.
 */


// ... (existing helper functions and components remain unchanged)

// Helper function to format the date for display
function formatDateForDisplay(dateStr: string) {
  // Add 'T00:00:00' to prevent timezone issues from shifting the date
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * A reusable component for displaying a field in the read-only view.
 */
const DisplayField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
      {label}
    </label>
    <p className="mt-1 text-md font-semibold text-slate-700">{value}</p>
  </div>
);

// Base Tailwind class for enhanced input/select styling (better focus UI)

// const TEXTAREA_CLASS =
// 'block w-full rounded-lg border border-slate-300 p-3 text-slate-800 shadow-sm transition duration-150 ease-in-out focus:ring-4 focus:ring-blue-100 focus:border-blue-600 sm:text-sm';



const JobInformation = ({ data }: { data?: any }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    department: '',
    teamLead: '',
    employmentType: '',
    startDate: '',
    location: '',
    workEmail: '',
    employeeId: '',
    idCardFront: '',
    idCardBack: '',
    jobDescription: '',
  });
  const [originalData, setOriginalData] = useState(formData);

  useEffect(() => {
    if (data) {
      const jobData = data.job || data;
      const mappedData = {
        jobTitle: jobData.job_title || '',
        department: jobData.department || '',
        teamLead: jobData.team_lead?.display || '',
        employmentType: jobData.employment_type || '',
        startDate: jobData.start_date || '',
        location: jobData.location || '',
        workEmail: data.work_email || jobData.work_email || '',
        employeeId: data.emp_id || jobData.emp_id || '',
        idCardFront: data.protected_id_image_url ? `http://127.0.0.1:8000${data.protected_id_image_url}` : '',
        idCardBack: data.protected_id_image_url ? `http://127.0.0.1:8000${data.protected_id_image_url}` : '',
        jobDescription: jobData.job_description || '',
      };
      setFormData(mappedData);
      setOriginalData(mappedData);
    }
  }, [data]);

  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the data
    console.log('Updated Job Info:', formData);
    // Simulating save success
    setIsEditing(false);
    setOriginalData(formData);
  };

  const handleCancel = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false);
  };

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert("Invalid format. Only JPG and PNG files are allowed.");
      return false;
    }
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
      alert("File size exceeds 2MB limit. Please upload a smaller image.");
      return false;
    }
    return true;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl max-w-4xl mx-auto"
    >
      {/* --- Component Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">
          Job Information
        </h2>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
          >
            Edit <Pencil size={16} />
          </button>
        )}
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
          {/* All fields are read-only even in edit mode, as per requirements */}
          <DisplayField label="Job Title" value={formData.jobTitle} />
          <DisplayField label="Department" value={formData.department} />
          <DisplayField label="Team Lead" value={formData.teamLead} />
          <DisplayField
            label="Employment Type"
            value={formData.employmentType}
          />
          <DisplayField
            label="Start Date"
            value={formatDateForDisplay(formData.startDate)}
          />
          <DisplayField label="Location" value={formData.location} />
          <DisplayField label="Work Email" value={formData.workEmail} />
          <DisplayField label="Employee ID" value={formData.employeeId} />
        </div>

        {/* --- Job Description Section --- */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div>
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
              Job Description
            </label>
            <p className="mt-1 text-sm sm:text-base text-slate-700 whitespace-pre-line">
              {formData.jobDescription}
            </p>
          </div>
        </div>

        {/* --- ID Card Photo Section --- */}
        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
              ID Card
            </label>
            {/* Separate ID Edit pencil button removed */}
          </div>

          <div className="flex flex-col sm:flex-row gap-6">
            {/* Front Side */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Front Side
              </span>
              <div className="relative w-64 h-40 rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-50 group">
                {formData.idCardFront ? (
                  <img
                    src={formData.idCardFront}
                    alt="ID Card Front"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-sm text-slate-400">
                    No image uploaded
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center gap-2 mt-2">
                  <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Replace
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && validateFile(file)) {
                          setFormData({ ...formData, idCardFront: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, idCardFront: '' })}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>

            {/* Back Side */}
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-700">
                Back Side
              </span>
              <div className="relative w-64 h-40 rounded-xl overflow-hidden border-2 border-slate-100 shadow-sm bg-slate-50 group">
                {formData.idCardBack ? (
                  <img
                    src={formData.idCardBack}
                    alt="ID Card Back"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-sm text-slate-400">
                    No image uploaded
                  </div>
                )}
              </div>
              {isEditing && (
                <div className="flex items-center gap-2 mt-2">
                  <label className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-700">
                    Replace
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file && validateFile(file)) {
                          setFormData({ ...formData, idCardBack: URL.createObjectURL(file) });
                        }
                      }}
                    />
                  </label>
                  <span className="text-gray-300">|</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, idCardBack: '' })}
                    className="text-xs font-semibold text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* --- Form Actions --- */}
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

export default JobInformation;
