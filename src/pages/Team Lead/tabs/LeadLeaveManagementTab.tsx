import React from "react";
import { FiCheck, FiX } from "react-icons/fi";

const LeadLeaveManagementTab: React.FC = () => {
    const leaveRequests = [
        { id: 1, name: "Ravi Teja", type: "Annual", date: "July 10–July 12, 2024", status: "Pending", avatar: "R" },
        { id: 2, name: "Lithish", type: "Sick", date: "Aug 01, 2024", status: "Approved", avatar: "L" },
        { id: 3, name: "Pawan", type: "Casual", date: "Sep 15, 2024", status: "Rejected", avatar: "P" },
    ];

    const teamBalances = [
        { name: "Lithish", used: 15, total: 20, avatar: "L" },
        { name: "Ravi", used: 10, total: 20, avatar: "R" },
        { name: "Pawan", used: 18, total: 20, avatar: "P" },
    ];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT SIDE - Leave Overview */}
            <div className="lg:col-span-2 space-y-6">
                {/* Tabs */}
                <div className="border-b border-gray-200">
                    <button className="py-2 px-4 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">All</button>
                </div>

                {/* Leave Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
                            {leaveRequests.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 font-medium text-gray-800">{req.name}</td>
                                    <td className="p-4 text-blue-600 font-medium cursor-pointer hover:underline">{req.type}</td>
                                    <td className="p-4 text-blue-600 cursor-pointer hover:underline text-sm">{req.date}</td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold
                      ${req.status === "Pending" ? "bg-yellow-100 text-yellow-700" : ""}
                      ${req.status === "Approved" ? "bg-green-100 text-green-700" : ""}
                      ${req.status === "Rejected" ? "bg-red-100 text-red-700" : ""}
                    `}>
                                            {req.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Team Leave Balance */}
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
                <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b border-gray-100 pb-4">Pending Request</h3>

                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold text-gray-600">
                        R
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 text-lg">Ravi Teja</h4>
                        <p className="text-sm text-gray-500">Annual Leave: Jul 10 – Jul 12</p>
                    </div>
                </div>

                <div className="mb-6">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Reason</p>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        I need to take annual leave for a family function. I have completed my pending tasks and handed over the critical items to Liam.
                    </p>
                </div>

                <div className="mb-8">
                    <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide mb-2">Duration</p>
                    <p className="text-gray-800 font-medium">3 days</p>
                </div>

                <div className="flex space-x-3">
                    <button className="flex-1 py-2.5 border border-red-500 text-red-500 rounded-lg font-medium hover:bg-red-50 transition flex justify-center items-center">
                        <FiX className="mr-2" /> Reject
                    </button>
                    <button className="flex-1 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition shadow-sm flex justify-center items-center">
                        <FiCheck className="mr-2" /> Approve
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LeadLeaveManagementTab;
