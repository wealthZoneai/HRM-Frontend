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

// Structured address part for easy state management
type Address = {
  streetName: string;
  landmark: string;
  pincode: string;
  city: string;
  district: string;
  state: string;
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
  
  // NEW MARITAL STATUS FIELDS
  spouseName: string;
  childrenName: string; // Used for listing multiple children names/ages
  
  // NEW STRUCTURED ADDRESS FIELDS
  presentAddress: Address;
  isSameAddress: boolean;
  permanentAddress: Address;

  // NOMINEE FIELDS (Now mandatory)
  nomineeName: string;
  nomineeRelationship: string;
  nomineeDOB: string;
  nomineeAadhaar: string; 

  // PARENT AADHAAR FIELDS (Now mandatory and moved)
  fatherAadhaar: string;
  motherAadhaar: string;
};

// --- BASE STYLING CONSTANT ---

// Standard height for main form fields (py-2.5)
const INPUT_CLASS = `
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
`;

// Shorter height for address fields (py-2)
const SHORT_INPUT_CLASS = `
  block w-full rounded-lg 
  border border-slate-300
  bg-white
  px-4 py-2 
  text-sm text-slate-900
  placeholder:text-slate-400
  transition duration-200 ease-in-out
  focus:outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
`;


// --- EDIT FIELD SUB-COMPONENT (Standard Height) ---

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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
  // This component will use the standard INPUT_CLASS
  const isTextArea = name.includes('Description') && type === 'text'; // Simple heuristic 
  
  if (isTextArea) {
    return (
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          {label}
        </label>
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          disabled={disabled}
          rows={3}
          className={`${INPUT_CLASS} resize-none`}
        />
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        placeholder={placeholder || label}
        disabled={disabled}
        className={INPUT_CLASS}
      />
    </div>
  );
};

// --- SHORT EDIT FIELD SUB-COMPONENT (Reduced Height for Address) ---

const ShortEditField = ({
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
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
}) => {
    // This component uses the SHORT_INPUT_CLASS
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
        placeholder={placeholder || label}
        disabled={disabled}
        className={SHORT_INPUT_CLASS}
      />
    </div>
  );
};

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
      className={INPUT_CLASS}
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
        focus:ring-2 focus:ring-blue-500/20
      "
    />
    <label htmlFor={name} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
  </div>
);

// --- ADDRESS FIELDS SUB-COMPONENT ---

