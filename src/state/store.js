import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user/userSlice";
import jobSlice from "./job/jobSlice";
import userJobsSlice from "./user/userJobsSlice";
import userRatingsSlice from "./user/userRatingsSlice";
import exchangeSlice, {calculateAmountReceived} from "./user/exchangeSlice";
import redeemSlice from "./user/redeemSlice";
import jobCardSlice from "./user/jobCardSlice";

const store = configureStore({
    reducer: {
        user: userSlice,
        job: jobSlice,
        userJobs: userJobsSlice,
        userRatings: userRatingsSlice,
        exchange: exchangeSlice,
        redeem: redeemSlice,
        jobCard: jobCardSlice,
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

// redux thunk middleware that will be called by text input onchange in the Exchange screen
// share state between two reducers (userRatingsSlice and exchangeSlice)
export const exchangeAmount = exchangedHearts => (dispatch, getState) => {
    const state = getState(); // the whole state
    // from userRatingsSlice
    const totalHearts = state.userRatings.totalHearts;
    const amount = state.userRatings.amount;
    // send the values to exchangeSlice
    dispatch(calculateAmountReceived({
        exchangedHearts,
        totalHearts,
        amount
    }));
};

export default store;
