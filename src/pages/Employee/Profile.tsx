import DashboardLayout from "../../components/dashboard/DashboardLayout";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import ProfileTabs from "../../components/Profile/ProfileTabs";

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
