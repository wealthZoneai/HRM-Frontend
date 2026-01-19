import React, { useEffect, useState } from "react";
import { getPolicies } from "../../../Services/apiHelpers";
import { FiChevronDown, FiChevronUp, FiAlertCircle } from "react-icons/fi";
import { toast } from "react-toastify";

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
  'termination': 'Termination Rules'
};

const Policies: React.FC = () => {
  const [policies, setPolicies] = useState<PolicyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    'policy': true,
    'terms': false,
    'resignation': false,
    'termination': false
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

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Company Policies & Guidelines
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review the key policies that govern your employment and workplace conduct.
          </p>
        </header>

        {/* Content */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-20 text-gray-400 animate-pulse">Loading policies...</div>
          ) : policies.length > 0 ? (
            // Group policies by type and render accordions
            Object.keys(POLICY_TYPES_MAP).map((typeKey) => {
              const policiesOfType = policies.filter(p => p.policy_type === typeKey);
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
                              <div className="flex gap-3">
                                <span className="font-bold text-blue-600 shrink-0">{index + 1}.</span>
                                <div className="space-y-2">
                                  {policy.description.split('\n').map((line, lIdx) => (
                                    <p key={lIdx} className="leading-relaxed">{line}</p>
                                  ))}
                                </div>
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
};


export default Policies;
