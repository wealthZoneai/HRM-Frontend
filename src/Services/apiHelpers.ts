import endpoints from "./endpoints";
import server from "./index";

export const PrivateAxios = server;

// ==========================================
// 📄 TYPES & INTERFACES
// ==========================================

export interface IIdentificationBody {
  aadhaar_number?: string;
  aadhaar_front_image?: File | null;
  aadhaar_back_image?: File | null;
  pan?: string | null;
  pan_front_image?: File | null;
  pan_back_image?: File | null;
  passport_number?: string;
  passport_front_image?: File | null;
  passport_back_image?: File | null;
  // ✅ Bank Fields included to allow persistence
  bank_name?: string;
  account_number?: string;
  ifsc_code?: string;
  branch?: string;
  account_holder_name?: string;
}

export interface ISensitiveData {
  account_holder_name: string;
  aadhaar_number: string | null;
  aadhaar_front_image_url: string | null;
  aadhaar_back_image_url: string | null;
  pan: string | null;
  pan_front_image_url: string | null;
  pan_back_image_url: string | null;
  passport_number: string | null;
  passport_front_image_url: string | null;
  passport_back_image_url: string | null;
  bank_name: string;
  ifsc_code: string;
  account_number: string;
  branch: string;
}

export interface ISensitiveResponse {
  temporary: boolean;
  data: ISensitiveData;
}

// ==========================================
// 🔐 AUTHENTICATION
// ==========================================

