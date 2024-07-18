import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import jobSlice from "./job/jobSlice";
import userJobsSlice from "./user/userJobsSlice";
import userRatingsSlice from "./user/userRatingsSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
        userJobs: userJobsSlice,
        userRatings: userRatingsSlice,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these field paths in all actions
                ignoredActions: ["job/setJobDate"],
                // Ignore these paths in the state
                ignoredPaths: ["job.date"],
            },
        }),
});

export default store;
