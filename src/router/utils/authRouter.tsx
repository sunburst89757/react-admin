import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/types";
import { cache } from "utils/cache";
import { generateAuthMenu } from "utils/generateAuthMenu";

export const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const menu = useAppSelector((state) => state.menu.menuBackend);
  const dispatch = useAppDispatch();
  const { roleId } = useAppSelector((state) => state.user.userInfo);
  const token = cache.getItem("token");
  if (!token) return <Navigate to="/login"></Navigate>;
  if (menu.length === 0) {
    generateAuthMenu(roleId, dispatch);
  }
  return children;
};
