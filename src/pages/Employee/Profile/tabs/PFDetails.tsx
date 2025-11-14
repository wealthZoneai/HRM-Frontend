import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";
import { motion } from "framer-motion";

// --- TYPE DEFINITION ---

type PFDetailsType = {
  uanNumber: string;
  empId: string;
  fullName: string;
  workMail: string;
  aadhaarNumber: string;
  panNumber: string;
  dateOfBirth: string;
  dateOfJoining: string;
  fatherAadhaar: string;
  motherAadhaar: string;
  presentAddress: string;
  ownAddress: string;
  bankAccount: string;
};

// --- EDIT FIELD SUB-COMPONENT (Updated) ---

const EditField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => (
  <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="
        block w-full rounded-lg border-transparent 
        bg-slate-100                 // Subtle background
        transition duration-200       // Smooth
        sm:text-sm
        
        focus:bg-white                // Pop to white on focus
        focus:border-blue-600         // Add blue border on focus
        focus:ring-blue-600           // Add blue ring on focus
        
           Helps style the date picker icon
        dark:scheme-dark
      "
    />
  </div>
);

// --- DISPLAY FIELD SUB-COMPONENT ---

const Display = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
    <p className="font-medium text-slate-800 mt-1">{value}</p>
  </div>
);

// --- MAIN PF DETAILS COMPONENT ---

const PFDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [details, setDetails] = useState<PFDetailsType>({
    uanNumber: "123456789",
    empId: "78565",
    fullName: "Ravi Teja",
    workMail: "ravi@company.com",
    aadhaarNumber: "567812349012",
    panNumber: "ABCDE1234F",
    dateOfBirth: "1998-08-14",
    dateOfJoining: "2022-11-10",
    fatherAadhaar: "234512349012",
    motherAadhaar: "876512349012",
    presentAddress: "Madhapur, Hyderabad",
    ownAddress: "Warangal, Telangana",
    bankAccount: "123456789012",
  });

  const [original, setOriginal] = useState(details);

  const handleEdit = () => {
    setOriginal(details);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDetails(original);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the 'details' object to your API
    console.log("Saving changes:", details);
    setIsEditing(false);
    setOriginal(details);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200"
    >
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-slate-800">PF Details</h2>

        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
            <Pencil size={16} />
            Edit Details
          </button>
        )}
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="space-y-8">

          {/* EDIT MODE */}
          {isEditing ? (
            <div className="p-6 rounded-xl border bg-slate-50/50 border-slate-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <EditField label="UAN Number" name="uanNumber" value={details.uanNumber} onChange={handleChange} />
                <EditField label="EMP ID" name="empId" value={details.empId} onChange={handleChange} />

                <EditField label="Full Name" name="fullName" value={details.fullName} onChange={handleChange} />
                <EditField label="Work Mail" name="workMail" value={details.workMail} onChange={handleChange} />

                <EditField label="Aadhaar Number" name="aadhaarNumber" value={details.aadhaarNumber} onChange={handleChange} />
                <EditField label="PAN Number" name="panNumber" value={details.panNumber} onChange={handleChange} />

                <EditField label="Date of Birth" name="dateOfBirth" type="date" value={details.dateOfBirth} onChange={handleChange} />
                <EditField label="Date of Joining" name="dateOfJoining" type="date" value={details.dateOfJoining} onChange={handleChange} />

                <EditField label="Father Aadhaar Number" name="fatherAadhaar" value={details.fatherAadhaar} onChange={handleChange} />
                <EditField label="Mother Aadhaar Number" name="motherAadhaar" value={details.motherAadhaar} onChange={handleChange} />

                <EditField label="Present Address" name="presentAddress" value={details.presentAddress} onChange={handleChange} />
                <EditField label="Own Address" name="ownAddress" value={details.ownAddress} onChange={handleChange} />

                <EditField label="Bank A/C Number" name="bankAccount" value={details.bankAccount} onChange={handleChange} />
              </div>
            </div>
          ) : (
            /* DISPLAY MODE */
            <div className="p-6 rounded-xl border border-slate-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-10 text-sm">

                <Display label="UAN Number" value={details.uanNumber} />
                <Display label="EMP ID" value={details.empId} />

                <Display label="Full Name" value={details.fullName} />
                <Display label="Work Mail" value={details.workMail} />

                <Display label="Aadhaar Number" value={`••••••${details.aadhaarNumber.slice(-4)}`} />
                <Display label="PAN Number" value={details.panNumber} />

                <Display label="Date of Birth" value={details.dateOfBirth} />
                <Display label="Date of Joining" value={details.dateOfJoining} />

                <Display label="Father Aadhaar" value={`••••••${details.fatherAadhaar.slice(-4)}`} />
                <Display label="Mother Aadhaar" value={`••••••${details.motherAadhaar.slice(-4)}`} />

                <Display label="Present Address" value={details.presentAddress} />
                <Display label="Own Address" value={details.ownAddress} />

                <Display label="Bank A/C Number" value={`•••• ${details.bankAccount.slice(-4)}`} />

              </div>
            </div>
          )}
        </div>

        {/* ACTION BUTTONS */}
        {isEditing && (
          <div className="flex justify-end gap-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-100"
            >
              <X size={16} />
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow"
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

export default PFDetails;