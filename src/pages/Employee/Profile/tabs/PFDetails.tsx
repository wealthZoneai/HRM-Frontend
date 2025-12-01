import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, UserPlus, Send, ChevronDown } from "lucide-react";

// --- TYPE DEFINITIONS ---

type ExistingPFData = {
  uanNumber: string;
  empId: string;
  fullName: string;
  workMail: string;
};

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

  spouseName: string;
  childrenName: string;

  presentAddress: Address;
  isSameAddress: boolean;
  permanentAddress: Address;

  nomineeName: string;
  nomineeRelationship: string;
  nomineeDOB: string;
  nomineeAadhaar: string;

  fatherAadhaar: string;
  motherAadhaar: string;
};

// --- BASE STYLING CONSTANTS ---

const INPUT_CLASS = `
  block w-full rounded-lg 
  border border-slate-300
  bg-white
  px-3 py-2.5
  text-sm text-slate-900
  placeholder:text-slate-400
  transition duration-200 ease-in-out
  focus:outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
`;

const SHORT_INPUT_CLASS = `
  block w-full rounded-lg 
  border border-slate-300
  bg-white
  px-3 py-2
  text-sm text-slate-900
  placeholder:text-slate-400
  transition duration-200 ease-in-out
  focus:outline-none
  focus:border-blue-500
  focus:ring-2 focus:ring-blue-500/20
  disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed
`;

// --- REUSABLE FIELDS ---

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
  const isTextArea = name.includes("Description") && type === "text";

  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
        {label}
      </label>
      {isTextArea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder || label}
          disabled={disabled}
          rows={3}
          className={`${INPUT_CLASS} resize-none`}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange as (e: React.ChangeEvent<HTMLInputElement>) => void}
          placeholder={placeholder || label}
          disabled={disabled}
          className={INPUT_CLASS}
        />
      )}
    </div>
  );
};

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
  return (
    <div>
      <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
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
    <label className="block text-xs sm:text-sm font-medium text-slate-700 mb-1">
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
    <label htmlFor={name} className="block text-xs sm:text-sm font-medium text-slate-700">
      {label}
    </label>
  </div>
);

