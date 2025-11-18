import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";
import StepPersonal from "./StepPersonal";
import StepKin from "./StepKin";
import StepBank from "./StepBank";
import StepDocs from "./StepDocs";

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
    { key: "personal", label: "Personal Information", comp: <StepPersonal /> },
    { key: "kin", label: "Next Of Kin Information", comp: <StepKin /> },
    { key: "bank", label: "Bank Account Information", comp: <StepBank /> },
    { key: "docs", label: "Other Documents", comp: <StepDocs /> },
    // { key: "preview", label: "Preview", comp: <StepPreview /> },
  ];

  return (
    <div className="w-full">
      
      {/* Tabs */}
      <div className="flex gap-2 px-2 py-3 overflow-x-auto border-b">
        {steps.map((s, i) => {
          const active = state.step === i;
          return (
            <button
              key={s.key}
              onClick={() => dispatch({ type: "SET_STEP", payload: i })}
              className={`
                whitespace-nowrap px-3 py-1 text-sm rounded-md
                ${active ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600 font-semibold" : "text-gray-500"}
              `}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      {/* Step Content */}
      <div className="pt-4">{steps[state.step]?.comp}</div>

      {/* Navigation Buttons */}
      <div className="mt-6 flex items-center justify-between">
        {state.step > 0 ? (
          <button
            onClick={() =>
              dispatch({
                type: "SET_STEP",
                payload: Math.max(0, state.step - 1),
              })
            }
            className="px-4 py-2 border rounded-md bg-white text-gray-700"
          >
            Previous
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Next
          </button>
        ) : (
          <span className="text-sm text-gray-500">Ready to submit</span>
        )}
      </div>
    </div>
  );
};

export default WizardInner;
