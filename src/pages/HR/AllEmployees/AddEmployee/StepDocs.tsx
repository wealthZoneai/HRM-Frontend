import React, { useState } from "react";
import { useAddEmployee } from "./AddEmployeeContext";

const StepDocs: React.FC = () => {
  const { state, dispatch } = useAddEmployee();
  const docs = state.documents;

  /* --------------------------
      VALIDATION STATE
  -------------------------- */
  const [errors, setErrors] = useState({
    aadharFront: "",
    aadharBack: "",
    panCard: "",
    panCardBack: "",
    idCard: "",
  });

  const validate = (key: string, file: File | null) => {
    let msg = "";

    // User requested not to show "This document is required" error immediately after deleting
    if (!file) {
      // If file is removed, we clear the error for now to avoid bad UX
      msg = "";
    } else if (["aadharFront", "aadharBack", "panCard", "panCardBack", "idCard"].includes(key)) {
      // logic for other validations if needed, for now just clear if file exists
      msg = "";
    }

    setErrors((prev) => ({ ...prev, [key]: msg }));
  };

  const handleFile = (file: File | null, key: string) => {
    if (file) {
      const fileName = file.name.toLowerCase();
      // Check for SVG extension
      if (fileName.endsWith('.svg')) {
        setErrors((prev) => ({ ...prev, [key]: "SVG files are not allowed. Please upload PNG, JPG or PDF." }));
        // Do not update the document state if invalid
        return;
      }

      // Also check MIME type if available
      if (file.type === 'image/svg+xml') {
        setErrors((prev) => ({ ...prev, [key]: "SVG files are not allowed. Please upload PNG, JPG or PDF." }));
        return;
      }
    }

    dispatch({ type: "SET_DOCUMENT", payload: { [key]: file } });
    validate(key, file);
  };

  /* --------------------------
      REUSABLE UPLOAD BOX
  -------------------------- */
  const UploadBox = ({
    label,
    value,
    onChange,
    error,
    accept,
  }: {
    label: string;
    value: File | null | undefined;
    onChange: (f: File | null) => void;
    error?: string;
    accept: string;
  }) => {
    // Helper to trigger the hidden input
    const handleReplaceClick = (id: string) => {
      document.getElementById(id)?.click();
    };

    const inputId = `file-input-${label.replace(/\s+/g, "-")}`;

    return (
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>

        {value ? (
          /* ---------------- DONE / UPLOADED STATE ---------------- */
          <div className="mt-2 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-3 overflow-hidden">
              {/* Icon / Status */}
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>

              {/* File Info */}
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-semibold text-gray-800 truncate">
                  {value.name}
                </span>
                <span className="text-xs text-green-600 font-medium">
                  Uploaded Successfully
                </span>
              </div>
            </div>

            {/* Actions: Replace / Delete */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Replace Button */}
              <button
                type="button"
                onClick={() => handleReplaceClick(inputId)}
                className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
              >
                Replace
              </button>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => onChange(null)}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Delete
              </button>
            </div>

            {/* Hidden Input for "Replace" action */}
            <input
              id={inputId}
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
          </div>
        ) : (
          /* ---------------- UPLOAD STATE ---------------- */
          <label
            className="
              mt-2 flex flex-col items-center justify-center
              border-2 border-dashed border-gray-300 rounded-xl p-6
              cursor-pointer bg-gray-50 hover:bg-blue-50 hover:border-blue-300
              transition-all text-center group
            "
          >
            <div className="w-12 h-12 mb-3 rounded-full bg-blue-100 flex items-center justify-center text-blue-500 group-hover:bg-blue-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <span className="text-gray-900 font-medium text-sm mb-1">
              Click to upload
            </span>
            <span className="text-gray-500 text-xs">
              PNG, JPG or PDF (max. 5MB)
            </span>

            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(e) => onChange(e.target.files?.[0] || null)}
            />
          </label>
        )}

        {/* Error Message */}
        {error && <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Aadhar Front */}
          <UploadBox
            label="Aadhaar Card (Front)"
            value={docs.aadharFront}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            error={errors.aadharFront}
            onChange={(f) => handleFile(f, "aadharFront")}
          />

          {/* Aadhar Back */}
          <UploadBox
            label="Aadhaar Card (Back)"
            value={docs.aadharBack}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            error={errors.aadharBack}
            onChange={(f) => handleFile(f, "aadharBack")}
          />

          {/* PAN Card */}
          <UploadBox
            label="PAN Card (Front)"
            value={docs.panCard}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            error={errors.panCard}
            onChange={(f) => handleFile(f, "panCard")}
          />

          {/* PAN Card Back */}
          <UploadBox
            label="PAN Card (Back) (Optional)"
            value={docs.panCardBack}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            error={errors.panCardBack}
            onChange={(f) => handleFile(f, "panCardBack")}
          />

          {/* Passport (Optional) */}
          <UploadBox
            label="Passport (Optional)"
            value={docs.passport}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            onChange={(f) => handleFile(f, "passport")}
          />

          {/* Company ID Card */}
          <UploadBox
            label="Company ID Card"
            value={docs.idCard}
            accept="image/png,image/jpeg,image/jpg,application/pdf"
            error={errors.idCard}
            onChange={(f) => handleFile(f, "idCard")}
          />


        </div>
      </div>
    </div>
  );
};

export default StepDocs;
