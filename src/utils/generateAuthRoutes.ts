import { Menu } from "api/menu";

export const generateRoutes = (backendMenu: Menu[]) => {
  const authRouter: string[] = [];
  backendMenu.forEach((router) => {
    const fatherRouter = "/" + router.path;
    if (router.children) {
      router.children.forEach((route) => {
        authRouter.push(fatherRouter + "/" + route.path);
      });
    } else {
      authRouter.push(fatherRouter);
    }
  });
  return authRouter;
};
