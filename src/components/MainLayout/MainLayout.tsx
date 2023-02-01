import "./MainLayout.scss";
export const MainLayout = ({
  children,
  style
}: {
  children: JSX.Element | string;
  style?: Record<string, any>;
}) => {
  return (
    <div className="mainLayout" style={style}>
      {children}
    </div>
  );
};
