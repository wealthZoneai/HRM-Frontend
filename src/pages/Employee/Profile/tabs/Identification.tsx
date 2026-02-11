import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    UploadCloud,
    FileText,
    X,
    CheckCircle,
    Eye,
    Trash2,
    AlertCircle,
    Image as ImageIcon
} from "lucide-react";
import { showError } from "../../../../utils/toast";

// --- TYPES ---

type UploadSide = 'front' | 'back';

interface DocumentType {
    id: string;
    label: string;
    requiresBack: boolean;
    isOptional?: boolean;
}

interface UploadedFile {
    url: string;
    name: string;
    type: string;
}

interface DocumentState {
    front: UploadedFile | null;
    back: UploadedFile | null;
}

type AllDocumentsState = Record<string, DocumentState>;

// --- DATA ---

const documents: DocumentType[] = [
    {
        id: "aadhar",
        label: "Aadhaar Card",
        requiresBack: true
    },
    {
        id: "pan",
        label: "PAN Card",
        requiresBack: false
    },
    {
        id: "passport",
        label: "Passport",
        requiresBack: true,
        isOptional: true
    },
];

const commonGuidelines = [
    "Ensure the photo and details are clearly visible.",
    "Supported formats: JPG, PNG, PDF (Max 5MB).",
    "Back side is required for Aadhaar Card and Passport.",
    "Ensure the documents are valid and not expired."
];

// --- COMPONENTS ---

