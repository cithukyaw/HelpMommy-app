import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import {getConfig} from "../../helpers/common";

const initialState = {
    loading: false,
    balanceHearts: 0,
    balanceAmount: 0,
    amountReceived: 0,
};

const exchangeSlice = createSlice({
    name: "exchange",
    initialState,
    reducers: {
        setBalanceHearts: (state, action) => {
            state.balanceHearts = action.payload;
        },
        setBalanceAmount: (state, action) => {
            state.balanceAmount = action.payload;
        },
        calculateAmountReceived: (state, action) => {
            const { exchangedHearts, totalHearts, amount } = action.payload;
            const hearts = exchangedHearts * 1;
            const value = hearts * getConfig().exchangeRate;
            const diffHearts = totalHearts - hearts;
            const diffAmount = amount - value;

            state.amountReceived = hearts * getConfig().exchangeRate;
            state.balanceHearts = diffHearts > 0 ? diffHearts : 0;
            state.balanceAmount = diffAmount > 0 ? diffAmount : 0;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(exchange.pending, state => {
                state.loading = true;
            })
            .addCase(exchange.fulfilled, state => {
                state.loading = false;
                state.amountReceived = 0;
            })
            .addCase(exchange.rejected, state => {
                state.loading = false;
                console.log("exchange.rejected");
            })
        ;
    }
});

export const exchange = createAsyncThunk(
    "user/exchange",
    async ({ id, data }) => await api(`users/${id}/exchange`, "POST", data)
);

export const {
    setBalanceHearts,
    setBalanceAmount,
    calculateAmountReceived,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;
