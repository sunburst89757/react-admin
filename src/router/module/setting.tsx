import { MyLayout } from "layout";
import { Error } from "pages/error";
import { RouteObject } from "react-router-dom";
import { AuthRouter } from "router/utils/authRouter";
import { LazyLoad } from "router/utils/lazyLoad";

const router: RouteObject[] = [
  {
    path: "/setting",
    element: (
      <AuthRouter>
        <MyLayout></MyLayout>
      </AuthRouter>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "userManage",
        element: <LazyLoad path="setting/userManage"></LazyLoad>
      },
      {
        path: "roleManage",
        element: <LazyLoad path="setting/roleManage"></LazyLoad>
      },
      {
        // 菜单管理只有管理员才有，管理员可以查询所有的菜单
        path: "menuManage",
        element: <LazyLoad path="setting/menuManage"></LazyLoad>
      }
    ]
  }
];

export default router;
