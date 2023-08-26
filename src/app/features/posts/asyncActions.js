import { createAsyncThunk } from "@reduxjs/toolkit";

import { getData, postData } from "../api";

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    return await getData("api/tweets");
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async ({ username }) => {
    let posts = await getData(`api/tweets/${username}`);
    return posts;
  }
);

export const newPost = createAsyncThunk(
  "posts/newPost",
  async (data, dispatch) => {
    const response = await postData("api/tweets", data);
    dispatch(fetchAllPosts());
    return response;
  }
);

export const deletePost = createAsyncThunk("posts/deletePost", async (data) => {
  return deleteData(`api/tweets/${data}`);
});

export const updatePost = createAsyncThunk("posts/updatePost", async (data) => {
  return getData(`api/tweets/${data}`, {}, "application/json");
});

export const likePost = createAsyncThunk(
  "posts/likePost",
  async ({ username, postId }) => {
    return await postData(`api/tweets/like/${postId}/${username}`);
  }
);

export const dislikePost = createAsyncThunk(
  "posts/disLike",
  async ({ username, postId }) => {
    return await postData(`api/tweets/dislike/${postId}/${username}`);
  }
);

export const postComment = createAsyncThunk(
  "posts/postComment",
  async ({ username, comment, postId }) => {
    let currDate = new Date();
    currDate =
      currDate.getFullYear() +
      "-" +
      currDate.getMonth() +
      "-" +
      currDate.getDate();

    return await postData(
      "posts",
      {
        username,
        comment,
        dateCommented: currDate,
      },
      "application/json"
    );
  }
);
