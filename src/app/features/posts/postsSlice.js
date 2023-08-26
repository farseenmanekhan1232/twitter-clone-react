import { createSlice } from "@reduxjs/toolkit";
import { fetchAllPosts, getUserPosts } from "./asyncActions.js";

const initialState = {
  userPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    toggleWriteTweet: (state) => {
      state.writeTweet = !state.writeTweet;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.posts = "pending";
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getUserPosts.pending, (state, action) => {
        state.userPosts = "pending";
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.userPosts = action.payload;
      });
  },
});

export default postsSlice.reducer;
export const { toggleWriteTweet } = postsSlice.actions;
