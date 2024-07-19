import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";

const initialState = {
    loading: false
};

const redeemSlice = createSlice({
    name: "redeem",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(redeem.pending, state => {
                state.loading = true;
            })
            .addCase(redeem.fulfilled, state => {
                state.loading = false;
            })
            .addCase(redeem.rejected, state => {
                state.loading = false;
                console.log("redeem.rejected");
            })
        ;
    }
});

export const redeem = createAsyncThunk(
    "user/redeem",
    async ({ id, data }) => await api(`users/${id}/redeem`, "POST", data)
);

export default redeemSlice.reducer;
