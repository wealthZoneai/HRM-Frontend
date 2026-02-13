import {
  FiX,
  FiPhone,
  FiMail,
  FiMapPin,
  FiToggleLeft,
  FiToggleRight,
  FiFolder,
  FiBriefcase,
  FiClock,
  FiCalendar,
  FiUsers,
  FiAward,
  FiEdit2,
  FiSmartphone,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import { Save, DollarSign, Loader2, XCircle } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  GetEmployeeById,
  UpdateEmployeeContact,
  UpdateEmployeeJobAndBank,
} from "../../../Services/apiHelpers";

// --- 1. YUP VALIDATION SCHEMA ---
const validationSchema = Yup.object({
  // Contact Info
  work_email: Yup.string()
    .email("Invalid email format")
    .required("Work Email is required"),
  personal_email: Yup.string()
    .email("Invalid email format")
    .required("Personal Email is required"),
  phone_number: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(10, "Must be exactly 10 digits")
    .required("Phone Number is required"),

  alternate_number: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .length(10, "Must be exactly 10 digits")
    .nullable(),

  location: Yup.string().required("Location is required"),

  // Bank Info - OPTIONAL
  account_holder_name: Yup.string().nullable(),
  bank_name: Yup.string().nullable(),
  branch: Yup.string().nullable(),
  account_number: Yup.string().nullable(),
  ifsc_code: Yup.string().nullable(),

  // Job Info
  job_description: Yup.string().nullable(),
  reports_to: Yup.string().nullable(),
});

