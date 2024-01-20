import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllPosts, getUserPosts } from "./asyncActions";

interface PostState {
  userPosts: any; // Replace 'any' with the type of your post object
  posts?: any;
}

const initialState: PostState = {
  userPosts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchAllPosts.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          // Replace 'any' with the correct type
          state.userPosts = action.payload;
        }
      )
      .addCase(
        getUserPosts.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          // Replace 'any' with the correct type
          state.userPosts = action.payload;
        }
      );
  },
});

export default postsSlice.reducer;
