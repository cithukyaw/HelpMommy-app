import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import dayjs from "dayjs";
import {uniqueId} from "../../helpers/common";

const initialState = {
    jobs: [],
    jobAutocompleteKey: uniqueId(),
    date: dayjs(),
    loading: false,
};

const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        setJobDate: (state, action) => {
            state.date = action.payload;
        },
        changeJobAutocompleteKey: state => {
            state.jobAutocompleteKey = uniqueId();
        }
    },
    extraReducers: builder => {
        builder
            // Fetch all jobs
            .addCase(fetchJobs.pending, state => {
                state.loading = true;
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.loading = false;
                const { result } = action.payload;
                if (result) {
                    state.jobs = result.data;
                }
            })
            .addCase(fetchJobs.rejected, state => {
                state.loading = false;
            })
            // Save a job
            .addCase(saveJob.pending, state => {
                state.loading = true;
            })
            .addCase(saveJob.fulfilled, state => {
                state.loading = false;
            })
            .addCase(saveJob.rejected, state => {
                state.loading = false;
            })
        ;
    }
});

export const fetchJobs = createAsyncThunk(
    "job/fetchJobs",
    async () => await api("jobs"),
    {
        condition: (_, { getState }) => {
            const { job } = getState();
            if (job.jobs.length) {
                // Already fetched, don't need to re-fetch
                return false;
            }
        }
    }
);

export const saveJob = createAsyncThunk(
    "job/saveJob",
    async ({ id, data }) => {
        const { activity_date: activityDate } = data;
        const jobDate = activityDate.split("/");
        // eslint-disable-next-line camelcase
        data.activity_date = `${jobDate[2]}-${jobDate[1]}-${jobDate[0]}`;

        return await api(`users/${id}/jobs`, "POST", data);
    }
);

export const {
    setJobDate,
    changeJobAutocompleteKey
} = jobSlice.actions;

export default jobSlice.reducer;
