import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, IdCard, MapPin, Calendar, Camera } from 'lucide-react';
import Pic from '../../../assets/user.png';
import { UpdateMyProfileImage } from '../../../Services/apiHelpers';
import server from '../../../Services/index';
import { showSuccess, showError } from '../../../utils/toast';

const ProfileHeader = ({ data }: { data?: any }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(Pic);

  useEffect(() => {
    let active = true;
    let objectUrl: string | null = null;

    const fetchImage = async () => {
      if (data?.protected_profile_photo_url) {
        try {
          // Fetch image as Blob with auth headers
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

  // If data is missing (still loading or error), can show skeleton or default
  // For now, using optional chaining fallback

  const fullName = data?.profile.first_name
    ? `${data?.profile.first_name} ${data?.profile.last_name}`
    : localStorage.getItem('userName')?.split('.')[0] || "User Name";

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

          {/* Profile Image */}
          {/* Profile Image */}
          <div className="relative shrink-0 mx-auto sm:mx-0 group">
            <img
              src={imageSrc}
              alt="Profile"
              className="h-24 w-24 sm:h-32 sm:w-32 rounded-full border-4 border-gray-50 shadow-sm object-cover bg-white"
            />
            {/* Online Status Indicator */}
            <span className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full border-2 border-white bg-green-500 shadow-sm z-10" />

            {/* Upload Overlay */}
            <div
              className={`absolute inset-0 rounded-full bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 ${imageSrc !== Pic ? 'cursor-default' : 'cursor-pointer'}`}
              onClick={() => {
                if (!uploading && imageSrc === Pic) fileInputRef.current?.click();
              }}
            >
              <div className="flex gap-4">
                <div
                  className="cursor-pointer hover:scale-110 transition-transform p-2 bg-black/20 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!uploading) fileInputRef.current?.click();
                  }}
                  title="Upload New Picture"
                >
                  <Camera className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                {imageSrc !== Pic && (
                  <div
                    className="cursor-pointer hover:scale-110 transition-transform p-2 bg-black/20 rounded-full"
                    onClick={async (e) => {
                      e.stopPropagation();
                      if (uploading) return;
                      if (!window.confirm("Are you sure you want to delete your profile picture?")) return;
                      setUploading(true);
                      try {
                        const formData = new FormData();
                        // Passing empty string can sometimes delete string fields or image fields on some backends 
                        // If it fails, another backend patch might be needed but we pass an empty file instance or empty string here
                        formData.append('profile_photo', '');
                        await UpdateMyProfileImage(formData);
                        showSuccess("Profile photo deleted successfully! Please refresh.");
                        window.location.reload();
                      } catch (err: any) {
                        showError(err.response?.data?.detail || "Failed to delete profile photo.");
                      } finally {
                        setUploading(false);
                      }
                    }}
                    title="Delete Picture"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white w-5 h-5 sm:w-6 sm:h-6"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                  </div>
                )}
              </div>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setUploading(true);
                  const formData = new FormData();
                  formData.append('profile_photo', file);

                  try {
                    await UpdateMyProfileImage(formData);
                    showSuccess("Profile photo updated successfully! Please refresh.");
                    // Force a reload to re-mount component and trigger useEffect
                    window.location.reload();
                  } catch (err: any) {
                    showError(err.response?.data?.detail || "Failed to update profile photo.");
                    console.error(err);
                  } finally {
                    setUploading(false);
                  }
                }
              }}
            />
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center sm:text-left w-full">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                  {fullName}
                </h2>
                <p className="text-sm sm:text-base text-gray-500 font-medium mt-1">{data?.job_title || "Employee"}</p>
              </div>

              {/* Status Badge or Quick Action */}
              <div className="hidden sm:block">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700 border border-green-200">
                  Active Employee
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="mt-6 flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                <Briefcase size={14} className="text-blue-500 shrink-0" />
                <span>{data?.profile.department || "Department"}</span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                <IdCard size={14} className="text-purple-500 shrink-0" />
                <span>{data?.profile?.emp_id || "ID"}</span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                <MapPin size={14} className="text-red-500 shrink-0" />
                <span>{data?.profile?.location || "Hyderabad"}</span>
              </div>

              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600 bg-gray-50 px-2.5 sm:px-3 py-1.5 rounded-lg border border-gray-100">
                <Calendar size={14} className="text-orange-500 shrink-0" />
                <span>DOJ: {data?.profile?.start_date || "N/A"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;