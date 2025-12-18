import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import { GetTeamMembers } from "../../Services/apiHelpers";

interface TeamMember {
    id: number;
    user: {
        first_name: string;
        last_name: string;
        username: string;
    };
    emp_id: string;
    first_name: string;
    last_name: string;
    work_email: string;
    job_title: string;
    department: string;
    profile_photo: string | null;
}

interface TeamState {
    members: TeamMember[];
    loading: boolean;
    error: string | null;
}

const initialState: TeamState = {
    members: [],
    loading: false,
    error: null,
};

export const fetchTeamMembers = createAsyncThunk(
    "team/fetchTeamMembers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetTeamMembers();
            if (response.data && Array.isArray(response.data.results)) {
                return response.data.results;
            } else if (Array.isArray(response.data)) {
                return response.data;
            }
            return [];
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.detail || "Failed to fetch team members");
        }
    }
);

const teamSlice = createSlice({
    name: "team",
    initialState,
    reducers: {
        clearTeamData: (state) => {
            state.members = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeamMembers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTeamMembers.fulfilled, (state, action: PayloadAction<TeamMember[]>) => {
                state.loading = false;
                state.members = action.payload;
            })
            .addCase(fetchTeamMembers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearTeamData } = teamSlice.actions;
export default teamSlice.reducer;
