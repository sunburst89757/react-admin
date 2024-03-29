import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "api/menu";
import { RootState } from "store";
import { ITag } from "./tag.store";
export type IAuthRoute = Pick<ITag, "name" | "url">;
const initialState: {
  menuBackend: Menu[];
  authRoutes: IAuthRoute[];
} = {
  menuBackend: [],
  authRoutes: []
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menuBackend = action.payload;
    },
    generateAuthRoutes: (state, action: PayloadAction<IAuthRoute[]>) => {
      // state.authRoutes = [...new Set([...state.authRoutes, ...action.payload])];
      state.authRoutes = action.payload;
    },
    resetMenu: () => initialState
  }
});
// 导出selector
export const selectMenu = (state: RootState) => state.menu.menuBackend;
// 导出actions
export const { updateMenu, generateAuthRoutes, resetMenu } = menuSlice.actions;
// 导出reducer
export const menuReducer = menuSlice.reducer;
