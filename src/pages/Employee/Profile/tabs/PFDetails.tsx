import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, UserPlus, Send } from "lucide-react";

// --- TYPE DEFINITIONS ---

type ExistingPFData = {
  uanNumber: string;
  empId: string;
  fullName: string;
  workMail: string;
};

type NewPFData = {
  employeeName: string;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  mobileNumber: string;
  personalEmail: string;
  fatherName: string;
  motherName: string;
  aadhaarNumber: string;
  panNumber: string;
  bankAccount: string;
  dateOfJoining: string;
  presentAddress: string;
  isSameAddress: boolean;
  permanentAddress: string;
  // --- NEW NOMINEE FIELDS ---
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDOB: string;
  nomineeAadhaar: string; // Often optional but good to have
  // --- ---
  fatherAadhaar: string;
  motherAadhaar: string;
};

// --- EDIT FIELD SUB-COMPONENT ---

const EditField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder || label}
      disabled={disabled}
      className="
        block w-full rounded-lg 
        border border-slate-300
        bg-white
        px-4 py-2.5
        text-sm text-slate-900
        
        placeholder:text-slate-400
        
        transition duration-200 ease-in-out
        
        focus:outline-none
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-500/20
        
        disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
        
        dark:scheme-dark
      "
    />
  </div>
);

// --- SELECT FIELD SUB-COMPONENT ---

