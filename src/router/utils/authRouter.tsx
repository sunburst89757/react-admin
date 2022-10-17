import { getMenuListByRoleId } from "api/menu";
import { Navigate } from "react-router-dom";
import { generateAuthRouter, updateMenu } from "store/module/menu.store";
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
      const authRouter: string[] = [];
      res.data.forEach((router) => {
        const fatherRouter = "/" + router.path;
        if (router.children) {
          router.children.forEach((route) => {
            authRouter.push(fatherRouter + "/" + route.path);
          });
        } else {
          authRouter.push(fatherRouter);
        }
      });
      dispatch(generateAuthRouter(authRouter));
    });
  }
  return children;
};
