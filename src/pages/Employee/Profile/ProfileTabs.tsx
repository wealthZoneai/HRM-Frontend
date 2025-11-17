import { useState } from "react";
import ContactInformation from "./tabs/ContactInformation";
import JobInformation from "./tabs/JobInformation";
import BankDetails from "./tabs/BankDetails";
import Identification from "./tabs/Identification";
import PFDetails from "./tabs/PFDetails";

const tabs = ["Contact Information", "Job Information", "Bank Details", "Identification", "PF Details"];

const ProfileTabs = () => {
  const [active, setActive] = useState(0);

  const renderTab = () => {
    switch (active) {
      case 0: return <ContactInformation />;
      case 1: return <JobInformation />;
      case 2: return <BankDetails />;
      case 3: return <Identification />;
      case 4: return <PFDetails />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm">
      <div className="border-b flex gap-2 sm:gap-6 p-3 sm:p-4 overflow-x-auto">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`pb-2 text-xs sm:text-sm font-medium whitespace-nowrap ${
              active === idx ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-3 sm:p-6">{renderTab()}</div>
    </div>
  );
};

export default ProfileTabs;
