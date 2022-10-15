import { Navigate, useLocation } from "react-router-dom";
import { cache } from "utils/cache";

export const AuthRouter = ({ children }: { children: JSX.Element }) => {
  const { pathname } = useLocation();
  const token = cache.getItem("token");
  if (!token) return <Navigate to="/login"></Navigate>;
  return children;
};
