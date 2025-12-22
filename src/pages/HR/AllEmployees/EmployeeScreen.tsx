import React, { useEffect, useState } from 'react';
import { FiSearch, FiPlus } from 'react-icons/fi';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeDetailsModal from './EmployeeDetailsModal';
import { GetAllEmployes } from '../../../Services/apiHelpers';

interface Employee {
  id: string;
  name: string;
  role: string;
  employeeId: string;
  status: 'Active' | 'Inactive';
  imageUrl: string;
}

const EmployeeCard: React.FC<{
  employee: Employee;
  onClick: (employee: Employee) => void;
}> = ({ employee, onClick }) => {
  const statusColor =
    employee.status === 'Active'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700';

  return (
    <div
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(employee)}
    >
      <img
        src={employee.imageUrl}
        alt={employee.name}
        className="w-20 h-20 rounded-full object-cover mb-3 ring-2 ring-gray-100"
      />
      <h3 className="text-lg font-semibold text-gray-800">
        {employee.name}
      </h3>
      <p className="text-sm text-gray-500">{employee.role}</p>
      <p className="text-xs text-gray-400 mb-3">{employee.employeeId}</p>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor}`}
      >
        {employee.status}
      </span>
    </div>
  );
};

export default function EmployeeScreen() {
  const [searchTerm, setSearchTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState<Employee[]>([]);

  // =============================
  // FETCH EMPLOYEES FROM API
  // =============================
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await GetAllEmployes();
        const rawData = response?.data?.results || [];
        console.log("Fetched Employees:", rawData);
        // Map backend → UI
        const fallbackAvatar = "https://ui-avatars.com/api/?background=random&name=";
        const formattedData: Employee[] = rawData.map((emp: any) => ({
          id: emp.id || emp.emp_id,
          name: `${emp.first_name} ${emp.last_name}`.trim(),
          role: emp.job_title || emp.role || "Employee",
          employeeId: emp.emp_id,
          status: "Active",
          imageUrl: emp.profile_photo_url || `${fallbackAvatar}${emp.first_name}+${emp.last_name}`,
        }));

        setEmployeeData(formattedData);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    fetchEmployees();
  }, []);

  // =============================
  // SEARCH FILTER
  // =============================
  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employee.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          All Employees
        </h1>

        <button
          className="flex items-center justify-center bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 w-full sm:w-auto"
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
            placeholder="Search employee by name, role or ID"
            className="flex-1 py-1 outline-none text-gray-700 placeholder-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredEmployees.map((employee) => (
          <EmployeeCard
            key={employee.id}
            employee={employee}
            onClick={() => {
              setSelectedEmployee(employee);
              setDetailsOpen(true);
            }}
          />
        ))}

        {filteredEmployees.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No data found.          </p>
        )}
      </div>

      {/* Modals */}
      <AddEmployeeModal open={open} onClose={() => setOpen(false)} />

      <EmployeeDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        employee={selectedEmployee}
      />
    </div>
  );
}
