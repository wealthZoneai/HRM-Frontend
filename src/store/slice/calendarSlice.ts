import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCalendarEvents } from '../../Services/apiHelpers';
import { STATIC_HOLIDAYS } from '../../data/holidays';

export interface CalendarEvent {
    id: string;
    title: string;  // Maps to 'name' for holidays, 'title' for others
    date: string;
    type: string;   // "Federal", "Optional", "Announcement", "Meeting", etc.
    description?: string;
    time?: string;
    isStatic?: boolean; // To distinguish static holidays
}

interface CalendarState {
    events: CalendarEvent[];
    loading: boolean;
    error: string | null;
    currentMonth: string; // "YYYY-MM" to track what we fetched
}

const initialState: CalendarState = {
    events: [],
    loading: false,
    error: null,
    currentMonth: "",
};

// Convert static holidays to unified format
const staticEvents: CalendarEvent[] = STATIC_HOLIDAYS.map(h => ({
    id: h.id,
    title: h.name,
    date: h.date,
    type: h.type,
    isStatic: true
}));

export const fetchCalendarEvents = createAsyncThunk(
    'calendar/fetchEvents',
    async ({ year, month }: { year: number; month: number }, { rejectWithValue }) => {
        try {
            const response = await getCalendarEvents(year, month);
            // Assuming response.data is [ { id, title, date, start_time, type, description }, ... ]
            return response.data.map((item: any) => ({
                id: item.id.toString(),
                title: item.title,
                date: item.date,
                type: item.type === 'announcement' ? 'Announcement' :
                    item.type === 'meeting' ? 'Meeting' :
                        item.type === 'holiday' ? 'Federal' : item.type, // Map backend 'holiday' to 'Federal' or keep as is?
                description: item.description,
                time: item.start_time,
                isStatic: false
            }));
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.detail || "Failed to fetch calendar events");
        }
    }
);

const calendarSlice = createSlice({
    name: 'calendar',
    initialState,
    reducers: {
        // Optional: clear events or manual add
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCalendarEvents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCalendarEvents.fulfilled, (state, action) => {
                state.loading = false;
                // Merge strategy:
                // We keep static events always? Yes.
                // We overwrite fetched component of the state?
                // Actually, since we fetch by MONTH, we might want to store all fetched events in a map or just replace the "dynamic" part of the list.
                // For simplicity, let's just store the *fetched* events in `events`.
                // The selector will combine them.
                state.events = action.payload;
            })
            .addCase(fetchCalendarEvents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

// Selector to get combined events
export const selectAllCalendarEvents = (state: { calendar: CalendarState }) => {
    // Combine static and fetched
    // We might want to deduplicate valid static holidays if the server sends them too?
    // For now, assume server sends Announcements/Meetings and maybe DB holidays. 
    // We'll just concat.

    // Filter static events? Or just return all?
    // STATIC_HOLIDAYS covers the whole year 2026.

    return [...staticEvents, ...state.calendar.events];
};

export const selectCalendarLoading = (state: { calendar: CalendarState }) => state.calendar.loading;

export default calendarSlice.reducer;
