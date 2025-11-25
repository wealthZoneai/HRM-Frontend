export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
  assignedTo?: string; // New field for subtask delegation
}

export interface Task {
  title: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  status: "none" | "completed" | "inProgress" | "notStarted";
  assignedBy: string; // Team Lead who assigned the task
  assignedTo: string; // Employee assigned to the task
  subtasks: Subtask[];
}

// Dummy list of employees for assignment dropdowns
export const employees = [
  "John Doe",
  "Jane Smith",
  "Mike Johnson",
  "Sarah Williams",
  "David Brown"
];

export const tasks: Task[] = [
  {
    title: "Design new onboarding flow",
    priority: "High",
    due: "Oct 25, 2025",
    status: "inProgress",
    assignedBy: "Sarah Johnson",
    assignedTo: "John Doe",
    subtasks: [
      { id: "s1", title: "Create wireframes", completed: true, assignedTo: "John Doe" },
      { id: "s2", title: "Review with stakeholders", completed: false, assignedTo: "John Doe" },
      { id: "s3", title: "Finalize UI mockups", completed: false, assignedTo: "Jane Smith" }, // Delegated
    ],
  },
  {
    title: "Fix navigation bug",
    priority: "Medium",
    due: "Oct 26, 2025",
    status: "notStarted",
    assignedBy: "Mike Johnson",
    assignedTo: "John Doe",
    subtasks: [
      { id: "s4", title: "Reproduce issue", completed: false, assignedTo: "John Doe" },
      { id: "s5", title: "Implement fix", completed: false, assignedTo: "John Doe" },
    ],
  },
  {
    title: "Update API documentation",
    priority: "Low",
    due: "Oct 28, 2025",
    status: "completed",
    assignedBy: "Sarah Johnson",
    assignedTo: "Jane Smith",
    subtasks: [
      { id: "s6", title: "Review endpoints", completed: true, assignedTo: "Jane Smith" },
      { id: "s7", title: "Update Swagger", completed: true, assignedTo: "Jane Smith" },
    ],
  },
  {
    title: "Optimize database queries",
    priority: "High",
    due: "Oct 30, 2025",
    status: "inProgress",
    assignedBy: "David Brown",
    assignedTo: "Mike Johnson",
    subtasks: [
      { id: "s8", title: "Analyze slow queries", completed: true, assignedTo: "Mike Johnson" },
      { id: "s9", title: "Add indexes", completed: false, assignedTo: "Mike Johnson" },
    ],
  },
];
