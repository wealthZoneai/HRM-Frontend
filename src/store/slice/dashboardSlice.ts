import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { GetTeamDashboard } from "../../Services/apiHelpers";

interface DashboardStats {
    team_count: number;
    pending_leave_requests: number;
    attendance_summary: {
        present_days: number;
        total_hours: number;
    };
    recent_meetings: any[];
}

export interface HRDashboardStats {
    total_employees: number;
    present_employees: number;
    on_leave_employees: number;
}

interface DashboardState {
    stats: DashboardStats | null;
    hrStats: HRDashboardStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
    hrStats: null,
    loading: false,
    error: null,
};

export const fetchTeamDashboard = createAsyncThunk(
    "dashboard/fetchTeamDashboard",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetTeamDashboard();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch dashboard stats");
        }
    }
);

import { getHRDashboardStats } from "../../Services/apiHelpers";

export const fetchHRDashboardStats = createAsyncThunk(
    "dashboard/fetchHRDashboardStats",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getHRDashboardStats();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch HR stats");
        }
    }
);

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        clearDashboardData: (state) => {
            state.stats = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamDashboard.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeamDashboard.fulfilled, (state, action: PayloadAction<DashboardStats>) => {
                state.loading = false;
                state.stats = action.payload;
            })
            .addCase(fetchTeamDashboard.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(fetchHRDashboardStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHRDashboardStats.fulfilled, (state, action: PayloadAction<HRDashboardStats>) => {
                state.loading = false;
                state.hrStats = action.payload;
            })
            .addCase(fetchHRDashboardStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
