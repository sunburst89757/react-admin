import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="container">
      全局
      <Outlet></Outlet>
    </div>
  );
};
