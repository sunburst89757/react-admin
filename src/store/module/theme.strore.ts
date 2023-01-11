import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
type ITheme = {
  isDefault: boolean;
  isDark: boolean;
  darkColor: string;
  size: "small" | "middle" | "large";
  isColorWeak: boolean;
  colorWeak: string;
  isGray: boolean;
  grayColor: string;
};
const initialState: ITheme = {
  isDefault: true,
  isDark: false,
  darkColor: "",
  size: "middle",
  isColorWeak: false,
  colorWeak: "",
  isGray: false,
  grayColor: ""
};
export {};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeCompact: (state, action: PayloadAction<ITheme["size"]>) => {
      state.size = action.payload;
    }
  }
});

export const selectTheme = (state: RootState) => state.theme;
export const { changeCompact } = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
