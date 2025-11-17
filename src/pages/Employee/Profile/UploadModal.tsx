import { useRef, useState } from "react";
import { FiCamera, FiX } from "react-icons/fi";

interface Props {
  docKey: string;
  docLabel: string;               // <-- new
  onClose: () => void;
  onSave: (frontImage: string, backImage: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Instruction map – add more docs here if you need extra copy       */
/* ------------------------------------------------------------------ */
const INSTRUCTIONS: Record<
  string,
  { title: string; backHint: string }
> = {
  aadhar: {
    title: "Aadhaar card",
    backHint: "with address",
  },
  pan: {
    title: "PAN card",
    backHint: "with signature",
  },
  idcard: {
    title: "ID card",
    backHint: "with validity",
  },
  visa: {
    title: "Visa",
    backHint: "with entry stamp",
  },
};

const UploadModal = ({ docKey, docLabel, onClose, onSave }: Props) => {
  const frontRef = useRef<HTMLInputElement>(null);
  const backRef = useRef<HTMLInputElement>(null);
  const [frontPreview, setFrontPreview] = useState<string | null>(null);
  const [backPreview, setBackPreview] = useState<string | null>(null);

  const instr = INSTRUCTIONS[docKey] ?? {
    title: docLabel,
    backHint: "back side",
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-xs p-4">
      <div className="bg-white rounded-lg sm:rounded-xl w-full max-w-lg p-4 sm:p-6 relative shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-500 hover:text-black"
        >
          <FiX size={22} />
        </button>

        {/* Title */}
        <h2 className="text-lg sm:text-xl font-semibold mb-3">{instr.title}</h2>

        {/* Instructions */}
        <ul className="text-gray-600 text-xs sm:text-sm mb-4 space-y-1 leading-relaxed">
          <li>1. Upload a clear and readable copy of your {docLabel}.</li>
          <li>2. Accepted formats: JPG, PNG.</li>
          <li>3. Max file size: 2 MB.</li>
          <li>4. Avoid blurred, cropped, or unclear images.</li>
        </ul>

        {/* ---------- FRONT ---------- */}
        <div className="border border-dashed border-gray-400 rounded-lg p-3 sm:p-4 text-center mb-4">
          {frontPreview ? (
            <div className="h-32 sm:h-40 w-full rounded overflow-hidden">
              <img
                src={frontPreview}
                alt="Front preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p className="text-gray-600 text-xs sm:text-sm mb-3">
              Front side photo of your {docLabel}
              <br />
              with your clear name and photo
            </p>
          )}

          <button
            onClick={() => frontRef.current?.click()}
            className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-50"
          >
            <FiCamera size={16} /> Upload Photo
          </button>
          <input
            ref={frontRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setFrontPreview(URL.createObjectURL(f));
            }}
          />
        </div>

        {/* ---------- BACK ---------- */}
        <div className="border border-dashed border-gray-400 rounded-lg p-3 sm:p-4 text-center mb-6">
          {backPreview ? (
            <div className="h-32 sm:h-40 w-full rounded overflow-hidden">
              <img
                src={backPreview}
                alt="Back preview"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <p className="text-gray-600 text-xs sm:text-sm mb-3">
              Back side photo of your {docLabel}
              <br />
              {instr.backHint}
            </p>
          )}

          <button
            onClick={() => backRef.current?.click()}
            className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium hover:bg-blue-50"
          >
            <FiCamera size={16} /> Upload Photo
          </button>
          <input
            ref={backRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setBackPreview(URL.createObjectURL(f));
            }}
          />
        </div>

        {/* ---------- SUBMIT ---------- */}
        <button
          disabled={!frontPreview || !backPreview}
          onClick={() => onSave(frontPreview!, backPreview!)}
          className={`w-full py-2 sm:py-2.5 rounded-full text-white font-semibold text-sm sm:text-base transition-colors ${
            frontPreview && backPreview
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadModal;