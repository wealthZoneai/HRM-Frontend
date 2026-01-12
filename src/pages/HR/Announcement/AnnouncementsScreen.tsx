import { getHrAnnouncements, CreateAnnouncement, DeleteAnnouncement, UpdateAnnouncement } from '../../../Services/apiHelpers';
import { FiCalendar, FiBriefcase, FiAlertCircle, FiGift, FiHome, FiPlus, FiClock, FiMapPin, FiTrash2, FiEdit2 } from 'react-icons/fi';
import AddAnnouncementModal from './AddAnnouncementModal';
import AnnouncementSuccessModal from './AnnouncementSuccessModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';

// Define the data structure for an announcement
interface Announcement {
  id: string;
  iconType: 'event' | 'policy' | 'company' | 'benefits' | 'facility';
  title: string;
  description: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  date: string;
  time: string;
  location?: string;
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

  // Category Colors (Department-based)
  switch (category?.toUpperCase()) {
    case 'HR': categoryClasses = 'bg-blue-50 text-blue-700 border border-blue-200'; break;
    case 'IT': categoryClasses = 'bg-purple-50 text-purple-700 border border-purple-200'; break;
    case 'FINANCE': categoryClasses = 'bg-emerald-50 text-emerald-700 border border-emerald-200'; break;
    case 'MARKETING': categoryClasses = 'bg-pink-50 text-pink-700 border border-pink-200'; break;
    case 'SALES': categoryClasses = 'bg-orange-50 text-orange-700 border border-orange-200'; break;
    default: categoryClasses = 'bg-gray-50 text-gray-700 border border-gray-200';
  }

  // Priority Colors
  switch (priority?.toUpperCase()) {
    case 'HIGH': priorityClasses = 'bg-red-50 text-red-700 border border-red-200'; break;
    case 'MEDIUM': priorityClasses = 'bg-amber-50 text-amber-700 border border-amber-200'; break;
    case 'LOW': priorityClasses = 'bg-green-50 text-green-700 border border-green-200'; break;
    default: priorityClasses = 'bg-gray-50 text-gray-700 border border-gray-200';
  }

  return { categoryClasses, priorityClasses };
};

