import DashboardLayout from "../dashboard/DashboardLayout";
import ProfileHeader from "../Profile/ProfileHeader";
import ProfileTabs from "../Profile/ProfileTabs";

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <ProfileHeader />
        <ProfileTabs />
      </div>
    </DashboardLayout>
  );
}
