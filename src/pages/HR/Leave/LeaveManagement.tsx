import { useState, useEffect } from "react";
import LeaveDashboardCards from "./LeaveDashboardCards";
import LeaveNotificationPopup, { type NotificationItem } from "./LeaveNotificationPopup";
import LeaveTable, { type LeaveRow } from "./LeaveTable";
import LeaveViewModal from "./LeaveViewModal";
import LeaveDeclineModal from "./LeaveDeclineModal";
import HrApplyLeaveModal from "./HrApplyLeaveModal";
import { FiClock, FiUsers, FiUserX } from "react-icons/fi";

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchHRLeaves } from "../../../store/slice/leaveSlice";

const HrLeaveManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { hrLeaves } = useSelector((state: RootState) => state.leave);

    const [openNotification, setOpenNotification] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [applyModal, setApplyModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending">("All");

    const [_, setSelectedRow] = useState<LeaveRow | null>(null);

    useEffect(() => {
        dispatch(fetchHRLeaves());
    }, [dispatch]);

    // Map Redux data to frontend LeaveRow interface
    const leaveRows: LeaveRow[] = hrLeaves.map((item: any) => {
        // Determine display status based on backend status
        let displayStatus: "Pending" | "Approved" | "Declined" = "Pending";
        if (["hr_approved", "completed"].includes(item.status)) displayStatus = "Approved";
        else if (["hr_rejected", "tl_rejected", "cancelled"].includes(item.status)) displayStatus = "Declined";

        const firstName = item.profile?.first_name || item.profile?.user?.first_name || "";
        const lastName = item.profile?.last_name || item.profile?.user?.last_name || "";

        return {
            id: item.id.toString(),
            name: `${firstName} ${lastName}`.trim(),
            type: item.leave_type,
            from: item.start_date,
            to: item.end_date,
            days: Number(item.days),
            reason: item.reason,
            status: displayStatus,
        };
    });

    // Filter rows based on status
    const filteredRows = filterStatus === "All"
        ? leaveRows
        : leaveRows.filter(row => row.status === "Pending");

    const [notifications, setNotifications] = useState<NotificationItem[]>([
        {
            id: "1",
            name: "Habeeb",
            avatar: "https://i.pravatar.cc/40",
            message: "requested for 16 days medical leave.",
            isRead: false,
        },
    ]);

    const handleSelectNotification = (notification: NotificationItem) => {
        console.log("Selected notification:", notification);
        const updatedNotifications = notifications.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
        );
        console.log("Updated notifications:", updatedNotifications);
        setNotifications(updatedNotifications);
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
            title: "Leave Request",
            value: "6",
            icon: <FiClock size={22} className="text-white" />,
            color: "bg-yellow-500",
            onClick: () => setFilterStatus("Pending"),
        },
        // {
        //     title: "Declined",
        //     value: "2",
        //     icon: <FiAlertTriangle size={22} className="text-white" />,
        //     color: "bg-gray-600",
        // },
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5 ">
                {summaryCardData.map((card, index) => (
                    <LeaveDashboardCards key={index} {...card} />
                ))}
            </div>


            {/* Table */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {filterStatus === "All" ? "All Leave Requests" : "Pending Requests"}
                </h2>
                {filterStatus !== "All" && (
                    <button
                        onClick={() => setFilterStatus("All")}
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Show All
                    </button>
                )}
            </div>
            <LeaveTable data={filteredRows} onView={() => setViewModal(true)} />

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
