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
    resumeDate: string;
}

const SalaryManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [employees] = useState<EmployeeSalaryItem[]>([
        {
            id: "1",
            name: "Habeeb",
            dept: "Tech",
            role: "UI/UX Designer",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "2",
            name: "Anuoluwa",
            dept: "Sales",
            role: "Sales Team",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "3",
            name: "Mariam",
            dept: "Tech",
            role: "UI/UX Designer",
            email: "b@sujimotiong.com",
            salary: "300k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
        {
            id: "4",
            name: "Chris",
            dept: "Comms",
            role: "Graphics",
            email: "b@sujimotiong.com",
            salary: "500k",
            resumeDate: "3rd-April-2023",
        },
    ]);

    const filteredEmployees = employees.filter((emp) =>
        [emp.name, emp.email, emp.dept, emp.role]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

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

                {/* Filter Button */}
                <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white shadow hover:bg-gray-100 transition border">
                    <FiFilter size={18} />
                    <span className="font-medium text-gray-700">Filter</span>
                </button>
            </div>

            {/* Table Card */}
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 ">

                {/* Fancy Header Row */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium grid grid-cols-7 py-3 px-4">
                    <div>Name</div>
                    <div>Dept</div>
                    <div>Role</div>
                    <div>Email</div>
                    <div>Salary</div>
                    <div>Resumption</div>
                    <div>Add Salary</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-100 overflow-y-auto max-h-[50vh] no-scrollbar">
                    {filteredEmployees.map((emp) => (
                        <div
                            key={emp.id}
                            className="grid grid-cols-7 px-4 py-4 text-sm items-center hover:bg-gray-50 transition"
                        >
                            <div className="font-semibold">{emp.name}</div>
                            <div>{emp.dept}</div>
                            <div className="truncate">{emp.role}</div>
                            <div className="truncate">{emp.email}</div>
                            <div className="text-blue-600 font-semibold">{emp.salary}</div>
                            <div>{emp.resumeDate}</div>

                            {/* Button */}
                            <div>
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
