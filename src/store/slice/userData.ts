import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  token: string | null;
  role?: string | null;
  userName?: string | null;
}

const initialState: UserState = {
 
  token: localStorage.getItem("access") || null,   
  userName: localStorage.getItem("userName") || null,
  role: localStorage.getItem("role") || null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<{ token: string; role: string; userName: string }>) => {
      state.token = action.payload.token;
      state.role = action.payload.role;
      state.userName = action.payload.userName || null;


      localStorage.setItem("access", action.payload.token);
      localStorage.setItem("role", action.payload.role);
      localStorage.setItem("userName", action.payload.userName || "");
    },

    clearUserData: (state) => {
      state.token = null;
      state.role = null;
      state.userName = null;
      localStorage.clear(); 
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export default userSlice.reducer;