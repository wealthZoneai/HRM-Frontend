import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle, UploadCloud, FileText, XCircle, AlertTriangle, File, FileImage, FileUp, ExternalLink } from "lucide-react";

// --- TYPE DEFINITIONS & DATA ---

type UploadUrls = Record<string, { 
    frontUrl: string | null; 
    backUrl: string | null;
    frontFileName: string | null; // NEW: Store original file name
    backFileName: string | null;  // NEW: Store original file name
}>;
type UploadSide = 'frontUrl' | 'backUrl';

const documents = [
  { label: "Aadhaar Card", key: "aadhar", instructions: ["Front side must clearly show photo and address.", "Back side must clearly show all details."], requiresBack: true },
  { label: "PAN Card", key: "pan", instructions: ["Front side only, back is optional.", "Ensure signature and photo are clear."], requiresBack: false },
  { label: "ID Card (Company/Govt.)", key: "idcard", instructions: ["Front side only.", "Must be issued by current/previous employer or government body."], requiresBack: false },
  { label: "Passport", key: "passport", instructions: ["Photo page and Address page.", "Ensure validity date is clear."], requiresBack: true },
];

// Initial state for upload URLs
const initialUploadState: UploadUrls = {
  aadhar: { frontUrl: null, backUrl: null, frontFileName: null, backFileName: null },
  pan: { frontUrl: null, backUrl: null, frontFileName: null, backFileName: null },
  idcard: { frontUrl: null, backUrl: null, frontFileName: null, backFileName: null },
  passport: { frontUrl: null, backUrl: null, frontFileName: null, backFileName: null },
};


// --- HELPER COMPONENTS ---

/**
 * Generates a mock URL for successful upload simulation.
 */
const mockUpload = (fileName: string) => {
    // Simulate API delay
    return new Promise<string>((resolve) => {
        setTimeout(() => {
            // Generates a mock URL that includes the file name
            resolve(`https://mockapi.com/uploads/${Date.now()}/${fileName.replace(/[^a-zA-Z0-9\.]/g, '_')}`);
        }, 500);
    });
};

/**
 * Renders the file input and status for a single side (Front or Back) of a document.
 */
const UploadSection = ({ side, uploadKey, currentUrl, fileName, onUpload, disabled = false, isOptional = false }: {
    side: 'Front' | 'Back';
    uploadKey: UploadSide;
    currentUrl: string | null;
    fileName: string | null; // NEW prop
    onUpload: (side: UploadSide, url: string | null, fileName: string | null) => void;
    disabled?: boolean;
    isOptional?: boolean;
}) => {
    const [isUploading, setIsUploading] = useState(false);
    
    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        // Simulate upload and get a mock URL
        const mockUrl = await mockUpload(file.name);
        onUpload(uploadKey, mockUrl, file.name); // Pass URL and file name
        setIsUploading(false);

        // Reset the file input value so the same file can be selected again
        e.target.value = '';
    };

    const handleRemove = () => {
        onUpload(uploadKey, null, null); // Pass null for both URL and file name to clear
    };

    const isUploaded = !!currentUrl;
    const buttonLabel = isUploaded ? 'Change File' : `Select ${side} Side`;
    
    // Determine file extension for icon
    const getFileIcon = (name: string | null) => {
        if (!name) return File;
        const extension = name.split('.').pop()?.toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif'].includes(extension || '')) {
            return FileImage;
        }
        return FileText; // Default for PDF/other
    };

    const FileIcon = getFileIcon(fileName);

    return (
        <div className="flex flex-col">
            <label className="text-sm font-medium text-slate-700 mb-1.5 flex items-center justify-between">
                {side} Side {isOptional && <span className="text-xs font-normal text-slate-500">(Optional)</span>}
            </label>
            <div className="flex items-center gap-3">
                <input
                    id={`${uploadKey}-input`}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileSelect}
                    className="hidden"
                    disabled={isUploading || disabled}
                />
                
                {/* Custom Upload Button */}
                <label 
                    htmlFor={`${uploadKey}-input`} 
                    className={`
                        flex-1 flex items-center justify-center gap-2 
                        px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer transition-colors
                        ${isUploaded ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-blue-600 text-white hover:bg-blue-700'}
                        ${disabled ? 'bg-slate-300 cursor-not-allowed' : ''}
                    `}
                >
                    {isUploading ? (
                        <>
                            <UploadCloud size={16} className="animate-bounce" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <FileUp size={16} />
                            {buttonLabel}
                        </>
                    )}
                </label>

                {/* Status Indicator */}
                <div className="flex items-center text-xs sm:text-sm whitespace-nowrap min-w-[100px]">
                    {isUploaded ? (
                        <>
                            <CheckCircle size={18} className="text-green-500 mr-1" />
                            <span className="text-green-700 font-semibold">Ready</span>
                        </>
                    ) : (
                        <>
                            <XCircle size={18} className="text-red-400 mr-1" />
                            <span className="text-slate-500">Pending</span>
                        </>
                    )}
                </div>
            </div>
            
            {/* --- NEW: PREVIEW/STATUS BLOCK --- */}
            <AnimatePresence>
                {isUploaded && currentUrl && fileName && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="mt-3 flex items-center justify-between p-2.5 bg-slate-100 rounded-lg border border-slate-200"
                    >
                        <div className="flex items-center gap-2 truncate">
                            <FileIcon size={20} className="text-blue-500 shrink-0" />
                            <span className="text-xs text-slate-700 truncate font-mono">{fileName}</span>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <a 
                                href={currentUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                title="View uploaded file (Mock URL)"
                            >
                                View File
                                <ExternalLink size={14} className="ml-1" />
                            </a>
                             {/* Remove Button */}
                            <button 
                                type="button" 
                                onClick={handleRemove} 
                                title="Remove Document"
                                className="p-0.5 rounded-full text-red-600 hover:bg-red-100 transition-colors"
                            >
                                <XCircle size={20} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

/**
 * Main card container for a single document type.
 */
const DocumentCard = ({ doc, uploaded, handleFileUpload }: {
    doc: typeof documents[0];
    uploaded: UploadUrls[keyof UploadUrls];
    handleFileUpload: (key: string, side: UploadSide, url: string | null, fileName: string | null) => void;
}) => {
    const isCompleted = !!uploaded.frontUrl && (!doc.requiresBack || !!uploaded.backUrl);

    // Handler specific to this card's key
    const onUpload = (side: UploadSide, url: string | null, fileName: string | null) => {
        handleFileUpload(doc.key, side, url, fileName);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`
                p-4 sm:p-6 rounded-xl shadow-lg border-2 transition-all duration-300
                ${isCompleted ? 'border-green-300 bg-green-50/50' : 'border-slate-200 bg-white'}
            `}
        >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                    <FileText size={20} className="text-blue-600" />
                    {doc.label}
                </h3>
                {isCompleted && <CheckCircle size={24} className="text-green-600" aria-label="All pages uploaded" />}
            </div>

            {/* Instructions */}
            <div className="mb-6 p-3 bg-blue-50/70 border border-blue-200 rounded-lg">
                <p className="text-xs font-semibold text-blue-800 mb-1">Upload Instructions:</p>
                <ul className="list-disc list-inside space-y-0.5 text-xs text-blue-700">
                    {doc.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                    ))}
                </ul>
            </div>

            {/* Upload Sections */}
            <div className="grid grid-cols-1 gap-6">
                <UploadSection
                    side="Front"
                    uploadKey="frontUrl"
                    currentUrl={uploaded.frontUrl}
                    fileName={uploaded.frontFileName}
                    onUpload={onUpload}
                />
                
                {doc.requiresBack && (
                    <UploadSection
                        side="Back"
                        uploadKey="backUrl"
                        currentUrl={uploaded.backUrl}
                        fileName={uploaded.backFileName}
                        onUpload={onUpload}
                    />
                )}
                
                {/* Handle PAN Card/Single-page optional back side */}
                {!doc.requiresBack && (
                    <UploadSection
                        side="Back"
                        uploadKey="backUrl"
                        currentUrl={uploaded.backUrl}
                        fileName={uploaded.backFileName}
                        onUpload={onUpload}
                        isOptional={true}
                    />
                )}
            </div>
        </motion.div>
    );
};


