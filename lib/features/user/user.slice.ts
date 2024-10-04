import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
    isAuthenticated: boolean;
    user: any;
}

const initialState: UserState = {
    isAuthenticated: false,
    user: undefined,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = undefined;
        },
    },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
