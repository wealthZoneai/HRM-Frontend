import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { ClockIn, ClockOut, GetDailyAttendance } from "../../Services/apiHelpers";

interface AttendanceState {
    clockInTime: string | null;
    clockOutTime: string | null;
    totalHours: number | null; // From backend
    status: 'Not Started' | 'Working' | 'Completed';
    loading: boolean;
    error: string | null;
    lastUpdated: string | null; // ISO Date string (YYYY-MM-DD)
}

// ------------------- HELPERS ------------------- //

/**
 * Returns today's date in YYYY-MM-DD format based on LOCAL time.
 * This prevents timezone issues where UTC might be yesterday/tomorrow.
 */
const getTodayKey = () => new Date().toLocaleDateString('en-CA');

/**
 * Normalizes a time string. If it's just "HH:MM:SS", it prepends today's date.
 * If it's already a full ISO string, it returns it as is.
 */
const toFullISO = (timeStr: string | null) => {
    if (!timeStr) return null;
    if (timeStr.includes('T')) return timeStr; // Already seems like ISO

    const todayDate = getTodayKey();
    return `${todayDate}T${timeStr}`;
};

// ------------------- LOCAL STORAGE ------------------- //

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('attendance_state');
        if (serializedState === null) {
            return {
                clockInTime: null,
                clockOutTime: null,
                totalHours: null,
                status: 'Not Started' as const,
                lastUpdated: null
            };
        }
        const state = JSON.parse(serializedState);
        const today = getTodayKey();

        // If the stored data is from a different day, reset it
        if (state.lastUpdated !== today) {
            localStorage.removeItem('attendance_state');
            return {
                clockInTime: null,
                clockOutTime: null,
                totalHours: null,
                status: 'Not Started' as const,
                lastUpdated: today
            };
        }

        return state;
    } catch (err) {
        return {
            clockInTime: null,
            clockOutTime: null,
            totalHours: null,
            status: 'Not Started' as const,
            lastUpdated: getTodayKey()
        };
    }
};

const persistedState = loadState();

const initialState: AttendanceState = {
    ...persistedState,
    loading: false,
    error: null,
};

const saveState = (state: Partial<AttendanceState>) => {
    try {
        const currentState = loadState();
        const newState = { ...currentState, ...state, lastUpdated: getTodayKey() };
        localStorage.setItem('attendance_state', JSON.stringify(newState));
    } catch (err) {
        console.error("Could not save state", err);
    }
};

// ------------------- THUNKS ------------------- //

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

// ------------------- SLICE ------------------- //

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
            state.lastUpdated = getTodayKey();
            localStorage.removeItem('attendance_state');
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

            const serverClockIn = toFullISO(clock_in);
            const serverClockOut = toFullISO(clock_out);

            // --- STICKY PERSISTENCE LOGIC ---
            // If the API says "not clocked in" (null), but we have a valid LOCAL clock-in for TODAY,
            // we trust our local state to prevent "flashing" or resetting due to API lag/bugs.
            let finalClockIn = serverClockIn;
            let finalClockOut = serverClockOut;
            const todayDate = getTodayKey();

            // Guard: Only keep local if server is null AND local is valid for today
            if (!serverClockIn && state.clockInTime) {
                // simple check if string contains today's date
                if (state.clockInTime.includes(todayDate)) {
                    finalClockIn = state.clockInTime;
                }
            }

            // Note: If serverClockOut is null, we don't necessarily want to force it if we have local,
            // but usually if we clocked out, the server should know. 
            // We'll apply the same logic for safety.
            if (!serverClockOut && state.clockOutTime) {
                if (state.clockOutTime.includes(todayDate)) {
                    finalClockOut = state.clockOutTime;
                }
            }

            state.clockInTime = finalClockIn;
            state.clockOutTime = finalClockOut;
            state.totalHours = total_hours_workdone;

            if (state.clockOutTime) {
                state.status = 'Completed';
            } else if (state.clockInTime) {
                state.status = 'Working';
            } else {
                state.status = 'Not Started';
            }

            saveState({
                clockInTime: state.clockInTime,
                clockOutTime: state.clockOutTime,
                totalHours: state.totalHours,
                status: state.status
            });
        });
        builder.addCase(fetchTodayAttendance.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            // On error, we rely on existing state (persisted), so we don't clear it.
        });

        // Clock In
        builder.addCase(clockIn.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(clockIn.fulfilled, (state, action: PayloadAction<any>) => {
            state.loading = false;
            state.clockInTime = toFullISO(action.payload.clock_in);
            state.status = 'Working';
            saveState({
                clockInTime: state.clockInTime,
                status: state.status
            });
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
            state.clockOutTime = toFullISO(action.payload.clock_out);
            if (action.payload.total_hours_workdone !== undefined) {
                state.totalHours = action.payload.total_hours_workdone;
            }
            state.status = 'Completed';
            saveState({
                clockOutTime: state.clockOutTime,
                totalHours: state.totalHours,
                status: state.status
            });
        });
        builder.addCase(clockOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export const { clearAttendance } = attendanceSlice.actions;
export default attendanceSlice.reducer;
