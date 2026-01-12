


const endpoints = {

    //authentication
    login: 'api/login/',
    register: 'api/auth/candidateSignup',

    //hr endpoints

    createEmployes: 'api/hr/create-employee/',
    employees: 'api/employees/',
    hrAnnouncements: '/api/announcement/list/',
    createAnnouncement: 'api/announcement/create/',
    hrDashboardStats: 'api/hr/dashboard/stats/',
    hrLeaveDashboardStats: 'api/leave-dashboard/stats/',
    hrMonthlyAttendance: "api/attendance/",
    updateEmployeeJobBank: (id: string | number) => `api/employees/${id}/job&bank/`,
    updateEmployeeRole: (id: string | number) => `api/hr/employees/${id}/role/`,
    updateEmployeeContact: (id: string | number) => `api/hr/employees/${id}/contact/`,


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
    policies: "api/policies/",
    createPolicy: "api/policy/create/",
    // todayAttendance:"/api/attendance/today/"

}

export default endpoints