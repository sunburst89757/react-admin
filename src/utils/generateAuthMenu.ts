import { getMenuListByRoleId } from "api/user";
import { generateAuthRoutes, updateMenu } from "store/module/menu.store";
import { useAppDispatch } from "store/types";
import { generateRoutes } from "utils/generateAuthRoutes";

export const generateAuthMenu = async (
  roleId: number,
  dispatch: ReturnType<typeof useAppDispatch>,
  cb?: () => void
) => {
  const res = await getMenuListByRoleId(roleId);
  if (res.success) {
    dispatch(updateMenu(res.data));
    const authRoutes = generateRoutes(res.data);
    dispatch(generateAuthRoutes(authRoutes));
    cb && cb();
  }
};
