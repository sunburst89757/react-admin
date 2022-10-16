import { getMenuListByRoleId } from "api/menu";
import { Navigate } from "react-router-dom";
import { updateMenu } from "store/module/menu.store";
import { useAppDispatch, useAppSelector } from "store/types";
import { cache } from "utils/cache";

export const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const dispatch = useAppDispatch();
  const { roleId } = useAppSelector((state) => state.user.userInfo);
  const token = cache.getItem("token");
  if (!token) return <Navigate to="/login"></Navigate>;
  if (menu.length === 0) {
    getMenuListByRoleId({ roleId }).then((res) => {
      dispatch(updateMenu(res.data));
    });
  }
  return children;
};
