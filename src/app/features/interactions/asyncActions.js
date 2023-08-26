import { createAsyncThunk } from "@reduxjs/toolkit";

import { getData, postData } from "../api";

export const getUserDetails = createAsyncThunk(
  "interaction/getUserDetails",
  async ({ username }) => {
    let user = await getData(`api/users/${username}`);
    if (user && user.username) {
      return user;
    } else {
      return null;
    }
  }
);

export const getUserName = createAsyncThunk(
  "interaction/getUserName",
  async ({ username }) => {
    return await postData(`api/search/${username}`);
  }
);
