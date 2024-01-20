import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../api";

// Define the types for your data here
interface PostData {
  // Define the structure of your post data
}

interface CommentData {
  username: string;
  comment: string;
  postId: string;
}

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    return await getData("api/tweets");
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (username: string) => {
    return await getData(`api/tweets/${username}`);
  }
);

export const newPost = createAsyncThunk(
  "posts/newPost",
  async (data: PostData) => {
    const response = await postData("api/tweets", data);
    // Optionally, you can dispatch other actions here if needed
    return response;
  }
);

// export const deletePost = createAsyncThunk(
//   "posts/deletePost",
//   async (postId: string) => {
//     return await deleteData(`api/tweets/${postId}`);
//   }
// );

// export const updatePost = createAsyncThunk(
//   "posts/updatePost",
//   async (data: PostData) => {
//     return await updateData(`api/tweets/${data.postId}`, data);
//   }
// );

export const likePost = createAsyncThunk(
  "posts/likePost",
  async (payload: { username: string; postId: string }) => {
    return await postData(
      `api/tweets/like/${payload.postId}/${payload.username}`
    );
  }
);

export const dislikePost = createAsyncThunk(
  "posts/disLike",
  async (payload: { username: string; postId: string }) => {
    return await postData(
      `api/tweets/dislike/${payload.postId}/${payload.username}`
    );
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async (data: CommentData) => {
    return await postData("api/tweets/comment", data);
  }
);
