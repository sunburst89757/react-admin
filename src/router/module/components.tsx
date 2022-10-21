import { MyLayout } from "layout";
import { RouteObject } from "react-router-dom";
import { AuthRouter } from "router/utils/authRouter";
import { LazyLoad } from "router/utils/lazyLoad";

const router: RouteObject[] = [
  {
    path: "/components",
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
      },
      {
        path: "tab",
        element: <LazyLoad path="generalCom/tab"></LazyLoad>
      }
    ]
  }
];

export default router;
