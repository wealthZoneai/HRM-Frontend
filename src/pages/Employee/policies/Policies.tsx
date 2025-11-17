import React, { useState } from "react";
import { policiesData } from "./data";
import type { PolicyItem } from "./types";

const Policies: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(policiesData[0].id);
  const [open, setOpen] = useState<boolean>(false); // mobile dropdown toggle

  const activePolicy: PolicyItem =
    policiesData.find((policy) => policy.id === activeId) || policiesData[0];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">
            Company Policies & Guidelines
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500">
            Review the key policies that govern your employment and workplace conduct.
          </p>
        </header>

        {/* MOBILE: custom dropdown selector */}
        <div className="md:hidden mb-4 relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="w-full flex justify-between items-center bg-slate-50 border border-slate-300 rounded-lg py-2.5 px-3 text-sm font-medium text-slate-700 shadow-sm"
          >
            {activePolicy.title}
            <span className="text-slate-500">{open ? "▲" : "▼"}</span>
          </button>

          {open && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg z-20 animate-fadeIn overflow-hidden">
              {policiesData.map((policy) => (
                <button
                  key={policy.id}
                  onClick={() => {
                    setActiveId(policy.id);
                    setOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm 
                    ${
                      policy.id === activeId
                        ? "bg-blue-50 text-blue-700 font-semibold"
                        : "text-slate-700"
                    }
                    hover:bg-slate-100 transition
                  `}
                >
                  {policy.title}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* DESKTOP + TABLET: sidebar + content */}
        <div className="grid grid-cols-1 md:grid-cols-[220px,1fr] gap-4 sm:gap-6">
          {/* Sidebar – visible only on md+ */}
          <aside className="hidden md:flex md:flex-col md:gap-2">
            {policiesData.map((policy) => {
              const isActive = policy.id === activeId;
              return (
                <button
                  key={policy.id}
                  onClick={() => setActiveId(policy.id)}
                  className={`text-left rounded-xl border text-sm py-2.5 px-3 transition-all
                    ${
                      isActive
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow-sm"
                        : "bg-slate-50 border-transparent text-slate-600 hover:bg-slate-100 hover:border-slate-200"
                    }
                  `}
                >
                  {policy.title}
                </button>
              );
            })}
          </aside>

          {/* Content Area */}
          <article className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 sm:p-5 lg:p-6 max-h-[70vh] overflow-y-auto">
            <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-3 sm:mb-4">
              {activePolicy.title}
            </h3>

            <ol className="list-decimal pl-4 sm:pl-5 space-y-3 sm:space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {activePolicy.content.map((item, index) => (
                <li
                  key={index}
                  className="marker:font-semibold marker:text-blue-600"
                >
                  {item}
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Policies;
