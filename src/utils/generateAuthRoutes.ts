import { Menu } from "api/menu";
import { IAuthRouter } from "store/module/menu.store";

export const generateRoutes = (backendMenu: Menu[]) => {
  const authRouter: IAuthRouter[] = [];
  backendMenu.forEach((router) => {
    const fatherRouter = "/" + router.path;
    if (router.children) {
      router.children.forEach((route) => {
        authRouter.push({
          url: fatherRouter + "/" + route.path,
          name: route.name
        });
      });
    } else {
      authRouter.push({
        url: fatherRouter,
        name: router.name
      });
    }
  });
  return authRouter;
};
