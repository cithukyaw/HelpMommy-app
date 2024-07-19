import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import moment from "moment/moment";

const initialState = {
    todayJobs: [],
    jobs: [],
    total: 0,
    loading: false,
};

const userJobsSlice = createSlice({
    name: "userJobs",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            // fetchUserJobs
            .addCase(fetchUserJobs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserJobs.fulfilled, (state, action) => {
                state.loading = false;
                const { result, error } = action.payload;
                if (!error) {
                    const jobs = {};
                    // Group jobs by date
                    result.data.map(row => {
                        jobs[row.activity_date] = jobs[row.activity_date] || [];
                        jobs[row.activity_date].push(row);
                    });
                    state.loading = false;
                    state.jobs = Object.entries(jobs);
                    state.total = result.meta.total;
                }
            })
            .addCase(fetchUserJobs.rejected, state => {
                state.loading = false;
                console.log("fetchUserJobs.rejected");
            })
            // fetchUserJobsByDate
            .addCase(fetchUserTodayJobs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserTodayJobs.fulfilled, (state, action) => {
                const { result, error } = action.payload;
                state.loading = false;
                if (!error) {
                    state.todayJobs = result.data;
                    state.total = result.meta.total;
                }
            })
            .addCase(fetchUserTodayJobs.rejected, state => {
                state.loading = false;
                console.log("fetchUserJobsByDate.rejected");
            })
        ;
    }
});

export const fetchUserJobs = createAsyncThunk(
    "user/fetchUserJobs",
    async id => api(`users/${id}/jobs?pager=7`)
);

export const fetchUserTodayJobs = createAsyncThunk(
    "user/fetchUserTodayJobs",
    async id => {
        const filterDate = moment().format("YYYY-MM-DD");

        return api(`users/${id}/jobs?filter[date]=${filterDate}`);
    }
);

export default userJobsSlice.reducer;
