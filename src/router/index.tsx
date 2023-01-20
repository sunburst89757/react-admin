import { MyLayout } from "layout";
import { Login } from "pages/login";
import { NotFound } from "pages/notFound";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import componentsRoutes from "./module/components";
import settingRoutes from "./module/setting";
import resourceRoutes from "./module/resourceManage";
import { AuthRouter } from "./utils/authRouter";
import { LazyLoad } from "./utils/lazyLoad";
const router: RouteObject[] = [
  {
    path: "/login",
    element: <Login></Login>
  },
  {
    path: "/",
    element: (
      <AuthRouter>
        <MyLayout></MyLayout>
      </AuthRouter>
    ),
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "dashboard",
        element: <LazyLoad path="dashboard"></LazyLoad>
      }
    ]
  },
  ...componentsRoutes,
  ...settingRoutes,
  ...resourceRoutes
];

export default createBrowserRouter(router);
