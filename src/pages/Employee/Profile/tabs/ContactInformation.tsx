import { useState, } from "react";
import { Pencil, X, Check, } from "lucide-react";

// Existing component for display mode
const UnderlineField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-gray-900">{value}</p>
    <div className="w-full h-px bg-gray-300" />
  </div>
);

// Modified EditLineField to accept an optional prefix (e.g., for currency or dates)
const EditLineField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  prefix, // New prop for prefix
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: string; // Optional prefix
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <div className="flex items-center border-b border-gray-300 focus-within:border-blue-500 transition-colors">
      {prefix && (
        <span className="text-gray-500 pr-2 py-1 text-base">
          {prefix}
        </span>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full py-1 text-gray-900 focus:outline-none bg-transparent"
      />
    </div>
  </div>
);

// New component for Phone Number with India Country Code logic
const PhoneNumberField = ({
  label,
  name,
  value,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <EditLineField
    label={label}
    name={name}
    value={value}
    onChange={onChange}
    type="tel" // Use tel type for mobile input keyboards
    prefix="+91" // India Country Code
  />
);


// Existing CustomSelect component (no changes needed)
// const CustomSelect = ({
//   label,
//   name,
//   value,
//   options,
//   onChange,
// }: {
//   label: string;
//   name: string;
//   value: string;
//   options: string[];
//   onChange: (name: string, value: string) => void;
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="space-y-1 relative" ref={dropdownRef}>
//       <label className="text-sm font-medium text-gray-700">{label}</label>
//       <div
//         className="w-full border-b border-gray-300 py-1 text-gray-900 cursor-pointer flex justify-between items-center"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className={!value ? "text-gray-500" : ""}>
//           {value || `Select ${label}`}
//         </span>
//         <ChevronDown
//           size={16}
//           className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
//             }`}
//         />
//         
//       </div>

//       {isOpen && (
//         <div className="absolute z-50 w-full bg-white shadow-xl rounded-lg mt-1 py-1 border border-gray-100 max-h-60 overflow-auto animate-in fade-in zoom-in-95 duration-100">
//           {options.map((option) => (
//             <div
//               key={option}
//               className={`px-4 py-2.5 text-sm cursor-pointer transition-colors ${value === option
//                 ? "bg-blue-50 text-blue-600 font-medium"
//                 : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                 }`}
//               onClick={() => {
//                 onChange(name, option);
//                 setIsOpen(false);
//               }}
//             >
//               {option}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };


const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    employeeId: "WZ-101",
    firstName: "Ravi",
    middleName: "lorem ipsum",
    lastName: "Teja",
    workMail: "Ravitejawealthzonegroupai@gmail.com",
    personalMail: "raviteja@gmail.com",
    phone: "1234567890",
    alternativeNumber: "0987654321",
    dob: "2002-11-10",
    bloodGroup: "O +ve",
    gender: "Male",
    maritalStatus: "Single",
  });

  const [backup, setBackup] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // ONLY apply validation/limits to the editable phone fields
    if (name === "alternativeNumber") {
      // Allow only numbers and max length 10
      if (/^\d{0,10}$/.test(value)) {
        setData((prev) => ({ ...prev, [name]: value }));
      }
      return; 
    }
    
    setData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleSelectChange = (name: string, value: string) => {
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

  const handleEdit = () => {
    setBackup(data);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setData(backup);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Only validate the fields that are actually being edited/updated (Alternative Number)
    
    // Check for EXACT 10 digits for the OPTIONAL alternative number, IF it is provided
    if (data.alternativeNumber.trim() && data.alternativeNumber.length !== 10) {
        alert("Alternative number must be exactly 10 digits if provided.");
        return;
    }
    
    // Middle Name and Blood Group have no special validation (just text inputs)
    
    // If all validation passes
    setIsEditing(false);
    console.log("Data saved:", data); 
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

      {/* PERSONAL INFORMATION */}
      <div className=" rounded-lg sm:rounded-xl p-4 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Personal Information</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Edit <Pencil size={16} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {isEditing ? (
            <>
              {/* READ-ONLY FIELDS */}
              <UnderlineField label="First Name" value={data.firstName} />
              
              {/* EDITABLE FIELD: Middle Name */}
              <EditLineField
                label="Middle Name"
                name="middleName"
                value={data.middleName}
                onChange={handleChange}
              />
              
              {/* READ-ONLY FIELDS */}
              <UnderlineField label="Last Name" value={data.lastName} />
              <UnderlineField label="Work mail" value={data.workMail} />
              <UnderlineField label="Employee ID" value={data.employeeId} />
              <UnderlineField label="Personal mail ID" value={data.personalMail} />
              <UnderlineField label="Phone number" value={data.phone ? `+91 ${data.phone}` : "N/A"} />

              {/* EDITABLE FIELD: Alternative Number */}
              <PhoneNumberField
                label="Alternative Number (10 Digits)"
                name="alternativeNumber"
                value={data.alternativeNumber}
                onChange={handleChange}
              />

              {/* READ-ONLY FIELDS */}
              <UnderlineField label="Date of Birth" value={data.dob} />
              
              {/* EDITABLE FIELD: Blood Group */}
              <EditLineField
                label="Blood Group"
                name="bloodGroup"
                value={data.bloodGroup}
                onChange={handleChange}
              />

              {/* READ-ONLY FIELDS */}
              <UnderlineField label="Gender" value={data.gender} />
              <UnderlineField label="Marital Status" value={data.maritalStatus} />
            </>
          ) : (
            <>
              {/* VIEW MODE: All fields are UnderlineField */}
              <UnderlineField label="First Name" value={data.firstName} />
              <UnderlineField label="Middle Name" value={data.middleName || "N/A"} />
              <UnderlineField label="Last Name" value={data.lastName} />
              <UnderlineField label="Work mail" value={data.workMail} />
              <UnderlineField label="Employee ID" value={data.employeeId} />
              <UnderlineField label="Personal mail ID" value={data.personalMail} />
              
              <UnderlineField label="Phone number" value={data.phone ? `+91 ${data.phone}` : "N/A"} />
              <UnderlineField label="Alternative Number" value={data.alternativeNumber ? `+91 ${data.alternativeNumber}` : "N/A"} />
              
              <UnderlineField label="Date of Birth" value={data.dob} />
              <UnderlineField label="Blood Group" value={data.bloodGroup || "N/A"} />
              <UnderlineField label="Gender" value={data.gender} />
              <UnderlineField label="Marital Status" value={data.maritalStatus} />
            </>
          )}
        </div>
      </div>

      {/* GLOBAL SAVE/CANCEL */}
      {isEditing && (
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <X size={16} /> Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileDetails;