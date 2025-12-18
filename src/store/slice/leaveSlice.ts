import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { GetMyLeaves, GetHRLeaves } from "../../Services/apiHelpers";

// Define the shape of a leave item based on what the API returns
interface LeaveItem {
    id: string;
    leave_type: string;
    start_date: string;
    end_date: string;
    days: number | string;
    reason?: string;
    status: string;
    created_at?: string;
    // HR specific fields (nested profile)
    profile?: {
        first_name?: string;
        last_name?: string;
        user?: {
            first_name: string;
            last_name: string;
        }
    };
}

interface LeaveState {
    leaves: LeaveItem[];      // Employee's own leaves
    hrLeaves: LeaveItem[];    // All leaves (for HR view)
    loading: boolean;
    error: string | null;
}

const initialState: LeaveState = {
    leaves: [],
    hrLeaves: [],
    loading: false,
    error: null,
};

// Async thunk to fetch leaves
export const fetchMyLeaves = createAsyncThunk(
    "leave/fetchMyLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetMyLeaves();
            // Handle Django PageNumberPagination response structure
            if (response.data && Array.isArray(response.data.results)) {
                return response.data.results;
            } else if (Array.isArray(response.data)) {
                return response.data;
            }
            return []; // Fallback if data is neither paginated nor an array
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch leaves");
        }
    }
);

// Async thunk to fetch HR leaves (all employees)
export const fetchHRLeaves = createAsyncThunk(
    "leave/fetchHRLeaves",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetHRLeaves();
            // Handle Django PageNumberPagination response structure
            if (response.data && Array.isArray(response.data.results)) {
                return response.data.results;
            } else if (Array.isArray(response.data)) {
                return response.data;
            }
            return [];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch HR leaves");
        }
    }
);

const leaveSlice = createSlice({
    name: "leave",
    initialState,
    reducers: {
        clearLeaveData: (state) => {
            state.leaves = [];
            state.hrLeaves = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // My Leaves
            .addCase(fetchMyLeaves.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMyLeaves.fulfilled, (state, action: PayloadAction<LeaveItem[]>) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchMyLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // HR Leaves
            .addCase(fetchHRLeaves.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchHRLeaves.fulfilled, (state, action: PayloadAction<LeaveItem[]>) => {
                state.loading = false;
                state.hrLeaves = action.payload;
            })
            .addCase(fetchHRLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearLeaveData } = leaveSlice.actions;
export default leaveSlice.reducer;
