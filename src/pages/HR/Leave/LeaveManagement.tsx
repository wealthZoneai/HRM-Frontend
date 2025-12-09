import { useState } from "react";
import LeaveDashboardCards from "./LeaveDashboardCards";
import LeaveNotificationPopup from "./LeaveNotificationPopup";
import LeaveTable, { type LeaveRow } from "./LeaveTable";
import LeaveViewModal from "./LeaveViewModal";
import LeaveDeclineModal from "./LeaveDeclineModal";
import HrApplyLeaveModal from "./HrApplyLeaveModal";
import { FiAlertTriangle, FiClock, FiUsers, FiUserX } from "react-icons/fi";

const HrLeaveManagement = () => {
    const [openNotification, setOpenNotification] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [applyModal, setApplyModal] = useState(false);

    const [_, setSelectedRow] = useState<LeaveRow | null>(null);

    // Dummy data
    const leaveRows: LeaveRow[] = [
        {
            id: "1",
            name: "Habeeb",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "2",
            name: "srikanth",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
        {
            id: "3",
            name: "ramesh",
            type: "Medical leave",
            from: "4th-June-2023",
            to: "20th-June-2023",
            days: 16,
            reason: "Hospital",
            status: "Pending",
        },
    ];

    const notifications = [
        {
            id: "1",
            name: "Habeeb",
            avatar: "https://i.pravatar.cc/40",
            message: "requested for 16 days medical leave.",
        },
    ];

    const handleSelectNotification = () => {
        setSelectedRow(leaveRows[0]);
        setViewModal(true);
        setOpenNotification(false);
    };

    const handleApprove = () => {
        alert("Leave Approved");
        setViewModal(false);
    };

    const handleDecline = () => {
        setViewModal(false);
        setDeclineModal(true);
    };

    const handleDeclineSubmit = (text: string) => {
        alert("Declined Reason: " + text);
        setDeclineModal(false);
    };
    const summaryCardData = [
        {
            title: "Today's Present",
            value: "32",
            icon: <FiUsers size={22} className="text-white" />,
            color: "bg-blue-600",
        },
        {
            title: "Today's Absent",
            value: "10",
            icon: <FiUserX size={22} className="text-white" />,
            color: "bg-red-500",
        },
        {
            title: "Pending Leave",
            value: "6",
            icon: <FiClock size={22} className="text-white" />,
            color: "bg-yellow-500",
        },
        {
            title: "Declined",
            value: "2",
            icon: <FiAlertTriangle size={22} className="text-white" />,
            color: "bg-gray-600",
        },
    ];


    return (
        <div className="p-6">

            {/* Popups */}
            <LeaveNotificationPopup
                isOpen={openNotification}
                data={notifications}
                onClose={() => setOpenNotification(false)}
                onSelect={handleSelectNotification}
            />

            <HrApplyLeaveModal
                isOpen={applyModal}
                onClose={() => setApplyModal(false)}
            />


            {/* New Leave Request Button */}
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setApplyModal(true)}
                    className="
                        flex items-center gap-2 px-4 py-2
                        bg-blue-600 text-white 
                        rounded-full font-medium 
                        border border-blue-200
                        hover:bg-blue-500 transition
                        "
                >
                    Apply For Leave
                </button>
            </div>


            {/* Dashboard Cards */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-5 ">
                {summaryCardData.map((card, index) => (
                    <LeaveDashboardCards key={index} {...card} />
                ))}
            </div>


            {/* Table */}
            <LeaveTable data={leaveRows} onView={() => setViewModal(true)} />

            <LeaveViewModal
                isOpen={viewModal}
                data={{
                    applicationText: `
                    Lorem ipsum dolor sit amet consectetur. Enim sed faucibus sed bibendum quam. Odio pellentesque augue urna pharetra mattis tincidunt enim. Scelerisque tellus nulla adipiscing eget quis eget nam. Vulputate tincidunt quis a cras consectetur. Sed malesuada tristique nunc tincidunt eget. Tellus enim orci luctus aenean odio cum feugiat. Integer est suspendisse porta nibh. Sed amet dui ut tempor aliquam porttitor urna quis. Nisi aliquet enim proin volutpat integer. Et integer blandit non porta nisl imperdiet faucibus. Morbi dolor ac a auctor est integer orci mattis vel. Blandit in auctor morbi suspendisse eget in.
Est ullamcorper tellus suscipit auctor massa id at aenean pretium. Nisl donec turpis adipiscing ullamcorper nibh suspendisse. Tempor gravida tincidunt gravida tortor justo nulla. Netus mi semper natoque dui dolor cum. Imperdiet blandit augue tellus amet. Dolor aliquet in adipiscing sed nec gravida. Suspendisse purus sed magna congue integer nulla in in varius.
                    ` }}
                onClose={() => setViewModal(false)}
                onApprove={handleApprove}
                onDecline={handleDecline}
            />

            <LeaveDeclineModal
                isOpen={declineModal}
                onClose={() => setDeclineModal(false)}
                onSend={handleDeclineSubmit}
            />
        </div>
    );
};

export default HrLeaveManagement;
