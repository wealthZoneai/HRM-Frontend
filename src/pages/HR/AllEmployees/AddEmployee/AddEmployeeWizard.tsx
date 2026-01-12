// WizardInner.tsx
import React, { useState } from "react"; // 1. Added useState
import { toast } from "react-toastify";
import { useAddEmployee } from "./AddEmployeeContext";
import StepPersonal from "./StepPersonal";
import StepKin from "./StepKin";
import StepBank from "./StepBank";
import StepDocs from "./StepDocs";
import {
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  CornerDownRight,
} from "lucide-react";
import { CreateEmployes } from "../../../../Services/apiHelpers";
import { useNavigate } from "react-router-dom";

const WizardInner: React.FC<{ editData?: any; onSuccess?: () => void }> = ({
  editData,
  onSuccess,
}) => {
  const { state, dispatch } = useAddEmployee();
  const navigate = useNavigate();

  // 2. NEW STATE: To track if we should show validation errors
  const [showErrors, setShowErrors] = useState(false);

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
      STEP CONFIG
      3. UPDATED: Passing 'showErrors' prop to child components
  ============================================================ */
  const steps = [
    { 
      key: "personal", 
      label: "Personal Info", 
      // @ts-ignore - Assuming StepPersonal accepts showErrors prop
      comp: <StepPersonal showErrors={showErrors} /> 
    },
    { 
      key: "kin", 
      label: "Job Information", 
      // @ts-ignore
      comp: <StepKin showErrors={showErrors} /> 
    },
    { 
      key: "bank", 
      label: "Bank Details (Optional)", 
      // @ts-ignore
      comp: <StepBank showErrors={showErrors} /> 
    },
    { 
      key: "docs", 
      label: "Documents", 
      // @ts-ignore
      comp: <StepDocs showErrors={showErrors} /> 
    },
  ];

  /* ===========================================================
      STEP VALIDATION
      (Bank step is OPTIONAL)
  ============================================================ */
  const validateStep = () => {
    const p = state.contact;
    const k = state.kin;

    switch (state.step) {
      case 0:
        return (
          p.firstName?.trim() &&
          p.lastName?.trim() &&
          p.phone?.trim().length === 10 &&
          (!p.alternativeNumber || p.alternativeNumber.length === 10) &&
          p.personalEmail?.trim() &&
          p.dob?.trim() &&
          p.gender?.trim() &&
          p.maritalStatus?.trim()
        );

      case 1:
        return (
          k.startDate?.trim() &&
          k.jobTitle?.trim() &&
          k.department?.trim() &&
          k.employmentType?.trim() &&
          k.location?.trim()
        );

      case 2: // BANK OPTIONAL
        return true;

      case 3:
        return true;

      default:
        return true;
    }
  };

  /* ===========================================================
      BANK DATA CHECK
  ============================================================ */
  const hasBankData = (bank: any) => {
    return (
      bank?.bankName ||
      bank?.accountNumber ||
      bank?.confirmAccountNumber ||
      bank?.accountName ||
      bank?.ifscCode ||
      bank?.branchName
    );
  };

  /* ===========================================================
      STEP INDICATOR
  ============================================================ */
  const StepIndicator: React.FC<{ index: number; label: string }> = ({
    index,
    label,
  }) => {
    const isActive = state.step === index;
    const isCompleted = state.step > index;

    let icon;
    let bg;
    let text;

    if (isCompleted) {
      icon = <CheckCircle size={16} className="text-white" />;
      bg = "bg-green-500";
      text = "text-gray-700";
    } else if (isActive) {
      icon = <span className="text-white font-bold">{index + 1}</span>;
      bg = "bg-blue-600 ring-2 ring-blue-300";
      text = "text-blue-600 font-bold";
    } else {
      icon = <span className="text-gray-500">{index + 1}</span>;
      bg = "bg-gray-200";
      text = "text-gray-500";
    }

    return (
      <button
        disabled={!isCompleted && !isActive}
        onClick={() => {
            // Optional: You might want to validate before jumping via header too
            dispatch({ type: "SET_STEP", payload: index })
        }}
        className="flex flex-col items-center flex-1"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${bg}`}>
          {icon}
        </div>
        <span className={`mt-2 text-sm ${text}`}>{label}</span>
      </button>
    );
  };

  /* ===========================================================
      API PAYLOAD
  ============================================================ */
  const convertToApiPayload = (state: any) => {
    const k = state.kin;
    const b = state.bankAccounts[0] || {};

    const payload: any = {
      emp_id: k.employeeId,
      work_email: k.email,
      contact: {
        first_name: state.contact.firstName,
        last_name: state.contact.lastName,
        middle_name: state.contact.middleName,
        personal_email: state.contact.personalEmail,
        phone_number: state.contact.phone,
        alternate_number: state.contact.alternativeNumber,
        dob: state.contact.dob,
        blood_group: state.contact.bloodGroup,
        gender: state.contact.gender,
        marital_status: state.contact.maritalStatus,
      },
      job: {
        job_title: k.jobTitle,
        department: k.department,
        employment_type: k.employmentType,
        start_date: k.startDate,
        role: "employee",
        team_lead: k.teamLead,
        location: k.location,
        job_description: k.jobDescription,
      },
    };

    // ✅ Send bank only if user entered something
    if (hasBankData(b)) {
      payload.bank = {
        bank_name: b.bankName,
        account_number: b.accountNumber,
        confirm_account_number: b.confirmAccountNumber,
        ifsc_code: b.ifscCode,
        branch: b.branchName,
        account_holder_name: b.accountName,
      };
    }

    return payload;
  };

  /* ===========================================================
      SUBMIT
  ============================================================ */
  const handelApiCall = async (state: any) => {
    // 4. UPDATED: Validate before final submit
    if (!validateStep()) {
        setShowErrors(true);
        toast.error("Please fill in all required fields.");
        return;
    }

    try {
      await CreateEmployes(convertToApiPayload(state));
      onSuccess ? onSuccess() : navigate("/hr/employees");
    } catch (error: any) {
      console.error("API error:", error.response?.data || error);
      toast.error("Failed to create employee. Check required fields.");
    }
  };

  /* ===========================================================
      RENDER
  ============================================================ */
  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8">
      {/* STEP INDICATORS */}
      <div className="flex justify-between mb-10">
        {steps.map((s, i) => (
          <StepIndicator key={s.key} index={i} label={s.label} />
        ))}
      </div>

      <hr className="mb-6" />

      {/* STEP CONTENT */}
      <div className="min-h-[350px]">
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <CornerDownRight size={18} />
          {steps[state.step]?.label}
        </h2>
        {steps[state.step]?.comp}
      </div>

      {/* NAVIGATION */}
      <div className="mt-8 flex justify-between">
        {state.step > 0 ? (
          <button
            onClick={() => {
              setShowErrors(false); // Reset errors when going back
              dispatch({ type: "SET_STEP", payload: state.step - 1 })
            }}
            className="px-6 py-2 border rounded-lg"
          >
            <ArrowLeft size={16} /> Previous
          </button>
        ) : (
          <div />
        )}

        {state.step < steps.length - 1 ? (
          <button
            // 5. UPDATED: Validation Logic here
            onClick={() => {
              const isValid = validateStep();
              if (!isValid) {
                setShowErrors(true); // Trigger red fields
                toast.error("Please fill in all required fields.");
                return;
              }
              // If valid, proceed and hide errors for the next step
              setShowErrors(false);
              dispatch({
                type: "SET_STEP",
                payload: state.step + 1,
              });
            }}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            onClick={() => handelApiCall(state)}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            Submit Employee Data
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardInner;