import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    UploadCloud,
    X,
    CheckCircle,
    Eye,
    Edit, 
    AlertCircle,
    Image as ImageIcon,
    Loader2
} from "lucide-react";
import { showError, showSuccess } from "../../../../utils/toast";
import { UpdateMyIdentification, GetMySensitiveData, PrivateAxios } from "../../../../Services/apiHelpers";

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
    isExisting?: boolean; 
}

interface DocumentState {
    front: UploadedFile | null;
    back: UploadedFile | null;
}

type AllDocumentsState = Record<string, DocumentState>;

// --- DATA ---

const documents: DocumentType[] = [
    { id: "aadhar", label: "Aadhaar Card", requiresBack: true },
    { id: "pan", label: "PAN Card", requiresBack: true },
    { id: "passport", label: "Passport", requiresBack: true, isOptional: true },
];

const commonGuidelines = [
    "Ensure the photo and details are clearly visible.",
    "Supported formats: JPG, PNG, PDF (Max 5MB).",
    "Front side is mandatory for all documents.",
    "Back side is required for Aadhaar Card and Passport.",
    "Ensure the documents are valid and not expired."
];

// --- COMPONENTS ---

const PreviewModal = ({ file, onClose }: { file: UploadedFile | null; onClose: () => void; }) => {
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
                        <img src={file.url} alt="Preview" className="max-w-full h-auto rounded-md shadow-sm" />
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

const UploadCard = ({ file, onUpload, onPreview, label }: any) => {
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
                        <p className="text-xs text-gray-400 mt-1">{file.isExisting ? "Existing" : "New Upload"}</p>
                    </div>

                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2 backdrop-blur-[1px]">
                        <button onClick={onPreview} className="p-2 bg-white text-blue-600 rounded-full shadow-md hover:scale-110">
                            <Eye size={18} />
                        </button>
                        
                        {/* ✅ Edit Button: Triggers hidden file input to select a new document */}
                        <label className="p-2 bg-white text-blue-500 rounded-full shadow-md hover:scale-110 cursor-pointer">
                            <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={onUpload} />
                            <Edit size={18} />
                        </label>
                    </div>
                </div>
            ) : (
                <label className="cursor-pointer group block">
                    <input type="file" className="hidden" accept=".jpg,.jpeg,.png,.pdf" onChange={onUpload} />
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 h-40 flex flex-col items-center justify-center gap-2 transition-colors group-hover:border-blue-400 group-hover:bg-blue-50/30">
                        <div className="p-3 bg-gray-100 rounded-full group-hover:bg-blue-100 transition-colors">
                            <UploadCloud size={24} className="text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-600 group-hover:text-blue-600">Click to upload</p>
                        </div>
                    </div>
                </label>
            )}
        </div>
    );
};

