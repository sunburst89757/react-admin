import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "store";
export interface ITag {
  name: string;
  url: string;
  fixed: boolean;
}
const initialState: {
  tags: ITag[];
} = {
  tags: [
    {
      name: "首页",
      url: "/dashboard",
      fixed: true
    }
  ]
};
const tagSlice = createSlice({
  name: "tag",
  initialState,
  reducers: {
    addTag: (state, action: PayloadAction<ITag>) => {
      state.tags.push(action.payload);
    },
    deleteTag: (state, action: PayloadAction<{ url: string }>) => {
      const { url } = action.payload;
      state.tags = state.tags.filter((tag) => tag.url !== url);
    },
    resetTag: () => initialState
  }
});
// 导出selector
export const selectTag = (state: RootState) => state.tag.tags;
// 导出actions
export const { addTag, deleteTag, resetTag } = tagSlice.actions;
// 导出reducer
export const tagReducer = tagSlice.reducer;
