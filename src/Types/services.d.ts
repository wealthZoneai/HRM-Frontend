interface ILoginUserBody {
  username: string;
  password: string;
}
interface Syllabus {
  jobCategory: string;
  jobTitle: string;
  releasedDate: string;
  file: string;
}
interface ICreateEmployesBody {

  email: string;
  emp_id: string;
  first_name: string;
  last_name: string;
  job_title: string;
  department: string;
  employment_type: string;
  start_date: string;
  phone_number: string;
  account_number: string;
  confirm_account_number: string;
  ifsc_code: string;
  role: string;
  middle_name?: string;
  personal_email?: string;
  alternative_number?: string;
  dob?: string;
  blood_group?: string;
  gender?: string;
  marital_status?: string;
}
