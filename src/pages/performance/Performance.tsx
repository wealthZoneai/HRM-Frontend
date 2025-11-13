import DashboardLayout from "../dashboard/DashboardLayout";
import { performanceData } from "../../data/performanceData";
import PerformanceChart from "../performance/PerformanceChart";
import MetricsCard from "../performance/MetricsCard";
import CurrentObjectives from "../performance/CurrentObjectives";

export default function Performance() {
  const { metrics, weeklyPerformance, objectives, feedback } = performanceData;

  return (
    <DashboardLayout>
      <div className="space-y-6 p-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Performance Dashboard</h1>
          <p className="text-gray-500">Track and manage your performance metrics</p>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricsCard 
            label="Overall Score" 
            value={metrics.overallScore.value} 
            change={metrics.overallScore.change} 
          />
          <MetricsCard 
            label="Tasks Completed" 
            value={metrics.tasksCompleted.value} 
            change={metrics.tasksCompleted.change} 
          />
          <MetricsCard 
            label="Ongoing Tasks" 
            value={metrics.ongoingTasks.value} 
            change={metrics.ongoingTasks.change} 
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Weekly Performance</h2>
            <PerformanceChart data={weeklyPerformance} />
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Current Objectives</h2>
            <CurrentObjectives objectives={objectives} />
          </div>
        </div>

        {/* Feedback Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Manager Feedback</h2>
          <div className="space-y-4">
            {feedback.map((item, index) => (
              <div key={index} className="border-b pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{item.manager}</h4>
                    <p className="text-sm text-gray-500">{item.date}</p>
                  </div>
                </div>
                <p className="mt-2 text-gray-700">{item.message}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}