import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "../../helpers/api";
import {storeItemEncrypted} from "../../helpers/storage";
import config from "../../config";

const initialState = {
    loading: false,
    config: null,
};

export const fetchSettings = createAsyncThunk(
    "setting/fetchSettings",
    async () => api("settings"),
    {
        condition: (_, { getState }) => {
            const { setting } = getState();
            if (setting.config !== null) {
                // Already fetched, don't need to re-fetch
                return false;
            }
        }
    }
);

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchSettings.pending, state => {
                state.loading = true;
            })
            .addCase(fetchSettings.fulfilled, (state, action) => {
                state.loading = false;
                const { result } = action.payload;
                if (result) {
                    state.config = result.value;
                    storeItemEncrypted(config.settingStoreKey, result.value);
                }
            })
            .addCase(fetchSettings.rejected, state => {
                state.loading = false;
            })
        ;
    }
});

export default settingSlice.reducer;