const Identification = ({ onRefresh }: { onRefresh?: () => void }) => {
    const [docState, setDocState] = useState<AllDocumentsState>({
        aadhar: { front: null, back: null },
        pan: { front: null, back: null },
        passport: { front: null, back: null },
    });

    const [rawFiles, setRawFiles] = useState<Record<string, File | null>>({});
    const [hasChanges, setHasChanges] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [previewFile, setPreviewFile] = useState<UploadedFile | null>(null);

    const fetchAuthImage = async (url: string) => {
        try {
            const response = await PrivateAxios.get(url, {
                responseType: 'blob',
                requiresAuth: true
            });
            return URL.createObjectURL(response.data);
        } catch (error) {
            console.error("Error fetching protected image:", error);
            return null;
        }
    };

    const loadSensitiveData = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = await GetMySensitiveData();
            const sensitiveData = response?.data?.data; 
            
            if (sensitiveData) {
                const getDoc = async (url?: string | null, name?: string): Promise<UploadedFile | null> => {
                    if (!url) return null;
                    const authUrl = await fetchAuthImage(url);
                    return authUrl 
                        ? { url: authUrl, name: name || "Document", type: "image/jpeg", isExisting: true } 
                        : null;
                };

                const [af, ab, pf, pb, passF, passB] = await Promise.all([
                    getDoc(sensitiveData.aadhaar_front_image_url, "Aadhaar Front"),
                    getDoc(sensitiveData.aadhaar_back_image_url, "Aadhaar Back"),
                    getDoc(sensitiveData.pan_front_image_url, "PAN Front"),
                    getDoc(sensitiveData.pan_back_image_url, "PAN Back"),
                    getDoc(sensitiveData.passport_front_image_url, "Passport Front"),
                    getDoc(sensitiveData.passport_back_image_url, "Passport Back"),
                ]);

                setDocState({
                    aadhar: { front: af, back: ab },
                    pan: { front: pf, back: pb },
                    passport: { front: passF, back: passB },
                });
                setHasChanges(false);
            }
        } catch (error: any) {
            showError("Failed to fetch identification data.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadSensitiveData();
    }, [loadSensitiveData]);

    const handleUpload = (docId: string, side: UploadSide, file: File) => {
        if (!file) return;

        // ✅ Logic: Block upload if file exceeds 5MB
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
            showError("File size exceeds 5MB limit. Please upload a smaller file.");
            return;
        }

        setDocState(prev => ({
            ...prev,
            [docId]: {
                ...prev[docId],
                [side]: { url: URL.createObjectURL(file), name: file.name, type: file.type, isExisting: false }
            }
        }));

        // Mapping local ID keys to the IIdentificationBody payload keys expected by apiHelper
        const payloadKey = `${docId === 'aadhar' ? 'aadhaar' : docId}_${side}_image` as any;
        setRawFiles(prev => ({ ...prev, [payloadKey]: file }));
        setHasChanges(true);
    };

    const handleUpdate = async () => {
        setIsUpdating(true);
        try {
            // ✅ Logic: Update Database using the stagged rawFiles and UpdateMyIdentification helper
            await UpdateMyIdentification(rawFiles as any);
            showSuccess("Documents updated successfully!");
            setHasChanges(false);
            setRawFiles({}); 
            
            if (onRefresh) onRefresh();
            await loadSensitiveData();
        } catch (error: any) {
            showError(error?.response?.data?.message || "Failed to update documents.");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex h-64 items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    const isSubmitEnabled = hasChanges && !isUpdating;

    return (
        <div className="max-w-340 mx-auto space-y-8 pb-10">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold text-gray-900">Identification Documents</h2>
                <p className="text-gray-500">Securely manage your government-issued identification cards.</p>
            </div>

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

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {documents.map(doc => (
                    <div key={doc.id} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
                         <div className="flex flex-col items-center mb-6 border-b border-gray-100 pb-4">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                {doc.label} {!doc.isOptional && <span className="text-red-500">*</span>}
                            </h3>
                        </div>
                        <div className="flex flex-row gap-4 justify-center w-full">
                            <UploadCard 
                                label="Front Side" 
                                file={docState[doc.id]?.front} 
                                onUpload={(e: any) => handleUpload(doc.id, 'front', e.target.files[0])} 
                                onPreview={() => setPreviewFile(docState[doc.id]?.front)} 
                            />
                            <UploadCard 
                                label="Back Side" 
                                file={docState[doc.id]?.back} 
                                onUpload={(e: any) => handleUpload(doc.id, 'back', e.target.files[0])} 
                                onPreview={() => setPreviewFile(docState[doc.id]?.back)} 
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center pt-4 border-t border-gray-200">
                <button
                    disabled={!isSubmitEnabled}
                    className={`px-12 py-3 rounded-xl font-semibold shadow-lg transition-all transform min-w-60 flex items-center justify-center gap-2
                        ${isSubmitEnabled
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none"
                        }`}
                    onClick={handleUpdate}
                >
                    {isUpdating && <Loader2 className="w-5 h-5 animate-spin" />}
                    {isUpdating ? "Updating..." : "Update Documents"}
                </button>
            </div>

            {previewFile && <PreviewModal file={previewFile} onClose={() => setPreviewFile(null)} />}
        </div>
    );
};

export default Identification;