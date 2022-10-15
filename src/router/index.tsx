import { Layout } from "layout";
import { DashBoard } from "pages/dashboard";
import { Login } from "pages/login";
import { UserManage } from "pages/userManage";
import { createBrowserRouter } from "react-router-dom";
import { AuthRouter } from "./utils/authRouter";

export const router = createBrowserRouter([
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
        path: "dashboard",
        element: <DashBoard></DashBoard>
      },
      {
        path: "userManage",
        element: <UserManage></UserManage>
      }
    ]
  }
]);