const PreviewModal = ({
    file,
    onClose
}: {
    file: UploadedFile | null;
    onClose: () => void;
}) => {
    if (!file) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-4 border-b">
                        <h3 className="font-semibold text-lg text-gray-800 truncate pr-4">{file.name}</h3>
                        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <X size={24} className="text-gray-500" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto p-4 bg-gray-50 flex items-center justify-center">
                        {file.type.includes('image') ? (
                            <img src={file.url} alt="Preview" className="max-w-full h-auto rounded-md shadow-sm" />
                        ) : (
                            <div className="flex flex-col items-center text-gray-500 gap-3">
                                <FileText size={64} />
                                <p>Preview not available for this file type.</p>
                                <a
                                    href={file.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-blue-600 hover:underline"
                                >
                                    Download to view
                                </a>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const UploadCard = ({
    file,
    onUpload,
    onRemove,
    onPreview,
    label
}: {
    file: UploadedFile | null;
    onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: () => void;
    onPreview: () => void;
    label: string;
}) => {
    return (
        <div className="flex-1 min-w-[140px] sm:min-w-[180px]">
            <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                {file && <CheckCircle size={16} className="text-green-500" />}
            </div>

            {file ? (
                <div className="relative group border-2 border-green-100 bg-green-50/30 rounded-xl p-4 h-40 flex flex-col items-center justify-center gap-3 transition-all hover:border-green-200">
                    <div className="p-3 bg-white rounded-full shadow-sm">
                        <ImageIcon size={24} className="text-green-600" />
                    </div>
                    <div className="text-center px-2 w-full">
                        <p className="text-xs text-gray-600 truncate font-medium">{file.name}</p>
                        <p className="text-xs text-gray-400 mt-1">Uploaded</p>
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 backdrop-blur-[1px]">
                        <button
                            onClick={onPreview}
                            className="p-2 bg-white text-blue-600 rounded-full shadow-md hover:scale-110 transition-transform"
                            title="Preview"
                        >
                            <Eye size={18} />
                        </button>
                        <button
                            onClick={onRemove}
                            className="p-2 bg-white text-red-500 rounded-full shadow-md hover:scale-110 transition-transform"
                            title="Remove"
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ) : (
                <label className="cursor-pointer group block">
                    <input
                        type="file"
                        className="hidden"
                        // ✅ FIXED: Strictly allow only these extensions
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={onUpload}
                    />
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 h-40 flex flex-col items-center justify-center gap-2 transition-colors group-hover:border-blue-400 group-hover:bg-blue-50/30">
                        <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                            <UploadCloud size={24} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Click to upload</p>
                            <p className="text-xs text-gray-400 mt-1">PNG, JPG or PDF</p>
                        </div>
                    </div>
                </label>
            )}
        </div>
    );
};

const DocumentRow = ({
    doc,
    state,
    onUpload,
    onRemove,
    onPreview
}: {
    doc: DocumentType;
    state: DocumentState;
    onUpload: (side: UploadSide, file: File) => void;
    onRemove: (side: UploadSide) => void;
    onPreview: (file: UploadedFile) => void;
}) => {
    
    const handleFileChange = (side: UploadSide) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // ✅ FIXED: Add Validation for File Type
            const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf'];
            const fileExtension = file.name.split('.').pop()?.toLowerCase();
            const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

            if (!fileExtension || (!allowedExtensions.includes(fileExtension) && !allowedMimeTypes.includes(file.type))) {
                showError("Invalid file type. Only JPG, PNG, and PDF are allowed.");
                e.target.value = ''; // Reset input
                return;
            }

            const MAX_SIZE = 5 * 1024 * 1024;
            
            if (file.size > MAX_SIZE) {
                showError("File size exceeds 5MB. Please upload a smaller file.");
                e.target.value = ''; // Reset the input so they can try again
                return;
            }

            onUpload(side, file);
            e.target.value = ''; // Reset input
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm h-full flex flex-col">
            {/* Top: Centered Heading */}
            <div className="flex flex-col items-center mb-6 border-b border-gray-100 pb-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {doc.label}
                    {/* ✅ UPDATED: Added Asterisk if mandatory */}
                    {!doc.isOptional && <span className="text-red-500">*</span>}
                    
                    {state.front && (!doc.requiresBack || state.back) && (
                        <CheckCircle size={20} className="text-green-500" />
                    )}
                </h3>
                {/* ✅ UPDATED: Removed "Mandatory/Optional Document" text paragraph */}
            </div>

            <div className="flex flex-col grow justify-center">
                <div className="flex flex-row gap-4 justify-center w-full">
                    <UploadCard
                        label="Front Side"
                        file={state.front}
                        onUpload={handleFileChange('front')}
                        onRemove={() => onRemove('front')}
                        onPreview={() => state.front && onPreview(state.front)}
                    />

                    {(doc.requiresBack || state.back) ? (
                        <UploadCard
                            label="Back Side"
                            file={state.back}
                            onUpload={handleFileChange('back')}
                            onRemove={() => onRemove('back')}
                            onPreview={() => state.back && onPreview(state.back)}
                        />
                    ) : (
                        <UploadCard
                            label="Back Side (Optional)"
                            file={state.back}
                            onUpload={handleFileChange('back')}
                            onRemove={() => onRemove('back')}
                            onPreview={() => state.back && onPreview(state.back)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const Identification = ({ data }: { data?: any }) => {
    const [docState, setDocState] = useState<AllDocumentsState>({
        aadhar: { front: null, back: null },
        pan: { front: null, back: null },
        passport: { front: null, back: null },
    });

    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (data) {
            const createDoc = (url?: string, name?: string): UploadedFile | null =>
                url ? { url: `http://127.0.0.1:8000${url}`, name: name || "Existing Document", type: "image/jpeg" } : null;

            setDocState({
                aadhar: {
                    front: createDoc(data.protected_aadhaar_image_url, "Aadhaar Front"),
                    back: null
                },
                pan: {
                    front: createDoc(data.protected_pan_image_url, "PAN Front"),
                    back: null
                },
                passport: {
                    front: createDoc(data.protected_passport_image_url, "Passport Front"),
                    back: null
                },
            });
            setHasChanges(false); // Reset changes when new data loads
        }
    }, [data]);

    const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

    const handleUpload = (docId: string, side: UploadSide, file: File) => {
        const fakeUrl = URL.createObjectURL(file);
        setDocState(prev => ({
            ...prev,
            [docId]: {
                ...prev[docId],
                [side]: {
                    url: fakeUrl,
                    name: file.name,
                    type: file.type
                }
            }
        }));
        setHasChanges(true); // Mark form as dirty
    };

    const handleRemove = (docId: string, side: UploadSide) => {
        setDocState(prev => ({
            ...prev,
            [docId]: {
                ...prev[docId],
                [side]: {
                    ...prev[docId][side], // Keep other side intact
                    [side]: null         // Remove specific side
                }
            }
        }));
        setHasChanges(true); // Mark form as dirty
    };

    // Check if all mandatory documents are uploaded
    const isFormValid = documents.every(doc => {
        if (doc.isOptional) return true;
        const state = docState[doc.id];
        const hasFront = !!state?.front;
        const hasBack = doc.requiresBack ? !!state?.back : true;
        return hasFront && hasBack;
    });

    // Button is enabled ONLY if form is valid AND there are changes
    const isSubmitEnabled = isFormValid && hasChanges;

    return (
        <div className="max-w-340 mx-auto space-y-8 pb-10">

            {/* Header */}
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Identification Documents</h2>
                <p className="text-gray-500">Upload your government issued identification documents for verification.</p>
            </div>

            {/* Guidelines */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
                    <AlertCircle size={20} />
                    Upload Guidelines
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {commonGuidelines.map((line, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-blue-800 text-sm">
                            <CheckCircle size={16} className="mt-0.5 shrink-0 text-blue-500" />
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Document Rows Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {documents.map(doc => (
                    <DocumentRow
                        key={doc.id}
                        doc={doc}
                        state={docState[doc.id] || { front: null, back: null }}
                        onUpload={(side, file) => handleUpload(doc.id, side, file)}
                        onRemove={(side) => handleRemove(doc.id, side)}
                        onPreview={setPreviewFile}
                    />
                ))}
            </div>

            {/* Footer Actions - CENTERED BUTTON */}
            <div className="flex justify-center pt-4 border-t border-gray-200">
                <button
                    disabled={!isSubmitEnabled}
                    className={`px-12 py-3 rounded-xl font-semibold shadow-lg transition-all transform min-w-60
                        ${isSubmitEnabled
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                        }`}
                    onClick={() => {
                        if (isSubmitEnabled) {
                            console.log("Submitting documents:", docState);
                        }
                    }}
                >
                    Submit
                </button>
            </div>

            {/* Preview Modal */}
            {previewFile && (
                <PreviewModal
                    file={previewFile}
                    onClose={() => setPreviewFile(null)}
                />
            )}
        </div>
    );
};

export default Identification;