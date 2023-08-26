import { createSlice } from "@reduxjs/toolkit";

import { currentUser, signIn, signOut, register } from "./asyncActions.js";

const initialState = {
  signedIn: null,
  failedSignIn: false,
  registered: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeRegisteredTag: (state) => {
      state.registered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.fulfilled, (state) => {
        state.registered = true;
      })
      .addCase(signIn.rejected, (state) => {
        state.failedSignIn = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signedIn = action.payload.user;
        state.failedSignIn = false;
      })
      .addCase(signOut.fulfilled, (state, action) => {
        console.log(action.payload);
        state.signedIn = null;
      })
      .addCase(currentUser.rejected, (state, action) => {
        state.signedIn = null;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const removeRegisteredTag = usersSlice.actions.removeRegisteredTag;
