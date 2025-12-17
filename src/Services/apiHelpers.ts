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



//employees

export function ForgotPassword(email: string) {
  const body = { email };
  return server.post(endpoints.forgotPassword, body, { requiresAuth: false })
}

export function OTPVerify({ email, otp }: { email: string, otp: string }) {
  const body = { email, otp };
  return server.post(endpoints.verifyOTP, body, { requiresAuth: false })
}

export function ResetPassword({ email, otp, new_password, confirm_password }: { email: string, otp: string, new_password: string, confirm_password: string }) {
  const body = { email, otp, new_password, confirm_password };
  return server.post(endpoints.resetPassword, body, { requiresAuth: false })
}




























