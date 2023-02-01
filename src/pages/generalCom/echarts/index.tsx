import { Radio, RadioChangeEvent } from "antd";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useState } from "react";
import { randomData } from "utils/random";
import { PipeChart } from "./components/PipChart";
const initialData = [
  {
    value: 333,
    name: "未派单"
  },
  {
    value: 221,
    name: "已派单"
  },
  {
    value: 110,
    name: "已完成"
  }
];
export default function EchartsShow() {
  const [timeSelect, settimeSelect] = useState("1");
  const [pipeData, setPipeData] = useState(initialData);
  const changeTime = (e: RadioChangeEvent) => {
    settimeSelect(e.target.value);
    setPipeData((state) =>
      state.map((item) => {
        item.value = randomData(20, 100);
        return item;
      })
    );
  };
  return (
    <MainLayout style={{ backgroundColor: "#f0f2f5" }}>
      <div className="grid grid-cols-2 grid-rows-2 h-[100%] [&>div]:bg-white">
        <div className=" mr-1 mb-1 relative">
          <Radio.Group
            value={timeSelect}
            onChange={changeTime}
            buttonStyle="solid"
            // size="small"
            className=" absolute right-2 top-2"
          >
            <Radio.Button value="1">日</Radio.Button>
            <Radio.Button value="2">周</Radio.Button>
            <Radio.Button value="3">月</Radio.Button>
          </Radio.Group>
          <PipeChart data={pipeData}></PipeChart>
        </div>
        <div className=" mb-1">2</div>
        <div className="mr-1">3</div>
        <div>4</div>
      </div>
    </MainLayout>
  );
}
