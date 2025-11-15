import TabButton from "./TabButton";
import { policyTabs } from "./policyData"; // Make sure this path is correct

interface Props {
  activeTab: string;
  onChange: (key: string) => void;
}

export default function Tabs({ activeTab, onChange }: Props) {
  return (
    // Creates the light gray background for the pill tabs
    <div className="flex gap-2 bg-gray-100 p-1.5 rounded-lg">
      {policyTabs.map((tab) => (
        <TabButton
          key={tab.key}
          label={tab.label}
          active={activeTab === tab.key}
          onClick={() => onChange(tab.key)}
        />
      ))}
    </div>
  );
}