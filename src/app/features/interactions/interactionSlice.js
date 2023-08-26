import { createSlice } from "@reduxjs/toolkit";

import { getUserName, getUserDetails } from "./asyncActions";

const initialState = {
  userDetails: {},
  searchResult: [],
};

export const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  extraReducers: (builder) => {
    builder

      .addCase(getUserDetails.pending, (state) => {
        state.userDetails = "pending";
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      })

      .addCase(getUserName.fulfilled, (state, action) => {
        state.searchResult = action.payload;
      });
  },
});

export default interactionSlice.reducer;
