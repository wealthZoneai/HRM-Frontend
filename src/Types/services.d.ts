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
  contact: {
    first_name: string;
    last_name: string;
    middle_name?: string;
    personal_email: string; // marked optional in previous but required in error message? Error says "This field is required."
    phone_number: string;
    alternative_number?: string;
    dob?: string;
    gender?: string;
    blood_group?: string; // Not in error message, keep as optional
    marital_status?: string;
  };
  job: {
    job_title: string;
    department: string;
    employment_type: string;
    start_date: string;
    emp_id: string; // "emp_id" was top level, assuming it goes to job or stays top? Error message didn't list it in nested. Wait, user error validaton didn't show emp_id. It might be required top level or in job. Let's assume nested in job or check if user provided error covers all. 
    // Actually, typically emp_id is job related. I will place it in job for now, or keep top level if unsure. 
    // Re-reading error: it shows keys "contact", "job", "bank". It does NOT show "emp_id" at root. It likely belongs in "job" or the backend generates it (but the form has it).
    // Let's assume it's in `job` based on context.
    email: string; // Work email.
    role: string;
    manager?: string;
    location?: string;
    job_description?: string;
  };
  bank: {
    bank_name: string;
    account_number: string;
    confirm_account_number: string;
    ifsc_code: string;
    branch: string; // Mapped from branchName
    account_holder_name?: string; // Error didn't mention it but validaton might.
  };
}
