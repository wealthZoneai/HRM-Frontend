import React from 'react';


export interface PersonalData {
    firstName: string; middleName: string; lastName: string;
    phoneNumber: string; dateOfBirth: string; gender: string; personalEmail: string;
    religion: string; maritalStatus: string; homeAddress: string;
    stateOfOrigin: string; highestQualification: string; additionalCertification: string;
    typeOfEmployment: string; department: string; jobTitle: string;
    employmentDate: string; continuationStatus: string; stateOfOriginLegal: string;
    localGovtOfStateOfOrigin: string;
}

export interface NextOfKinData {
    name: string; middleName: string; lastName: string; phoneNumber: string;
    parentGuardianName: string; homeAddress: string; religion: string;
}

export interface BankAccount {
    bankName: string; accountNumber: string; accountName: string;
}

export interface BankData {
    account1: BankAccount;
    account2: BankAccount;
}

export interface DocumentData {
    educationalQualification: { title: string; year: number }[]; // Example structure
    cvFile: File | null;
}

export interface FormData {
    personal: PersonalData;
    nextOfKin: NextOfKinData;
    bank: BankData;
    documents: DocumentData;
}

// --- 2. Shared Props for Step Components ---
export interface StepProps {
    formData: FormData;
    setFormData: React.Dispatch<React.SetStateAction<FormData>>;
    onNext: () => void;
    onPrev: () => void;
}