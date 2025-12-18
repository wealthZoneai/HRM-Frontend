import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userData';
import leaveReducer from './slice/leaveSlice';
import attendanceReducer from './slice/attendanceSlice';
import teamReducer from './slice/teamSlice';
import dashboardReducer from './slice/dashboardSlice';


export const store = configureStore({
  reducer: {
    user: userReducer,
    leave: leaveReducer,
    attendance: attendanceReducer,
    team: teamReducer,
    dashboard: dashboardReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Define RootState and AppDispatch types after store initialization
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type IRootState = ReturnType<typeof store.getState>;
export default store;
