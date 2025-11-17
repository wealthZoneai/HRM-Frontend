import { useState } from 'react';
import { Pencil, X, Check } from 'lucide-react';
import { motion } from 'framer-motion';

// --- Reusable Helper Components (from previous enhancement) ---

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

/**
 * A reusable component for an input field in the edit view.
 */
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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

/**
 * A reusable component for a select dropdown in the edit view.
 */
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
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
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

const JobInformation = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: 'Senior product manager',
    department: 'Product',
    manager: 'David Chen',
    employmentType: 'Full time',
    startDate: '2025-10-26',
    location: 'Head Office',
    workEmail: 'david.chen@company.com',
    employeeId: 'EMP-1001',
    jobDescription: `Our recruitment process is designed to be transparent, fair, and
efficient — ensuring every candidate gets the opportunity to shine.
Whether you're a fresher or an experienced professional, we offer
roles that help you learn, grow, and make an impact.`,
  });

  // Store a copy of the original data to reset to on cancel
  const [originalData, setOriginalData] = useState(formData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setOriginalData(formData);
    setIsEditing(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to save the data
    console.log('Updated Job Info:', formData);
    setIsEditing(false);
    setOriginalData(formData);
  };

  const handleCancel = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200"
    >
      {/* --- Component Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">Job Information</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 w-full sm:w-auto justify-center"
          >
            <Pencil size={16} />
            Edit Job Information
          </button>
        )}
      </div>

      {/* --- Form --- */}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
          {isEditing ? (
            <>
              <EditField
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
              <EditSelectField
                label="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              >
                <option value="Product">Product</option>
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
                <option value="HR">Human Resources</option>
                <option value="Finance">Finance</option>
              </EditSelectField>
              <EditField
                label="Manager"
                name="manager"
                value={formData.manager}
                onChange={handleChange}
              />
              <EditSelectField
                label="Employment Type"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="Full time">Full time</option>
                <option value="Part time">Part time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </EditSelectField>
              <EditField
                label="Start Date"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
              <EditSelectField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              >
                <option value="Head Office">Head Office</option>
                <option value="Branch Office">Branch Office</option>
                <option value="Remote">Remote</option>
              </EditSelectField>
              <EditField
                label="Work Email"
                name="workEmail"
                type="email"
                value={formData.workEmail}
                onChange={handleChange}
              />
              <DisplayField label="Employee ID" value={formData.employeeId} />
            </>
          ) : (
            <>
              <DisplayField label="Job Title" value={formData.jobTitle} />
              <DisplayField label="Department" value={formData.department} />
              <DisplayField label="Manager" value={formData.manager} />
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
            </>
          )}
        </div>

        {/* --- Job Description Section --- */}
        <div className="mt-6 pt-6 border-t">
          {isEditing ? (
            <div>
              <label
                htmlFor="jobDescription"
                className="block text-sm font-medium text-slate-700 mb-1"
              >
                Job Description
              </label>
              <textarea
                id="jobDescription"
                name="jobDescription"
                value={formData.jobDescription}
                onChange={handleChange}
                rows={5}
                className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-slate-500 uppercase tracking-wider">
                Job Description
              </label>
              <p className="mt-1 text-sm sm:text-base text-slate-700 whitespace-pre-line">
                {formData.jobDescription}
              </p>
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

export default JobInformation;