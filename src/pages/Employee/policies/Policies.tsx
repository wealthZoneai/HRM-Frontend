import { useState } from "react";
import Tabs from "./Tabs";
import PolicyContent from "./PolicyContent";
import { policyContent } from "./policyData"; // Make sure this path is correct

export default function Policies() {
  const [activeTab, setActiveTab] = useState("companyPolicies");

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl p-8 shadow-md border border-gray-100">
      {/* --- ADDED: Title --- */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Policies & Guidelines
      </h2>
      {/* --------------------- */}

      <Tabs activeTab={activeTab} onChange={setActiveTab} />

      <PolicyContent items={policyContent[activeTab]} />
    </div>
  );
}