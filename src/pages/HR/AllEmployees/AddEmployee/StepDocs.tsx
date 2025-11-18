import React from "react";
import { useAddEmployee } from "./AddEmployeeContext";

const StepDocs: React.FC = () => {
  const { state, dispatch } = useAddEmployee();
  const docs = state.documents;

  const handleFile = (file: File | null, key: "profileImage" | "cvFile") => {
    dispatch({ type: "SET_DOCUMENT", payload: { [key]: file } });
  };

  const handleCerts = (files: FileList | null) => {
    if (!files) return;
    for (let i = 0; i < files.length; i++) {
      dispatch({ type: "ADD_CERTIFICATE", payload: files[i] });
    }
  };

  return (
    <div className="w-full">

      {/* UNIC CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Other Documents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Profile Image */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Profile Image
            </label>

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
                accept="image/*"
                className="hidden"
                onChange={(e) =>
                  handleFile(e.target.files?.[0] || null, "profileImage")
                }
              />
            </label>

            {docs.profileImage && (
              <p className="mt-2 text-xs text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm">
                {docs.profileImage.name}
              </p>
            )}
          </div>

          {/* CV Upload */}
          <div>
            <label className="text-sm font-medium text-gray-700">Upload CV</label>

            <label
              className="
                mt-2 flex flex-col items-center justify-center
                border-2 border-dashed border-gray-300 rounded-xl p-6
                cursor-pointer bg-gray-50 hover:bg-gray-100
                transition-all text-center
              "
            >
              <span className="text-gray-600 text-sm mb-2">
                Click to upload .pdf / .doc / .docx
              </span>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) =>
                  handleFile(e.target.files?.[0] || null, "cvFile")
                }
              />
            </label>

            {docs.cvFile && (
              <p className="mt-2 text-xs text-gray-700 bg-gray-100 p-2 rounded-md shadow-sm">
                {docs.cvFile.name}
              </p>
            )}
          </div>

          {/* Certificates */}
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-gray-700">
              Certificates (Multiple)
            </label>

            <label
              className="
                mt-2 flex flex-col items-center justify-center
                border-2 border-dashed border-gray-300 rounded-xl p-6
                cursor-pointer bg-gray-50 hover:bg-gray-100
                transition-all text-center
              "
            >
              <span className="text-gray-600 text-sm mb-2">
                Upload PDF / JPG / PNG (multiple files)
              </span>

              <input
                type="file"
                accept=".pdf,.jpg,.png"
                multiple
                className="hidden"
                onChange={(e) => handleCerts(e.target.files)}
              />
            </label>

            {/* Certificates list */}
            <div className="mt-3 space-y-2">
              {(docs.certificates || []).map((c, i) => (
                <div
                  key={i}
                  className="
                    flex justify-between items-center 
                    bg-gray-100 p-2 rounded-md shadow-sm
                    text-sm
                  "
                >
                  <span>{c.name}</span>
                  <button
                    className="text-red-500 text-xs hover:underline"
                    onClick={() =>
                      dispatch({ type: "REMOVE_CERTIFICATE", payload: i })
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StepDocs;
