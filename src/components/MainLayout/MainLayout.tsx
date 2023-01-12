import "./MainLayout.scss";
export const MainLayout = ({
  children
}: {
  children: JSX.Element | string;
}) => {
  return <div className="mainLayout">{children}</div>;
};