const AddressFields = ({
  prefix,
  addressData,
  onChange,
  disabled = false,
}: {
  prefix: "present" | "permanent";
  addressData: Address;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) => {
  const getFullName = (field: keyof Address) => `${prefix}Address.${field}`;
  const getLabel = (field: keyof Address) => {
    switch (field) {
      case "streetName":
        return "Street / House No.";
      case "landmark":
        return "Landmark";
      case "pincode":
        return "Pincode";
      case "city":
        return "City";
      case "district":
        return "District";
      case "state":
        return "State";
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {Object.keys(addressData).map((key) => {
        const field = key as keyof Address;
        return (
          <ShortEditField
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

// --- COLLAPSIBLE SECTION COMPONENT (Mobile optimization) ---

type SectionKey = "personal" | "family" | "identity" | "address" | "nominee";

const CollapsibleSection = ({
  step,
  title,
  subtitle,
  isOpen,
  onToggle,
  children,
}: {
  step: number;
  title: string;
  subtitle?: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="border border-slate-200 rounded-xl bg-white/80 overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-3 sm:px-4 py-3 sm:py-4"
      >
        <div className="flex items-center gap-3 text-left">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-50 border border-blue-200 text-[11px] font-semibold text-blue-700 shrink-0">
            {step}
          </div>
          <div>
            <p className="text-sm sm:text-base font-semibold text-slate-800">
              {title}
            </p>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.18 }}
          className="shrink-0 ml-2"
        >
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-3 sm:px-4 pb-4 sm:pb-5 pt-1 sm:pt-0 space-y-4 border-t border-slate-100 bg-slate-50/50">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};


// --- TAB BUTTON ---

const TabButton = ({
  label,
  icon,
  isActive,
  onClick,
}: {
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-1 inline-flex items-center justify-center gap-2 
        min-w-[45%] 
        px-2 py-2 sm:px-4 sm:py-2.5 
        rounded-lg 
        text-xs sm:text-sm font-semibold
        transition-colors
        z-10
        ${isActive ? "text-blue-700" : "text-slate-600 hover:text-slate-800"}
      `}
    >
      {isActive && (
        <motion.div
          layoutId="active-pill-pf"
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

const SubmitButton = ({ label }: { label: string }) => (
  <button
    type="submit"
    className="
      inline-flex items-center justify-between gap-2 
      bg-blue-600 text-white rounded-md
      px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg  
      text-sm font-semibold 
      hover:bg-blue-700 
      shadow-lg hover:shadow-xl
      transition-all
      focus:outline-none focus:ring-4 focus:ring-blue-500/40
    "
  >
    <Send size={18} />
    {label}
  </button>
);

// --- MAIN COMPONENT ---

const PFDetails = () => {
  const [activeTab, setActiveTab] = useState<"existing" | "new">("existing");

  const initialAddress: Address = {
    streetName: "",
    landmark: "",
    pincode: "",
    city: "",
    district: "",
    state: "",
  };

  const [existingData, setExistingData] = useState<ExistingPFData>({
    uanNumber: "123456789",
    empId: "78565",
    fullName: "Ravi Teja",
    workMail: "ravi.teja@company.com",
  });

  const [newData, setNewData] = useState<NewPFData>({
    employeeName: "",
    dateOfBirth: "",
    gender: "",
    maritalStatus: "",
    mobileNumber: "",
    personalEmail: "",
    fatherName: "",
    motherName: "",
    spouseName: "",
    childrenName: "",
    aadhaarNumber: "",
    panNumber: "",
    bankAccount: "",
    dateOfJoining: "",
    presentAddress: { ...initialAddress },
    isSameAddress: false,
    permanentAddress: { ...initialAddress },
    nomineeName: "",
    nomineeRelationship: "",
    nomineeDOB: "",
    nomineeAadhaar: "",
    fatherAadhaar: "",
    motherAadhaar: "",
  });

  // State to manage which accordion sections are open in the 'New' tab
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    personal: true, // Start with the first section open
    family: false,
    identity: false,
    address: false,
    nominee: false,
  });

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({
      // Optionally, close other sections when one is opened (accordion behavior)
      ...Object.fromEntries(Object.keys(prev).map(k => [k, false])) as Record<SectionKey, boolean>,
      [key]: !prev[key],
    }));
  };


  // --- Handlers: Existing ---

  const handleExistingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setExistingData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExistingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting existing employee data:", existingData);
    // API call placeholder
  };

  // --- Handlers: New ---

  const handleNewChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;

    // Handle Nested Address Fields
    if (name.includes("Address")) {
      const [prefix, addressField] = name.split(".") as [
        "presentAddress" | "permanentAddress",
        keyof Address
      ];

      setNewData((prev) => {
        const updatedAddress = {
          ...prev[prefix],
          [addressField]: value,
        };

        const updatedState: NewPFData = {
          ...prev,
          [prefix]: updatedAddress,
        };

        // If changing present address AND checkbox is checked, update permanent too
        if (prefix === "presentAddress" && prev.isSameAddress) {
          updatedState.permanentAddress = { ...updatedAddress };
        }

        return updatedState;
      });

      return;
    }

    // Handle Checkbox for Same Address
    if (type === "checkbox" && name === "isSameAddress") {
      const { checked } = e.target as HTMLInputElement;
      setNewData((prev) => ({
        ...prev,
        isSameAddress: checked,
        permanentAddress: checked
          ? { ...prev.presentAddress } // Copy present address if checked
          : { ...initialAddress }, // Reset permanent address if unchecked
      }));
      return;
    }

    // Handle other top-level fields
    setNewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting new employee data:", newData);
    // API call placeholder
  };

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
      className="
        bg-white 
        p-3 sm:p-6 md:p-8 
        rounded-lg sm:rounded-2xl 
        border border-slate-200 
        shadow-xl max-w-4xl mx-auto 
        w-full
        overflow-x-hidden
      "
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2">
        <h2 className="text-lg sm:text-2xl font-bold text-blue-700">
          PF Onboarding &amp; Details Submission
        </h2>
        <p className="text-[11px] sm:text-xs text-slate-500">
          Mobile-optimized multi-step form
        </p>
      </div>

      {/* TAB SWITCHER */}
      <div className="mb-5 sm:mb-8">
        <p className="text-xs sm:text-sm text-slate-500 mb-3 sm:mb-4">
          Choose the appropriate option to proceed with your PF setup.
        </p>
        <div
          className="
            flex w-full max-w-full sm:max-w-lg mx-auto 
            bg-slate-100 rounded-xl p-1 gap-1 
            shadow-inner overflow-x-auto
          "
        >
          <TabButton
            label="Existing PF"
            icon={<User size={16} />}
            isActive={activeTab === "existing"}
            onClick={() => setActiveTab("existing")}
          />
          <TabButton
            label="New PF"
            icon={<UserPlus size={16} />}
            isActive={activeTab === "new"}
            onClick={() => setActiveTab("new")}
          />
        </div>
      </div>

      {/* FORM CONTENT */}
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
              className="space-y-6 sm:space-y-8"
            >
              <div className="p-3 sm:p-5 rounded-lg sm:rounded-xl border bg-slate-50/70 border-slate-200">
                <p className="text-xs sm:text-sm text-slate-600 mb-4 sm:mb-5">
                  If you already have a Universal Account Number (UAN) from a
                  previous employer, link it here so we can map your PF history.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
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
                    disabled={true}
                  />
                  <EditField
                    label="Full Name (as per UAN)"
                    name="fullName"
                    value={existingData.fullName}
                    onChange={handleExistingChange}
                    placeholder="Your name"
                    disabled={true}
                  />
                  <EditField
                    label="Work Email"
                    name="workMail"
                    value={existingData.workMail}
                    onChange={handleExistingChange}
                    placeholder="Your work email"
                    disabled={true}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 text-white pt-4 sm:pt-6 border-t rounded-md border-slate-200">
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
              className="space-y-4 sm:space-y-6"
            >

              {/* 1. Personal Details */}
              <CollapsibleSection
                step={1}
                title="Personal Details"
                subtitle="Basic identity & contact details as per Aadhaar."
                isOpen={openSections.personal}
                onToggle={() => toggleSection("personal")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
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
              </CollapsibleSection>

              {/* 2. Family & Parent Details */}
              <CollapsibleSection
                step={2}
                title="Family & Parent Details"
                subtitle="Parent and (if applicable) spouse/children information."
                isOpen={openSections.family}
                onToggle={() => toggleSection("family")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
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

                  <AnimatePresence initial={false}>
                    {isMarried && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="contents"
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
              </CollapsibleSection>

              {/* 3. Identity & Employment Details */}
              <CollapsibleSection
                step={3}
                title="Identity & Employment Details"
                subtitle="Government IDs and joining information."
                isOpen={openSections.identity}
                onToggle={() => toggleSection("identity")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
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
              </CollapsibleSection>

              {/* 4. Address Details */}
              <CollapsibleSection
                step={4}
                title="Address Details"
                subtitle="Present and permanent address used for PF records."
                isOpen={openSections.address}
                onToggle={() => toggleSection("address")}
              >
                <div className="space-y-4">
                  <div className="border border-slate-200 p-3 sm:p-4 rounded-lg bg-white/80">
                    <h4 className="text-sm font-medium text-slate-700 mb-3">
                      Present Address
                    </h4>
                    <AddressFields
                      prefix="present"
                      addressData={newData.presentAddress}
                      onChange={handleNewChange}
                    />
                  </div>

                  <div className="border border-slate-200 p-3 sm:p-4 rounded-lg bg-white/80">
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h4 className="text-sm font-medium text-slate-700">
                        Permanent Address
                      </h4>
                      <CheckboxField
                        label="Same as Present Address"
                        name="isSameAddress"
                        checked={newData.isSameAddress}
                        onChange={handleNewChange}
                      />
                    </div>
                    <AddressFields
                      prefix="permanent"
                      addressData={newData.permanentAddress}
                      onChange={handleNewChange}
                      disabled={newData.isSameAddress}
                    />
                  </div>
                </div>
              </CollapsibleSection>

              {/* 5. Nominee Details */}
              <CollapsibleSection
                step={5}
                title="Nominee Details (Mandatory)"
                subtitle="Person who will receive PF benefits in case of emergency."
                isOpen={openSections.nominee}
                onToggle={() => toggleSection("nominee")}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-5">
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
              </CollapsibleSection>

              {/* SUBMIT */}
              <div className="flex text-white justify-center gap-2 pt-4 sm:pt-6 border-t border-slate-200">
                <SubmitButton label="Submit " />
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PFDetails;