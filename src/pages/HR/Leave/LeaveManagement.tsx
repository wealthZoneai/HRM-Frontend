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
import { fetchHRLeaves, fetchLeaveDashboardStats, hrApproveLeave, hrDeclineLeave } from "../../../store/slice/leaveSlice";

const HrLeaveManagement = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { hrLeaves, stats } = useSelector((state: RootState) => state.leave);

    const [openNotification, setOpenNotification] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [declineModal, setDeclineModal] = useState(false);
    const [applyModal, setApplyModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState<"All" | "Pending">("All");

    const [selectedRow, setSelectedRow] = useState<LeaveRow | null>(null);

    useEffect(() => {
        dispatch(fetchHRLeaves());
        dispatch(fetchLeaveDashboardStats());
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
        const updatedNotifications = notifications.map((n) =>
            n.id === notification.id ? { ...n, isRead: true } : n
        );
        setNotifications(updatedNotifications);

        // Find the leave row for this notification if possible, or just open the first one for demo
        const row = leaveRows.find(r => r.name.includes(notification.name)) || leaveRows[0];
        if (row) {
            setSelectedRow(row);
            setViewModal(true);
        }
        setOpenNotification(false);
    };

    const handleApprove = () => {
        if (!selectedRow) return;
        dispatch(hrApproveLeave({ id: selectedRow.id }))
            .unwrap()
            .then(() => {
                setViewModal(false);
            })
            .catch((err) => {
                alert(err || "Failed to approve leave");
            });
    };

    const handleDecline = () => {
        setViewModal(false);
        setDeclineModal(true);
    };

    const handleDeclineSubmit = (text: string) => {
        if (!selectedRow) return;
        dispatch(hrDeclineLeave({ id: selectedRow.id, remarks: text }))
            .unwrap()
            .then(() => {
                setDeclineModal(false);
            })
            .catch((err) => {
                alert(err || "Failed to decline leave");
            });
    };

    const summaryCardData = [
        {
            title: "Today's Present",
            value: stats?.present_today?.toString() ?? "0",
            icon: <FiUsers size={22} className="text-white" />,
            color: "bg-blue-600",
        },
        {
            title: "Today's Absent",
            value: stats?.absent_today?.toString() ?? "0",
            icon: <FiUserX size={22} className="text-white" />,
            color: "bg-red-500",
        },
        {
            title: "Leave Request",
            value: stats?.leave_requests?.toString() ?? "0",
            icon: <FiClock size={22} className="text-white" />,
            color: "bg-yellow-500",
            onClick: () => setFilterStatus("Pending"),
        },
    ];

    return (
        <div className="p-6">
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

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-5 ">
                {summaryCardData.map((card, index) => (
                    <LeaveDashboardCards key={index} {...card} />
                ))}
            </div>

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

            <LeaveTable
                data={filteredRows}
                onView={(row) => {
                    setSelectedRow(row);
                    setViewModal(true);
                }}
            />

            <LeaveViewModal
                isOpen={viewModal}
                data={selectedRow}
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
