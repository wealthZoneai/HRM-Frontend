import { useState, useEffect } from 'react';
import { Pencil, X, Check, } from 'lucide-react';
import { motion } from 'framer-motion';
// import axios from 'axios'; // Import axios for API call (Commented out as requested)

// --- Helper Data and Components ---

/**
 * Mock data to simulate the response from an external API call.
 */
const DUMMY_JOB_DATA = {
  jobTitle: 'Senior Product Manager',
  department: 'Product',
  manager: 'Jane Foster',
  employmentType: 'Full time',
  startDate: '2025-10-26',
  location: 'Head Office',
  workEmail: 'jane.foster@company.com',
  employeeId: 'EMP-1002',
  jobDescription: `The Senior Product Manager is responsible for leading the product lifecycle from conception to launch, focusing on market needs, strategy, and execution. This role involves close collaboration with engineering, design, and marketing teams to deliver exceptional user value and achieve business objectives. Key responsibilities include defining roadmaps, analyzing metrics, and driving feature development.`,
};

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
const INPUT_CLASS =
  'block w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-800 shadow-sm transition duration-150 ease-in-out focus:ring-4 focus:ring-blue-100 focus:border-blue-600 sm:text-sm';
const TEXTAREA_CLASS =
  'block w-full rounded-lg border border-slate-300 p-3 text-slate-800 shadow-sm transition duration-150 ease-in-out focus:ring-4 focus:ring-blue-100 focus:border-blue-600 sm:text-sm';


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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      className={INPUT_CLASS}
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
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
      className={INPUT_CLASS}
    >
      {children}
    </select>
  </div>
);

/**
 * Simple skeleton component to display while loading data.
 */
const SkeletonLoader = () => (
  <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200 animate-pulse">
    <div className="h-6 w-48 bg-slate-200 rounded mb-8"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-sm">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="h-3 w-1/4 bg-slate-100 rounded"></div>
          <div className="h-10 bg-slate-200 rounded-lg"></div>
        </div>
      ))}
    </div>
    <div className="mt-6 pt-6 border-t border-slate-100">
      <div className="h-3 w-1/4 bg-slate-100 rounded mb-2"></div>
      <div className="space-y-2">
        <div className="h-4 w-full bg-slate-200 rounded-lg"></div>
        <div className="h-4 w-11/12 bg-slate-200 rounded-lg"></div>
        <div className="h-4 w-10/12 bg-slate-200 rounded-lg"></div>
      </div>
    </div>
  </div>
);


// --- Main Component ---

const JobInformation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  // Initial state structure (will be populated by DUMMY_JOB_DATA)
  const initialFormState = {
    jobTitle: '',
    department: '',
    manager: '',
    employmentType: '',
    startDate: '',
    location: '',
    workEmail: '',
    employeeId: '',
    jobDescription: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  const [originalData, setOriginalData] = useState(initialFormState);

  // Effect to simulate data fetching on component mount
  useEffect(() => {
    const fetchJobData = async () => {
      // console.log('Simulating API call to fetch job data...');

      // --- Start of Axios Simulation (Commented out as requested) ---
      /*
      try {
        // In a real application, you'd use a dynamic ID or token
        // const response = await axios.get('/api/job-info/current-user'); 
        // setFormData(response.data);
        // setOriginalData(response.data);
      } catch (error) {
        // console.error('Error fetching data:', error);
      }
      */
      // --- End of Axios Simulation ---

      // Using setTimeout to simulate network delay (1.5 seconds)
      setTimeout(() => {
        setFormData(DUMMY_JOB_DATA);
        setOriginalData(DUMMY_JOB_DATA);
        setIsLoading(false);
      }, 1500);
    };

    fetchJobData();
  }, []);


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
    // Simulating save success
    setIsEditing(false);
    setOriginalData(formData);
  };

  const handleCancel = () => {
    setFormData(originalData); // Revert to original data
    setIsEditing(false);
  };

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200 max-w-4xl mx-auto"
    >
      {/* --- Component Header --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">Job Information</h2>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-lg px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50 w-full sm:w-auto justify-center border border-blue-200"
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
                <option value="Software">IT & Software</option>
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
              {/* Employee ID is displayed read-only even in edit mode */}
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
        <div className="mt-6 pt-6 border-t border-slate-200">
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
                className={TEXTAREA_CLASS}
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