


const endpoints = {

    //authentication
    login: '/api/login/',
    register: '/api/auth/candidateSignup',

    //hr endpoints

    createEmployes: 'api/hr/create-employee/',
    employees: 'api/employees/',
    hrAnnouncements: '/api/announcement/list/',
    createAnnouncement: 'api/announcement/create/',
    deleteAnnouncement: (id: string | number) => `api/announcement/${id}/delete/`,
    updateAnnouncement: (id: string | number) => `api/announcement/${id}/update/`,
    hrDashboardStats: 'api/hr/dashboard/stats/',
    hrLeaveDashboardStats: 'api/leave-dashboard/stats/',
    hrMonthlyAttendance: "api/attendance/",
    updateEmployeeJobBank: (id: string | number) => `api/employees/${id}/job&bank/`,
    updateEmployeeRole: (id: string | number) => `api/hr/employees/${id}/role/`,
    updateEmployeeContact: (id: string | number) => `api/hr/employees/${id}/contact/`,

    // tl endpoints
    tlCreateAnnouncement: 'api/tl/announcement/create/',




    //employee endpoints
    forgotPassword: 'api/forgot-password/',
    resetPassword: 'api/reset-password/',
    myProfile: 'api/my-profile/',
    myProfileContact: 'api/my-profile/contact/',
    refresh: 'api/refresh/',

    //attendance
    clockIn: 'api/attendance/clock-in/',
    clockOut: 'api/attendance/clock-out/',
    applyLeave: 'api/leave/apply/',
    hrLeaves: 'api/leaves/',
    myLeaves: 'api/leave/my-requests/',
    dailyAttendance: 'api/timesheet/daily/form/',
    teamDashboard: 'api/team/dashboard/',
    teamMembers: 'api/team/members/',
    pendingLeaves: 'api/leave/pending/',
    hrLeaveAction: (id: string | number) => `api/leaves/${id}/action/`,
    tlLeaveAction: (id: string | number) => `api/leave/${id}/action/`,
    totalAttendance: "api/attendance/days/",
    announcements: "/api/announcements/",
    notifications: "/api/notifications/",
    markNotificationsRead: "/api/notifications/mark-read/",
    calendar: "api/calendar/events/",
    policies: "api/policy/",
    createPolicy: "api/policy/create/",
    deletePolicy: (id: string | number) => `api/policy/delete/${id}/`,
    // Manager (DM/PM/TL) Endpoints
    createProject: 'api/dm/project/create/',
    assignPM: (projectId: string | number) => `api/dm/project/${projectId}/assign-pm/`,

    createModule: (projectId: string | number) => `api/pm/project/${projectId}/module/create/`,

    pmProjects: 'api/pm/projects/',
    dmProjects: 'api/dm/projects/',
    tlModules: 'api/tl/modules/',
    createTask: (moduleId: string | number) => `api/tl/module/${moduleId}/task/create/`,
    employeeProjectStatus: 'api/employee/project-status/',
    employeeTasks: 'api/employee/tasks/',
}

export default endpoints