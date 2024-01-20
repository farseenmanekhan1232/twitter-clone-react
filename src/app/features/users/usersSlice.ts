import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentUser, signIn, signOut, register } from "./asyncActions";

interface UserState {
  signedIn: any; // Replace 'any' with the type of your user object
  failedSignIn: boolean;
  registered: boolean;
}

const initialState: UserState = {
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
      .addCase(signIn.fulfilled, (state, action: PayloadAction<any>) => {
        // Replace 'any' with the correct type
        state.signedIn = action.payload.user;
        state.failedSignIn = false;
      })
      .addCase(signOut.fulfilled, (state) => {
        state.signedIn = null;
      })
      .addCase(currentUser.rejected, (state) => {
        state.signedIn = null;
      });
  },
});

export const usersReducer = usersSlice.reducer;
export const { removeRegisteredTag } = usersSlice.actions;
