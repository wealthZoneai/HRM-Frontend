// WizardInner.tsx
import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";
import StepPersonal from "./StepPersonal";
import StepKin from "./StepKin";
import StepBank from "./StepBank";
import StepDocs from "./StepDocs";
import { CheckCircle, ArrowLeft, ArrowRight, CornerDownRight } from "lucide-react";

const WizardInner: React.FC<{ editData?: any }> = ({ editData }) => {
  const { state, dispatch } = useAddEmployee();

  React.useEffect(() => {
    if (editData) {
      dispatch({
        type: "SET_EDIT",
        payload: {
          editId: editData.id,
          data: {
            personal: { ...editData.personal },
            kin: { ...editData.kin },
            bankAccounts: editData.bankAccounts || [{}],
            documents: {},
          },
        },
      });
    }
  }, [editData, dispatch]);

  const steps = [
    { key: "personal", label: "Personal Info", comp: <StepPersonal /> },
    { key: "kin", label: "Next Of Kin", comp: <StepKin /> },
    { key: "bank", label: "Bank Account", comp: <StepBank /> },
    { key: "docs", label: "Documents", comp: <StepDocs /> },
  ];

  const StepIndicator: React.FC<{ index: number, label: string }> = ({ index, label }) => {
    const isActive = state.step === index;
    const isCompleted = state.step > index;
    
    // Logic for Connector Lines
    const leftConnectorCompleted = state.step >= index; // Left connector is blue if current step is this step or past it
    const rightConnectorCompleted = state.step > index; // Right connector is blue only if current step is past this step

    // Determine the icon and styling based on the step status
    let icon;
    let iconBgClass;
    let textClass;

    if (isCompleted) {
      icon = <CheckCircle size={16} fill="#10B981" className="text-white" />;
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
        onClick={() => dispatch({ type: "SET_STEP", payload: index })}
        disabled={!isCompleted && !isActive} 
        className="flex flex-col items-center flex-1 min-w-0 group"
      >
        <div className="flex items-center w-full">
          {/* Connector Line (left side) */}
          <div 
            className={`flex-1 h-1 transition-colors duration-300 ${leftConnectorCompleted ? 'bg-blue-600' : 'bg-gray-300'} ${index === 0 ? 'hidden' : 'block'}`}
          ></div>
          
          {/* Icon/Number Circle */}
          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${iconBgClass}`}>
            {icon}
          </div>

          {/* Connector Line (right side) */}
          <div 
            className={`flex-1 h-1 transition-colors duration-300 ${rightConnectorCompleted ? 'bg-blue-600' : 'bg-gray-300'} ${index === steps.length - 1 ? 'hidden' : 'block'}`}
          ></div>
        </div>
        
        {/* Label */}
        <span className={`mt-2 text-xs md:text-sm text-center line-clamp-2 transition-colors duration-300 ${textClass}`}>
          {label}
        </span>
      </button>
    );
  };

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8">
      
      {/* 1. Step Tabs/Indicators (Horizontal Stepper) */}
      <div className="flex justify-between items-start mb-10 px-0 md:px-4">
        {steps.map((s, i) => (
          <StepIndicator key={s.key} index={i} label={s.label} />
        ))}
      </div>

      <hr className="mb-6 border-gray-200" />

      {/* 2. Step Content */}
      <div className="pt-4 min-h-[350px]">
        {/* Display current step label clearly above the form content */}
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <CornerDownRight size={20} className="text-blue-500" /> {steps[state.step]?.label}
        </h2>
        {steps[state.step]?.comp}
      </div>

      {/* 3. Navigation Buttons (Enhanced Styling) */}
      <div className="mt-8 flex items-center justify-between">
        {state.step > 0 ? (
          <button
            onClick={() =>
              dispatch({
                type: "SET_STEP",
                payload: Math.max(0, state.step - 1),
              })
            }
            className="px-6 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium transition-colors hover:bg-gray-50 flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft size={16} /> Previous
          </button>
        ) : (
          <div></div> 
        )}

        {state.step < steps.length - 1 ? (
          <button
            onClick={() =>
              dispatch({
                type: "SET_STEP",
                payload: Math.min(steps.length - 1, state.step + 1),
              })
            }
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium transition-colors hover:bg-blue-700 flex items-center gap-2 shadow-md"
          >
            Next <ArrowRight size={16} />
          </button>
        ) : (
          <button
            // Final Submit Action
            onClick={() => console.log("Final submission logic here...")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-medium transition-colors hover:bg-green-700 flex items-center gap-2 shadow-md"
          >
            Submit Employee Data
          </button>
        )}
      </div>
    </div>
  );
};

export default WizardInner;