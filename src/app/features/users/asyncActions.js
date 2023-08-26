import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../api";

export const signIn = createAsyncThunk("users/loginUser", async (formData) => {
  return await postData("api/login", formData);
});

export const register = createAsyncThunk("users/register", async (formData) => {
  return await postData("api/register", formData);
});

export const signOut = createAsyncThunk("users/signOut", async () => {
  return await postData("api/logout");
});

export const currentUser = createAsyncThunk("users/currentUser", async () => {
  return await getData("api/currentUser");
});
