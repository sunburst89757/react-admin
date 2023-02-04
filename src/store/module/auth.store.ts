import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";
type authStatus =
  | "add"
  | "delete"
  | "edit"
  | "upload"
  | "download"
  | "review"
  | "submit"
  | "audit";
export type IAuthButtons = { pathname: string; auth: authStatus[] }[];
type State = {
  authButtons: IAuthButtons;
};

const initialState: State = {
  authButtons: [
    {
      pathname: "/components/form",
      auth: ["add", "delete", "edit", "submit", "review", "audit"]
    }
  ]
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthButtons: (
      state,
      action: PayloadAction<typeof initialState.authButtons>
    ) => {
      state.authButtons = action.payload;
    }
  }
});

export const selectAuthButtons = (state: RootState) => state.auth.authButtons;
export const { setAuthButtons } = authSlice.actions;
export const authReducer = authSlice.reducer;
