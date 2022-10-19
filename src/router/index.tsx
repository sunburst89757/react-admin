import { MyLayout } from "layout";
import { Login } from "pages/login";
import { createBrowserRouter, RouteObject } from "react-router-dom";
import componentsRoutes from "./module/components";
import settingRoutes from "./module/setting";
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
    children: [
      {
        index: true,
        element: <LazyLoad path="dashboard"></LazyLoad>
      }
    ]
  },
  ...componentsRoutes,
  ...settingRoutes
];

export default createBrowserRouter(router);
