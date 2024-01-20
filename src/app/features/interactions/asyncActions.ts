import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../api";

export const getUserDetails = createAsyncThunk(
  "interaction/getUserDetails",
  async ({ username }: { username: string }) => {
    return await getData(`api/users/${username}`);
  }
);

export const getUserName = createAsyncThunk(
  "interaction/getUserName",
  async ({ username }: { username: string }) => {
    return await postData(`api/search/${username}`);
  }
);
