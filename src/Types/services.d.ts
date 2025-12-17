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
  emp_id?: string;
  work_email?: string;
  contact: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    personal_email: string;
    phone_number: string;
    alternate_number?: string;
    dob?: string;
    gender?: string;
    blood_group?: string;
    marital_status?: string;
    profile_photo?: File | null;
  };
  job: {
    job_title: string;
    department: string;
    employment_type: string;
    start_date: string;
    team_lead?: string;
    role?: string;
    location?: string;
    job_description?: string;
  };
  bank: {
    bank_name: string;
    account_number: string;
    confirm_account_number: string;
    ifsc_code: string;
    branch: string;
    account_holder_name?: string;
  };
}
