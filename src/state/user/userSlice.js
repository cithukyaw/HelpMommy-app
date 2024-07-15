import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import {storeItemEncrypted} from "../../helpers/storage";
import config from "../../config";

const initialState = {
    visiblePassword: false,
    loading: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        togglePassword: (state, action) => {
            state.visiblePassword = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            // Login
            .addCase(userLogin.pending, state => {
                state.loading = true;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                const { result } = action.payload;
                state.loading = false;

                if (result && result.data.id) {
                    storeItemEncrypted(config.userStoreKey, result.data);
                }
            })
            .addCase(userLogin.rejected, state => {
                state.loading = false;
                console.log("userLogin.rejected");
            })
            // Register
            .addCase(userRegister.pending, state => {
                state.loading = true;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                const { result } = action.payload;
                state.loading = false;

                if (result && result.data.id) {
                    storeItemEncrypted(config.userStoreKey, result.data);
                }
            })
            .addCase(userRegister.rejected, state => {
                state.loading = false;
                console.log("userRegister.rejected");
            })
            // Update Account
            .addCase(userAccount.pending, state => {
                state.loading = true;
            })
            .addCase(userAccount.fulfilled, (state, action) => {
                const { result } = action.payload;
                state.loading = false;

                if (result && result.data.id) {
                    storeItemEncrypted(config.userStoreKey, result.data);
                }
            })
            .addCase(userAccount.rejected, state => {
                state.loading = false;
                console.log("userAccount.rejected");
            })
        ;
    }
});

export const userLogin = createAsyncThunk(
    "user/login",
    async data => await api("auth/login", "POST", data)
);

export const userRegister = createAsyncThunk(
    "user/register",
    async data => await api("users", "POST", data)
);

export const userAccount = createAsyncThunk(
    "user/account",
    async ({ id, data }) => await api(`users/${id}`, "POST", data)
);

export const {togglePassword} = userSlice.actions;

export default userSlice.reducer;
