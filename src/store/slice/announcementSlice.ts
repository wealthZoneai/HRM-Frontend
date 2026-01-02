import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { PrivateAxios, CreateAnnouncement } from '../../Services/apiHelpers';

export interface AnnouncementItem {
    id: string;
    title: string;
    date: string;
    summary: string;
    color: string;
    priority: "High" | "Medium" | "Low";
    time?: string;
    location?: string;
    type?: string;
}

interface AnnouncementState {
    announcements: AnnouncementItem[];
    loading: boolean;
    error: string | null;
}

const initialState: AnnouncementState = {
    announcements: [],
    loading: false,
    error: null,
};

// Helper to map priority to color (reused from dashboard logic)
const getPriorityColor = (p: string) => {
    switch (p?.toUpperCase()) {
        case "HIGH": return "bg-red-100 text-red-700";
        case "MEDIUM": return "bg-blue-100 text-blue-700";
        case "LOW": return "bg-green-100 text-green-700";
        default: return "bg-gray-100 text-gray-700";
    }
};

import endpoints from '../../Services/endpoints';

export const fetchAnnouncements = createAsyncThunk(
    'announcements/fetchAnnouncements',
    async (_, { rejectWithValue }) => {
        try {
            const response = await PrivateAxios.get(endpoints.announcements);
            if (response.data.success) {
                return response.data.data.map((item: any) => ({
                    id: item.id.toString(),
                    title: item.title,
                    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
                    summary: item.description,
                    priority: item.priority,
                    color: getPriorityColor(item.priority),
                    time: item.time,
                    location: item.department || "Office",
                    type: item.department
                }));
            }
            return rejectWithValue("Failed to fetch announcements");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to fetch announcements");
        }
    }
);

export const createAnnouncement = createAsyncThunk(
    'announcements/createAnnouncement',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await CreateAnnouncement(data);
            if (response.status === 201 || response.status === 200) {
                dispatch(fetchAnnouncements());
                return response.data;
            }
            return rejectWithValue("Failed to create announcement");
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to create announcement");
        }
    }
);

const announcementSlice = createSlice({
    name: 'announcements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAnnouncements.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAnnouncements.fulfilled, (state, action: PayloadAction<AnnouncementItem[]>) => {
                state.loading = false;
                state.announcements = action.payload;
            })
            .addCase(fetchAnnouncements.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default announcementSlice.reducer;
