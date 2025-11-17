import React from 'react';
import type { PolicyItem } from './types';

interface PolicyTabsProps {
  tabs: PolicyItem[];
  activeTab: string;
  onTabClick: (id: string) => void;
}
const PolicyTabs: React.FC<PolicyTabsProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <nav className="flex border-b border-gray-200">
      {/* This div handles the mobile responsiveness.
        It allows horizontal scrolling without breaking the layout.
        The 'scrollbar-hide' class is optional (requires a plugin 'tailwind-scrollbar-hide').
      */}
      <div className="flex -mb-px overflow-x-auto scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={`
              shrink-0 whitespace-nowrap px-6 py-4 font-semibold text-sm
              transition-colors duration-200 ease-in-out
              ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default PolicyTabs;