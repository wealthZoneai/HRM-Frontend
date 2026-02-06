import React from "react";
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
}

const AddPolicyModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [form, setForm] = React.useState<FormData>({ title: "", content: [""], policy_type: "policy" });
  const [errors, setErrors] = React.useState<{ [k: string]: string }>({});

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
    const nonEmpty = form.content.filter(c => c.trim() !== "");
    if (nonEmpty.length === 0) e.content = "Add at least one policy point";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSubmit(form);
    onClose();
    setForm({ title: "", content: [""], policy_type: "policy" });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl rounded-2xl shadow-2xl bg-white animate-zoomIn max-h-[90vh] overflow-y-auto">

        <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-5 text-white flex justify-between items-center sticky top-0 z-10">
          <div>
            <h2 className="text-2xl font-semibold">Add New Policy</h2>
            <p className="text-sm opacity-80">Create a policy and add points that employees will see</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/20 transition-colors">
            <FiX size={24} />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">Policy Type <span className="text-red-500">*</span></label>
            <select
              value={form.policy_type}
              onChange={(e) => setForm({ ...form, policy_type: e.target.value })}
              className="mt-2 w-full px-4 py-2.5 rounded-xl border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            >
              <option value="policy">Company Policy</option>
              <option value="terms">Terms & Conditions</option>
              <option value="resignation">Resignation Rules</option>
              <option value="separation">Separation Rules</option>
            </select>
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">Policy Title <span className="text-red-500">*</span></label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter policy title"
              className={`mt-2 w-full px-4 py-2.5 rounded-xl border ${errors.title ? 'border-red-500' : 'bg-gray-50'} focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            />
            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700">Policy Points <span className="text-red-500">*</span></label>

            <div className="mt-3 space-y-3">
              {form.content.map((c, idx) => (
                <div key={idx} className="flex gap-2 items-start">
                  <textarea
                    value={c}
                    onChange={(e) => updateContentAt(idx, e.target.value)}
                    placeholder={`Point ${idx + 1}`}
                    className="flex-1 px-4 py-3 rounded-xl border bg-gray-50 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all h-20"
                  />
                  <div className="flex flex-col gap-2">
                    <button type="button" onClick={addContent} className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      <FiPlus />
                    </button>
                    <button type="button" onClick={() => removeContent(idx)} className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200">
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button onClick={onClose} className="px-5 py-2 rounded-xl border text-gray-700 bg-gray-100 hover:bg-gray-200 transition">Cancel</button>
            <button onClick={handleSubmit} className="px-6 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md transition">Create Policy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPolicyModal;
