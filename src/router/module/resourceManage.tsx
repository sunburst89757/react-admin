import { MyLayout } from "layout";
import { Error } from "pages/error";
import { RouteObject } from "react-router-dom";
import { AuthRouter } from "router/utils/authRouter";
import { LazyLoad } from "router/utils/lazyLoad";

const router: RouteObject[] = [
  {
    path: "/resourceManage",
    element: (
      <AuthRouter>
        <MyLayout></MyLayout>
      </AuthRouter>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "fileManage",
        element: <LazyLoad path="resourceManage/fileManage"></LazyLoad>
      }
    ]
  }
];

export default router;
