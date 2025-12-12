// WizardInner.tsx
import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";
import StepPersonal from "./StepPersonal";
import StepKin from "./StepKin";
import StepBank from "./StepBank";
import StepDocs from "./StepDocs";
import { CheckCircle, ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";
import { CreateEmployes } from "../../../../Services/apiHelpers";
import { useNavigate } from "react-router-dom";

const WizardInner: React.FC<{ editData?: any }> = ({ editData }) => {
  const { state, dispatch } = useAddEmployee();
  const navigate = useNavigate();
  console.log(state)

  console.log(editData);
  /* ===========================================================
      LOAD EDIT MODE DATA
  ============================================================ */
  React.useEffect(() => {
    if (editData) {
      dispatch({
        type: "SET_EDIT",
        payload: {
          editId: editData.id,
          data: {
            contact: { ...editData.personal },
            kin: { ...editData.kin },
            bankAccounts: editData.bankAccounts || [{}],
            documents: {},
          },
        },
      });
    }
  }, [editData, dispatch]);

  /* ===========================================================
      STEP COMPONENT LIST
  ============================================================ */
  const steps = [
    { key: "personal", label: "Personal Info", comp: <StepPersonal /> },
    { key: "kin", label: "Job Information", comp: <StepKin /> },
    { key: "bank", label: "Bank Details", comp: <StepBank /> },
    { key: "docs", label: "Documents", comp: <StepDocs /> },
  ];

  /* ===========================================================
      STEP VALIDATION LOGIC
  ============================================================ */
  const validateStep = () => {
    const p = state.contact;
    const k = state.kin;
    const b = state.bankAccounts[0] || {};
    // const d = state.documents;

    switch (state.step) {
      case 0: // PERSONAL
        return (
          p.firstName?.trim() &&
          p.lastName?.trim() &&
          p.phone?.trim()
        );

      case 1: // JOB INFO (KIN)
        return (
          k.email?.trim() &&
          k.employeeId?.trim() &&
          k.startDate?.trim() &&
          k.jobTitle?.trim() &&
          k.department?.trim() &&
          k.employmentType?.trim() &&
          k.location?.trim()
        );

      case 2: // BANK
        return (
          b.bankName?.trim() &&
          b.accountNumber?.trim() &&
          b.confirmAccountNumber?.trim() &&
          b.accountName?.trim() &&
          b.ifscCode?.trim()

        );

      case 3: // DOCUMENTS
        return true; // optional
      default:
        return false;
    }
  };




  /* ===========================================================
      STEP INDICATOR BUTTON
  ============================================================ */
  const StepIndicator: React.FC<{ index: number; label: string }> = ({
    index,
    label,
  }) => {
    const isActive = state.step === index;
    const isCompleted = state.step > index;

    const leftConnectorCompleted = state.step >= index;
    const rightConnectorCompleted = state.step > index;

    let icon;
    let iconBgClass;
    let textClass;

    if (isCompleted) {
      icon = <CheckCircle size={16} className="text-white" />;
      iconBgClass = "bg-green-500";
      textClass = "text-gray-700 font-medium";
    } else if (isActive) {
      icon = <span className="text-white text-sm font-bold">{index + 1}</span>;
      iconBgClass = "bg-blue-600 ring-2 ring-blue-300";
      textClass = "text-blue-600 font-bold";
    } else {
      icon = <span className="text-gray-500 text-sm font-bold">{index + 1}</span>;
      iconBgClass = "bg-gray-100 border border-gray-300";
      textClass = "text-gray-500";
    }

    return (
      <button
        disabled={!isCompleted && !isActive} // Prevent jumping forward
        onClick={() => dispatch({ type: "SET_STEP", payload: index })}
        className="flex flex-col items-center flex-1 min-w-0 group"
      >
        <div className="flex items-center w-full">
          <div
            className={`flex-1 h-1 ${leftConnectorCompleted ? "bg-blue-600" : "bg-gray-300"
              } ${index === 0 ? "hidden" : "block"}`}
          ></div>

          <div
            className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${iconBgClass}`}
          >
            {icon}
          </div>

          <div
            className={`flex-1 h-1 ${rightConnectorCompleted ? "bg-blue-600" : "bg-gray-300"
              } ${index === steps.length - 1 ? "hidden" : "block"}`}
          ></div>
        </div>

        <span className={`mt-2 text-xs md:text-sm ${textClass}`}>{label}</span>
      </button>
    );
  };

  const convertToApiPayload = (state: any) => {
    const k = state.kin;
    const b = state.bankAccounts[0]; // only 1 account

    return {
      contact: {
        first_name: state.contact.firstName, // USER changed state.personal to state.contact in prev steps
        last_name: state.contact.lastName,
        middle_name: state.contact.middleName,
        personal_email: state.contact.personalEmail,
        phone_number: state.contact.phone,
        alternative_number: state.contact.alternativeNumber,
        dob: state.contact.dob,
        blood_group: state.contact.bloodGroup,
        gender: state.contact.gender,
        marital_status: state.contact.maritalStatus,
      },
      job: {
        email: k.email,
        emp_id: k.employeeId,
        job_title: k.jobTitle,
        department: k.department,
        employment_type: k.employmentType,
        start_date: k.startDate,
        role: k.role,
        manager: k.teamLead,
        location: k.location,
        job_description: k.jobDescription,
      },
      bank: {
        bank_name: b.bankName,
        account_number: b.accountNumber,
        confirm_account_number: b.confirmAccountNumber,
        ifsc_code: b.ifscCode,
        branch: b.branchName, // Mapped from branchName
        account_holder_name: b.accountName,
      },
    };
  };



  const handelApiCall = async (state: any) => {
    const payload = convertToApiPayload(state);

    console.log("Payload sending to API:", payload);

    try {
      const response = await CreateEmployes(payload);

      console.log("API Response:", response.data);
      alert("Employee created successfully!");
      navigate('/hr/employees')

    } catch (error) {
      console.error("API Error:", error);
      alert("Failed to create employee");
    }
  };

  /* ===========================================================
      RENDER UI
  ============================================================ */
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8">

      {/* STEP INDICATORS */}
      <div className="flex justify-between items-start mb-10 px-0 md:px-4">
        {steps.map((s, i) => (
          <StepIndicator key={s.key} index={i} label={s.label} />
        ))}
      </div>

      <hr className="mb-6 border-gray-200" />

      {/* CURRENT STEP CONTENT */}
      <div className="pt-4 min-h-[350px]">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <CornerDownRight size={20} className="text-blue-500" />{" "}
          {steps[state.step]?.label}
        </h2>
        {steps[state.step]?.comp}
      </div>

      {/* NAVIGATION BUTTONS */}
      <div className="mt-8 flex items-center justify-between">
        {state.step > 0 ? (
          <button
            onClick={() =>
              dispatch({
                type: "SET_STEP",
                payload: Math.max(0, state.step - 1),
              })
            }
            className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft size={16} /> Previous
          </button>
        ) : (
          <div></div>
        )}

        {/* NEXT BUTTON WITH VALIDATION */}
        {state.step < steps.length - 1 ? (
          <button
            onClick={() => {
              if (!validateStep()) {
                alert("⚠️ Please fill all required fields before proceeding.");
                return;
              }
              dispatch({
                type: "SET_STEP",
                payload: state.step + 1,
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 shadow-md"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => handelApiCall(state)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 shadow-md"
          >
            Submit Employee Data
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardInner;
