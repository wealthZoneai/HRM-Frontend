import HRProfileHeader from "./HRProfileHeader";
import HRProfileTabs from "./HRProfileTabs";

export default function HRProfile() {
    return (
        <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
            <HRProfileHeader />
            <HRProfileTabs />
        </div>
    );
}
