import { useAddEmployee } from "./AddEmployeeContext";

/* ==========================
   Reusable Components
========================== */
const TextField = ({
  label,
  value,
  onChange,
  type = "text",
  prefix,
  error,
  required,
  ...props
}: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className={`
          w-full py-2 bg-white border rounded-lg
          focus:outline-none focus:ring-2 
          transition-all shadow-sm
          ${prefix ? "pl-12 pr-4" : "px-4"}
          ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
        `}
        {...props}
      />
    </div>
    {error && (
      <span className="text-xs text-red-500">
        {typeof error === "string" ? error : "This field is required"}
      </span>
    )}
  </div>
);

const SelectField = ({
  label,
  value,
  onChange,
  children,
  error,
  required,
}: any) => (
  <div className="flex flex-col gap-1">
    <label className="text-gray-700 font-medium text-sm">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full px-4 py-2 bg-white border rounded-lg
        focus:outline-none focus:ring-2 
        transition-all shadow-sm
        ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"}
      `}
    >
      {children}
    </select>
    {error && <span className="text-xs text-red-500">Selection required</span>}
  </div>
);

/* ===================
   MAIN COMPONENT
=================== */
const StepPersonal = ({ showErrors }: { showErrors: boolean }) => {
  const { state, dispatch } = useAddEmployee();
  const personal = state.contact;

  // Calculate Max Date (Today - 18 Years)
  const getMaxDob = () => {
    const today = new Date();
    const maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth(),
      today.getDate(),
    );
    return maxDate.toISOString().split("T")[0];
  };

  const maxDate = getMaxDob();

  // Strictly block dates > maxDate (Handles manual typing of future dates)
  const handleDobChange = (v: string) => {
    if (v && v > maxDate) {
      return;
    }
    dispatch({ type: "SET_PERSONAL", payload: { dob: v } });
  };

  // --- VALIDATION LOGIC ---
  const getEmailError = () => {
    if (!showErrors) return false;
    if (!personal.personalEmail) return true;

    // Check for @gmail.com
    if (!personal.personalEmail.toLowerCase().includes("@gmail.com")) {
      return "Email must contain '@gmail.com'";
    }

    return false;
  };

  const bloodGroupOptions = [
    "A+",
    "A-",
    "B+",
    "B-",
    "O+",
    "O-",
    "AB+",
    "AB-",
  ];

  return (
    <div className="w-full">
      <div className="bg-white p-0 md:p-0 rounded-none border-none shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="First Name"
            value={personal.firstName}
            required
            error={showErrors && !personal.firstName}
            onChange={(v: string) => {
              if (/^[A-Za-z]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { firstName: v } });
              }
            }}
          />

          <TextField
            label="Middle Name"
            value={personal.middleName}
            onChange={(v: string) => {
              if (/^[A-Za-z]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { middleName: v } });
              }
            }}
          />

          <TextField
            label="Last Name"
            value={personal.lastName}
            required
            error={showErrors && !personal.lastName}
            onChange={(v: string) => {
              if (/^[A-Za-z]*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { lastName: v } });
              }
            }}
          />

          {/* Email Field */}
          <TextField
            label="Personal Email"
            value={personal.personalEmail}
            required
            error={getEmailError()}
            onChange={(v: string) =>
              dispatch({ type: "SET_PERSONAL", payload: { personalEmail: v } })
            }
          />

          <TextField
            label="Phone Number"
            value={personal.phone}
            required
            prefix="+91"
            maxLength={10}
            error={
              showErrors && (!personal.phone || personal.phone.length !== 10)
            }
            onChange={(v: string) => {
              if (/^\d*$/.test(v)) {
                dispatch({ type: "SET_PERSONAL", payload: { phone: v } });
              }
            }}
          />

          <TextField
            label="Alternative Number"
            value={personal.alternativeNumber}
            prefix="+91"
            maxLength={10}
            error={
              showErrors &&
              !!personal.alternativeNumber &&
              personal.alternativeNumber.length !== 10
            }
            onChange={(v: string) => {
              if (/^\d*$/.test(v)) {
                dispatch({
                  type: "SET_PERSONAL",
                  payload: { alternativeNumber: v },
                });
              }
            }}
          />

          {/* Date of Birth (Faded out) */}
          <div >
            <TextField
              label="Date of Birth"
              type="date"
              required
              value={personal.dob}
              error={showErrors && !personal.dob}
              onChange={handleDobChange}
              max={maxDate}
            />
          </div>

          {/* UPDATED: Blood Group is now OPTIONAL (removed required and error props) */}
          <SelectField
            label="Blood Group"
            value={personal.bloodGroup}
            onChange={(v: string) =>
              dispatch({
                type: "SET_PERSONAL",
                payload: { bloodGroup: v },
              })
            }
          >
            <option value="">Select</option>
            {bloodGroupOptions.map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </SelectField>

          <SelectField
            label="Gender"
            required
            value={personal.gender}
            error={showErrors && !personal.gender}
            onChange={(v: string) =>
              dispatch({ type: "SET_PERSONAL", payload: { gender: v } })
            }
          >
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </SelectField>

          <SelectField
            label="Marital Status"
            value={personal.maritalStatus}
            required
            error={showErrors && !personal.maritalStatus}
            onChange={(v: string) =>
              dispatch({ type: "SET_PERSONAL", payload: { maritalStatus: v } })
            }
          >
            <option value="">Select</option>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </SelectField>
        </div>
      </div>
    </div>
  );
};

export default StepPersonal;