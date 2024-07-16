import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import jobSlice from "./job/jobSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
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