// --- MAIN COMPONENT ---

const Identification = () => {
    const [uploaded, setUploaded] = useState<UploadUrls>(initialUploadState);

    // Global handler to update the state based on the document key, side, URL, and file name
    const handleFileUpload = (docKey: string, side: UploadSide, url: string | null, fileName: string | null) => {
        const fileNameKey = side === 'frontUrl' ? 'frontFileName' : 'backFileName';
        setUploaded((prev) => ({
            ...prev,
            [docKey]: {
                ...prev[docKey],
                [side]: url,
                [fileNameKey]: fileName, // Store the file name
            },
        }));
    };
    
    // Check if all *required* documents (Aadhar, Pan, ID, Passport) are uploaded
    const isReadyToSave = documents.every(doc => {
        // Must have front URL
        if (!uploaded[doc.key]?.frontUrl) return false;
        // If it requires a back side (Aadhar, Passport), the back URL must also exist
        if (doc.requiresBack && !uploaded[doc.key]?.backUrl) return false;
        return true;
    });

    // Simple reset function for Cancel button
    const handleCancel = () => {
        setUploaded(initialUploadState);
        console.log("Uploads cancelled/reset.");
    };

    const handleSave = () => {
        if (isReadyToSave) {
            console.log("Saving uploaded documents:", uploaded);
            // TODO: Final API call to save all URLs/data to backend
            alert('Documents submitted successfully! Check console for data structure.');
        } else {
            alert('Please complete all required document uploads before saving.');
        }
    };

    // Replace the default alert() with a custom modal in a real app
    const alert = (message: string) => {
        console.warn(message);
        window.alert(message);
    };


    return (
        <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-slate-800 pt-2">Document Submission</h2>
            <p className="text-slate-600 text-sm">Please upload the front and back sides of your identification documents. *Required documents must be fully completed to submit.</p>
            
            {/* --- GENERAL GUIDELINES SECTION --- */}
            <div className="p-4 bg-yellow-50/70 border-l-4 border-yellow-400 rounded-lg shadow-sm">
                <h3 className="flex items-center text-base font-semibold text-yellow-800 mb-2">
                    <AlertTriangle size={18} className="mr-2" />
                    General Document Guidelines
                </h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-yellow-700">
                    <li>**File Format:** Only **PDF, JPG, or PNG** formats are accepted.</li>
                    <li>**File Size:** Each uploaded file must not exceed **5 MB**.</li>
                    <li>**Clarity:** Ensure the document is well-lit, uncropped, and all text is clearly legible without glare.</li>
                    <li>**Validity:** Documents must be valid and not expired.</li>
                </ul>
            </div>
            
            {/* Document Cards */}
            <div className="space-y-6">
                {documents.map((doc) => (
                    <DocumentCard
                        key={doc.key}
                        doc={doc}
                        uploaded={uploaded[doc.key]}
                        handleFileUpload={handleFileUpload}
                    />
                ))}
            </div>

            {/* Save + Cancel buttons */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-6 border-t border-slate-200">
                <button 
                    onClick={handleCancel}
                    className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 text-sm font-medium text-slate-700 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={handleSave}
                    disabled={!isReadyToSave}
                    className={`
                        px-6 py-2 text-white font-semibold rounded-lg text-sm transition-colors shadow-lg
                        ${isReadyToSave 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-400 cursor-not-allowed'
                        }
                    `}
                >
                    Save & Submit Documents
                </button>
            </div>
        </div>
    );
};

export default Identification;