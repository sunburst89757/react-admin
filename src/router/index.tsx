import { Layout } from "layout";
import { DashBoard, dashLoader } from "pages/dashboard";
import { Login } from "pages/login";
import { UserManage } from "pages/userManage";
import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "./utils/authRouter";

export const router = createBrowserRouter(
  [
    {
      path: "/login",
      element: <Login></Login>
    },
    {
      path: "/",
      element: (
        <AuthRouter>
          <Layout></Layout>
        </AuthRouter>
      ),
      children: [
        {
          path: "dash",
          element: <DashBoard></DashBoard>,
          loader: dashLoader,
          action: ({ request }) => {}
        },
        {
          path: "userManage",
          element: <UserManage></UserManage>
        }
      ]
    }
  ],
  {
    basename: "/app"
  }
);
