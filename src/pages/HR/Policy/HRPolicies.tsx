import { useEffect, useState } from "react";
import { getPolicies, CreatePolicy, updatePolicy, deletePolicy } from "../../../Services/apiHelpers";
import AddPolicyModal from "./AddPolicyModal";
import DeleteConfirmationModal from "./DeleteConfirmationModal"; // Import the new modal
import { FiPlus, FiChevronDown, FiChevronUp, FiEdit2 } from "react-icons/fi";
import { toast } from "react-toastify";

// ... (Interface and Maps remain the same) ...
interface PolicyItem {
  id: string;
  title: string;
  description: string;
  policy_type: string;
}

const POLICY_TYPES_MAP: { [key: string]: string } = {
  policy: "Company Policies",
  terms: "Terms & Conditions",
  resignation: "Resignation Rules",
  separation: "Separation Rules",
};

export default function HRPolicies() {
  const [open, setOpen] = useState(false);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New State for Delete Popup
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editingPolicy, setEditingPolicy] = useState<PolicyItem | null>(null);

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    policy: true,
    terms: false,
    resignation: false,
    separation: false,
  });

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await getPolicies();
      setPolicies(res.data?.results || res.data || []);
    } catch (err) {
      toast.error("Failed to load policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPolicies(); }, []);

  const handleOpenAdd = () => { setEditingPolicy(null); setOpen(true); };
  const handleEditClick = (p: PolicyItem) => { setEditingPolicy(p); setOpen(true); };

  // 1. This function is called when you click "Delete" inside AddPolicyModal
  const handleDeleteTrigger = () => {
    // Just open the confirmation popup, don't delete yet
    setIsDeletePopupOpen(true);
  };

  // 2. This function is called when you click "Yes, Delete" in the Confirmation Popup
  const handleFinalDelete = async () => {
    if (!editingPolicy) return;
    
    setDeleteLoading(true);
    try {
      await deletePolicy(editingPolicy.id);
      toast.success("Policy deleted successfully");
      
      // Close both modals
      setIsDeletePopupOpen(false);
      setOpen(false); 
      
      // Refresh list
      fetchPolicies();
    } catch (err) {
      toast.error("Failed to delete policy");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleFormSubmit = async (form: { title: string; content: string[]; policy_type: string }) => {
    try {
      const payload = {
        title: form.title,
        description: form.content.join("\n"),
        policy_type: form.policy_type,
      };

      if (editingPolicy) {
        await updatePolicy(editingPolicy.id, payload);
        toast.success("Policy updated successfully");
      } else {
        await CreatePolicy(payload);
        toast.success("Policy created successfully");
      }
      setOpen(false);
      fetchPolicies();
    } catch (err) {
      toast.error("Operation failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      {/* ... (Your existing Header and Policy List UI code) ... */}
      
      {/* ... 
         (I'm skipping the list rendering code here to save space, 
         keep your existing list rendering logic exactly as it is) 
         ... 
      */}
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex justify-between items-end">
          <div>
             <h1 className="text-3xl font-bold text-gray-900">Policies</h1>
             <p className="text-gray-500 mt-1">Create and manage company policies.</p>
          </div>
          <button onClick={handleOpenAdd} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center hover:bg-blue-700 transition-all font-medium">
            <FiPlus size={18} className="mr-2" /> New Policy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
             <div className="text-center py-20 text-gray-400">Loading...</div>
          ) : (
            Object.keys(POLICY_TYPES_MAP).map((typeKey) => {
              const policiesOfType = policies.filter((p) => p.policy_type === typeKey);
              const isOpen = openSections[typeKey];
              return (
                <div key={typeKey} className="border border-blue-100 rounded-xl overflow-hidden bg-white shadow-sm">
                  <button
                    onClick={() => setOpenSections((prev) => ({ ...prev, [typeKey]: !prev[typeKey] }))}
                    className={`w-full flex items-center justify-between p-4 transition-colors ${isOpen ? "bg-blue-50 text-blue-700" : "text-gray-700"}`}
                  >
                    <span className="font-semibold text-lg">{POLICY_TYPES_MAP[typeKey]}</span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>
                  {isOpen && (
                    <div className="p-5 space-y-6">
                      {policiesOfType.length > 0 ? policiesOfType.map((policy, index) => (
                        <div key={policy.id} className="flex gap-3 relative group">
                          <span className="font-bold text-blue-600 shrink-0">{index + 1}.</span>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-1">{policy.title}</h4>
                            {policy.description.split("\n").map((line, lIdx) => (
                              <p key={lIdx} className="text-gray-600 leading-relaxed">{line}</p>
                            ))}
                          </div>
                          <div className="opacity-30 group-hover:opacity-100 transition-all duration-200 flex gap-1 absolute right-0 top-0">
                            <button onClick={() => handleEditClick(policy)} className="p-2 text-blue-600 bg-white rounded-lg shadow-sm hover:bg-blue-600 hover:text-white transition-all">
                              <FiEdit2 size={20} />
                            </button>
                          </div>
                        </div>
                      )) : <p className="text-center text-gray-400 py-4 italic">No items found.</p>}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* --- MODALS --- */}

      {/* 1. The Edit/Add Modal */}
      <AddPolicyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleFormSubmit}
        onDelete={handleDeleteTrigger} // Pass the trigger function here
        initialData={editingPolicy}
      />

      {/* 2. The NEW Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeletePopupOpen}
        onClose={() => setIsDeletePopupOpen(false)}
        onConfirm={handleFinalDelete}
        loading={deleteLoading}
        title="Delete Policy"
        message={`Are you sure you want to delete the policy "${editingPolicy?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}