// Announcement Card Component
const AnnouncementCard: React.FC<{ announcement: Announcement; onDelete: (id: string) => void; onEdit: (announcement: Announcement) => void }> = ({ announcement, onDelete, onEdit }) => {
  const { categoryClasses, priorityClasses } = getTagColors(announcement.category, announcement.priority);

  // Format Date & Time
  const formattedDate = new Date(announcement.date).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });

  const formattedTime = announcement.time ? new Date(`2000-01-01T${announcement.time}`).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit'
  }) : '';

  return (
    <div className="group bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-all duration-300 relative overflow-hidden">
      {/* Left Accent Bar based on Priority */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${announcement.priority === 'High' ? 'bg-red-500' :
        announcement.priority === 'Medium' ? 'bg-amber-500' : 'bg-green-500'
        }`}></div>

      <div className="flex flex-col sm:flex-row gap-4 pl-3">
        {/* Icon Box */}
        <div className="hidden sm:flex shrink-0 w-12 h-12 bg-gray-50 rounded-lg items-center justify-center text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
          {getIcon(announcement.iconType)}
        </div>

        <div className="flex-1">
          {/* Header Row: Title & Meta */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
            <h3 className="text-lg font-bold text-gray-900 leading-snug">{announcement.title}</h3>

            <div className="flex items-center gap-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 text-[11px] uppercase tracking-wide font-semibold shrink-0">
                <span className={`px-2 py-1 rounded-md ${categoryClasses}`}>
                  {announcement.category}
                </span>
                <span className={`px-2 py-1 rounded-md ${priorityClasses}`}>
                  {announcement.priority}
                </span>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => onEdit(announcement)}
                className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit Announcement"
              >
                <FiEdit2 size={16} />
              </button>

              {/* Delete Button */}
              <button
                onClick={() => onDelete(announcement.id)}
                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete Announcement"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          </div>

          {/* Date & Time Row */}
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <FiCalendar className="w-3.5 h-3.5" />
              <span>{formattedDate}</span>
            </div>
            {formattedTime && (
              <div className="flex items-center gap-1.5">
                <FiClock className="w-3.5 h-3.5" />
                <span>{formattedTime}</span>
              </div>
            )}
            {announcement.location && (
              <div className="flex items-center gap-1.5">
                <FiMapPin className="w-3.5 h-3.5" />
                <span>{announcement.location}</span>
              </div>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {announcement.description}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Announcements Screen Component
export default function AnnouncementsScreen() {
  const [open, setOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete Modal State
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Edit State
  const [editingAnnouncement, setEditingAnnouncement] = useState<any | null>(null);

  const fetchAnnouncements = async () => {
    setLoading(true);
    try {
      const response = await getHrAnnouncements();
      const data = response.data?.data || response.data || [];
      console.log("Fetched announcements:", data);

      const formattedData: Announcement[] = data.map((item: any) => ({
        id: item.id?.toString() || Math.random().toString(),
        iconType: (item.department || 'company').toLowerCase().includes('event') ? 'event' : 'company',
        title: item.title,
        description: item.description,
        category: item.department || 'General',
        priority: item.priority || 'Medium',
        date: item.date,
        time: item.time,
        location: item.location
      }));

      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      const sorted = formattedData.sort(
        (a, b) => priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
      );

      setAnnouncements(sorted);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setAnnouncementToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!announcementToDelete) return;

    try {
      setIsDeleting(true);
      await DeleteAnnouncement(announcementToDelete);
      toast.success("Announcement deleted successfully");
      fetchAnnouncements(); // Refresh list
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete announcement:", error);
      toast.error("Failed to delete announcement");
    } finally {
      setIsDeleting(false);
      setAnnouncementToDelete(null);
    }
  };

  const handleEdit = (announcement: Announcement) => {
    setEditingAnnouncement({
      title: announcement.title,
      description: announcement.description,
      department: announcement.category, // category maps to department
      priority: announcement.priority,
      date: announcement.date,
      time: announcement.time,
      location: announcement.location || ""
    });
    // We need the ID for the update call, so store it or use a separate state if needed. 
    // Here I'll attach it to the form data temporarily or use a separate state.
    // Better strategy: Keep original announcement object or id.
    // Let's attach id to the editingAnnouncement object for convenience in submit
    setEditingAnnouncement({
      id: announcement.id,
      title: announcement.title,
      description: announcement.description,
      department: announcement.category,
      priority: announcement.priority,
      date: announcement.date,
      time: announcement.time,
      location: announcement.location || ""
    });
    setOpen(true);
  };

  const handleModalClose = () => {
    setOpen(false);
    setEditingAnnouncement(null);
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Announcements
            </h1>
            <p className="text-gray-500 mt-1">Manage and view all company-wide updates.</p>
          </div>

          <button
            className="
              inline-flex items-center justify-center bg-blue-600 text-white 
              px-5 py-2.5 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-0.5
              hover:bg-blue-700 transition-all duration-200 font-medium
            "
            onClick={() => {
              setEditingAnnouncement(null); // Ensure we are in "Create" mode
              setOpen(true);
            }}
          >
            <FiPlus size={18} className="mr-2" />
            New Announcement
          </button>
        </div>

        {/* Announcement List */}
        <div className="flex flex-col gap-4">
          {loading ? (
            <div className="text-center py-20 text-gray-400 animate-pulse">Loading updates...</div>
          ) : announcements.length > 0 ? (
            announcements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
              <FiAlertCircle className="mx-auto h-10 w-10 text-gray-300 mb-3" />
              <p className="text-gray-500 font-medium">No announcements found</p>
              <p className="text-sm text-gray-400 mt-1">Create one to get started!</p>
            </div>
          )}
        </div>
      </div>

      <AddAnnouncementModal
        isOpen={open}
        onClose={handleModalClose}
        initialData={editingAnnouncement}
        onSubmit={async (data) => {
          try {
            if (editingAnnouncement?.id) {
              await UpdateAnnouncement(editingAnnouncement.id, data);
              toast.success("Announcement updated successfully");
            } else {
              await CreateAnnouncement(data);
              setShowSuccessModal(true);
            }
            handleModalClose();
            fetchAnnouncements();
          } catch (error) {
            console.error("Failed to save announcement:", error);
            toast.error("Failed to save announcement.");
          }
        }}
      />

      <AnnouncementSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        isDeleting={isDeleting}
      />
    </div>
  );
}
