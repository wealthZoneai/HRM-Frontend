import { useState } from "react";
import { FiChevronRight, FiCheckCircle } from "react-icons/fi";
import UploadModal from "../UploadModal";

const Identification = () => {
  const documents = [
    { label: "Aadhar Card *", key: "aadhar" },
    { label: "Pan Card *", key: "pan" },
    { label: "ID Card *", key: "idcard" },
    { label: "Visa", key: "visa" },
  ];

  const [activeDoc, setActiveDoc] = useState<string | null>(null);
  const [uploaded, setUploaded] = useState<Record<string, string | null>>({
    aadhar: null,
    pan: null,
    idcard: null,
    visa: null,
  });

  // Helper to get the label for the active document
  const activeLabel = documents.find((d) => d.key === activeDoc)?.label ?? "";

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Document List */}
      {documents.map((doc) => (
        <button
          key={doc.key}
          onClick={() => setActiveDoc(doc.key)}
          className="w-full flex items-center justify-between border rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm hover:bg-gray-50"
        >
          <span>{doc.label}</span>
          {uploaded[doc.key] ? (
            <FiCheckCircle className="text-green-500 text-lg sm:text-xl" />
          ) : (
            <FiChevronRight className="text-gray-500 text-lg sm:text-xl" />
          )}
        </button>
      ))}

      {/* Save + Cancel buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4">
        <button className="px-4 py-2 border rounded-lg hover:bg-gray-100 text-sm">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm">
          Save
        </button>
      </div>

      {/* Modal */}
      {activeDoc && (
        <UploadModal
          docKey={activeDoc}
          docLabel={activeLabel}
          onClose={() => setActiveDoc(null)}
          onSave={(frontURL,) => {
            // Store a placeholder (you can later combine front+back if needed)
            setUploaded((prev) => ({
              ...prev,
              [activeDoc]: frontURL, // or JSON.stringify([frontURL, backURL])
            }));
            setActiveDoc(null);
          }}
        />
      )}
    </div>
  );
};

export default Identification;