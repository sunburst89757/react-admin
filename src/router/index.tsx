import { MyLayout } from "layout";
import { Login } from "pages/login";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import componentsRoutes from "./module/components";
import settingRoutes from "./module/setting";
import resourceRoutes from "./module/resourceManage";
import { AuthRouter } from "./utils/authRouter";
import { LazyLoad } from "./utils/lazyLoad";
import { Error } from "pages/error";
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
    errorElement: <Error></Error>,
    children: [
      {
        path: "dashboard",
        element: <LazyLoad path="dashboard"></LazyLoad>
      },
      {
        path: "auth",
        element: <LazyLoad path="auth"></LazyLoad>
      }
    ]
  },
  ...componentsRoutes,
  ...settingRoutes,
  ...resourceRoutes
];

export default createBrowserRouter(router);
