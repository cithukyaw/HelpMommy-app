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
        ;
    }
});

export const userLogin = createAsyncThunk(
    "user/login",
    async data => await api("auth/login", "POST", data)
);

export const {togglePassword} = userSlice.actions;

export default userSlice.reducer;
