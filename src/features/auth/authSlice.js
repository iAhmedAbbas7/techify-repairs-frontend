import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, loggedOut: false },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      // Providing Access Token on Login
      state.token = accessToken;
      // Resetting Logout Status on Login
      state.loggedOut = false;
    },
    logOut: (state) => {
      // Removing Token on Logout
      state.token = null;
      // Marking Logout has Occurred
      state.loggedOut = true;
    },
  },
});

// Token Selector
export const selectCurrentToken = (state) => state.auth.token;
// Logout Status Selector
export const selectLogoutStatus = (state) => state.auth.loggedOut;

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;
