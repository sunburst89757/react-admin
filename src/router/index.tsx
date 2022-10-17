import { MyLayout } from "layout";
import { Login } from "pages/login";
import { createBrowserRouter, RouteObject } from "react-router-dom";
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
        path: "dashboard",
        element: <LazyLoad path="dashboard"></LazyLoad>
      }
    ]
  }
];

export default createBrowserRouter(router);
