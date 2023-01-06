export const MainLayout = ({
  children
}: {
  children: JSX.Element | string;
}) => {
  return (
    <div className=" bg-white  h-[100%] p-3 flex-1 overflow-auto">
      {children}
    </div>
  );
};
