import  { useEffect, useState } from "react";
import { getPolicies, CreatePolicy } from "../../../Services/apiHelpers";
import AddPolicyModal from "./AddPolicyModal";
import type { PolicyItem } from "../../../pages/Employee/policies/types";
import { FiPlus, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

export default function HRPolicies() {
  const [open, setOpen] = useState(false);
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPolicies = async () => {
    setLoading(true);
    try {
      const res = await getPolicies();
      const data = res.data?.data || res.data || [];
      const formatted: PolicyItem[] = data.map((p: any) => ({
        id: p.id?.toString() || Math.random().toString(),
        title: p.title,
        content: Array.isArray(p.content) ? p.content : (p.content ? [p.content] : []),
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

  const handleCreate = async (form: { title: string; content: string[] }) => {
    try {
      await CreatePolicy({ title: form.title, content: form.content });
      toast.success("Policy created");
      fetchPolicies();
    } catch (err) {
      console.error("Create policy failed", err);
      const errorMsg = (err as any).response?.data ? JSON.stringify((err as any).response.data) : "Failed to create policy";
      toast.error(errorMsg);
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
            policies.map((policy) => (
              <div key={policy.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">{policy.title}</h3>
                </div>
                <ol className="list-decimal pl-5 mt-3 text-sm text-gray-700 space-y-1">
                  {policy.content.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ol>
              </div>
            ))
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
    </div>
  );
}
