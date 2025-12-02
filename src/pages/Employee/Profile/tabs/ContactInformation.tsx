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
    firstName: "Ravi",
    middleName: "lorem ipsum",
    lastName: "Teja",
    workMail: "Ravitejawealthzonegroupai@gmail.com",
    personalMail: "raviteja@gmail.com",
    phone: "123456789",
    alternativeNumber: "0987654321",
    dob: "2002-11-10",
    bloodGroup: "O +ve",
    gender: "Male",
    maritalStatus: "Single",
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
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">

      {/* PERSONAL INFORMATION */}
      <div className=" rounded-lg sm:rounded-xl p-4 sm:p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
          <h2 className="text-base sm:text-lg font-semibold">Personal Information</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={handleEdit}
              className="px-3 sm:px-4 py-1.5 bg-blue-600 text-white rounded-lg text-xs sm:text-sm flex items-center gap-2 w-full sm:w-auto justify-center"
            >
              Edit <Pencil size={16} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {isEditing ? (
            <>
              <EditLineField
                label="First Name"
                name="firstName"
                value={data.firstName}
                onChange={handleChange}
              />
              <EditLineField
                label="Middle Name"
                name="middleName"
                value={data.middleName}
                onChange={handleChange}
              />
              <EditLineField
                label="Last Name"
                name="lastName"
                value={data.lastName}
                onChange={handleChange}
              />
              <div className="space-y-1 opacity-60">
                <p className="text-sm font-medium text-gray-700">Work mail (Read-only)</p>
                <p className="text-gray-900 py-1 border-b border-gray-200">{data.workMail}</p>
              </div>
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
                label="Alternative Number"
                name="alternativeNumber"
                value={data.alternativeNumber}
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
                label="Blood Group"
                name="bloodGroup"
                value={data.bloodGroup}
                onChange={handleChange}
              />
              <EditLineField
                label="Gender"
                name="gender"
                value={data.gender}
                onChange={handleChange}
              />
              <EditLineField
                label="Marital Status"
                name="maritalStatus"
                value={data.maritalStatus}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <UnderlineField label="First Name" value={data.firstName} />
              <UnderlineField label="Middle Name" value={data.middleName} />
              <UnderlineField label="Last Name" value={data.lastName} />
              <UnderlineField label="Work mail" value={data.workMail} />
              <UnderlineField label="Personal mail ID" value={data.personalMail} />
              <UnderlineField label="Phone number" value={data.phone} />
              <UnderlineField label="Alternative Number" value={data.alternativeNumber} />
              <UnderlineField label="Date of Birth" value={data.dob} />
              <UnderlineField label="Blood Group" value={data.bloodGroup} />
              <UnderlineField label="Gender" value={data.gender} />
              <UnderlineField label="Marital Status" value={data.maritalStatus} />
            </>
          )}
        </div>
      </div>

      {/* GLOBAL SAVE/CANCEL */}
      {isEditing && (
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 mt-6 pt-4 sm:pt-6 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <X size={16} /> Cancel
          </button>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Check size={16} /> Save Changes
          </button>
        </div>
      )}
    </form>
  );
};

export default ProfileDetails;
