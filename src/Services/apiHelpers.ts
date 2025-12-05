import endpoints from "./endpoints";
import server from "./index";


export function loginUser({ username, password }: ILoginUserBody) {
  const body = { username, password };
  return server.post(endpoints.login, body, { requiresAuth: false });
}


export function CreateEmployes({
  email,
  emp_id,
  first_name,
  last_name,
  job_title,
  department,
  employment_type,
  start_date,
  phone_number,
  account_number,
  confirm_account_number,
  ifsc_code,
  role,
  middle_name,
  personal_email,
  alternative_number,
  dob,
  blood_group,
  gender,
  marital_status,
}: ICreateEmployesBody) {

  const body = {
    email,
    emp_id,
    first_name,
    last_name,
    job_title,
    department,
    employment_type,
    start_date,
    phone_number,
    account_number,
    confirm_account_number,
    ifsc_code,
    role,
    middle_name,
    personal_email,
    alternative_number,
    dob,
    blood_group,
    gender,
    marital_status,
  };

  return server.post(endpoints.createEmployes, body, {
    requiresAuth: true,
  });
}


export function GetAllEmployes() {
  return server.get(endpoints.getAllEmployes, { requiresAuth: true });
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

export function ResetPassword({ email, new_password, confirm_password }: { email: string, new_password: string, confirm_password: string }) {
  const body = { email, new_password, confirm_password };
  return server.post(endpoints.resetPassword, body, { requiresAuth: false })
}




























