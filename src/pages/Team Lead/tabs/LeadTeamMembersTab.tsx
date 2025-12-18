import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../store";
import { fetchTeamMembers } from "../../../store/slice/teamSlice";
import { FiX, FiMail, FiUser, FiHash, FiMapPin } from "react-icons/fi";

const LeadTeamMembersTab: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { members, loading } = useSelector((state: RootState) => state.team);
    const [selectedMember, setSelectedMember] = useState<any>(null);

    useEffect(() => {
        dispatch(fetchTeamMembers());
    }, [dispatch]);

    if (loading && members.length === 0) {
        return <div className="p-8 text-center text-gray-500">Loading team members...</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
                    <p className="text-gray-500 text-sm mt-1">Team Lead and team members, their roles, their performance.</p>
                </div>
            </div>

            {members.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-xl border border-dashed border-gray-200 text-gray-400 italic">
                    No team members found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {members.map((member) => (
                        <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                            <div className="w-20 h-20 rounded-full bg-blue-50 mb-4 flex items-center justify-center text-2xl text-blue-600 font-bold overflow-hidden border-2 border-white shadow-sm">
                                {member.profile_photo ? (
                                    <img src={member.profile_photo} alt={member.first_name} className="w-full h-full object-cover" />
                                ) : (
                                    (member.first_name?.[0] || member.user?.first_name?.[0] || 'U')
                                )}
                            </div>

                            <h3 className="font-bold text-gray-800 text-lg">
                                {member.first_name} {member.last_name}
                            </h3>
                            <p className="text-sm text-blue-600 font-medium mb-4">{member.job_title || 'No Job Title'}</p>

                            <div className="w-full bg-gray-50 rounded-lg py-2 mb-6">
                                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Department</p>
                                <p className="font-bold text-gray-800 text-sm truncate px-2">{member.department || 'N/A'}</p>
                            </div>

                            <div className="flex space-x-3 w-full mt-auto">
                                <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                                    Assign Task
                                </button>
                                <button
                                    onClick={() => setSelectedMember(member)}
                                    className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition"
                                >
                                    View Profile
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Profile Detail Modal */}
            {selectedMember && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
                    onClick={() => setSelectedMember(null)}
                >
                    <div
                        className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar transform transition-all duration-300 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="relative h-20 bg-gradient-to-r from-blue-600 to-indigo-700">
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-3 right-3 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-1.5 rounded-full transition-colors"
                            >
                                <FiX size={18} />
                            </button>
                        </div>

                        {/* Profile Photo Overlap */}
                        <div className="relative z-10 flex justify-center -mt-10">
                            <div className="w-20 h-20 rounded-2xl bg-white p-1 shadow-md overflow-hidden">
                                <div className="w-full h-full rounded-xl bg-blue-50 flex items-center justify-center text-2xl text-blue-600 font-bold">
                                    {selectedMember.profile_photo ? (
                                        <img src={selectedMember.profile_photo} alt={selectedMember.first_name} className="w-full h-full object-cover" />
                                    ) : (
                                        (selectedMember.first_name?.[0] || selectedMember.user?.first_name?.[0] || 'U')
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Details Content */}
                        <div className="px-6 pb-6 pt-3">
                            <div className="text-center mb-6">
                                <h3 className="text-xl font-bold text-gray-900 leading-tight">
                                    {selectedMember.first_name} {selectedMember.last_name}
                                </h3>
                                <p className="text-blue-600 text-xs font-bold uppercase tracking-wider mt-1">{selectedMember.job_title || 'Team Member'}</p>
                            </div>

                            <div className="space-y-3">
                                <DetailItem icon={<FiHash />} label="Employee ID" value={selectedMember.emp_id} />
                                <DetailItem icon={<FiMail />} label="Email Address" value={selectedMember.work_email} />
                                <DetailItem icon={<FiMapPin />} label="Department" value={selectedMember.department} />
                                <DetailItem icon={<FiUser />} label="Username" value={selectedMember.user?.username} />
                            </div>

                            <button
                                onClick={() => setSelectedMember(null)}
                                className="w-full mt-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-black transition-colors shadow-lg active:scale-[0.98]"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Helper component for detail rows
const DetailItem: React.FC<{ icon: React.ReactNode, label: string, value?: string }> = ({ icon, label, value }) => (
    <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
        <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider leading-none mb-1">{label}</p>
            <p className="text-gray-800 font-medium text-sm truncate">{value || 'N/A'}</p>
        </div>
    </div>
);

export default LeadTeamMembersTab;
