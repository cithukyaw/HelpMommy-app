import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";

const initialState = {
    jobs: [],
    loading: false,
};

const userJobsSlice = createSlice({
    name: "userJobs",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserJobs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserJobs.fulfilled, (state, action) => {
                const { result } = action.payload;
                const jobs = {};
                result.data.map(row => {
                    jobs[row.activity_date] = jobs[row.activity_date] || [];
                    jobs[row.activity_date].push(row);
                });
                state.loading = false;
                state.jobs = Object.entries(jobs);
            })
            .addCase(fetchUserJobs.rejected, state => {
                state.loading = false;
                console.log("fetchUserJobs.rejected");
            })
        ;
    }
});

export const fetchUserJobs = createAsyncThunk(
    "user/fetchUserJobs",
    async id => api(`users/${id}/jobs?pager=7`)
);

export default userJobsSlice.reducer;
