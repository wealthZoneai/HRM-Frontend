import React, { useState, useRef } from 'react';
import { FiCamera, FiMail, FiPhone, FiMapPin, FiBriefcase, FiCheck, FiX, FiEdit2, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import DefaultAvatar from "../../assets/CEO.png";

const ProfilePage: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [showSuccess, setShowSuccess] = useState<{ show: boolean, message: string }>({ show: false, message: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        current: '',
        new: '',
        confirm: ''
    });

    const [profileData, setProfileData] = useState(() => {
        const savedName = localStorage.getItem("userName") || "Lakkshmi";
        const savedId = localStorage.getItem("empId") || "CEO001";
        const savedEmail = localStorage.getItem("userEmail") || "Lakkshmi@wealthzoneg...";
        const savedPhone = localStorage.getItem("userPhone") || "+91 ";

        return {
            firstName: savedName.split(' ')[0] || 'Lakkshmi',
            lastName: savedName.split(' ')[1] || '',
            email: savedEmail,
            phone: savedPhone,
            location: 'Hyderabad, India',
            designation: 'Chief Executive Officer',
            id: savedId,
            bio: 'Leading the vision and strategy of HRM-CEO to revolutionize human resource management with AI-driven insights.'
        };
    });

    const [profileImage, setProfileImage] = useState(() => localStorage.getItem("profileImage") || DefaultAvatar);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result as string);
                localStorage.setItem("profileImage", reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = () => {
        // Persist to localStorage
        const fullName = `${profileData.firstName} ${profileData.lastName}`.trim();
        localStorage.setItem("userName", fullName);
        localStorage.setItem("empId", profileData.id);
        localStorage.setItem("userEmail", profileData.email);
        localStorage.setItem("userPhone", profileData.phone);

        // Trigger custom event to notify Sidebar/Topbar
        window.dispatchEvent(new Event('profileUpdate'));

        setIsEditing(false);
        setShowSuccess({ show: true, message: 'Profile details updated successfully!' });
    };

    const handlePasswordChange = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            alert("New passwords do not match!");
            return;
        }
        // Mock save logic
        setIsPasswordModalOpen(false);
        setPasswordData({ current: '', new: '', confirm: '' });
        setShowSuccess({ show: true, message: 'Your password has been changed successfully!' });
    };

    return (
        <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Success Modal */}
            {showSuccess.show && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 text-center relative animate-in zoom-in-95 duration-300">
                        <div className="flex justify-end absolute top-6 right-6">
                            <button onClick={() => setShowSuccess({ show: false, message: '' })} className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-gray-400 hover:text-gray-900 group">
                                <FiX size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                            <FiCheck size={40} />
                        </div>

                        <h3 className="text-2xl font-black text-gray-900 mb-2 tracking-tight">Success!</h3>
                        <p className="text-gray-500 font-medium leading-relaxed mb-8">
                            {showSuccess.message}
                        </p>

                        <button
                            onClick={() => setShowSuccess({ show: false, message: '' })}
                            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:bg-black active:scale-95 transition-all"
                        >
                            Got it
                        </button>
                    </div>
                </div>
            )}

            {/* Password Change Modal */}
            {isPasswordModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 animate-in zoom-in-95 duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                    <FiLock size={24} />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Change Password</h3>
                            </div>
                            <button onClick={() => setIsPasswordModalOpen(false)} className="p-3 hover:bg-gray-100 rounded-2xl transition-all duration-300 text-gray-400 hover:text-gray-900 group">
                                <FiX size={24} className="group-hover:rotate-90 transition-transform duration-500" />
                            </button>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Current Password</label>
                                <div className="relative group">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={passwordData.current}
                                        onChange={(e) => setPasswordData({ ...passwordData, current: e.target.value })}
                                        className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all focus:ring-4 focus:ring-blue-100/50 pr-12"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({ ...passwordData, new: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all focus:ring-4 focus:ring-blue-100/50"
                                    placeholder="••••••••"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    required
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirm: e.target.value })}
                                    className={`w-full bg-gray-50 border ${passwordData.confirm && passwordData.new !== passwordData.confirm ? 'border-rose-200 focus:ring-rose-100' : 'border-gray-200 focus:ring-blue-100/50'} rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all focus:ring-4`}
                                    placeholder="••••••••"
                                />
                                {passwordData.confirm && passwordData.new !== passwordData.confirm && (
                                    <p className="text-[10px] text-rose-500 font-bold uppercase tracking-wider mt-1 ml-1">Passwords do not match</p>
                                )}
                            </div>

                            <div className="pt-4 flex gap-3">
                                <button
                                    type="submit"
                                    className="flex-1 py-4 bg-gray-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
                                >
                                    Update Password
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsPasswordModalOpen(false)}
                                    className="flex-1 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-50 active:scale-95 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Header / Banner Area */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
                <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-700 w-full relative">
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
                </div>

                <div className="px-8 pb-8 flex flex-col items-center sm:items-end sm:flex-row gap-6 -mt-16 relative z-10">
                    <div className="relative group">
                        <div className="w-40 h-40 rounded-3xl bg-white p-2 shadow-xl ring-4 ring-white relative overflow-hidden transition-transform duration-500 hover:scale-[1.02]">
                            <img
                                src={profileImage}
                                alt="CEO Profile"
                                className="w-full h-full object-cover rounded-2xl"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl cursor-pointer"
                            >
                                <FiCamera className="text-white text-3xl" />
                            </button>
                        </div>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                            accept="image/*"
                        />
                    </div>

                    <div className="flex-1 text-center sm:text-left pt-2">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
                                {profileData.firstName || profileData.lastName ? `${profileData.firstName} ${profileData.lastName}` : 'CEO Profile'}
                            </h2>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 border border-blue-200 uppercase tracking-wide w-fit mx-auto sm:mx-0">
                                {profileData.designation}
                            </span>
                        </div>
                        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium text-gray-500">
                            <span className="flex items-center gap-1.5"><FiBriefcase className="text-blue-500" /> ID: {profileData.id}</span>
                            <span className="flex items-center gap-1.5"><FiMapPin className="text-rose-500" /> {profileData.location}</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-6 py-2.5 bg-gray-900 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-gray-800 transition-all shadow-lg active:scale-95"
                            >
                                <FiEdit2 /> Edit Profile
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Information Details */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-extrabold text-gray-900 flex items-center gap-2">
                                General Information
                            </h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly={!isEditing}
                                        value={profileData.firstName}
                                        placeholder="Enter First Name"
                                        onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                                        className={`w-full ${isEditing ? 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-blue-50/20' : 'bg-transparent border-transparent'} border rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        readOnly={!isEditing}
                                        value={profileData.lastName}
                                        placeholder="Enter Last Name"
                                        onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                                        className={`w-full ${isEditing ? 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-blue-50/20' : 'bg-transparent border-transparent'} border rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300`}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                                <div className="relative group">
                                    <input
                                        type="email"
                                        readOnly={!isEditing}
                                        value={profileData.email}
                                        placeholder="ceo@company.com"
                                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                        className={`w-full ${isEditing ? 'bg-gray-50 border-gray-200 pr-12 focus:ring-4 focus:ring-blue-50/20' : 'bg-transparent border-transparent pr-12'} border rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300`}
                                    />
                                    <FiMail className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 size-5 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                                <div className="relative group">
                                    <input
                                        type="tel"
                                        readOnly={!isEditing}
                                        value={profileData.phone}
                                        placeholder="+91 00000 00000"
                                        maxLength={14}
                                        onChange={(e) => {
                                            const rawValue = e.target.value;
                                            let digits = rawValue.startsWith('+91 ') ? rawValue.slice(4) : rawValue.replace(/\D/g, '');
                                            const filteredDigits = digits.replace(/\D/g, '').slice(0, 10);
                                            setProfileData({ ...profileData, phone: `+91 ${filteredDigits}` });
                                        }}
                                        className={`w-full ${isEditing ? 'bg-gray-50 border-gray-200 pr-12 focus:ring-4 focus:ring-blue-50/20' : 'bg-transparent border-transparent pr-12'} border rounded-2xl py-3.5 px-5 font-bold text-gray-800 outline-none transition-all placeholder:text-gray-300`}
                                    />
                                    <FiPhone className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 size-5 group-hover:text-blue-500 transition-colors" />
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 space-y-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">About Me</label>
                            <textarea
                                readOnly={!isEditing}
                                value={profileData.bio}
                                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                rows={4}
                                className={`w-full ${isEditing ? 'bg-gray-50 border-gray-200 focus:ring-4 focus:ring-blue-50/20' : 'bg-transparent border-transparent'} border rounded-2xl py-3.5 px-5 font-medium text-gray-600 outline-none transition-all resize-none placeholder:text-gray-300`}
                                placeholder="Describe your professional journey..."
                            />
                        </div>

                    </div>
                </div>

                {/* Sidebar Cards */}
                <div className="space-y-8">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
                        <h3 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            Security
                        </h3>
                        <div className="space-y-4">
                            <button
                                onClick={() => setIsPasswordModalOpen(true)}
                                className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-2xl font-bold flex items-center justify-between hover:bg-gray-100 transition-all group"
                            >
                                <span>Change Password</span>
                                <FiEdit2 className="text-gray-400 group-hover:text-blue-600" />
                            </button>
                            <button className="w-full py-3 px-4 bg-gray-50 text-gray-700 rounded-2xl font-bold flex items-center justify-between hover:bg-gray-100 transition-all group">
                                <span>Two-Factor Auth</span>
                                <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                                    <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                                </div>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl p-8 text-white relative overflow-hidden group">
                        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
                        <h3 className="text-lg font-black mb-2 tracking-tight">Need Support?</h3>
                        <p className="text-sm text-blue-100 font-medium mb-6">Contact IT department for any account related help.</p>
                        <button className="w-full py-3 bg-white text-blue-600 rounded-2xl font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl active:scale-95 transition-all">
                            Contact IT Help
                        </button>
                    </div>
                </div>
            </div>

                        {isEditing && (
                            <div className="mt-10 pt-8 border-t border-gray-100 flex items-center justify-center gap-3">
                                <button
                                    onClick={handleSave}
                                    className="px-8 py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center gap-2.5 hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
                                >
                                    <FiCheck size={18} /> Save Changes
                                </button>
                              
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="px-8 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-bold flex items-center gap-2.5 hover:bg-gray-50 transition-all active:scale-95"
                                >
                                    <FiX size={18} /> Cancel
                                </button>
                            </div>
                        )}
        </div>
    );
};

export default ProfilePage;
