import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData, postData } from "../api";

interface RegistrationData {
  username: string;
  email: string;
  password: string;
  profileName?: string; // Optional field, depending on your form
  // Any additional registration fields
}

interface LoginData {
  email: string;
  password: string;
}

export const signIn = createAsyncThunk(
  "users/loginUser",
  async (formData: LoginData) => {
    return await postData("api/login", formData);
  }
);

export const register = createAsyncThunk(
  "users/register",
  async (formData: RegistrationData) => {
    return await postData("api/register", formData);
  }
);

export const signOut = createAsyncThunk("users/signOut", async () => {
  return await postData("api/logout");
});

export const currentUser = createAsyncThunk("users/currentUser", async () => {
  return await getData("api/currentUser");
});
