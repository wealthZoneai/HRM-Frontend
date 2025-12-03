import React, { useState } from "react";
import LeadDashboardTab from "./tabs/LeadDashboardTab";
import LeadTasksTab from "./tabs/LeadTasksTab";
import LeadProjectsTab from "./tabs/LeadProjectsTab";
import LeadTeamMembersTab from "./tabs/LeadTeamMembersTab";
import LeadLeaveManagementTab from "./tabs/LeadLeaveManagementTab";

const LeadStatus: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");

    const tabs = [
        "Dashboard",
        "Tasks",
        "Projects",
        "Team Members",
        "Leave Management",
    ];

    const renderContent = () => {
        switch (activeTab) {
            case "Dashboard":
                return <LeadDashboardTab />;
            case "Tasks":
                return <LeadTasksTab />;
            case "Projects":
                return <LeadProjectsTab />;
            case "Team Members":
                return <LeadTeamMembersTab />;
            case "Leave Management":
                return <LeadLeaveManagementTab />;
            default:
                return <LeadDashboardTab />;
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Lead Status</h1>
                <p className="text-gray-500">Manage your team, projects, and tasks.</p>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 mb-6 overflow-x-auto">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`
              py-2 px-4 text-sm font-medium transition-colors duration-200 whitespace-nowrap
              ${activeTab === tab
                                ? "border-b-2 border-blue-600 text-blue-600"
                                : "text-gray-500 hover:text-gray-700"
                            }
            `}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Content */}
            <div>{renderContent()}</div>
        </div>
    );
};

export default LeadStatus;