// --- 2. HELPER COMPONENT ---
const EditableField = ({
  label,
  name,
  icon: Icon,
  placeholder,
  fullWidth = false,
  isEditing,
  formik,
  inputType = "text",
  options = null,
  prefix = null,
  maxLength,
}: any) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    if (inputType === "numeric") {
      value = value.replace(/[^0-9]/g, "");
    } else if (inputType === "alpha") {
      value = value.replace(/[^a-zA-Z\s]/g, "");
    }
    formik.setFieldValue(name, value);
  };

  return (
    <div
      className={`p-3 bg-white shadow-sm rounded-xl ${
        fullWidth ? "col-span-1 sm:col-span-2" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        {Icon && <Icon className="text-blue-500 shrink-0 mt-1" />}
        <div className="w-full">
          <p className="text-xs text-gray-500 mb-0.5">{label}</p>
          {isEditing ? (
            <div>
              {options ? (
                <select
                  name={name}
                  value={formik.values[name] || ""}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full border-b outline-none py-1 text-gray-800 bg-blue-50/50 px-2 rounded-lg transition-colors cursor-pointer
                                    ${
                                      formik.touched[name] &&
                                      formik.errors[name]
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-blue-300 focus:border-blue-600"
                                    }`}
                >
                  {options.map((opt: any) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="relative">
                  {prefix && (
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 font-medium z-10 pointer-events-none">
                      {prefix}
                    </span>
                  )}
                  <input
                    type="text"
                    name={name}
                    value={formik.values[name] || ""}
                    onChange={handleInputChange}
                    onBlur={formik.handleBlur}
                    placeholder={placeholder}
                    maxLength={maxLength}
                    className={`w-full border-b outline-none py-1 text-gray-800 bg-blue-50/50 rounded-lg transition-colors
                                    ${prefix ? "pl-10 pr-2" : "px-2"}
                                    ${
                                      formik.touched[name] &&
                                      formik.errors[name]
                                        ? "border-red-500 focus:border-red-500"
                                        : "border-blue-300 focus:border-blue-600"
                                    }`}
                  />
                </div>
              )}
              {formik.touched[name] && formik.errors[name] && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {formik.errors[name]}
                </p>
              )}
            </div>
          ) : (
            <p className="text-gray-700 font-medium truncate">
              {prefix && formik.values[name] ? `${prefix} ` : ""}
              {formik.values[name] || "—"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const InfoCard = ({ icon: Icon, title, value, className = "" }: any) => (
  <div
    className={`p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition duration-300 ${className}`}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-blue-600" />
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-lg font-semibold text-gray-800">{value || "—"}</p>
      </div>
    </div>
  </div>
);

export default function EmployeeDetailsModal({
  open,
  onClose,
  employee,
  onUpdate,
}: any) {
  const [fullData, setFullData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [status, setStatus] = useState("Active");

  const formik = useFormik({
    initialValues: {
      work_email: "",
      personal_email: "",
      phone_number: "",
      alternate_number: "",
      location: "",
      account_holder_name: "",
      bank_name: "",
      branch: "",
      account_number: "",
      ifsc_code: "",
      job_description: "",
      reports_to: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        setApiError(null);

        const contactPayload = {
          phone_number: values.phone_number,
          work_email: values.work_email,
          personal_email: values.personal_email,
          alternate_number: values.alternate_number,
        };

        const jobBankPayload = {
          location: values.location,
          account_holder_name: values.account_holder_name,
          bank_name: values.bank_name,
          account_number: values.account_number,
          ifsc_code: values.ifsc_code,
          branch: values.branch,
          job_description: values.job_description,
        };

        await Promise.all([
          UpdateEmployeeContact(employee.id, contactPayload),
          UpdateEmployeeJobAndBank(employee.id, jobBankPayload),
        ]);

        setFullData((prev: any) => ({ ...prev, ...values }));
        if (onUpdate) onUpdate();
        setIsEditing(false);
      } catch (error) {
        console.error("Failed to save", error);
        setApiError("Failed to save changes. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    if (open && employee?.id) {
      fetchEmployeeDetails(employee.id);
      setIsEditing(false);
    } else {
      setFullData(null);
      formik.resetForm();
      setApiError(null);
    }
  }, [open, employee?.id]);

  const fetchEmployeeDetails = async (id: string) => {
    try {
      setLoading(true);
      setApiError(null);
      const response = await GetEmployeeById(id);
      const data = response.data;
      setFullData(data);
      setStatus(data.status || "Active");

      formik.setValues({
        work_email: data.work_email || "",
        personal_email: data.personal_email || "",
        phone_number: data.phone_number || "",
        alternate_number: data.alternate_number || "",
        location: data.location || "",
        account_holder_name: data.account_holder_name || "",
        bank_name: data.bank_name || "",
        branch: data.branch || "",
        account_number: data.account_number || "",
        ifsc_code: data.ifsc_code || "",
        job_description: data.job_description || "",
        reports_to: data.team_lead?.display || "",
      });
    } catch (err: any) {
      console.error("Error fetching employee details:", err);
      setApiError("Failed to load employee details.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = () => {
    formik.resetForm();
    if (fullData) {
      formik.setValues({
        work_email: fullData.work_email || "",
        personal_email: fullData.personal_email || "",
        phone_number: fullData.phone_number || "",
        alternate_number: fullData.alternate_number || "",
        location: fullData.location || "",
        account_holder_name: fullData.account_holder_name || "",
        bank_name: fullData.bank_name || "",
        branch: fullData.branch || "",
        account_number: fullData.account_number || "",
        ifsc_code: fullData.ifsc_code || "",
        job_description: fullData.job_description || "",
        reports_to: fullData.team_lead?.display || "",
      });
    }
    setIsEditing(false);
    setApiError(null);
  };

  if (!open || !employee) return null;

  const toggleStatus = () => {
    const newStatus = status === "Active" ? "Inactive" : "Active";
    setStatus(newStatus);
  };

  // --- HELPER TO FORMAT TEXT (Capitalize & remove underscores) ---
  const formatDisplayValue = (val: string | null | undefined) => {
    if (!val) return "—";
    // 1. Replace underscore with space
    // 2. Capitalize first letter of every word
    return val
      .toString()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const statusColor =
    status === "Active" ? "bg-green-500 text-white" : "bg-red-500 text-white";
  const fallbackAvatar = `https://ui-avatars.com/api/?background=random&name=${employee.name.replace(
    " ",
    "+"
  )}`;

  const locationOptions = [
    { value: "", label: "Select Location" },
    { value: "Head Office", label: "Head Office" },
    { value: "Branch Office", label: "Branch Office" },
    { value: "Remote", label: "Remote" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl w-full max-w-6xl h-[95vh] flex flex-col transform transition-all duration-300 scale-100">
        {/* HEADER */}
        <div className="p-6 flex items-center justify-between bg-white shadow-sm sticky top-0 z-10 border-b">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-gray-800">
              {isEditing
                ? "Editing Profile"
                : `Employee Profile: ${employee.name}`}
            </h2>
          </div>
          <button
            className="text-gray-500 hover:text-red-500 transition"
            onClick={onClose}
          >
            <FiX size={28} />
          </button>
        </div>

        {loading && !fullData ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 gap-4">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
            <p className="text-gray-500 font-medium">Processing...</p>
          </div>
        ) : apiError ? (
          <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
            <p className="text-red-600 font-semibold">{apiError}</p>
            <button
              onClick={() => fetchEmployeeDetails(employee.id)}
              className="mt-4 text-blue-600 underline"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto no-scrollbar grid grid-cols-1 lg:grid-cols-3">
            {/* LEFT COLUMN: PROFILE SUMMARY */}
            <div className="lg:col-span-1 bg-gray-100 p-6 space-y-8 shadow-inner-r">
              <div className="text-center">
                <img
                  src={
                    fullData?.protected_profile_photo_url ||
                    fullData?.profile_photo ||
                    employee.profile_photo ||
                    fallbackAvatar
                  }
                  className="w-36 h-36 mx-auto rounded-full object-cover ring-4 ring-blue-500 shadow-xl"
                  alt={employee.name}
                />

                <div className="mt-4 space-y-2">
                  <h3 className="text-3xl font-extrabold text-gray-900">
                    {fullData?.name || employee.name}
                  </h3>
                  <p className="text-blue-600 text-xl font-medium">
                    {fullData?.job_title || employee.role}
                  </p>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Employee ID:{" "}
                  <span className="font-bold text-gray-800">
                    {fullData?.emp_id || employee.employeeId}
                  </span>
                </p>

                <div className="mt-4 inline-block">
                  <span
                    className={`px-4 py-1.5 rounded-full text-sm font-bold tracking-wider ${statusColor} shadow-md`}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* CORE INFO (READ-ONLY) */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <FiUsers className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Department</p>
                    <p className="font-medium text-gray-800">
                      {fullData?.department || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <FiCalendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Joining Date</p>
                    <p className="font-medium text-gray-800">
                      {fullData?.start_date || "—"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm">
                  <FiBriefcase className="w-5 h-5 text-gray-500" />
                  <div className="w-full">
                    <div className="flex flex-col">
                      <p className="text-xs text-gray-500 mb-0.5">Reports To</p>
                      {isEditing ? (
                        <input
                          type="text"
                          name="reports_to"
                          value={formik.values.reports_to || ""}
                          onChange={formik.handleChange}
                          className="w-full border-b border-blue-300 focus:border-blue-600 outline-none text-gray-800 bg-transparent py-0.5
                                         placeholder:text-gray-400 placeholder:opacity-60"
                          placeholder="Reports To"
                        />
                      ) : (
                        <p className="font-medium text-gray-800">
                          {fullData?.team_lead?.display || "—"}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={toggleStatus}
                  className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl transition duration-300 
                                            ${
                                              status === "Active"
                                                ? "bg-red-50 hover:bg-red-100 text-red-600"
                                                : "bg-green-50 hover:bg-green-100 text-green-600"
                                            }`}
                >
                  {status === "Active" ? (
                    <>
                      <FiToggleLeft size={20} /> Deactivate
                    </>
                  ) : (
                    <>
                      <FiToggleRight size={20} /> Activate
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* RIGHT COLUMN: DETAILED INFO */}
            <div className="lg:col-span-2 p-6 space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <InfoCard
                  icon={FiClock}
                  title="Work Type"
                  value={formatDisplayValue(fullData?.employment_type)}
                />
                <InfoCard
                  icon={FiAward}
                  title="Gender"
                  value={formatDisplayValue(fullData?.gender)}
                />
                <InfoCard
                  icon={FiFolder}
                  title="Marital Status"
                  value={formatDisplayValue(fullData?.marital_status)}
                />
                <InfoCard
                  icon={DollarSign}
                  title="Blood Group"
                  // Special Case: Blood group usually looks best in all caps (e.g. B+)
                  value={
                    fullData?.blood_group
                      ? fullData.blood_group.toUpperCase()
                      : "—"
                  }
                />
              </div>

              {/* --- CONTACT SECTION --- */}
              <div>
                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                  <FiPhone className="text-blue-600" /> Contact & Location
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Work Email - Full Width (Read Only) */}
                  <EditableField
                    icon={FiMail}
                    label="Work Email"
                    name="work_email"
                    fullWidth={true}
                    formik={formik}
                    isEditing={false}
                  />

                  {/* Personal Email - Full Width (Read Only) */}
                  <EditableField
                    icon={FiMail}
                    label="Personal Email"
                    name="personal_email"
                    fullWidth={true}
                    formik={formik}
                    isEditing={false} // READ-ONLY
                  />

                  {/* Phone - EDITABLE */}
                  <EditableField
                    icon={FiPhone}
                    label="Phone Number"
                    name="phone_number"
                    inputType="numeric"
                    formik={formik}
                    isEditing={false}
                    prefix="+91"
                    maxLength={10}
                  />

                  {/* Alternate Number - READ ONLY */}
                  <EditableField
                    icon={FiSmartphone}
                    label="Alternative Number"
                    name="alternate_number"
                    inputType="numeric"
                    formik={formik}
                    isEditing={false} // CHANGED: READ ONLY
                    prefix="+91"
                    maxLength={10}
                    placeholder="Optional"
                  />

                  {/* Location - Full Width - READ ONLY */}
                  <EditableField
                    icon={FiMapPin}
                    label="Current Location"
                    name="location"
                    fullWidth={true}
                    formik={formik}
                    isEditing={false} // CHANGED: READ ONLY
                    options={locationOptions}
                  />
                </div>
              </div>

              {/* --- BANKING SECTION --- */}
              <div>
                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                  <DollarSign className="text-blue-600" /> Banking Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Account Holder Name - Full Width */}
                  <EditableField
                    label="Account Holder Name"
                    name="account_holder_name"
                    inputType="alpha"
                    fullWidth={true}
                    formik={formik}
                    isEditing={isEditing}
                  />

                  <EditableField
                    label="Bank Name"
                    name="bank_name"
                    inputType="alpha"
                    formik={formik}
                    isEditing={isEditing}
                  />
                  <EditableField
                    label="Branch Name"
                    name="branch"
                    inputType="alpha"
                    formik={formik}
                    isEditing={isEditing}
                  />
                  <EditableField
                    label="Account Number"
                    name="account_number"
                    inputType="numeric"
                    formik={formik}
                    isEditing={isEditing}
                  />
                  <EditableField
                    label="IFSC Code"
                    name="ifsc_code"
                    formik={formik}
                    isEditing={isEditing}
                  />
                </div>
              </div>

              {/* JOB DESCRIPTION */}
              <div>
                <h3 className="text-xl font-semibold mb-4 pb-2 text-gray-700 flex items-center gap-2 border-b-2 border-blue-500/20">
                  <FiBriefcase className="text-blue-600" /> Job Description
                </h3>
                <div className="p-5 bg-white shadow-inner border border-gray-100 rounded-2xl">
                  {isEditing ? (
                    <textarea
                      name="job_description"
                      value={formik.values.job_description || ""}
                      onChange={formik.handleChange}
                      rows={5}
                      className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm text-gray-700"
                    />
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                      {formik.values.job_description ||
                        "No job description added."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER BUTTONS */}
        <div className="p-4 flex justify-end gap-3 bg-gray-50 shadow-inner-t sticky bottom-0 border-t">
          {!isEditing ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
              >
                Close
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-blue-700 transition shadow-md"
              >
                <FiEdit2 size={18} /> Edit Profile
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleCancelEdit}
                type="button"
                className="px-6 py-2 border border-red-300 text-red-600 rounded-xl hover:bg-red-50 transition font-medium flex items-center gap-2"
              >
                <XCircle size={18} /> Cancel
              </button>
              <button
                onClick={() => formik.handleSubmit()}
                disabled={loading}
                type="button"
                className="px-6 py-2 bg-green-600 text-white rounded-xl flex items-center gap-2 font-medium hover:bg-green-700 transition shadow-md disabled:opacity-70"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : (
                  <Save size={18} />
                )}
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}