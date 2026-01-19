import React, { useState } from "react";
import LeadDashboardTab from "./tabs/LeadDashboardTab";
import LeadTasksTab from "./tabs/LeadTasksTab";
import LeadProjectsTab from "./tabs/LeadProjectsTab";
import LeadTeamMembersTab from "./tabs/LeadTeamMembersTab";
import LeadLeaveManagementTab from "./tabs/LeadLeaveManagementTab";
import TLAnnouncementModal from "./tabs/TLAnnouncementModal";
import { CreateTLAnnouncement } from "../../Services/apiHelpers";
import { toast } from "react-toastify";
import { FiPlus } from "react-icons/fi";

const LeadStatus: React.FC = () => {
    const [activeTab, setActiveTab] = useState("Dashboard");
    const [isAnnouncementModalOpen, setIsAnnouncementModalOpen] = useState(false);

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

    const handleCreateAnnouncement = async (formData: any) => {
        try {
            await CreateTLAnnouncement(formData);
            toast.success("Announcement created successfully");
            setIsAnnouncementModalOpen(false);
        } catch (error: any) {
            console.error("Failed to create announcement", error);
            const errorMsg = error.response?.data?.message || error.response?.data?.detail || "Failed to create announcement";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="flex justify-between">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Lead Status</h1>
                    <p className="text-gray-500">Manage your team, projects, and tasks.</p>
                </div>
                <div className="">
                    <button
                        onClick={() => setIsAnnouncementModalOpen(true)}
                        className="flex items-center gap-2 bg-blue-700 rounded-lg px-4 py-2 text-white hover:bg-blue-800 transition"
                    >
                        <FiPlus />
                        Make Announcement
                    </button>
                </div>
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

            <TLAnnouncementModal
                isOpen={isAnnouncementModalOpen}
                onClose={() => setIsAnnouncementModalOpen(false)}
                onSubmit={handleCreateAnnouncement}
            />
        </div>
    );
};

export default LeadStatus;
