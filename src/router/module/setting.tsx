import { MyLayout } from "layout";
import { RouteObject } from "react-router-dom";
import { AuthRouter } from "router/utils/authRouter";
import { LazyLoad } from "router/utils/lazyLoad";

const router: RouteObject[] = [
  {
    path: "setting",
    element: (
      <AuthRouter>
        <MyLayout></MyLayout>
      </AuthRouter>
    ),
    children: [
      {
        path: "userManage",
        element: <LazyLoad path="setting/userManage"></LazyLoad>
      },
      {
        path: "roleManage",
        element: <LazyLoad path="setting/roleManage"></LazyLoad>
      }
    ]
  }
];

export default router;
