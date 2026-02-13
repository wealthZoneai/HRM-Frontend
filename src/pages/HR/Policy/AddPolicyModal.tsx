import React, { useEffect, useRef, useState } from "react";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";

interface FormData {
  title: string;
  content: string[];
  policy_type: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: FormData) => void;
  onDelete?: (id: string | number) => void;
  initialData?: any | null; 
  loading?: boolean; 
}

const AddPolicyModal: React.FC<Props> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  onDelete, 
  initialData,
  loading = false 
}) => {
  const [form, setForm] = useState<FormData>({ 
    title: "", 
    content: [""], 
    policy_type: "" 
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  // --- ROOT FIX: Immediate Lock System ---
  // 1. We use a Ref for logic because it updates Instantly (Synchronously)
  const isSubmitLocked = useRef(false);
  // 2. We use State purely for visual feedback (disabling the button UI)
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Reset locks when modal opens
      isSubmitLocked.current = false;
      setIsVisualLoading(false);

      if (initialData) {
        setForm({
          title: initialData.title || "",
          policy_type: initialData.policy_type || "",
          content: initialData.description ? initialData.description.split('\n') : [""]
        });
      } else {
        setForm({ title: "", content: [""], policy_type: "" });
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  // Unlock when the parent component signals that loading has finished
  useEffect(() => {
    if (!loading) {
      isSubmitLocked.current = false;
      setIsVisualLoading(false);
    }
  }, [loading]);

  if (!isOpen) return null;

  const updateContentAt = (index: number, value: string) => {
    const next = [...form.content];
    next[index] = value;
    setForm({ ...form, content: next });
  };

  const addContent = () => setForm({ ...form, content: [...form.content, ""] });
  
  const removeContent = (index: number) => {
    const next = form.content.filter((_, i) => i !== index);
    setForm({ ...form, content: next.length ? next : [""] });
  };

  const validate = () => {
    const e: { [k: string]: string } = {};
    if (!form.title.trim()) e.title = "Title is required";
    if (!form.policy_type) e.policy_type = "Please select a policy type";
    if (form.content.every(c => !c.trim())) e.content = "Add at least one policy point";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    // --- ROOT FIX LOGIC ---
    // This check happens synchronously. If the user double clicks, 
    // the second click hits this line and sees 'true' immediately.
    if (isSubmitLocked.current || loading) return; 
    
    if (!validate()) return;

    // 1. Lock the logic instantly
    isSubmitLocked.current = true;
    // 2. Update the UI (triggers render)
    setIsVisualLoading(true);
    
    onSubmit(form);
  };

  const handleDelete = () => {
    if (!loading && !isSubmitLocked.current && onDelete && initialData?.id) {
        // Prevent double delete clicks too
        isSubmitLocked.current = true; 
        onDelete(initialData.id);
    }
  };

  // Combine parent loading state with our local immediate lock
  const isDisabled = loading || isVisualLoading;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[1000] p-4">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center shrink-0">
          <div>
            <h2 className="text-2xl font-semibold">{initialData ? "Edit Policy" : "Add New Policy"}</h2>
            <p className="text-sm opacity-80">Define policy points for your employees</p>
          </div>
          <button 
            onClick={onClose} 
            disabled={isDisabled}
            className="p-2 rounded-full hover:bg-white/20 transition-colors disabled:opacity-50"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
          {/* Policy Type */}
          <div>
            <label className="text-sm font-medium text-gray-700">Policy Type <span className="text-red-500">*</span></label>
            <select
              value={form.policy_type}
              onChange={(e) => setForm({ ...form, policy_type: e.target.value })}
              disabled={isDisabled}
              className={`mt-2 w-full px-4 py-2.5 rounded-xl border ${errors.policy_type ? 'border-red-500' : 'border-gray-300'} bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-60`}
            >
              <option value="">Select Policy Type</option>
              <option value="policy">Company Policy</option>
              <option value="terms">Terms & Conditions</option>
              <option value="resignation">Resignation Rules</option>
              <option value="separation">Separation Rules</option>
            </select>
            {errors.policy_type && <p className="text-red-500 text-xs mt-1">{errors.policy_type}</p>}
          </div>

          {/* Title */}
          <div>
            <label className="text-sm font-medium text-gray-700">Policy Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter policy title"
              disabled={isDisabled}
              className={`mt-2 w-full px-4 py-2.5 rounded-xl border ${errors.title ? 'border-red-500' : 'border-gray-300'} bg-gray-50 placeholder:opacity-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all text-sm disabled:opacity-60`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          {/* Dynamic Content Points */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">Policy Points <span className="text-red-500">*</span></label>
            <div className="space-y-3">
              {form.content.map((c, idx) => (
                <div key={idx} className="flex gap-3 items-start group">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center bg-blue-50 text-blue-600 rounded-full font-bold text-sm border border-blue-100 mt-1">
                    {idx + 1}
                  </div>
                  <textarea
                    value={c}
                    onChange={(e) => updateContentAt(idx, e.target.value)}
                    placeholder={`Describe point...`}
                    disabled={isDisabled}
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-24 text-sm disabled:opacity-60"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeContent(idx)}
                    disabled={isDisabled}
                    className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition-all mt-1 opacity-0 group-hover:opacity-100 disabled:opacity-0"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            
            <button
              type="button"
              onClick={addContent}
              disabled={isDisabled}
              className="mt-4 flex items-center gap-2 text-blue-600 font-semibold text-sm hover:text-indigo-700 transition-colors px-2 py-1 disabled:opacity-50"
            >
              <div className="p-1 bg-blue-100 rounded-full"><FiPlus size={16} /></div>
              Add Another Point
            </button>
            {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content}</p>}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-gray-100 flex justify-end gap-3 bg-gray-50 shrink-0">
          {initialData ? (
            <button 
              type="button" 
              onClick={handleDelete} 
              disabled={isDisabled}
              className="px-6 py-2.5 rounded-xl border border-red-200 text-red-600 bg-red-50 hover:bg-red-600 hover:text-white transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete Policy
            </button>
          ) : (
            <button 
              type="button" 
              onClick={onClose} 
              disabled={isDisabled}
              className="px-6 py-2.5 rounded-xl border border-gray-300 text-gray-700 bg-white hover:bg-gray-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          
          <button 
            type="button" 
            onClick={handleSubmit} 
            disabled={isDisabled}
            className="px-8 py-2.5 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition font-semibold disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center min-w-[140px]"
          >
            {isDisabled ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : (
              initialData ? "Update Policy" : "Create Policy"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPolicyModal;