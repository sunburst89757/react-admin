import "./LayoutTree.scss";
export const LayoutTree = ({
  children,
  width = "250px"
}: {
  children: JSX.Element;
  width?: string;
}) => {
  return <div className={` w-[${width}] layoutTree`}>{children}</div>;
};
