

const endpoints = {

    //authentication
    login: 'api/login/',
    register: 'api/auth/candidateSignup',

    //hr endpoints

    createEmployes: 'api/hr/create-employee/',
    employees: 'api/employees/',


    //employee endpoints
    forgotPassword: 'api/forgot-password/',
    resetPassword: 'api/reset-password/',
    myProfile: 'api/my-profile/',
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
    tlLeaveAction: (id: string | number) => `api/leave/${id}/action/`,
    totalAttendance: "api/attendance/days/",
 
}

export default endpoints