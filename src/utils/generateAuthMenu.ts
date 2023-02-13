import { Menu } from "api/menu";
import { getAuthButton } from "api/auth";
import { getMenuListByRoleId } from "api/user";
import { setAuthButtons } from "store/module/auth.store";
import { generateAuthRoutes, updateMenu } from "store/module/menu.store";
import { useAppDispatch } from "store/types";

const generateRoutes = (
  backendMenu: Menu[],
  fatherMenu: string,
  res: { url: string; name: string }[] = []
) => {
  backendMenu.forEach((route) => {
    if (!route.children)
      res.push({
        url: fatherMenu + "/" + route.path,
        name: route.name
      });
    else generateRoutes(route.children, fatherMenu + "/" + route.path, res);
  });
  return res;
};
export const generateAuthMenuAndButtons = async (
  roleId: number,
  dispatch: ReturnType<typeof useAppDispatch>,
  cb?: () => void
) => {
  const res = await getMenuListByRoleId(roleId);
  if (res.success) {
    dispatch(updateMenu(res.data));
    const authRoutes = generateRoutes(res.data, "");
    dispatch(generateAuthRoutes(authRoutes));
    getAuthButton(roleId).then((res) => {
      dispatch(setAuthButtons(res.data));
    });
    cb && cb();
  }
};
