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
  themeColor: {
    primaryColor: string;
    errorColor: string;
    warningColor: string;
    successColor: string;
    infoColor: string;
  };
};
const initialState: ITheme = {
  isDefault: true,
  isDark: false,
  darkColor: "",
  size: "middle",
  grayOrColorWeak: "",
  colorWeak: "80%",
  grayColor: "1",
  themeColor: {
    primaryColor: "#1890ff",
    errorColor: "#ff4d4f",
    warningColor: "#faad14",
    successColor: "#52c41a",
    infoColor: "#1890ff"
  }
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
    },
    changeThemeColor: (state, action: PayloadAction<ITheme["themeColor"]>) => {
      state.themeColor = action.payload;
    },
    resetThemeColor: (state) => {
      state.themeColor = initialState.themeColor;
    }
  }
});

export const selectTheme = (state: RootState) => state.theme;
export const {
  changeCompact,
  changeGrayOrColorWeak,
  changeDark,
  changeThemeColor,
  resetThemeColor
} = themeSlice.actions;
export const themeReducer = themeSlice.reducer;
export const initialThemeColor = initialState.themeColor;
