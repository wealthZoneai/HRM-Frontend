import { useEffect, useState } from "react";
import { getPolicies, CreatePolicy, deletePolicy } from "../../../Services/apiHelpers";
import AddPolicyModal from "./AddPolicyModal";
import { FiPlus, FiAlertCircle, FiChevronDown, FiChevronUp, FiTrash2 } from "react-icons/fi";
import { toast } from "react-toastify";
import DeleteConfirmationModal from "../Announcement/DeleteConfirmationModal";

// Define locally since we are adding fields that might not be in the shared type yet
interface PolicyItem {
  id: string;
  title: string;
  description: string;
  content: string[];
  policy_type: string;
}

const POLICY_TYPES_MAP: { [key: string]: string } = {
  'policy': 'Company Policies',
  'terms': 'Terms & Conditions',
  'resignation': 'Resignation Rules',
  'separation': 'Separation Rules'
};

export default function HRPolicies() {
  const [open, setOpen] = useState(false);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingPolicy, setDeletingPolicy] = useState<PolicyItem | null>(null);

  // Accordion state: keep track of which sections are open. default: all closed or first open?
  // Let's keep 'policy' (Company Policies) open by default as per screenshot style
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'policy': true,
    'terms': false,
    'resignation': false,
    'separation': false
  });

  const toggleSection = (type: string) => {
    setOpenSections(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await getPolicies();
      let rawData = res.data;
      console.log(rawData.results)

      // Handle standard DRF pagination
      if (rawData?.results && Array.isArray(rawData.results)) {
        rawData = rawData.results;
      }
      // Handle custom { data: [] } wrapper
      else if (rawData?.data && Array.isArray(rawData.data)) {
        rawData = rawData.data;
      }

      const data = Array.isArray(rawData) ? rawData : [];

      const formatted: PolicyItem[] = data.map((p: any) => ({
        id: p.id?.toString() || Math.random().toString(),
        title: p.title,
        description: p.description,
        content: [],
        policy_type: p.policy_type || 'policy'
      }));
      setPolicies(formatted);
    } catch (err) {
      console.error("Failed to fetch policies", err);
      toast.error("Failed to load policies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPolicies();
  }, []);

  const handleCreate = async (form: { title: string; content: string[]; policy_type: string }) => {
    try {
      // Backend expects 'description' as a string, not 'content' array
      await CreatePolicy({
        title: form.title,
        description: form.content.join('\n'),
        policy_type: form.policy_type
      });
      toast.success("Policy created");
      fetchPolicies();
    } catch (err) {
      console.error("Create policy failed", err);
      const errorMsg = (err as any).response?.data ? JSON.stringify((err as any).response.data) : "Failed to create policy";
      toast.error(errorMsg);
    }
  };

  const handleDeleteClick = (policy: PolicyItem) => {
    setDeletingPolicy(policy);
  };

  const confirmDelete = async () => {
    if (!deletingPolicy) return;
    try {
      await deletePolicy(deletingPolicy.id);
      toast.success("Policy deleted successfully");
      setDeletingPolicy(null);
      fetchPolicies();
    } catch (err) {
      console.error("Delete policy failed", err);
      toast.error("Failed to delete policy");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Policies</h1>
            <p className="text-gray-500 mt-1">Create and manage company policies.</p>
          </div>

          <button
            className="inline-flex items-center justify-center bg-blue-600 text-white px-5 py-2.5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5 hover:bg-blue-700 transition-all duration-200 font-medium"
            onClick={() => setOpen(true)}
          >
            <FiPlus size={18} className="mr-2" /> New Policy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-20 text-gray-400 animate-pulse">Loading policies...</div>
          ) : policies.length > 0 ? (
            // Group policies by type and render accordions
            Object.keys(POLICY_TYPES_MAP).map((typeKey) => {
              const policiesOfType = policies.filter(p => p.policy_type === typeKey);
              // If no policies for this type, do we show empty accordion? Let's show it so they can see structure.

              const isOpen = openSections[typeKey];

              return (
                <div key={typeKey} className="border border-blue-100 rounded-xl overflow-hidden shadow-xs hover:shadow-sm transition-all duration-200">
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleSection(typeKey)}
                    className={`w-full flex items-center justify-between p-4 text-left transition-colors duration-200 ${isOpen ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                  >
                    <span className="font-semibold text-lg">{POLICY_TYPES_MAP[typeKey]}</span>
                    {isOpen ? <FiChevronUp /> : <FiChevronDown />}
                  </button>

                  {/* Accordion Body */}
                  {isOpen && (
                    <div className="bg-white p-5 space-y-4">
                      {policiesOfType.length > 0 ? (
                        <div className="space-y-6">
                          {policiesOfType.map((policy, index) => (
                            <div key={policy.id} className="text-gray-700">
                              {/* 
                                                  The screenshot shows numbered list. 
                                                  If we treat each POLICY object as one item, we number them. 
                                                  If each policy object has multiple lines, we can iterate them too.
                                                  Let's assume each Policy Object is a major bullet point.
                                               */}
                              <div className="flex gap-3 relative group">
                                <span className="font-bold text-blue-600 shrink-0">{index + 1}.</span>
                                <div className="space-y-2 flex-1">
                                  {/* If we want to show title, uncomment next line */}
                                  {/* <h4 className="font-semibold">{policy.title}</h4> */}

                                  {policy.description.split('\n').map((line, lIdx) => (
                                    <p key={lIdx} className="leading-relaxed">{line}</p>
                                  ))}
                                </div>

                                {/* Delete Button - Visible on Hover or Always? Let's make it subtle */}
                                <button
                                  onClick={() => handleDeleteClick(policy)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg absolute right-0 top-0"
                                  title="Delete Policy"
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-gray-400 italic text-sm text-center py-4">No policies of this type added yet.</p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <FiAlertCircle className="mx-auto h-10 w-10 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No policies found</p>
              <p className="text-sm text-gray-400 mt-1">Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      <AddPolicyModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={handleCreate}
      />

      <DeleteConfirmationModal
        isOpen={!!deletingPolicy}
        onClose={() => setDeletingPolicy(null)}
        onConfirm={confirmDelete}
        title="Delete Policy"
        message={`Are you sure you want to delete "${deletingPolicy?.title || 'this policy'}"? This action cannot be undone.`}
      />
    </div>
  );
}
