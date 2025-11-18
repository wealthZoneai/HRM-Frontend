import React, { createContext, useContext, useReducer, type ReactNode, } from "react";

/* --- Types for form --- */
export type Status = "single" | "married" | "other";

export interface PersonalInfo {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  dob?: string;
  gender?: string;
  religion?: string;
  maritalStatus?: string;
  homeAddress?: string;
}

export interface NextOfKin {
  name?: string;
  middleName?: string;
  lastName?: string;
  phone?: string;
  relation?: string;
  address?: string;
}

export interface BankAccount {
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
}

export interface Documents {
  profileImage?: File | null;
  cvFile?: File | null;
  certificates?: File[]; // multiple
}

export interface AddEmployeeState {
  personal: PersonalInfo;
  kin: NextOfKin;
  bankAccounts: BankAccount[]; // allow multiple
  documents: Documents;
  step: number;
  totalSteps: number;
  editMode?: boolean;
  editId?: string | number | null;
}

const initialState: AddEmployeeState = {
  personal: {},
  kin: {},
  bankAccounts: [{}, {}], // default two
  documents: {},
  step: 0,
  totalSteps: 5,
  editMode: false,
  editId: null,
};

type Action =
  | { type: "SET_PERSONAL"; payload: Partial<PersonalInfo> }
  | { type: "SET_KIN"; payload: Partial<NextOfKin> }
  | { type: "SET_BANK"; payload: { index: number; data: Partial<BankAccount> } }
  | { type: "SET_ALL_BANKS"; payload: BankAccount[] }
  | { type: "SET_DOCUMENT"; payload: Partial<Documents> }
  | { type: "ADD_CERTIFICATE"; payload: File }
  | { type: "REMOVE_CERTIFICATE"; payload: number }
  | { type: "SET_STEP"; payload: number }
  | { type: "RESET"; payload?: Partial<AddEmployeeState> }
  | { type: "SET_EDIT"; payload: { editId?: string | number | null; data?: Partial<AddEmployeeState> } };

function reducer(state: AddEmployeeState, action: Action): AddEmployeeState {
  switch (action.type) {
    case "SET_PERSONAL":
      return { ...state, personal: { ...state.personal, ...action.payload } };
    case "SET_KIN":
      return { ...state, kin: { ...state.kin, ...action.payload } };
    case "SET_BANK": {
      const banks = [...state.bankAccounts];
      banks[action.payload.index] = { ...banks[action.payload.index], ...action.payload.data };
      return { ...state, bankAccounts: banks };
    }
    case "SET_ALL_BANKS":
      return { ...state, bankAccounts: action.payload };
    case "SET_DOCUMENT":
      return { ...state, documents: { ...state.documents, ...action.payload } };
    case "ADD_CERTIFICATE": {
      const prev = state.documents.certificates || [];
      return { ...state, documents: { ...state.documents, certificates: [...prev, action.payload] } };
    }
    case "REMOVE_CERTIFICATE": {
      const prev = state.documents.certificates || [];
      const next = prev.filter((_, i) => i !== action.payload);
      return { ...state, documents: { ...state.documents, certificates: next } };
    }
    case "SET_STEP":
      return { ...state, step: action.payload };
    case "RESET":
      return { ...initialState, ...action.payload };
    case "SET_EDIT":
      return {
        ...state,
        editMode: true,
        editId: action.payload.editId ?? null,
        ...action.payload.data,
      } as AddEmployeeState;
    default:
      return state;
  }
}

const AddEmployeeContext = createContext<{
  state: AddEmployeeState;
  dispatch: React.Dispatch<Action>;
} | null>(null);

export const AddEmployeeProvider: React.FC<{ children: ReactNode; initial?: Partial<AddEmployeeState> }> = ({
  children,
  initial,
}) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, ...(initial || {}) });
  return <AddEmployeeContext.Provider value={{ state, dispatch }}>{children}</AddEmployeeContext.Provider>;
};

export function useAddEmployee() {
  const ctx = useContext(AddEmployeeContext);
  if (!ctx) throw new Error("useAddEmployee must be used within AddEmployeeProvider");
  return ctx;
}
