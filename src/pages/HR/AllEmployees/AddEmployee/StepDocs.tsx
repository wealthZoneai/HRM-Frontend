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
    idCard: "",
  });

  const validate = (key: string, file: File | null) => {
    let msg = "";

    if (!file && ["aadharFront", "aadharBack", "panCard", "idCard"].includes(key)) {
      msg = "This document is required";
    }

    setErrors((prev) => ({ ...prev, [key]: msg }));
  };

  const handleFile = (file: File | null, key: string) => {
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
  }) => (
    <div>
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <label
        className="
          mt-2 flex flex-col items-center justify-center
          border-2 border-dashed border-gray-300 rounded-xl p-6
          cursor-pointer bg-gray-50 hover:bg-gray-100
          transition-all text-center
        "
      >
        <span className="text-gray-600 text-sm mb-2">
          Click to upload or drag and drop
        </span>

        <input
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] || null)}
        />
      </label>

      {value && (
        <p className="mt-2 text-xs text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm">
          {value.name}
        </p>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Aadhar Front */}
          <UploadBox
            label="Aadhaar Card (Front)"
            value={(docs as any).aadharFront}
            accept="image/*,.pdf"
            error={errors.aadharFront}
            onChange={(f) => handleFile(f, "aadharFront")}
          />

          {/* Aadhar Back */}
          <UploadBox
            label="Aadhaar Card (Back)"
            value={(docs as any).aadharBack}
            accept="image/*,.pdf"
            error={errors.aadharBack}
            onChange={(f) => handleFile(f, "aadharBack")}
          />

          {/* PAN Card */}
          <UploadBox
            label="PAN Card"
            value={(docs as any).panCard}
            accept="image/*,.pdf"
            error={errors.panCard}
            onChange={(f) => handleFile(f, "panCard")}
          />

          {/* Company ID Card */}
          <UploadBox
            label="Company ID Card"
            value={(docs as any).idCard}
            accept="image/*,.pdf"
            error={errors.idCard}
            onChange={(f) => handleFile(f, "idCard")}
          />

          {/* Passport (Optional) */}
          <UploadBox
            label="Passport (Optional)"
            value={(docs as any).passport}
            accept="image/*,.pdf"
            onChange={(f) => handleFile(f, "passport")}
          />
        </div>
      </div>
    </div>
  );
};

export default StepDocs;
