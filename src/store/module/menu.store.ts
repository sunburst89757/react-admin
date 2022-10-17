import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "api/menu";
import { RootState } from "store";
const initialState: {
  menuBackend: Menu[];
  authRouter: string[];
} = {
  menuBackend: [],
  authRouter: ["/dashboard"]
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menuBackend = action.payload;
    },
    generateAuthRouter: (state, action: PayloadAction<string[]>) => {
      state.authRouter = [...new Set([...state.authRouter, ...action.payload])];
    },
    resetMenu: () => initialState
  }
});
// 导出selector
export const selectMenu = (state: RootState) => state.menu.menuBackend;
// 导出actions
export const { updateMenu, generateAuthRouter, resetMenu } = menuSlice.actions;
// 导出reducer
export const menuReducer = menuSlice.reducer;
