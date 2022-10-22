export const LayoutTree = ({
  children,
  width = "250px"
}: {
  children: JSX.Element;
  width?: string;
}) => {
  return (
    <div className={`mr-3 bg-white w-[${width}] h-[100%] p-3`}>{children}</div>
  );
};
