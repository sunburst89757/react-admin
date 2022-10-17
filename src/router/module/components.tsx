import { MyLayout } from "layout";
import { RouteObject } from "react-router-dom";
import { AuthRouter } from "router/utils/authRouter";
import { LazyLoad } from "router/utils/lazyLoad";

const router: RouteObject[] = [
  {
    path: "/generalCom",
    element: (
      <AuthRouter>
        <MyLayout></MyLayout>
      </AuthRouter>
    ),
    children: [
      {
        path: "table",
        element: <LazyLoad path="generalCom/table"></LazyLoad>
      },
      {
        path: "form",
        element: <LazyLoad path="generalCom/form"></LazyLoad>
      }
    ]
  }
];

export default router;
