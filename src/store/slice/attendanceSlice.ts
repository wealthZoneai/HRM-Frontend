import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { ClockIn, ClockOut, GetDailyAttendance } from "../../Services/apiHelpers";

interface AttendanceState {
    clockInTime: string | null;
    clockOutTime: string | null;
    totalHours: number | null; // From backend
    status: 'Not Started' | 'Working' | 'Completed';
    loading: boolean;
    error: string | null;
}

const initialState: AttendanceState = {
    clockInTime: null,
    clockOutTime: null,
    totalHours: null,
    status: 'Not Started',
    loading: false,
    error: null,
};

// Thunk to fetch today's attendance status
export const fetchTodayAttendance = createAsyncThunk(
    "attendance/fetchToday",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetDailyAttendance();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch attendance");
        }
    }
);

export const clockIn = createAsyncThunk(
    "attendance/clockIn",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ClockIn();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to clock in");
        }
    }
);

export const clockOut = createAsyncThunk(
    "attendance/clockOut",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ClockOut();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to clock out");
        }
    }
);

const attendanceSlice = createSlice({
    name: "attendance",
    initialState,
    reducers: {
        clearAttendance: (state) => {
            state.clockInTime = null;
            state.clockOutTime = null;
            state.totalHours = null;
            state.status = 'Not Started';
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Fetch Today
        builder.addCase(fetchTodayAttendance.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTodayAttendance.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            const { clock_in, clock_out, total_hours_workdone } = action.payload;

            state.clockInTime = clock_in;
            state.clockOutTime = clock_out;
            state.totalHours = total_hours_workdone;

            if (clock_out) {
                state.status = 'Completed';
            } else if (clock_in) {
                state.status = 'Working';
            } else {
                state.status = 'Not Started';
            }
        });
        builder.addCase(fetchTodayAttendance.rejected, (state, action) => {
            state.loading = false;
            // If error is 404/bad request (unlikely for get daily form), validation handled elsewhere
            // If we fail to fetch, assume clean state potentially?
            state.error = action.payload as string;
        });

        // Clock In
        builder.addCase(clockIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(clockIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.clockInTime = action.payload.clock_in;
            state.status = 'Working';
        });
        builder.addCase(clockIn.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });

        // Clock Out
        builder.addCase(clockOut.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(clockOut.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.clockOutTime = action.payload.clock_out;
            // Depending on API, it might return duration summary. 
            // Assuming clockOut API response has duration info or we rely on totalHours
            if (action.payload.total_hours_workdone !== undefined) {
                state.totalHours = action.payload.total_hours_workdone;
            }
            state.status = 'Completed';
        });
        builder.addCase(clockOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
