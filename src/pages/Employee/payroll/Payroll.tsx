import { useState } from "react";
import SalarySummary from "../payroll/SalarySummary";
import PaymentHistory from "../payroll/PaymentHistory";
import { Download, X, Calendar, MessageCircleQuestion } from "lucide-react";
import {
  payrollSummary,
  paymentHistory
} from "../payroll/payrollData";

export default function Payroll() {
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [querySubject, setQuerySubject] = useState("");
  const [queryDescription, setQueryDescription] = useState("");

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleDownload = () => {
    // Logic for downloading the payslip would go here
    console.log(`Downloading payslip for ${months[selectedMonth]} ${selectedYear}`);
    setIsDownloadModalOpen(false);
  };

  const handleQuerySubmit = () => {
    // Logic for submitting the query would go here
    console.log(`Query submitted - Subject: ${querySubject}, Description: ${queryDescription}`);
    setIsQueryModalOpen(false);
    setQuerySubject("");
    setQueryDescription("");
    // Could integrate with toast notification here
  };

  return (
    <div className="bg-gray-50/50 min-h-screen p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
        <div>
          <h2 className="text-xl md:text-md font-bold text-gray-900 tracking-tight">My Payroll</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your salary details and history</p>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          <button
            onClick={() => setIsQueryModalOpen(true)}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 text-sm rounded-xl font-medium shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-orange-300 transition-all flex-1 sm:flex-initial justify-center"
          >
            <MessageCircleQuestion size={16} />
            Raise Query
          </button>

          <button
            onClick={() => setIsDownloadModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 text-sm rounded-xl font-medium shadow-lg shadow-blue-200 hover:bg-blue-700 hover:shadow-blue-300 transition-all flex-1 sm:flex-initial justify-center"
          >
            <Download size={16} />
            Download Payslip
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {/* Main Content Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          <SalarySummary
            summary={payrollSummary}
            isVisible={isVisible}
            toggleVisibility={() => setIsVisible(!isVisible)}
          />
          {/* <BreakdownDetails breakdown={breakdown} isVisible={isVisible} /> */}
        </div>

        {/* Sidebar Column (1/3 width) */}
        <div className="lg:col-span-1">
          <PaymentHistory history={paymentHistory} isVisible={isVisible} />
        </div>
      </div>

      {/* Download Modal */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Download Payslip</h3>
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <p className="text-gray-600 text-sm">
                Select your preferred year and month to download the payslip summary.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Year</label>
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(Number(e.target.value))}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8"
                    >
                      {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <Calendar size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Month</label>
                  <div className="relative">
                    <select
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(Number(e.target.value))}
                      className="w-full appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8"
                    >
                      {months.map((month, index) => (
                        <option key={index} value={index}>{month}</option>
                      ))}
                    </select>
                    <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleDownload}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100 flex items-center justify-center gap-2"
              >
                <Download size={18} />
                Download Summary
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Query Modal */}
      {isQueryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">Raise Salary Query</h3>
              <button
                onClick={() => setIsQueryModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-gray-600 text-sm">
                Have a discrepancy in your salary? Let us know and we'll address it promptly.
              </p>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Subject</label>
                <input
                  type="text"
                  value={querySubject}
                  onChange={(e) => setQuerySubject(e.target.value)}
                  placeholder="e.g., Missing overtime pay"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Description</label>
                <textarea
                  value={queryDescription}
                  onChange={(e) => setQueryDescription(e.target.value)}
                  placeholder="Please describe the issue in detail..."
                  rows={4}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-orange-500 focus:border-orange-500 block p-3 resize-none"
                ></textarea>
              </div>

              <button
                onClick={handleQuerySubmit}
                disabled={!querySubject.trim() || !queryDescription.trim()}
                className="w-full bg-orange-600 text-white font-medium py-3 rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-100 flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed disabled:shadow-none"
              >
                <MessageCircleQuestion size={18} />
                Submit Query
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Chevron Down Icon for the select
const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
