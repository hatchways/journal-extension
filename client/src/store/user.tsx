import { fetchUser, login, logout, signup } from "./thunks";

import { createSlice } from "@reduxjs/toolkit";

type UserState = { id?: string };
const initialState: UserState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.fulfilled, (state, action) => {
      state.id = action.payload;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.id = action.payload;
    });
    builder.addCase(logout.fulfilled, (state, action) => {
      state.id = undefined;
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.id = action.payload;
    });
  },
});
