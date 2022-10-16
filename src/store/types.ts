import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from ".";
// 对dispatch 和 useSelector作类型扩展
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export interface userInfo {
  userId: number;
  username: string;
  roleId: number;
}
export interface stateType {
  userInfo: userInfo;
  token: string;
}
