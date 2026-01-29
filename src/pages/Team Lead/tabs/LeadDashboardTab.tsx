import React, { useEffect } from "react";
import { FiCheckCircle, FiClock, FiUsers, FiList } from "react-icons/fi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchTeamDashboard } from "../../../store/slice/dashboardSlice";

const LeadDashboardTab: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { stats, loading } = useSelector((state: RootState) => state.dashboard);

    useEffect(() => {
        dispatch(fetchTeamDashboard());
    }, [dispatch]);

    // Mock Data for Chart
    const data = [
        { name: 'Mon', tasks: 12 },
        { name: 'Tue', tasks: 19 },
        { name: 'Wed', tasks: 15 },
        { name: 'Thu', tasks: 22 }, // Highlighted
        { name: 'Fri', tasks: 18 },
        { name: 'Sat', tasks: 10 },
    ];

    const activities = [
        { id: 1, text: "HRM completed task", task: "Finalize Q3 Marketing report", time: "2 hours ago" },
        { id: 2, text: "New comment on", task: "User authentication flow", time: "4 hours ago" },
        { id: 3, text: "Task assigned to", task: "Liam Rodriguez", time: "Yesterday" },
        { id: 4, text: "Project status updated", task: "Mobile App Refresh", time: "Yesterday" },
    ];

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard title="Total Task" value="20" icon={<FiList className="text-blue-500" />} />
                <KPICard title="Completed Task" value="15" icon={<FiCheckCircle className="text-green-500" />} />
                <KPICard
                    title="Pending Approvals"
                    value={loading ? "..." : (stats?.pending_leave_requests?.toString().padStart(2, '0') || "00")}
                    icon={<FiClock className="text-orange-500" />}
                />
                <KPICard
                    title="Team Members"
                    value={loading ? "..." : (stats?.team_count?.toString().padStart(2, '0') || "00")}
                    icon={<FiUsers className="text-purple-500" />}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Team Productivity Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Team Productivity</h3>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 rounded-full">Last Week</button>
                            <button className="px-3 py-1 text-xs font-medium text-gray-500 hover:bg-gray-50 rounded-full">Last Month</button>
                        </div>
                    </div>
                    <div className="h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                />
                                <Bar dataKey="tasks" radius={[4, 4, 0, 0]} barSize={30}>
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.name === 'Thu' ? '#1d4ed8' : '#93c5fd'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                        {activities.map((activity) => (
                            <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                                <div>
                                    <p className="text-sm text-gray-800">
                                        <span className="font-semibold">{activity.text}</span>{" "}
                                        <span className="text-blue-600 cursor-pointer hover:underline">{activity.task}</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const KPICard = ({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
        <div>
            <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
            <h4 className="text-3xl font-bold text-gray-800">{value}</h4>
        </div>
        <div className="p-3 bg-gray-50 rounded-full text-xl">
            {icon}
        </div>
    </div>
);

export default LeadDashboardTab;
