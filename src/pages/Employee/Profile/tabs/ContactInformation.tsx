import { useState } from "react";
import { Pencil, X, Check } from "lucide-react";

const UnderlineField = ({ label, value }: { label: string; value: string }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium text-gray-700">{label}</p>
    <p className="text-gray-900">{value}</p>
    <div className="w-full h-px bg-gray-300" />
  </div>
);

const EditLineField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border-b border-gray-300 focus:border-blue-600 outline-none py-1 text-gray-900"
    />
  </div>
);

const ProfileDetails = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [data, setData] = useState({
    workMail: "Ravitejawealthzonegroupai@gmail.com",
    personalMail: "raviteja@gmail.com",
    phone: "123456789",
    empId: "0155565",
    firstName: "Ravi Teja",
    lastName: "ID 78564",
    dob: "2002-11-10",
    gender: "Male",
  });

  const [backup, setBackup] = useState(data);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = () => {
    setBackup(data);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setData(backup);
    setIsEditing(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">

      {/* CONTACT DETAILS */}
      <div className="border rounded-xl p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Contact Details</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2"
            >
              Edit <Pencil size={16} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <EditLineField
                label="Work mail"
                name="workMail"
                value={data.workMail}
                onChange={handleChange}
                type="email"
              />
              <EditLineField
                label="Personal mail ID"
                name="personalMail"
                value={data.personalMail}
                onChange={handleChange}
                type="email"
              />
              <EditLineField
                label="Phone number"
                name="phone"
                value={data.phone}
                onChange={handleChange}
              />
              <EditLineField
                label="Emp ID"
                name="empId"
                value={data.empId}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <UnderlineField label="Work mail" value={data.workMail} />
              <UnderlineField label="Personal mail ID" value={data.personalMail} />
              <UnderlineField label="Phone number" value={data.phone} />
              <UnderlineField label="Emp ID" value={data.empId} />
            </>
          )}
        </div>
      </div>

      {/* PERSONAL INFO */}
      <div className="border rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {isEditing ? (
            <>
              <EditLineField
                label="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              <EditLineField
                label="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
              <EditLineField
                label="Date of Birth"
                name="dob"
                value={data.dob}
                onChange={handleChange}
                type="date"
              />
              <EditLineField
                label="Gender"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <UnderlineField label="First Name" value={data.firstName} />
              <UnderlineField label="Last Name" value={data.lastName} />
              <UnderlineField label="Date of Birth" value={data.dob} />
              <UnderlineField label="Gender" value={data.gender} />
            </>
          )}
        </div>
      </div>

      {/* GLOBAL SAVE/CANCEL FOR BOTH SECTIONS */}
      {isEditing && (
        <div className="flex justify-end gap-4 mt-6 pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center gap-2"
          >
            <X size={16} /> Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center gap-2"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileDetails;
