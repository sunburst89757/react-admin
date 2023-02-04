import { getAuthButton } from "api/auth";
import { getMenuListByRoleId } from "api/user";
import { setAuthButtons } from "store/module/auth.store";
import { generateAuthRoutes, updateMenu } from "store/module/menu.store";
import { useAppDispatch } from "store/types";
import { generateRoutes } from "utils/generateAuthRoutes";

export const generateAuthMenuAndButtons = async (
  roleId: number,
  dispatch: ReturnType<typeof useAppDispatch>,
  cb?: () => void
) => {
  const res = await getMenuListByRoleId(roleId);
  if (res.success) {
    dispatch(updateMenu(res.data));
    const authRoutes = generateRoutes(res.data);
    dispatch(generateAuthRoutes(authRoutes));
    getAuthButton(roleId).then((res) => {
      dispatch(setAuthButtons(res.data));
    });
    cb && cb();
  }
};
