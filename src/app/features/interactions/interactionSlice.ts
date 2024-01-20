import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetails, getUserName } from "./asyncActions";

interface InteractionState {
  userDetails: any; // Replace 'any' with the type of your user details object
  searchResult: any[]; // Replace 'any' with the type of your search result object
}

const initialState: InteractionState = {
  userDetails: {},
  searchResult: [],
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {}, // Include an empty reducers object
  extraReducers: (builder) => {
    builder
      .addCase(
        getUserDetails.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.userDetails = action.payload;
        }
      )
      .addCase(getUserName.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.searchResult = action.payload;
      });
  },
});

export default interactionSlice.reducer;
