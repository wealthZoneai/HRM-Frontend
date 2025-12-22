import React, { useState } from "react";
import { policiesData } from "./data";
import type { PolicyItem } from "./types";

const Policies: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(
    policiesData[0]?.id || null
  );

  const toggleAccordion = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

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

        {/* Accordion */}
        <div className="space-y-3">
          {policiesData.map((policy: PolicyItem) => {
            const isOpen = openId === policy.id;

            return (
              <div
                key={policy.id}
                className="border border-slate-200 rounded-xl overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggleAccordion(policy.id)}
                  className={`
                    w-full flex justify-between items-center
                    px-4 sm:px-5 py-3 sm:py-4
                    text-left text-sm sm:text-base font-medium
                    transition
                    ${
                      isOpen
                        ? "bg-blue-50 text-blue-700"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100"
                    }
                  `}
                >
                  <span>{policy.title}</span>
                  <span
                    className={`transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-4 sm:px-5 py-4 bg-white border-t border-slate-200">
                    <ol className="list-decimal pl-4 sm:pl-5 space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {policy.content.map((item, index) => (
                        <li
                          key={index}
                          className="marker:font-semibold marker:text-blue-600"
                        >
                          {item}
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Policies;
