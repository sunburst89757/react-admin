import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "store";
type ITheme = {
  isDefault: boolean;
  isDark: boolean;
  darkColor: string;
  isCompact: boolean;
  isColorWeak: boolean;
  colorWeak: string;
  isGray: boolean;
  grayColor: string;
};
const initialState: ITheme = {
  isDefault: true,
  isDark: false,
  darkColor: "",
  isCompact: false,
  isColorWeak: false,
  colorWeak: "",
  isGray: false,
  grayColor: ""
};
export {};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {}
});

export const selectTheme = (state: RootState) => state.theme;
export const themeReducer = themeSlice.reducer;
