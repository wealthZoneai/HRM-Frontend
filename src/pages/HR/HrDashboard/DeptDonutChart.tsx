import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import DepartmentModal from "./DepartmentModal";

export interface DeptDataItem {
  name: string;
  value: number;
  interns: number;
  juniors: number;
  seniors: number;
  leads: number;
  productivityData: any[];
  attendanceData: any[];
  [key: string]: any; 
}


interface Props {
  data: DeptDataItem[];
}

const COLORS = ["#90BFFF", "#A3C9FF", "#3377CC", "#66A3FF", "#1A5099", "#4A82CD"];

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;
  const item = payload[0].payload;

  return (
    <div className="bg-white shadow-md p-3 rounded-md border text-sm">
      <p className="font-semibold">{item.name}</p>
      <p>Total: {item.value}</p>
    </div>
  );
};

export default function DeptDonutChart({ data }: Props) {
  const [selectedDept, setSelectedDept] = useState<DeptDataItem | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (dept: DeptDataItem) => {
    setSelectedDept(dept);
    setOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">Employee By Department</h3>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="w-full max-w-[260px] shrink-0">
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={75}
                  outerRadius={120}
                  dataKey="value"
                  cursor="pointer"
                  stroke="none"
                  isAnimationActive={false}
                  onClick={(e) => openModal(e)}
                >
                  {data.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]}
                    className="outline-none focus:outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex-1 space-y-3">
            {data.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-3 cursor-pointer hover:opacity-60"
                onClick={() => openModal(item)}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[i % COLORS.length] }}
                />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🔥 Reusable Modal */}
      <DepartmentModal open={open} onClose={() => setOpen(false)} dept={selectedDept} />
    </>
  );
}