const AddressFields = ({
  prefix, // 'present' or 'permanent'
  addressData,
  onChange,
  disabled = false,
}: {
  prefix: 'present' | 'permanent';
  addressData: Address;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) => {
  const getFullName = (field: keyof Address) => `${prefix}Address.${field}`;
  const getLabel = (field: keyof Address) => {
    switch (field) {
      case 'streetName': return 'Street Name / House No.';
      case 'landmark': return 'Landmark (e.g., Near Park)';
      case 'pincode': return 'Pincode';
      case 'city': return 'City';
      case 'district': return 'District';
      case 'state': return 'State';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {Object.keys(addressData).map((key) => {
        const field = key as keyof Address;
        return (
          <ShortEditField // <-- Now using the shorter field component
            key={getFullName(field)}
            label={getLabel(field)}
            name={getFullName(field)}
            value={addressData[field]}
            onChange={onChange}
            disabled={disabled}
            placeholder={getLabel(field)}
          />
        );
      })}
    </div>
  );
};

// --- MAIN PF DETAILS COMPONENT ---

const PFDetails = () => {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");

  // Initial state for structured address
  const initialAddress: Address = {
    streetName: "",
    landmark: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
  };

  // State for the "Existing" tab form
  const [existingData, setExistingData] = useState<ExistingPFData>({
    uanNumber: "123456789",
    empId: "78565",
    fullName: "Ravi Teja",
    workMail: "ravi.teja@company.com",
  });

  // State for the "New" tab form
  const [newData, setNewData] = useState<NewPFData>({
    employeeName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    personalEmail: "",
    
    // Family & Marital
    fatherName: "",
    motherName: "",
    spouseName: "",
    childrenName: "",
    
    // IDs
    aadhaarNumber: "",
    panNumber: "",
    bankAccount: "",
    dateOfJoining: "",

    // Address
    presentAddress: initialAddress,
    isSameAddress: false,
    permanentAddress: initialAddress,
    
    // Nominee (Now mandatory)
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDOB: "",
    nomineeAadhaar: "",
    
    // Parent Aadhaar (Now mandatory)
    fatherAadhaar: "",
    motherAadhaar: "",
  });

  // --- Handlers for "Existing" Form ---
  const handleExistingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    // Handle Address Fields (which are nested)
    if (name.includes('Address')) {
        const [prefix, addressField] = name.split('.') as ['present' | 'permanent', keyof Address];
        
        setNewData((prev) => {
            const updatedState = {
                ...prev,
                [`${prefix}Address`]: {
                    ...prev[`${prefix}Address`],
                    [addressField]: value,
                },
            };

            // If changing present address AND checkbox is checked, update permanent too
            if (prefix === 'present' && prev.isSameAddress) {
                updatedState.permanentAddress = updatedState.presentAddress;
            }

            return updatedState;
        });
        return;
    }

    // Handle Checkbox
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setNewData((prev) => ({
        ...prev,
        isSameAddress: checked,
        // Copy present address object to permanent if checked
        permanentAddress: checked ? prev.presentAddress : initialAddress, 
      }));
      return;
    } 
    
    // Handle Marital Status or any other top-level field
    setNewData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

  const isMarried = newData.maritalStatus === "Married";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl border border-slate-200 shadow-xl max-w-4xl mx-auto"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 sm:gap-0">
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700">
          PF Onboarding & Details Submission
        </h2>
      </div>

      {/* TAB SWITCHER */}
      <div className="mb-8">
        <p className="text-sm text-slate-500 mb-4">Please select the appropriate option to proceed with your Provident Fund setup.</p>
        <div className="flex w-full max-w-lg mx-auto bg-slate-100 rounded-xl p-1.5 gap-1.5 shadow-inner">
          <TabButton
            label="Existing PF Account Holder"
            icon={<User size={16} />}
            isActive={activeTab === "existing"}
            onClick={() => setActiveTab("existing")}
          />
          <TabButton
            label="New PF Account Setup"
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
                <p className="text-sm text-slate-600 mb-6">If you already have a Universal Account Number (UAN) from a previous employer, please link it here.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="UAN Number"
                    name="uanNumber"
                    value={existingData.uanNumber}
                    onChange={handleExistingChange}
                    placeholder="Enter 12-digit UAN"
                  />
                  <EditField
                    label="Employee ID (Internal)"
                    name="empId"
                    value={existingData.empId}
                    onChange={handleExistingChange}
                    disabled={true} // Usually fetched/fixed
                  />
                  <EditField
                    label="Full Name (as per UAN)"
                    name="fullName"
                    value={existingData.fullName}
                    onChange={handleExistingChange}
                    placeholder="Your name"
                    disabled={true} // Usually fetched/fixed
                  />
                  <EditField
                    label="Work Email"
                    name="workMail"
                    value={existingData.workMail}
                    onChange={handleExistingChange}
                    placeholder="Your work email"
                    disabled={true} // Usually fetched/fixed
                  />
                </div>
              </div>
              <div className="flex justify-end pt-6 border-t border-slate-200">
                <SubmitButton label="Save" />
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
              <div className="p-4 sm:p-6 rounded-lg sm:rounded-xl border bg-slate-50/50 border-slate-200 space-y-8">
                
                {/* --- Personal Details --- */}
                <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2">1. Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Employee Name (Full Name as per Aadhaar)"
                    name="employeeName"
                    value={newData.employeeName}
                    onChange={handleNewChange}
                    placeholder="Full Name"
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
                
                {/* --- Family Details (Conditional) --- */}
                <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2 pt-4">2. Family & Parent Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Father's Name"
                    name="fatherName"
                    value={newData.fatherName}
                    onChange={handleNewChange}
                    placeholder="Father's full name"
                  />
                  <EditField
                    label="Father's Aadhaar Number"
                    name="fatherAadhaar"
                    value={newData.fatherAadhaar}
                    onChange={handleNewChange}
                    placeholder="Father Aadhaar"
                  />
                  <EditField
                    label="Mother's Name"
                    name="motherName"
                    value={newData.motherName}
                    onChange={handleNewChange}
                    placeholder="Mother's full name"
                  />
                  <EditField
                    label="Mother's Aadhaar Number"
                    name="motherAadhaar"
                    value={newData.motherAadhaar}
                    onChange={handleNewChange}
                    placeholder="Mother Aadhaar"
                  />
                  {/* Marital Status Conditional Fields */}
                  <AnimatePresence>
                    {isMarried && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="contents" // Allows grid to manage children
                      >
                        <EditField
                          label="Spouse/Husband Name"
                          name="spouseName"
                          value={newData.spouseName}
                          onChange={handleNewChange}
                          placeholder="Spouse/Husband Name"
                        />
                        <EditField
                          label="Children Name(s) & Age(s) (e.g., Mia-5, Leo-2)"
                          name="childrenName"
                          value={newData.childrenName}
                          onChange={handleNewChange}
                          placeholder="List children names/ages"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* --- ID & Bank Details --- */}
                <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2 pt-4">3. Identity & Employment Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <EditField
                    label="Aadhaar Number"
                    name="aadhaarNumber"
                    value={newData.aadhaarNumber}
                    onChange={handleNewChange}
                    placeholder="Your 12-digit Aadhaar number"
                  />
                  <EditField
                    label="PAN Number"
                    name="panNumber"
                    value={newData.panNumber}
                    onChange={handleNewChange}
                    placeholder="Your PAN number"
                  />
                  <EditField
                    label="Bank A/C Number"
                    name="bankAccount"
                    value={newData.bankAccount}
                    onChange={handleNewChange}
                    placeholder="Bank Account Number (for PF transfer)"
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
                <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2 pt-4">4. Address Details</h3>
                
                <div className="space-y-6">
                    {/* Present Address */}
                    <div className="border border-slate-300 p-4 rounded-lg bg-white/70">
                        <h4 className="font-medium text-slate-700 mb-4">Present Address</h4>
                        <AddressFields
                            prefix="present"
                            addressData={newData.presentAddress}
                            onChange={handleNewChange}
                        />
                    </div>
                    
                    {/* Permanent Address */}
                    <div className="border border-slate-300 p-4 rounded-lg bg-white/70">
                        <h4 className="font-medium text-slate-700 mb-2 flex justify-between items-center">
                            Permanent Address
                            <CheckboxField
                                label="Same as Present Address"
                                name="isSameAddress"
                                checked={newData.isSameAddress}
                                onChange={handleNewChange}
                            />
                        </h4>
                        <AddressFields
                            prefix="permanent"
                            addressData={newData.permanentAddress}
                            onChange={handleNewChange}
                            disabled={newData.isSameAddress}
                        />
                    </div>
                </div>

                {/* --- NOMINEE DETAILS (MANDATORY) --- */}
                <h3 className="text-lg font-semibold text-blue-600 border-b border-blue-200 pb-2 pt-4">5. Nominee Details (Mandatory)</h3>
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
                    label="Nominee Aadhaar Number"
                    name="nomineeAadhaar"
                    value={newData.nomineeAadhaar}
                    onChange={handleNewChange}
                    placeholder="Nominee's Aadhaar number"
                  />
                </div>
              </div>

              {/* --- SUBMIT BUTTON --- */}
              <div className="flex justify-end pt-6 border-t border-slate-200">
                <SubmitButton label="Save" />
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
          layoutId="active-pill-pf" // Unique layoutId
          className="absolute inset-0 bg-white rounded-lg shadow-md"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ zIndex: -1 }}
        />
      )}
      {icon}
      <span className="relative z-10 whitespace-nowrap">{label}</span>
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
      px-6 py-3 rounded-lg 
      text-sm font-semibold 
      hover:bg-blue-700 
      shadow-lg hover:shadow-xl
      transition-all
      focus:outline-none focus:ring-4 focus:ring-blue-500/50
    "
  >
    <Send size={18} />
    {label}
  </button>
);

export default PFDetails;