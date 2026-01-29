
import { useEffect, useState } from "react";
import ProfileHeader from "./ProfileHeader";
import ProfileTabs from "./ProfileTabs";
import { GetMyProfile } from "../../../Services/apiHelpers";

export default function Profile() {
  const [employeeData, setEmployeeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await GetMyProfile();
        console.log("Profile: GetMyProfile response:", response.data);

        if (response.data) {
          setEmployeeData(response.data);
        } else {
          console.warn("No data returned for this employee.");
        }

      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="p-6">Loading profile...</div>;
  }

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <ProfileHeader data={employeeData} />
      <ProfileTabs data={employeeData} />
    </div>
  );
}











