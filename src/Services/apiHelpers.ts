import endpoints from "./endpoints";
import server from "./index";

export const PrivateAxios = server;


export function loginUser({ username, password }: ILoginUserBody) {
  const body = { username, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}

export function CreateEmployes(body: ICreateEmployesBody) {
  return server.post(endpoints.createEmployes, body, {
    requiresAuth: true,
  });
}

// Used by HR Dashboard to list all employees
export function GetAllEmployes() {
  return server.get(endpoints.employees, { requiresAuth: true });
}

export function GetEmployeeById(id: string) {
  return server.get(`${endpoints.employees}${id}/`, { requiresAuth: true });
}

export function GetMyProfile() {
  return server.get(endpoints.myProfile, { requiresAuth: true });
}

export function UpdateMyProfileImage(formData: FormData) {
  return server.patch(endpoints.myProfileContact, formData, {
    requiresAuth: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function UpdateContactDetails(body: any) {
  return server.patch(endpoints.myProfileContact, body, {
    requiresAuth: true,
  });
}

export function ClockIn() {
  return server.post(endpoints.clockIn, {}, { requiresAuth: true });
}

export function ClockOut() {
  return server.post(endpoints.clockOut, {}, { requiresAuth: true });
}

export function ApplyLeave(formData: FormData) {
  return server.post(endpoints.applyLeave, formData, {
    requiresAuth: true,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export function GetHRLeaves() {
  return server.get(endpoints.hrLeaves, { requiresAuth: true });
}

export function GetMyLeaves() {
  return server.get(endpoints.myLeaves, { requiresAuth: true });
}

export function GetDailyAttendance() {
  return server.get(endpoints.dailyAttendance, { requiresAuth: true });
}

export function GetPendingLeaves() {
  return server.get(endpoints.pendingLeaves, { requiresAuth: true });
}

export function GetTeamMembers() {
  return server.get(endpoints.teamMembers, { requiresAuth: true });
}

export function GetTeamDashboard() {
  return server.get(endpoints.teamDashboard, { requiresAuth: true });
}

export function TLLeaveAction(id: string | number, action: 'approve' | 'reject', remarks: string = "") {
  return server.post((endpoints as any).tlLeaveAction(id), { action, remarks }, { requiresAuth: true });
}

export function HRLeaveAction(id: string | number, action: 'approve' | 'reject', remarks: string = "") {
  return server.post((endpoints as any).hrLeaveAction(id), { action, remarks }, { requiresAuth: true });
}

// 1. Update Job Description & Bank Details
export function UpdateEmployeeJobAndBank(id: string | number, body: any) {
  return server.patch((endpoints as any).updateEmployeeJobBank(id), body, {
    requiresAuth: true,
  });
}

// 2. Update Role, Name & Department
export function UpdateEmployeeRole(id: string | number, body: any) {
  return server.patch((endpoints as any).updateEmployeeRole(id), body, {
    requiresAuth: true,
  });
}

// 3. Update Contact Information
export function UpdateEmployeeContact(id: string | number, body: any) {
  return server.patch((endpoints as any).updateEmployeeContact(id), body, {
    requiresAuth: true,
  });
}

//employees

export function ForgotPassword(email: string) {
  const body = { email };
  return server.post(endpoints.forgotPassword, body, { requiresAuth: false })
}



export function ResetPassword({ email, otp, new_password, confirm_password }: { email: string, otp: string, new_password: string, confirm_password: string }) {
  const body = { email, otp, new_password, confirm_password };
  return server.post(endpoints.resetPassword, body, { requiresAuth: false })
}


export const gettotalAttendance = () => {
  return server.get(endpoints.totalAttendance, {
    requiresAuth: true,
  });
};


export const secondsToHHMM = (seconds: number): string => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

export const timeStringToSeconds = (time: string | null): number => {
  if (!time) return 0;
  const [h, m] = time.split(":").map(Number);
  return h * 3600 + m * 60;
};


export const getAnnouncements = () => {
  return server.get(endpoints.announcements, {
    requiresAuth: true, // set false if backend does not require token
  });
};

// Policies
export const getPolicies = () => {
  return server.get(endpoints.policies, { requiresAuth: true });
};

export const CreatePolicy = (data: any) => {
  // Ensure backend receives JSON; some clients default to text/plain
  return server.post(endpoints.createPolicy, data, {
    requiresAuth: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const deletePolicy = (id: string | number) => {
  return server.delete((endpoints as any).deletePolicy(id), {
    requiresAuth: true,
  });
};

export const getNotifications = () => {
  return server.get(endpoints.notifications, {
    requiresAuth: true,
  });
};

export const markAllNotificationsRead = () => {
  return server.post(endpoints.markNotificationsRead, {}, {
    requiresAuth: true,
  });
};



export const getCalendarEvents = (year?: number, month?: number) => {
  let url = endpoints.calendar;
  const params = new URLSearchParams();
  if (year) params.append('year', year.toString());
  if (month) params.append('month', month.toString());

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  return server.get(url, {
    requiresAuth: true,
  });
};


export const getHrAnnouncements = () => {
  return server.get(endpoints.hrAnnouncements, { requiresAuth: true });
};

export const CreateAnnouncement = (data: any) => {
  return server.post(endpoints.createAnnouncement, data, {
    requiresAuth: true,
  });
};

export const DeleteAnnouncement = (id: string | number) => {
  return server.delete((endpoints as any).deleteAnnouncement(id), {
    requiresAuth: true,
  });
};

export const UpdateAnnouncement = (id: string | number, data: any) => {
  return server.put((endpoints as any).updateAnnouncement(id), data, {
    requiresAuth: true,
  });
};

export const GetMonthlyAttendance = (year: string, month: string) => {
  const url = `${endpoints.hrMonthlyAttendance}?month=${year}-${month}`;

  return server.get(url, {
    requiresAuth: true,
  });
};

export const getHRDashboardStats = () => {
  return server.get(endpoints.hrDashboardStats, {
    requiresAuth: true,
  });
};

export const getLeaveDashboardStats = () => {
  return server.get(endpoints.hrLeaveDashboardStats, {
    requiresAuth: true,
  });
};