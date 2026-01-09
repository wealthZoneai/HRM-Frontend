import React, { useState, useEffect } from 'react';
import { getHrAnnouncements, CreateAnnouncement } from '../../../Services/apiHelpers';
import { FiCalendar, FiBriefcase, FiAlertCircle, FiGift, FiHome, FiPlus } from 'react-icons/fi'; // Importing icons
import AddAnnouncementModal from './AddAnnouncementModal';
import AnnouncementSuccessModal from './AnnouncementSuccessModal';
import { toast } from 'react-toastify';

// Define the data structure for an announcement
interface Announcement {
  id: string;
  iconType: 'event' | 'policy' | 'company' | 'benefits' | 'facility'; // For dynamic icon
  title: string;
  description: string;
  category: string; // e.g., "Events", "Policy", "Company"
  priority: 'High' | 'Medium' | 'Low';
}



// Helper function to get icon based on type
const getIcon = (type: Announcement['iconType']) => {
  switch (type) {
    case 'event': return <FiCalendar size={20} />;
    case 'policy': return <FiBriefcase size={20} />;
    case 'company': return <FiAlertCircle size={20} />;
    case 'benefits': return <FiGift size={20} />;
    case 'facility': return <FiHome size={20} />;
    default: return <FiAlertCircle size={20} />;
  }
};

// Helper function to get tag colors based on category and priority
const getTagColors = (category: string, priority: string) => {
  let categoryClasses = '';
  let priorityClasses = '';

  // Category Colors
  switch (category) {
    case 'Events': categoryClasses = 'bg-blue-100 text-blue-700'; break;
    case 'Policy': categoryClasses = 'bg-indigo-100 text-indigo-700'; break;
    case 'Company': categoryClasses = 'bg-teal-100 text-teal-700'; break;
    case 'Benefits': categoryClasses = 'bg-purple-100 text-purple-700'; break;
    case 'Facility': categoryClasses = 'bg-gray-100 text-gray-700'; break;
    default: categoryClasses = 'bg-gray-100 text-gray-700';
  }

  // Priority Colors
  switch (priority) {
    case 'High': priorityClasses = 'bg-red-100 text-red-700'; break;
    case 'Medium': priorityClasses = 'bg-yellow-100 text-yellow-700'; break;
    case 'Low': priorityClasses = 'bg-gray-200 text-gray-700'; break;
    default: priorityClasses = 'bg-gray-200 text-gray-700';
  }

  return { categoryClasses, priorityClasses };
};


// Announcement Card Component
const AnnouncementCard: React.FC<{ announcement: Announcement }> = ({ announcement }) => {
  const { categoryClasses, priorityClasses } = getTagColors(announcement.category, announcement.priority);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start mb-3">
        {/* Icon */}
        <div className="flex-shrink-0 mr-3 text-blue-600">
          {getIcon(announcement.iconType)}
        </div>

        {/* Title and Tags */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{announcement.title}</h3>
          <div className="flex flex-wrap gap-2 text-xs font-medium">
            <span className={`px-2 py-0.5 rounded ${categoryClasses}`}>{announcement.category}</span>
            <span className={`px-2 py-0.5 rounded ${priorityClasses}`}>{announcement.priority}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed">
        {announcement.description}
      </p>
    </div>
  );
};

// Main Announcements Screen Component
export default function AnnouncementsScreen() {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const fetchAnnouncements = async () => {
    try {
      const response = await getHrAnnouncements();
      // Access data.data based on API structure seen in Announcements.tsx
      const data = response.data?.data || response.data || [];
      console.log("Fetched announcements:", data);

      const formattedData: Announcement[] = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        iconType: (item.department || 'company').toLowerCase() as any,
        title: item.title,
        description: item.description,
        category: item.department || 'General',
        priority: item.priority || 'Medium',
      }));

      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      const sorted = formattedData.sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
      );

      setAnnouncements(sorted);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Announcements
          </h1>

          <button
            className="
              flex items-center justify-center bg-blue-600 text-white 
              px-4 py-2 rounded-lg shadow-md 
              hover:bg-blue-700 
              transition-colors w-full sm:w-auto
            "
            onClick={() => setOpen(true)}
          >
            <FiPlus size={20} className="mr-2" />
            Add Announcements
          </button>
        </div>

        {/* Announcement List */}
        <div className="flex flex-col gap-4 sm:gap-6">
          {announcements.map((announcement) => (
            <AnnouncementCard key={announcement.id} announcement={announcement} />
          ))}
          {announcements.length === 0 && (
            <p className="text-gray-500 text-center py-10">No announcements found.</p>
          )}
        </div>
      </div>

      <AddAnnouncementModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onSubmit={async (data) => {
          console.log("Announcement Data:", data);
          try {
            await CreateAnnouncement(data);
            setOpen(false);
            setShowSuccessModal(true);
            fetchAnnouncements();
          } catch (error) {
            console.error("Failed to create announcement:", error);
            toast.error("Failed to create announcement.");
          }
        }}
      />

      <AnnouncementSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />
    </div>
  );
}
