import React, { useState } from "react";
import { useAddEmployee } from "./AddEmployeeContext";

const StepPreview: React.FC = () => {
  const { state, dispatch } = useAddEmployee();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);

    try {
      setLoading(true);

      const form = new FormData();

      // Personal
      Object.entries(state.contact).forEach(([k, v]) => {
        if (v !== undefined && v !== null)
          form.append(`contact[${k}]`, String(v));
      });

      // Kin
      Object.entries(state.kin).forEach(([k, v]) => {
        if (v !== undefined && v !== null)
          form.append(`kin[${k}]`, String(v));
      });

      // Bank
      state.bankAccounts.forEach((b, idx) => {
        Object.entries(b || {}).forEach(([k, v]) => {
          if (v !== undefined && v !== null)
            form.append(`bankAccounts[${idx}][${k}]`, String(v));
        });
      });

      // Documents
      if (state.documents.profileImage)
        form.append("profileImage", state.documents.profileImage);

      if (state.documents.cvFile)
        form.append("cvFile", state.documents.cvFile);

      (state.documents.certificates || []).forEach((f, i) =>
        form.append(`certificates[${i}]`, f)
      );

      // Edit mode
      if (state.editMode && state.editId)
        form.append("id", String(state.editId));


      // Success
      setSuccess("Employee saved successfully!");
      dispatch({ type: "RESET" });
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Submission failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">

      {/* UNIC Card */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Review & Confirm
        </h3>

        <div className="space-y-6">

          {/* Personal Info */}
          <div className="bg-gray-50 rounded-xl p-4 border">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Personal Information
            </h4>
            <pre className="p-3 text-xs bg-white border rounded-lg shadow-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(state.contact, null, 2)}
            </pre>
          </div>

          {/* Kin Info */}
          <div className="bg-gray-50 rounded-xl p-4 border">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Next of Kin
            </h4>
            <pre className="p-3 text-xs bg-white border rounded-lg shadow-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(state.kin, null, 2)}
            </pre>
          </div>

          {/* Bank Info */}
          <div className="bg-gray-50 rounded-xl p-4 border">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Bank Accounts
            </h4>
            <pre className="p-3 text-xs bg-white border rounded-lg shadow-sm text-gray-700 overflow-x-auto">
              {JSON.stringify(state.bankAccounts, null, 2)}
            </pre>
          </div>

          {/* Documents */}
          <div className="bg-gray-50 rounded-xl p-4 border">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Documents
            </h4>

            <div className="space-y-1 text-sm text-gray-700">
              <div>
                <strong>Profile:</strong>{" "}
                {state.documents.profileImage?.name || "—"}
              </div>
              <div>
                <strong>CV:</strong> {state.documents.cvFile?.name || "—"}
              </div>
              <div>
                <strong>Certificates:</strong>{" "}
                {(state.documents.certificates || [])
                  .map((c) => c.name)
                  .join(", ") || "—"}
              </div>
            </div>
          </div>
        </div>

        {/* Submit Section */}
        <div className="mt-6 flex flex-col md:flex-row items-start md:items-center gap-3">

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="
              w-full md:w-auto px-6 py-3 
              bg-blue-600 hover:bg-blue-700 
              text-white text-sm font-medium 
              rounded-lg shadow-md 
              transition-all
            "
          >
            {loading
              ? "Processing..."
              : state.editMode
                ? "Update Employee"
                : "Add Employee"}
          </button>

          {/* Error */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-md border border-red-200">
              {error}
            </div>
          )}

          {/* Success */}
          {success && (
            <div className="text-sm text-green-600 bg-green-50 px-3 py-2 rounded-md border border-green-200">
              {success}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepPreview;
