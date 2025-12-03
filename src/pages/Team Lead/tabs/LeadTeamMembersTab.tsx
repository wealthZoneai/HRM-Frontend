import React from "react";


const LeadTeamMembersTab: React.FC = () => {
    const members = [
        { id: 1, name: "Ravi teja", role: "Sr Product Manager", tasks: 5 },
        { id: 2, name: "Liam Rodriguez", role: "Backend Developer", tasks: 2 },
        { id: 3, name: "Ethan Wright", role: "Devops Engineer", tasks: 4 },
        { id: 4, name: "Clement Mendie", role: "Sr UI/UX Designer", tasks: 3 },
        { id: 5, name: "Chloe Klim", role: "Frontend Developer", tasks: 6 },
        { id: 6, name: "Noah Williams", role: "QA Engineer", tasks: 1 },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Team Members</h2>
                    <p className="text-gray-500 text-sm mt-1">Team Lead and team members, their roles, their performance.</p>
                </div>
                <button className="text-blue-600 font-medium text-sm hover:underline">View all</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:shadow-md transition-shadow">
                        <div className="w-20 h-20 rounded-full bg-gray-200 mb-4 flex items-center justify-center text-2xl text-gray-500 font-bold">
                            {member.name.charAt(0)}
                        </div>

                        <h3 className="font-bold text-gray-800 text-lg">{member.name}</h3>
                        <p className="text-sm text-blue-600 font-medium mb-4">{member.role}</p>

                        <div className="w-full bg-gray-50 rounded-lg py-2 mb-6">
                            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">Task Load</p>
                            <p className="font-bold text-gray-800">{member.tasks} Tasks</p>
                        </div>

                        <div className="flex space-x-3 w-full">
                            <button className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition shadow-sm">
                                Assign Task
                            </button>
                            <button className="flex-1 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                                View Profile
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LeadTeamMembersTab;
