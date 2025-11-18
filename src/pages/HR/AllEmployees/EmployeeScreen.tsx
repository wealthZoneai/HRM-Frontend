import React, { useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi'; // Importing icons
import AddEmployeeModal from './AddEmployeeModal';

// Sample Employee data
// In a real application, this would come from an API or a Redux store
interface Employee {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  status: 'Active' | 'Inactive';
  imageUrl: string; // URL for the employee's profile picture
}

const DUMMY_EMPLOYEES: Employee[] = [
  { id: '1', name: 'Clement Mendie', role: 'UI/UX Designer', employeeId: '5663367', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: '2', name: 'Alice Smith', role: 'Python Developer', employeeId: '5663368', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/women/44.jpg' },
  { id: '3', name: 'Bob Johnson', role: 'Java Developer', employeeId: '5663369', status: 'Inactive', imageUrl: 'https://randomuser.me/api/portraits/men/50.jpg' },
  { id: '4', name: 'Charlie Brown', role: 'Testing Engineer', employeeId: '5663370', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '5', name: 'Diana Prince', role: 'React Developer', employeeId: '5663371', status: 'Inactive', imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '6', name: 'Eve Adams', role: 'HR Manager', employeeId: '5663372', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '7', name: 'Frank White', role: 'Digital Marketer', employeeId: '5663373', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { id: '8', name: 'Grace Lee', role: 'Cyber Security', employeeId: '5663374', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '9', name: 'Henry Green', role: 'BDMS Analyst', employeeId: '5663375', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { id: '10', name: 'Ivy King', role: 'SAP Consultant', employeeId: '5663376', status: 'Inactive', imageUrl: 'https://randomuser.me/api/portraits/women/7.jpg' },
  { id: '11', name: 'Jack Taylor', role: 'UI/UX Designer', employeeId: '5663377', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/men/8.jpg' },
  { id: '12', name: 'Karen Hall', role: 'Python Developer', employeeId: '5663378', status: 'Active', imageUrl: 'https://randomuser.me/api/portraits/women/9.jpg' },
];

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
  const statusColor = employee.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow">
      <img
        src={employee.imageUrl}
        alt={employee.name}
        className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-gray-100"
      />
      <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
      <p className="text-sm text-gray-500">{employee.role}</p>
      <p className="text-xs text-gray-400 mb-3">{employee.employeeId}</p>
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}>
        {employee.status}
      </span>
    </div>
  );
};

export default function EmployeeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
 const [open, setOpen] = useState(false);


  const filteredEmployees = DUMMY_EMPLOYEES.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header with "Add Employee" button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">All Employees</h1>
        <button className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-colors"
       onClick={() => setOpen(true)}
        >
          <FiPlus size={20} className="mr-2" />
          Add Employee
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
        <div className="flex items-center space-x-3">
          <FiSearch size={20} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search employee by name, role, ID, or any related keywords"
            className="flex-1 py-1 outline-none text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEmployees.map(employee => (
          <EmployeeCard key={employee.id} employee={employee} />
        ))}
        {filteredEmployees.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">No employees found matching your search.</p>
        )}
      </div>
       <AddEmployeeModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}