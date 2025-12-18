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

interface DashboardState {
    stats: DashboardStats | null;
    loading: boolean;
    error: string | null;
}

const initialState: DashboardState = {
    stats: null,
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
            });
    },
});

export const { clearDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
