import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
type ITheme = {
  isDefault: boolean;
  isDark: boolean;
  darkColor: string;
  size: "small" | "middle" | "large";
  grayOrColorWeak: "gray" | "colorWeak" | "";
  colorWeak: string;
  grayColor: string;
};
const initialState: ITheme = {
  isDefault: true,
  isDark: false,
  darkColor: "",
  size: "middle",
  grayOrColorWeak: "",
  colorWeak: "80%",
  grayColor: "1"
};
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeCompact: (state, action: PayloadAction<ITheme["size"]>) => {
      state.size = action.payload;
    },
    changeGrayOrColorWeak: (
      state,
      action: PayloadAction<ITheme["grayOrColorWeak"]>
    ) => {
      state.grayOrColorWeak = action.payload;
    },
    changeDark: (state) => {
      state.isDark = !state.isDark;
    }
  }
});

export const selectTheme = (state: RootState) => state.theme;
export const { changeCompact, changeGrayOrColorWeak, changeDark } =
  themeSlice.actions;
export const themeReducer = themeSlice.reducer;
