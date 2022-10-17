import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cache } from "utils/cache";
import { RootState } from "..";
import { Res } from "../../api/user";
import { stateType } from "../types";
const initialState: stateType = {
  userInfo: {
    userId: 0,
    username: "",
    roleId: 2
  },
  token: ""
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUserInfo: (state, action: PayloadAction<Res>) => {
      const { token, userId, username, roleId } = action.payload;
      state.token = token;
      state.userInfo.userId = userId;
      // 用户角色本来应该从action.payload里传递，新项目需要接口更改
      state.userInfo.roleId = roleId;
      state.userInfo.username = username;
      cache.setItem("token", token);
    },
    resetUser: () => initialState
  }
});
// 导出selector
export const selectUser = (state: RootState) => state.user.userInfo;
// 导出actions
export const { updateUserInfo, resetUser } = userSlice.actions;
// 导出reducer
export const userReducer = userSlice.reducer;
