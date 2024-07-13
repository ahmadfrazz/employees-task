import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user: {}
  };

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userlogin: (state, { payload }) => {
            state.user = payload;
        },
        logout: (state) => {
            state.user = {};
        }
    }
})

export const { userlogin, logout } = authSlice.actions;
export default authSlice.reducer;