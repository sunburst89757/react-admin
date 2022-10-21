import { NotAuth } from "pages/notAuth";
import { Navigate, useLocation } from "react-router-dom";
import { IAuthRoute } from "store/module/menu.store";
import { useAppDispatch, useAppSelector } from "store/types";
import { cache } from "utils/cache";
import { generateAuthMenu } from "utils/generateAuthMenu";
const isPermit = (url: string, authRoutes: IAuthRoute[]) => {
  // 为了防止刚登录页面时会闪烁进入notAuth页面
  if (url === "/dashboard") return true;
  for (let i = 0; i < authRoutes.length; i++) {
    if (authRoutes[i].url === url) return true;
  }
  return false;
};
export const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const authRoutes = useAppSelector((state) => state.menu.authRoutes);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { roleId } = useAppSelector((state) => state.user.userInfo);
  const token = cache.getItem("token");
  if (!token) return <Navigate to="/login"></Navigate>;
  // 初始登录 获取可访问的路由
  if (authRoutes.length === 0) {
    generateAuthMenu(roleId, dispatch);
  }
  if (pathname === "/") return <Navigate to="/dashboard"></Navigate>;
  if (!isPermit(pathname, authRoutes)) return <NotAuth></NotAuth>;
  document.title = authRoutes.find((item) => item.url === pathname)?.name!;
  return children;
};