export function loginUser({ username, password }: any) {
  const body = { username, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}

export function ForgotPassword(email: string) {
  const body = { email };
  return server.post(endpoints.forgotPassword, body, { requiresAuth: false })
}

export function ResetPassword({ email, otp, new_password, confirm_password }: any) {
  const body = { email, otp, new_password, confirm_password };
  return server.post(endpoints.resetPassword, body, { requiresAuth: false })
}

// ==========================================
// 👔 HR SERVICES
// ==========================================

export const GetAllEmployes = (params?: any) => {
  return server.get(endpoints.employees, {
    requiresAuth: true,
    params: params
  });
};

export function GetEmployeeById(id: string) {
  return server.get(`${endpoints.employees}${id}/`, { requiresAuth: true });
}

export function GetHRLeaves() {
  return server.get(endpoints.hrLeaves, { requiresAuth: true });
}

export const getHRDashboardStats = () => {
  return server.get(endpoints.hrDashboardStats, { requiresAuth: true });
};

export const getLeaveDashboardStats = () => {
  return server.get(endpoints.hrLeaveDashboardStats, { requiresAuth: true });
};

export const getHrAnnouncements = () => {
  return server.get(endpoints.hrAnnouncements, { requiresAuth: true });
};

export const GetMonthlyAttendance = (year: string, month: string) => {
  const url = `${endpoints.hrMonthlyAttendance}?month=${year}-${month}`;
  return server.get(url, { requiresAuth: true });
};

export const gettotalAttendance = () => {
  return server.get(endpoints.totalAttendance, { requiresAuth: true });
};

export function CreateEmployes(body: any) {
  return server.post(endpoints.createEmployes, body, { requiresAuth: true });
}

export const CreateAnnouncement = (data: any) => {
  return server.post(endpoints.createAnnouncement, data, { requiresAuth: true });
};

export const CreatePolicy = (data: any) => {
  return server.post(endpoints.createPolicy, data, {
    requiresAuth: true,
    headers: { "Content-Type": "application/json" },
  });
};

export const updatePolicy = (id: string | number, data: any) => {
  return server.patch(endpoints.updatePolicy(id), data, { requiresAuth: true });
};


export const deletePolicy = (id: string | number) => {
  return server.delete(endpoints.deletePolicy(id), { requiresAuth: true });
};

export function HRLeaveAction(id: string | number, action: 'approve' | 'reject', remarks: string = "") {
  return server.post((endpoints as any).hrLeaveAction(id), { action, remarks }, { requiresAuth: true });
}

export function UpdateEmployeeJobAndBank(id: string | number, body: any) {
  return server.patch(endpoints.updateEmployeeJobBank(id), body, { requiresAuth: true });
}

export function UpdateEmployeeRole(id: string | number, body: any) {
  return server.patch((endpoints as any).updateEmployeeRole(id), body, { requiresAuth: true });
}

export function UpdateEmployeeContact(id: string | number, body: any) {
  return server.patch((endpoints as any).updateEmployeeContact(id), body, { requiresAuth: true });
}

export const UpdateAnnouncement = (id: string | number, data: any) => {
  return server.put((endpoints as any).updateAnnouncement(id), data, { requiresAuth: true });
}

export const DeleteAnnouncement = (id: string | number) => {
  return server.delete((endpoints as any).deleteAnnouncement(id), { requiresAuth: true });
};

// ==========================================
// 🚀 TEAM LEAD (TL) 
// ==========================================

export function GetTeamMembers() {
  return server.get(endpoints.teamMembers, { requiresAuth: true });
}

export function GetTeamDashboard() {
  return server.get(endpoints.teamDashboard, { requiresAuth: true });
}

export const GetPMProjects = () => {
  return server.get(endpoints.pmProjects, { requiresAuth: true });
};

export const GetDMProjects = () => {
  return server.get(endpoints.dmProjects, { requiresAuth: true });
};

export const GetTLModules = () => {
  return server.get(endpoints.tlModules, { requiresAuth: true });
};

export const CreateProject = (data: any) => {
  return server.post(endpoints.createProject, data, { requiresAuth: true });
};

export const CreateModule = (projectId: string | number, data: any) => {
  return server.post((endpoints as any).createModule(projectId), data, { requiresAuth: true });
};

export const CreateTask = (moduleId: string | number, data: any) => {
  return server.post((endpoints as any).createTask(moduleId), data, { requiresAuth: true });
};

export const CreateTLAnnouncement = (data: any) => {
  return server.post(endpoints.tlCreateAnnouncement, data, { requiresAuth: true });
};

export function TLLeaveAction(id: string | number, action: 'approve' | 'reject', remarks: string = "") {
  return server.post((endpoints as any).tlLeaveAction(id), { action, remarks }, { requiresAuth: true });
}

// ==========================================
// 👤 EMPLOYEE SERVICES (Self-Service)
// ==========================================

export function GetMyProfile() {
  return server.get(endpoints.myProfile, { requiresAuth: true });
}

export function GetMySensitiveData() {
  return server.get<ISensitiveResponse>(endpoints.mySensitiveData, { requiresAuth: true });
}

export function GetMyIdentification() {
  return server.get(endpoints.myIdentification, { requiresAuth: true });
}

/**
 * Handles multipart/form-data for both Files and Strings
 */
export function UpdateMyIdentification(data: IIdentificationBody) {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  return server.patch(endpoints.myIdentification, formData, {
    requiresAuth: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function GetMyLeaves() {
  return server.get(endpoints.myLeaves, { requiresAuth: true });
}

export function GetPendingLeaves() {
  return server.get(endpoints.pendingLeaves, { requiresAuth: true });
}

export function GetDailyAttendance() {
  return server.get(endpoints.dailyAttendance, { requiresAuth: true });
}

export const GetEmployeeProjectStatus = () => {
  return server.get(endpoints.employeeProjectStatus, { requiresAuth: true });
};

export const GetEmployeeTasks = () => {
  return server.get(endpoints.employeeTasks, { requiresAuth: true });
};

export const getAnnouncements = () => {
  return server.get(endpoints.announcements, { requiresAuth: true });
};

export const getPolicies = () => {
  return server.get(endpoints.policies, { requiresAuth: true });
};

export const getNotifications = () => {
  return server.get(endpoints.notifications, { requiresAuth: true });
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

  return server.get(url, { requiresAuth: true });
};

export function ClockIn() {
  return server.post(endpoints.clockIn, {}, { requiresAuth: true });
}

export function ClockOut() {
  return server.post(endpoints.clockOut, {}, { requiresAuth: true });
}

export function ApplyLeave(formData: FormData) {
  return server.post(endpoints.applyLeave, formData, {
    requiresAuth: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export const markAllNotificationsRead = () => {
  return server.post(endpoints.markNotificationsRead, {}, { requiresAuth: true });
};

export function UpdateMyProfileImage(formData: FormData) {
  return server.patch(endpoints.myProfileContact, formData, {
    requiresAuth: true,
    headers: { "Content-Type": "multipart/form-data" },
  });
}

export function UpdateContactDetails(body: any) {
  return server.patch(endpoints.myProfileContact, body, { requiresAuth: true });
}

// ==========================================
// 🛠 UTILITIES
// ==========================================

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