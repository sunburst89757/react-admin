import { MainLayout } from "components/MainLayout/MainLayout";
export default function EchartsShow() {
  return (
    <MainLayout style={{ backgroundColor: "#f0f2f5" }}>
      <div className="grid grid-cols-2 grid-rows-2 h-[100%] [&>div]:bg-white">
        <div className=" mr-1 mb-1">1</div>
        <div className=" mb-1">2</div>
        <div className="mr-1">3</div>
        <div>4</div>
      </div>
    </MainLayout>
  );
}
