import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import {getConfig} from "../../helpers/common";
import moment from "moment";

const initialState = {
    ratings: [],
    totalHearts: 0,
    todayHearts: 0,
    amount: 0,
    loading: false,
};

const userRatingsSlice = createSlice({
    name: "userRatings",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUserRatings.pending, state => {
                state.loading = true;
            })
            .addCase(fetchUserRatings.fulfilled, (state, action) => {
                state.loading = false;

                const { result } = action.payload;
                const currentDate = moment().format("YYYY-MM-DD");
                state.ratings = result.data;
                state.totalHearts = result.meta.rating;
                state.todayHearts = result.data[currentDate]?.ratings;
                state.amount = result.meta.rating * getConfig().exchangeRate;
            })
            .addCase(fetchUserRatings.rejected, state => {
                state.loading = false;
                console.log("fetchUserRatings.rejected");
            })
        ;
    }
});

export const fetchUserRatings = createAsyncThunk(
    "user/fetchUserRatings",
    async id => api(`users/${id}/ratings`)
);

export default userRatingsSlice.reducer;
