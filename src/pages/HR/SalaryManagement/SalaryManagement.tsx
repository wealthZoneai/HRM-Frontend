import React, { useState } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";
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
        {
            id: "1",
            name: "Sarah Jenkins",
            dept: "React",
            role: "Senior Frontend Dev",
            email: "sarah.j@company.com",
            salary: "140k",
        },
        {
            id: "2",
            name: "Mike Ross",
            dept: "React",
            role: "React Native Eng",
            email: "m.ross@company.com",
            salary: "125k",
        },
        {
            id: "3",
            name: "David Kim",
            dept: "Java",
            role: "Backend Architect",
            email: "david.kim@company.com",
            salary: "155k",
        },
        {
            id: "4",
            name: "Emily Chen",
            dept: "Java",
            role: "Java Developer",
            email: "emily.c@company.com",
            salary: "110k",
        },
        {
            id: "5",
            name: "James Wilson",
            dept: "Python",
            role: "Data Scientist",
            email: "j.wilson@company.com",
            salary: "145k",
        },
        {
            id: "6",
            name: "Jessica Lee",
            dept: "Python",
            role: "Backend Python Dev",
            email: "jess.lee@company.com",
            salary: "115k",
        },
        {
            id: "7",
            name: "Robert Taylor",
            dept: "AWS",
            role: "Cloud Architect",
            email: "rob.taylor@company.com",
            salary: "160k",
        },
        {
            id: "8",
            name: "Lisa Wong",
            dept: "AWS",
            role: "DevOps Engineer",
            email: "lisa.w@company.com",
            salary: "135k",
        },
        {
            id: "9",
            name: "Alex Martin",
            dept: "Cyber Security",
            role: "Security Analyst",
            email: "alex.m@company.com",
            salary: "130k",
        },
        {
            id: "10",
            name: "Samantha Green",
            dept: "Cyber Security",
            role: "Penetration Tester",
            email: "sam.g@company.com",
            salary: "140k",
        },
        {
            id: "11",
            name: "Daniel Brown",
            dept: "UI/UX",
            role: "Senior Product Designer",
            email: "dan.brown@company.com",
            salary: "135k",
        },
        {
            id: "12",
            name: "Olivia White",
            dept: "UI/UX",
            role: "UX Researcher",
            email: "olivia.w@company.com",
            salary: "110k",
        },
        {
            id: "13",
            name: "Kevin Brooks",
            dept: "UI/UX",
            role: "UI Designer",
            email: "kevin.b@company.com",
            salary: "95k",
        },
        {
            id: "14",
            name: "Priya Patel",
            dept: "React",
            role: "Frontend Engineer",
            email: "priya.p@company.com",
            salary: "115k",
        },
        {
            id: "15",
            name: "Tom Harris",
            dept: "Java",
            role: "Senior Java Dev",
            email: "tom.h@company.com",
            salary: "145k",
        },
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
        <div className="p-6">

            {/* Page Header */}
            <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
                    Employee Salary
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Search employees by name, email, ID, or any related keywords.
                </p>
            </div>

            {/* Search + Filter */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 mb-6">

                {/* Search Input */}
                <div className="relative w-full md:w-1/2">
                    <FiSearch className="absolute left-3 top-3 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Dept Filter */}
                <div className="relative">
                    <FiFilter className="absolute left-3 top-3 text-gray-500" size={18} />
                    <select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        className="pl-10 pr-8 py-2.5 bg-white border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium text-gray-700"
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
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 ">

                {/* Fancy Header Row */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium grid grid-cols-6 py-3 px-4">
                    <div>Name</div>
                    <div>Dept</div>
                    <div>Role</div>
                    <div>Email</div>
                    <div className="text-right pr-4">Salary</div>
                    <div className="text-right">Add Salary</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100 overflow-y-auto max-h-[50vh] no-scrollbar">
                    {filteredEmployees.map((emp) => (
                        <div
                            key={emp.id}
                            className="grid grid-cols-6 px-4 py-4 text-sm items-center hover:bg-gray-50 transition"
                        >
                            <div className="font-semibold">{emp.name}</div>
                            <div>{emp.dept}</div>
                            <div className="truncate">{emp.role}</div>
                            <div className="truncate">{emp.email}</div>
                            <div className="text-blue-600 font-semibold text-right pr-4">{emp.salary}</div>

                            {/* Button */}
                            <div className="flex justify-end">
                                <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm shadow"
                                    onClick={() => setOpen(true)}
                                >
                                    Add Salary
                                </button>
                            </div>
                        </div>
                    ))}
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