const SelectField = ({
  label,
  name,
  value,
  onChange,
  children,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1.5">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="
        block w-full rounded-lg 
        border border-slate-300
        bg-white
        px-4 py-2.5
        text-sm text-slate-900
        placeholder:text-slate-400
        transition duration-200 ease-in-out
        focus:outline-none
        focus:border-blue-500
        focus:ring-2 focus:ring-blue-500/20
      "
    >
      {children}
    </select>
  </div>
);

// --- CHECKBOX FIELD SUB-COMPONENT ---

const CheckboxField = ({
  label,
  name,
  checked,
  onChange,
}: {
  label: string;
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="flex items-center gap-2 mt-2">
    <input
      type="checkbox"
      name={name}
      id={name}
      checked={checked}
      onChange={onChange}
      className="
        h-4 w-4 rounded 
        border-slate-300 
        text-blue-600 
        focus:ring-blue-500/20
      "
    />
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
  </div>
);


// --- MAIN PF DETAILS COMPONENT ---

const PFDetails = () => {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");

  // State for the "Existing" tab form
  const [existingData, setExistingData] = useState<ExistingPFData>({
    uanNumber: "123456789",
    empId: "78565",
    fullName: "Ravi Teja",
    workMail: "",
  });

  // State for the "New" tab form
  const [newData, setNewData] = useState<NewPFData>({
    employeeName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    personalEmail: "",
    fatherName: "",
    motherName: "",
    aadhaarNumber: "",
    panNumber: "",
    bankAccount: "",
    dateOfJoining: "",
    presentAddress: "",
    isSameAddress: false,
    permanentAddress: "",
    // --- NEW NOMINEE STATE ---
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDOB: "",
    nomineeAadhaar: "",
    // --- ---
    fatherAadhaar: "",
    motherAadhaar: "",
  });

  // --- Handlers for "Existing" Form ---
  const handleExistingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExistingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExistingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting existing employee data:", existingData);
    // TODO: API call to link existing PF account
  };

  // --- Handlers for "New" Form ---
  const handleNewChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setNewData((prev) => ({
        ...prev,
        isSameAddress: checked,
        permanentAddress: checked ? prev.presentAddress : "",
      }));
    } else if (name === "presentAddress") {
      // If user types in present address, update permanent address *if* box is checked
      setNewData((prev) => ({
        ...prev,
        presentAddress: value,
        permanentAddress: prev.isSameAddress ? value : prev.permanentAddress,
      }));
    } else {
      setNewData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new employee data:", newData);
    // TODO: API call to create new PF account
  };

  // --- Animation Variants ---
  const formVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200 shadow-sm"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-base sm:text-xl font-semibold text-slate-800">
          PF Onboarding
        </h2>
      </div>

      {/* TAB SWITCHER */}
      <div className="mb-6 sm:mb-8">
        <div className="flex w-full max-w-sm mx-auto bg-slate-100 rounded-xl p-1.5 gap-1.5">
          <TabButton
            label="Existing"
            icon={<User size={16} />}
            isActive={activeTab === "existing"}
            onClick={() => setActiveTab("existing")}
          />
          <TabButton
            label="New"
            icon={<UserPlus size={16} />}
            isActive={activeTab === "new"}
            onClick={() => setActiveTab("new")}
          />
        </div>
      </div>

      {/* FORM CONTENT AREA */}
      <div>
        <AnimatePresence mode="wait">
          {activeTab === "existing" && (
            <motion.form
              key="existing-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              onSubmit={handleExistingSubmit}
              className="space-y-8"
            >
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl border bg-slate-50/50 border-slate-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="UAN Number"
                    name="uanNumber"
                    value={existingData.uanNumber}
                    onChange={handleExistingChange}
                  />
                  <EditField
                    label="EMP ID"
                    name="empId"
                    value={existingData.empId}
                    onChange={handleExistingChange}
                  />
                  <EditField
                    label="Full Name"
                    name="fullName"
                    value={existingData.fullName}
                    onChange={handleExistingChange}
                  />
                  <EditField
                    label="Work Mail"
                    name="workMail"
                    value={existingData.workMail}
                    onChange={handleExistingChange}
                    placeholder="Work mail"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-6 border-t">
                <SubmitButton label="Link PF Account" />
              </div>
            </motion.form>
          )}

          {activeTab === "new" && (
            <motion.form
              key="new-form"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.2 }}
              onSubmit={handleNewSubmit}
              className="space-y-8"
            >
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl border bg-slate-50/50 border-slate-200 space-y-6">
                
                {/* --- Personal Details --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Employee Name"
                    name="employeeName"
                    value={newData.employeeName}
                    onChange={handleNewChange}
                    placeholder="Full Name as per Aadhaar"
                  />
                  <EditField
                    label="Date of Birth"
                    name="dateOfBirth"
                    type="date"
                    value={newData.dateOfBirth}
                    onChange={handleNewChange}
                  />
                  <SelectField
                    label="Gender"
                    name="gender"
                    value={newData.gender}
                    onChange={handleNewChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </SelectField>
                  <SelectField
                    label="Marital Status"
                    name="maritalStatus"
                    value={newData.maritalStatus}
                    onChange={handleNewChange}
                  >
                    <option value="">Select Status</option>
                    <option value="Unmarried">Unmarried</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widow">Widow</option>
                  </SelectField>
                  <EditField
                    label="Mobile Number"
                    name="mobileNumber"
                    value={newData.mobileNumber}
                    onChange={handleNewChange}
                    placeholder="10-digit mobile number"
                  />
                  <EditField
                    label="Personal Email ID"
                    name="personalEmail"
                    value={newData.personalEmail}
                    onChange={handleNewChange}
                    placeholder="example@gmail.com"
                  />
                </div>
                
                {/* --- Family Details --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2 pt-4">Family Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Father's Name"
                    name="fatherName"
                    value={newData.fatherName}
                    onChange={handleNewChange}
                    placeholder="Father's full name"
                  />
                  <EditField
                    label="Mother's Name"
                    name="motherName"
                    value={newData.motherName}
                    onChange={handleNewChange}
                    placeholder="Mother's full name"
                  />
                </div>

                {/* --- ID & Bank Details --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2 pt-4">Identity & Bank Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Aadhaar Number"
                    name="aadhaarNumber"
                    value={newData.aadhaarNumber}
                    onChange={handleNewChange}
                    placeholder="Aadhaar number"
                  />
                  <EditField
                    label="PAN Number"
                    name="panNumber"
                    value={newData.panNumber}
                    onChange={handleNewChange}
                    placeholder="Pan Number"
                  />
                   <EditField
                    label="Bank A/C Number"
                    name="bankAccount"
                    value={newData.bankAccount}
                    onChange={handleNewChange}
                    placeholder="Bank A/C Number"
                  />
                  <EditField
                    label="Date of Joining"
                    name="dateOfJoining"
                    type="date"
                    value={newData.dateOfJoining}
                    onChange={handleNewChange}
                  />
                </div>
                
                {/* --- Address Details --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2 pt-4">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Present Address"
                    name="presentAddress"
                    value={newData.presentAddress}
                    onChange={handleNewChange}
                    placeholder="Present address"
                  />
                  <div>
                    <EditField
                      label="Permanent Address"
                      name="permanentAddress"
                      value={newData.permanentAddress}
                      onChange={handleNewChange}
                      placeholder="Permanent address"
                      disabled={newData.isSameAddress}
                    />
                    <CheckboxField
                      label="Same as Present Address"
                      name="isSameAddress"
      
                      checked={newData.isSameAddress}
                      onChange={handleNewChange}
                    />
                  </div>
                </div>

                {/* --- NOMINEE DETAILS (NEW) --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2 pt-4">Nominee Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Nominee Name"
                    name="nomineeName"
                    value={newData.nomineeName}
                    onChange={handleNewChange}
                    placeholder="Nominee's full name"
                  />
                  <SelectField
                    label="Relationship with Nominee"
                    name="nomineeRelationship"
                    value={newData.nomineeRelationship}
                    onChange={handleNewChange}
                  >
                    <option value="">Select Relationship</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Son">Son</option>
                    <option value="Daughter">Daughter</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Brother">Brother</option>
                    <option value="Sister">Sister</option>
                    <option value="Other">Other</option>
                  </SelectField>
                  <EditField
                    label="Nominee Date of Birth"
                    name="nomineeDOB"
                    type="date"
                    value={newData.nomineeDOB}
                    onChange={handleNewChange}
                  />
                  <EditField
                    label="Nominee Aadhaar (Optional)"
                    name="nomineeAadhaar"
                    value={newData.nomineeAadhaar}
                    onChange={handleNewChange}
                    placeholder="Nominee's Aadhaar number"
                  />
                </div>
                 
                {/* --- Optional Aadhaar --- */}
                <h3 className="text-base font-semibold text-slate-700 border-b pb-2 pt-4">Parent Details (Optional)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Father Aadhaar Number (Optional)"
                    name="fatherAadhaar"
                    value={newData.fatherAadhaar}
                    onChange={handleNewChange}
                    placeholder="Father Aadhaar"
                  />
                  <EditField
                    label="Mother Aadhaar Number (Optional)"
                    name="motherAadhaar"
                    value={newData.motherAadhaar}
                    onChange={handleNewChange}
                    placeholder="Mother Aadhaar"
                  />
                </div>
              </div>

              {/* --- SUBMIT BUTTON --- */}
              <div className="flex justify-end pt-6 border-t mt-8">
                <SubmitButton label="Create New PF Account" />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// --- Tab Button Sub-Component ---
const TabButton = ({
  label,
  icon,
  isActive,
  onClick,
}: {
  label:string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-1 inline-flex items-center justify-center gap-2 
        px-3 sm:px-4 py-2.5 
        rounded-lg 
        text-xs sm:text-sm font-semibold
        transition-colors
        z-10
        ${isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-800"}
      `}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-white rounded-lg shadow-md"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ zIndex: -1 }}
        />
      )}
      {icon}
      <span className="relative z-10">{label}</span>
    </button>
  );
};

// --- Submit Button Sub-Component ---
const SubmitButton = ({ label }: { label: string }) => (
  <button
    type="submit"
    className="
      inline-flex items-center justify-center gap-2 
      bg-blue-600 text-white 
      px-4 py-2 rounded-lg 
      text-xs sm:text-sm font-semibold 
      hover:bg-blue-700 
      shadow
      transition-all
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    "
  >
    <Send size={16} />
    {label}
  </button>
);

export default PFDetails;