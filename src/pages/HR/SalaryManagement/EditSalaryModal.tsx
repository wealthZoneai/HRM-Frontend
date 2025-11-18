import React, { useState } from "react";
import { FiX, FiChevronDown } from "react-icons/fi";

interface SalaryField {
  label: string;
  amount: string;
}

interface EditStaffSalaryData {
  staff: string;
  netSalary: string;
  earnings: SalaryField[];
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: EditStaffSalaryData) => void;
  staffList: string[];
}

const EditSalaryModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSave,
  staffList
}) => {
  const [form, setForm] = useState<EditStaffSalaryData>({
    staff: "",
    netSalary: "",
    earnings: [
      { label: "Basic", amount: "500k" },
      { label: "Basic", amount: "500k" },
      { label: "Basic", amount: "500k" },
      { label: "Basic", amount: "500k" },
      { label: "Basic", amount: "500k" },
      { label: "Basic", amount: "500k" },
    ],
  });

  if (!isOpen) return null;

  const updateEarning = (index: number, value: string) => {
    const updated = [...form.earnings];
    updated[index].amount = value;
    setForm({ ...form, earnings: updated });
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">

      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 relative animate-zoomIn">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={22} />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Edit Staff Salary
        </h2>

        {/* Top Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          {/* Select Staff */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Select Staff</label>
            <div className="relative mt-2">
              <select
                value={form.staff}
                onChange={(e) => setForm({ ...form, staff: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Staff</option>
                {staffList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <FiChevronDown className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>

          {/* Net Salary */}
          <div>
            <label className="text-sm text-gray-700 font-medium">Net Salary</label>
            <div className="relative mt-2">
              <select
                value={form.netSalary}
                onChange={(e) => setForm({ ...form, netSalary: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border rounded-xl appearance-none focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Net Salary</option>
                {staffList.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <FiChevronDown className="absolute right-3 top-3 text-gray-500" />
            </div>
          </div>

        </div>

        {/* Earnings Section */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Earnings</h3>

        {/* Earnings Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {form.earnings.map((field, index) => (
            <div key={index}>
              <label className="text-xs font-medium text-gray-600">{field.label}</label>
              <input
                type="text"
                value={field.amount}
                onChange={(e) => updateEarning(index, e.target.value)}
                className="w-full mt-1 px-4 py-2 bg-gray-50 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}
        </div>

        {/* Save Button */}
        <div className="mt-8">
          <button
            onClick={() => onSave(form)}
            className="w-full py-3 bg-blue-700 rounded-full text-white text-lg font-medium hover:bg-blue-800 transition"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditSalaryModal;
