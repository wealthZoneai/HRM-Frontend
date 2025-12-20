import endpoints from "./endpoints";
import server from "./index";


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

//employees

export function ForgotPassword(email: string) {
  const body = { email };
  return server.post(endpoints.forgotPassword, body, { requiresAuth: false })
}



export function ResetPassword({ email, otp, new_password, confirm_password }: { email: string, otp: string, new_password: string, confirm_password: string }) {
  const body = { email, otp, new_password, confirm_password };
  return server.post(endpoints.resetPassword, body, { requiresAuth: false })
}




























