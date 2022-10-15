import { Navigate, useLocation } from "react-router-dom";

export const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  if (pathname === "/userManage") return <Navigate to="/login"></Navigate>;
  return children;
};
