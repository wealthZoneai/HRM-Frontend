import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, IdCard, MapPin, Calendar, Camera } from 'lucide-react';
import Pic from '../../../assets/user.png';
// Import API helpers
import { GetMyProfile, UpdateMyProfileImage } from '../../../Services/apiHelpers';
import server from '../../../Services/index';
import { showSuccess, showError } from '../../../utils/toast';

const HRProfileHeader = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [imageSrc, setImageSrc] = useState<string>(Pic);
    const [data, setData] = useState<any>(null);

    // 1. Fetch Profile Data on Mount
    const fetchProfileData = async () => {
        try {
            const response = await GetMyProfile();
            setData(response.data);
        } catch (error) {
            console.error("Failed to load profile data", error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    // 2. Fetch Secure Image Blob when URL is available
    useEffect(() => {
        let active = true;
        let objectUrl: string | null = null;

        const fetchImage = async () => {
            if (data?.protected_profile_photo_url) {
                try {
                    const response = await server.get(data.protected_profile_photo_url, {
                        responseType: "blob",
                        requiresAuth: true,
                        params: { t: new Date().getTime() } // Cache busting
                    });

                    if (active) {
                        objectUrl = URL.createObjectURL(response.data);
                        setImageSrc(objectUrl);
                    }
                } catch (error) {
                    console.error("Failed to load profile image", error);
                    if (active) setImageSrc(Pic);
                }
            } else {
                if (active) setImageSrc(Pic);
            }
        };

        fetchImage();

        return () => {
            active = false;
            if (objectUrl) URL.revokeObjectURL(objectUrl);
        };
    }, [data?.protected_profile_photo_url]);

    // 3. Handle File Upload
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploading(true);
            const formData = new FormData();
            formData.append('profile_photo', file);

            try {
                await UpdateMyProfileImage(formData);
                showSuccess("Profile photo updated successfully!");
                // Refresh data to get the new image URL
                await fetchProfileData();
            } catch (err: any) {
                showError(err.response?.data?.detail || "Failed to update profile photo.");
                console.error(err);
            } finally {
                setUploading(false);
            }
        }
    };

    // Determine Display Values (API Data -> LocalStorage -> Default)
    const userName = data 
        ? `${data.first_name} ${data.last_name}` 
        : (localStorage.getItem("userName") || "HR Manager");
    
    const role = data?.user?.role || "Human Resources Manager";
    const department = data?.department || "HR Department";
    const employeeId = data?.employee_id || localStorage.getItem("empId") || "WZG-HR-001";
    const location = data?.location || "Hyderabad, India";
    const doj = data?.date_of_joining || "01/01/2023";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100"
        >
            {/* Content Area */}
            <div className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">

                    {/* Profile Image Section */}
                    <div className="relative shrink-0 mx-auto sm:mx-0 group">
                        <img
                            src={imageSrc}
                            alt="Profile"
                            className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-gray-50 shadow-sm object-cover bg-white"
                        />
                        {/* Online Status Indicator */}
                        <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white bg-green-500 shadow-sm z-10" />

                        {/* Camera Overlay for Upload */}
                        <div
                            className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-20"
                            onClick={() => !uploading && fileInputRef.current?.click()}
                        >
                            <Camera className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                        </div>

                        {/* Hidden File Input */}
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                            disabled={uploading}
                        />
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 text-center sm:text-left w-full">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                                    {userName}
                                </h2>
                                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">
                                    {role.toUpperCase()}
                                </p>
                            </div>

                            {/* Status Badge */}
                            <div className="hidden sm:block">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                                    Active
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <Briefcase size={14} className="text-blue-500 shrink-0" />
                                <span>{department}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <IdCard size={14} className="text-purple-500 shrink-0" />
                                <span>{employeeId}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <MapPin size={14} className="text-red-500 shrink-0" />
                                <span>{location}</span>
                            </div>

                            <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                                <Calendar size={14} className="text-orange-500 shrink-0" />
                                <span>DOJ: {doj}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default HRProfileHeader;