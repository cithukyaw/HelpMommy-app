import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visiblePassword: false
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        togglePassword: (state, action) => {
            state.visiblePassword = action.payload;
        },
    }
});

export const {togglePassword} = userSlice.actions;

export default userSlice.reducer;
