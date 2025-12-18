import React, { useEffect, useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchPendingLeaves } from "../../../store/slice/leaveSlice";
import { TLLeaveAction } from "../../../Services/apiHelpers";
import { toast } from "react-toastify";

const LeadLeaveManagementTab: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { pendingLeaves, loading } = useSelector((state: RootState) => state.leave);

    const [selectedReq, setSelectedReq] = useState<any>(null);
    const [actionLoading, setActionLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchPendingLeaves());
    }, [dispatch]);

    // Update selected request when the list changes
    useEffect(() => {
        // If the list is empty, clear selection
        if (pendingLeaves.length === 0) {
            setSelectedReq(null);
            return;
        }

        // If nothing is selected, select the first one
        if (!selectedReq) {
            setSelectedReq(pendingLeaves[0]);
            return;
        }

        // If the selected request is no longer in the list (already processed), select the new first item
        const stillInList = pendingLeaves.find(p => p.id === selectedReq.id);
        if (!stillInList) {
            setSelectedReq(pendingLeaves[0]);
        }
    }, [pendingLeaves]); // only trigger when the data list arrives/updates

    const handleAction = async (id: string | number, action: 'approve' | 'reject') => {
        try {
            setActionLoading(true);
            const res = await TLLeaveAction(id, action);
            if (res.data) {
                toast.success(`Leave ${action}d successfully`);
                dispatch(fetchPendingLeaves());
                setSelectedReq(null);
            }
        } catch (error: any) {
            toast.error(error.response?.data?.detail || `Failed to ${action} leave`);
        } finally {
            setActionLoading(false);
        }
    };

    const teamBalances = [
        { name: "Lithish", used: 15, total: 20, avatar: "L" },
        { name: "Ravi", used: 10, total: 20, avatar: "R" },
        { name: "Pawan", used: 18, total: 20, avatar: "P" },
    ];

    if (loading && pendingLeaves.length === 0) {
        return <div className="p-8 text-center text-gray-500">Loading leave requests...</div>;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE - Leave Overview */}
            <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <button className="py-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">Pending</button>
                    {/* Future could add "History" tab here */}
                </div>

                {/* Leave Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold tracking-wider">
                                    <th className="p-4">Employee</th>
                                    <th className="p-4">Leave Type</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {pendingLeaves.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-gray-400 italic text-sm">
                                            No pending leave requests found.
                                        </td>
                                    </tr>
                                ) : (
                                    pendingLeaves.map((req) => (
                                        <tr
                                            key={req.id}
                                            onClick={() => setSelectedReq(req)}
                                            className={`hover:bg-blue-50 transition-colors cursor-pointer ${selectedReq?.id === req.id ? 'bg-blue-50/50' : ''}`}
                                        >
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 uppercase">
                                                        {(req.profile?.first_name?.[0] || req.profile?.user?.first_name?.[0] || 'U')}
                                                    </div>
                                                    <span className="font-medium text-gray-800">
                                                        {req.profile?.first_name || req.profile?.user?.first_name || 'User'} {req.profile?.last_name || req.profile?.user?.last_name || ''}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-blue-600 font-medium">{req.leave_type}</td>
                                            <td className="p-4 text-gray-600 text-sm">
                                                {new Date(req.start_date).toLocaleDateString()} - {new Date(req.end_date).toLocaleDateString()}
                                            </td>
                                            <td className="p-4">
                                                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                                    Pending
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Team Leave Balance (Keeping placeholder for now) */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Team Leave Balance</h3>
                    <div className="space-y-4">
                        {teamBalances.map((member, idx) => (
                            <div key={idx} className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600">
                                    {member.avatar}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-gray-800">{member.name}</span>
                                        <span className="text-gray-500">{member.used}/{member.total} Days</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full"
                                            style={{ width: `${(member.used / member.total) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE - Leave Request Details */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b border-gray-100 pb-4 text-center sm:text-left">Request Detail</h3>

                {!selectedReq ? (
                    <div className="py-12 text-center text-gray-400 italic text-sm">
                        Select a request to view details
                    </div>
                ) : (
                    <>
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-600 uppercase">
                                {(selectedReq.profile?.first_name?.[0] || selectedReq.profile?.user?.first_name?.[0] || 'U')}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-800 text-lg">
                                    {selectedReq.profile?.first_name || selectedReq.profile?.user?.first_name || 'User'} {selectedReq.profile?.last_name || selectedReq.profile?.user?.last_name || ''}
                                </h4>
                                <p className="text-sm text-gray-500">{selectedReq.leave_type}</p>
                            </div>
                        </div>

                        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-2">Leave Dates</p>
                            <p className="text-gray-800 font-medium text-sm">
                                {new Date(selectedReq.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(selectedReq.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                            </p>
                        </div>

                        <div className="mb-6">
                            <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-2">Reason</p>
                            <p className="text-gray-700 text-sm leading-relaxed italic">
                                "{selectedReq.reason || 'No reason provided'}"
                            </p>
                        </div>

                        <div className="mb-8 flex justify-between items-center px-1">
                            <div>
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Duration</p>
                                <p className="text-gray-800 font-bold text-lg">{selectedReq.days} {Number(selectedReq.days) === 1 ? 'day' : 'days'}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Status</p>
                                <span className="text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded text-xs font-bold uppercase">Pending</span>
                            </div>
                        </div>

                        <div className="flex space-x-3 mt-4">
                            <button
                                disabled={actionLoading}
                                onClick={() => handleAction(selectedReq.id, 'reject')}
                                className="flex-1 py-2.5 border border-red-200 text-red-500 rounded-lg font-bold hover:bg-red-50 transition flex justify-center items-center disabled:opacity-50"
                            >
                                <FiX className="mr-2" /> Reject
                            </button>
                            <button
                                disabled={actionLoading}
                                onClick={() => handleAction(selectedReq.id, 'approve')}
                                className="flex-1 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md flex justify-center items-center disabled:opacity-50"
                            >
                                <FiCheck className="mr-2" /> Approve
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default LeadLeaveManagementTab;

