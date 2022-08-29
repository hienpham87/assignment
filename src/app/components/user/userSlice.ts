import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
import { login } from "./user.api";
import { User } from "./user.model";

export interface UserState {
  currentUser?: User;
  token?: string;
  error?: string;
}

const initialState: UserState = {
  currentUser: undefined,
  token: undefined,
};

export const loginAction = createAsyncThunk<
  string,
  { username: string; password: string }
>("user/login", async ({ username, password }) => {
  return await login(username, password);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutAction: (state) => {
      state.token = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.currentUser = { username: action.meta.arg.username };
        state.token = action.payload;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.error = "Wrong username or password";
      });
  },
});

export const selectUser = (state: RootState): UserState => state.user;

export const { logoutAction } = userSlice.actions;

export default userSlice.reducer;
