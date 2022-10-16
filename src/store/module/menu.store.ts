import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "api/menu";
import { RootState } from "store";
const initialState: {
  menuBackend: Menu[];
} = {
  menuBackend: []
};
const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    updateMenu: (state, action: PayloadAction<Menu[]>) => {
      state.menuBackend = action.payload;
    }
  }
});
// 导出selector
export const selectMenu = (state: RootState) => state.menu.menuBackend;
// 导出actions
export const { updateMenu } = menuSlice.actions;
// 导出reducer
export const menuReducer = menuSlice.reducer;
