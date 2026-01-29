import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetEmployeeProjectStatus } from '../../Services/apiHelpers';

export interface ProjectStatusData {
    project_id: number;
    project_name: string;
    total_tasks: number;
    completed_tasks: number;
    in_progress_tasks: number;
    todo_tasks: number;
}

interface ProjectState {
    projects: ProjectStatusData[];
    loading: boolean;
    error: string | null;
}

const initialState: ProjectState = {
    projects: [],
    loading: false,
    error: null,
};

export const fetchEmployeeProjects = createAsyncThunk(
    'project/fetchEmployeeProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await GetEmployeeProjectStatus();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to fetch project status");
        }
    }
);

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        clearProjects: (state) => {
            state.projects = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeProjects.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeProjects.fulfilled, (state, action) => {
                state.loading = false;
                state.projects = action.payload;
            })
            .addCase(fetchEmployeeProjects.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearProjects } = projectSlice.actions;

export const selectProjects = (state: { project: ProjectState }) => state.project.projects;
export const selectProjectsLoading = (state: { project: ProjectState }) => state.project.loading;
export const selectProjectsError = (state: { project: ProjectState }) => state.project.error;

export default projectSlice.reducer;
