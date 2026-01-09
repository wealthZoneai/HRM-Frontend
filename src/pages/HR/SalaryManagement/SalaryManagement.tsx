import React, { useState } from "react";
import { FiSearch, FiFilter, FiEdit } from "react-icons/fi"; // Added FiEdit for button
import EditSalaryModal from "./EditSalaryModal";

interface EmployeeSalaryItem {
    id: string;
    name: string;
    dept: string;
    role: string;
    email: string;
    salary: string;
}

const SalaryManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [selectedDept, setSelectedDept] = useState("");
    const [employees] = useState<EmployeeSalaryItem[]>([
        { id: "1", name: "Sarah Jenkins", dept: "React", role: "Senior Frontend Dev", email: "sarah.j@company.com", salary: "140k" },
        { id: "2", name: "Mike Ross", dept: "React", role: "React Native Eng", email: "m.ross@company.com", salary: "125k" },
        { id: "3", name: "David Kim", dept: "Java", role: "Backend Architect", email: "david.kim@company.com", salary: "155k" },
        { id: "4", name: "Emily Chen", dept: "Java", role: "Java Developer", email: "emily.c@company.com", salary: "110k" },
        { id: "5", name: "James Wilson", dept: "Python", role: "Data Scientist", email: "j.wilson@company.com", salary: "145k" },
        { id: "6", name: "Jessica Lee", dept: "Python", role: "Backend Python Dev", email: "jess.lee@company.com", salary: "115k" },
        { id: "7", name: "Robert Taylor", dept: "Cloud", role: "Cloud Architect", email: "rob.taylor@company.com", salary: "160k" },
        { id: "8", name: "Lisa Wong", dept: "Cloud", role: "DevOps Engineer", email: "lisa.w@company.com", salary: "135k" },
        { id: "9", name: "Alex Martin", dept: "Cyber Security", role: "Security Analyst", email: "alex.m@company.com", salary: "130k" },
        { id: "10", name: "Samantha Green", dept: "Cyber Security", role: "Penetration Tester", email: "sam.g@company.com", salary: "140k" },
        { id: "11", name: "Daniel Brown", dept: "UI/UX", role: "Senior Product Designer", email: "dan.brown@company.com", salary: "135k" },
        { id: "12", name: "Olivia White", dept: "UI/UX", role: "UX Researcher", email: "olivia.w@company.com", salary: "110k" },
        { id: "13", name: "Kevin Brooks", dept: "UI/UX", role: "UI Designer", email: "kevin.b@company.com", salary: "95k" },
        { id: "14", name: "Priya Patel", dept: "React", role: "Frontend Engineer", email: "priya.p@company.com", salary: "115k" },
        { id: "15", name: "Tom Harris", dept: "Java", role: "Senior Java Dev", email: "tom.h@company.com", salary: "145k" },
        { id: "16", name: "Brian Scott", dept: "Testing", role: "QA Engineer", email: "brian.s@company.com", salary: "105k" },
        { id: "17", name: "Laura Miller", dept: "Testing", role: "Automation Tester", email: "laura.m@company.com", salary: "115k" },
        { id: "18", name: "Steven Clark", dept: "Testing", role: "QA Lead", email: "steven.c@company.com", salary: "135k" },
    ]);

    // Get unique departments for filter
    const uniqueDepts = Array.from(new Set(employees.map((e) => e.dept))).sort();

    const filteredEmployees = employees
        .filter((emp) => {
            const matchesSearch = [emp.name, emp.email, emp.dept, emp.role]
                .join(" ")
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
            const matchesDept = selectedDept ? emp.dept === selectedDept : true;
            return matchesSearch && matchesDept;
        })
        .sort((a, b) => a.dept.localeCompare(b.dept)); // Sort by department

    return (
        <div className="p-6 bg-gray-50 min-h-screen">

            {/* Page Header */}
            <div className="mb-8">
                <h2 className="text-4xl font-extrabold text-gray-800 tracking-tight">
                    💵 Salary Management
                </h2>
                <p className="text-md text-gray-500 mt-2">
                    Review and update compensation details for all employees.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">

                {/* Search Input */}
                <div className="relative w-full md:w-2/5">
                    <FiSearch className="absolute left-3 top-3.5 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search by name, role, or email..."
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 outline-none transition shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dept Filter */}
                <div className="relative">
                    <FiFilter className="absolute left-3 top-3.5 text-gray-500" size={18} />
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="pl-10 pr-8 py-3 bg-white border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700 appearance-none cursor-pointer"
                    >
                        <option value="">All Departments</option>
                        {uniqueDepts.map((d) => (
                            <option key={d} value={d}>
                                {d}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200">

                {/* New Grid Template Definition */}
                <div className="text-xs uppercase tracking-wider font-semibold text-white bg-blue-600 grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_120px] gap-4 py-3 px-6 border-b border-gray-200">
                    <div>Employee Name</div>
                    <div>Dept</div>
                    <div>Role</div>
                    <div>Email Address</div>
                    <div className="text-right">Current Salary</div>
                    <div className="text-right">Action</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100 overflow-y-auto max-h-[60vh] no-scrollbar">
                    {filteredEmployees.length > 0 ? (
                        filteredEmployees.map((emp) => (
                            <div
                                key={emp.id}
                                className="grid grid-cols-[1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_120px] gap-4 px-6 py-4 text-sm items-center hover:bg-blue-50 transition"
                            >
                                <div className="font-medium text-gray-900">{emp.name}</div>
                                <div className="text-gray-600">{emp.dept}</div>
                                <div className="truncate text-gray-600">{emp.role}</div>
                                <div className="truncate text-gray-500 italic">{emp.email}</div>

                                {/* Salary - Adjusted spacing is now handled by the grid definition */}
                                <div className="text-blue-700 font-bold text-lg text-center">
                                    {emp.salary}
                                </div>

                                {/* Button - Fixed width column */}
                                <div className="flex justify-end">
                                    <button
                                        className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm shadow-md"
                                        onClick={() => setOpen(true)}
                                    >
                                        <FiEdit size={14} />
                                        <span>Edit</span>
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="p-10 text-center text-gray-500">
                            No employees found matching your search criteria.
                        </div>
                    )}
                </div>

            </div>

            <EditSalaryModal
                isOpen={open}
                onClose={() => setOpen(false)}
                staffList={[
                    "Onasanya Habeeb",
                    "Jennifer",
                    "Chris",
                    "Mariam",
                    "Anuoluwa",
                ]}
                onSave={(data) => console.log("FORM SUBMITTED:", data)}
            />
        </div>
    );
};

export default SalaryManagement;