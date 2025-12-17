import { useState } from "react";
import ContactInformation from "./tabs/ContactInformation";
import JobInformation from "./tabs/JobInformation";
import BankDetails from "./tabs/BankDetails";
import Identification from "./tabs/Identification";
import PFDetails from "./tabs/PFDetails";

const tabs = [
  { full: "Personal Information", short: "Personal" },
  { full: "Job Information", short: "Job Info" },
  { full: "Bank Details", short: "Bank" },
  { full: "Identification", short: "ID" },
  // { full: "PF Details", short: "PF" }
];

const ProfileTabs = ({ data }: { data?: any }) => {
  const [active, setActive] = useState(0);

  const renderTab = () => {
    switch (active) {
      case 0: return <ContactInformation data={data} />;
      case 1: return <JobInformation data={data} />;
      case 2: return <BankDetails data={data} />; // Assuming BankDetails will also be updated
      case 3: return <Identification data={data} />;
      case 4: return <PFDetails />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm">
      <div className="border-b flex gap-1 p-2 sm:p-4 overflow-x-auto scrollbar-hide">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`px-2.5 sm:px-3 py-2 text-xs sm:text-sm font-medium whitespace-nowrap rounded-t-lg transition-colors min-w-10 sm:min-w-0 ${active === idx
              ? "border-b-2 border-blue-600 text-blue-600 bg-blue-50"
              : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
          >
            <span className="hidden sm:inline">{tab.full}</span>
            <span className="sm:hidden">{tab.short}</span>
          </button>
        ))}
      </div>

      <div className="p-4 sm:p-6">{renderTab()}</div>
    </div>
  );
};

export default ProfileTabs;
