const endpoints = {
    // ==========================================
    // AUTHENTICATION
    // ==========================================
    login: '/api/login/',
    register: '/api/auth/candidateSignup',
    forgotPassword: 'api/forgot-password/',
    resetPassword: 'api/reset-password/',
    refresh: 'api/refresh/',

    // ==========================================
    // HR ENDPOINTS
    // ==========================================
    // --- GET ---
    employees: 'api/employees/', // List all employees
    hrDashboardStats: 'api/hr/dashboard/stats/',
    hrLeaveDashboardStats: 'api/leave-dashboard/stats/',
    hrMonthlyAttendance: "api/attendance/",
    hrLeaves: 'api/leaves/', // All leave requests
    hrAnnouncements: '/api/announcement/list/',
    totalAttendance: "api/attendance/days/",

    // --- POST (Create) ---
    createEmployes: 'api/hr/create-employee/',
    createAnnouncement: 'api/announcement/create/',
    createPolicy: "api/policy/create/",
    hrLeaveAction: (id: string | number) => `api/leaves/${id}/action/`, // Approve/Reject

    // --- UPDATE (Patch/Put) ---
    updateEmployeeRole: (id: string | number) => `api/hr/employees/${id}/role/`,
    updateEmployeeJobBank: (id: string | number) => `api/employees/${id}/job&bank/`,
    updateEmployeeContact: (id: string | number) => `api/hr/employees/${id}/contact/`,
    updateAnnouncement: (id: string | number) => `api/announcement/${id}/update/`,
    updatePolicy: (id: string | number) => `api/policy/update/${id}/`,

    // --- DELETE ---
    deleteAnnouncement: (id: string | number) => `api/announcement/${id}/delete/`,
    deletePolicy: (id: string | number) => `api/policy/delete/${id}/`,

    // ==========================================
    // TEAM LEAD (TL) & MANAGER ENDPOINTS
    // ==========================================
    // --- GET ---
    teamMembers: 'api/team/members/',
    teamDashboard: 'api/team/dashboard/',
    pmProjects: 'api/pm/projects/',
    dmProjects: 'api/dm/projects/',
    tlModules: 'api/tl/modules/',

    // --- POST ---
    createProject: 'api/dm/project/create/',
    createModule: (projectId: string | number) => `api/pm/project/${projectId}/module/create/`,
    createTask: (moduleId: string | number) => `api/tl/module/${moduleId}/task/create/`,
    tlCreateAnnouncement: 'api/tl/announcement/create/',
    assignPM: (projectId: string | number) => `api/dm/project/${projectId}/assign-pm/`,
    tlLeaveAction: (id: string | number) => `api/leave/${id}/action/`,

    // ==========================================
    // EMPLOYEE ENDPOINTS
    // ==========================================
    // --- GET ---
    myProfile: 'api/my-profile/',
    myLeaves: 'api/leave/my-requests/',
    pendingLeaves: 'api/leave/pending/',
    dailyAttendance: 'api/timesheet/daily/form/',
    employeeProjectStatus: 'api/employee/project-status/',
    employeeTasks: 'api/employee/tasks/',
    
    // --- POST ---
    clockIn: 'api/attendance/clock-in/',
    clockOut: 'api/attendance/clock-out/',
    applyLeave: 'api/leave/apply/',

    // --- UPDATE ---
    myProfileContact: 'api/my-profile/contact/',
    myIdentification: 'api/my-profile/identification/',

    // ==========================================
    // COMMON / SHARED (Notifications, Calendar, etc)
    // ==========================================
    announcements: "/api/announcements/", // View announcements
    policies: "api/policy/",
    calendar: "api/calendar/events/",
    notifications: "/api/notifications/",
    markNotificationsRead: "/api/notifications/mark-read/",
    mySensitiveData: 'api/my-profile/sensitive/',
}

export default endpoints;