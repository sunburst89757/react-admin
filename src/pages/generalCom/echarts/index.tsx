import { Radio, RadioChangeEvent } from "antd";
import { MainLayout } from "components/MainLayout/MainLayout";
import { useState } from "react";
import { randomData } from "utils/random";
import { ColumnChart1 } from "./components/ColumnChart1";
import { ColumnChart2 } from "./components/ColumnChart2";
import { LineChart1 } from "./components/LineChart";
import { PieChart } from "./components/PieChart";
const initialPieData = [
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
const initialLineData = [
  {
    name: "星期一",
    eatMoney: 120,
    entertainmentMoney: 30
  },
  {
    name: "星期二",
    eatMoney: 132,
    entertainmentMoney: 25
  },
  {
    name: "星期三",
    eatMoney: 101,
    entertainmentMoney: 50
  },
  {
    name: "星期四",
    eatMoney: 134,
    entertainmentMoney: 55
  },
  {
    name: "星期五",
    eatMoney: 90,
    entertainmentMoney: 90
  },
  {
    name: "星期六",
    eatMoney: 230,
    entertainmentMoney: 88
  },
  {
    name: "星期日",
    eatMoney: 210,
    entertainmentMoney: 130
  }
];
const initialColumn1Data = [
  {
    name: "星期一",
    eatMoney: 120
  },
  {
    name: "星期二",
    eatMoney: 132
  },
  {
    name: "星期三",
    eatMoney: 101
  },
  {
    name: "星期四",
    eatMoney: 134
  },
  {
    name: "星期五",
    eatMoney: 90
  },
  {
    name: "星期六",
    eatMoney: 230
  },
  {
    name: "星期日",
    eatMoney: 210
  }
];
const initialColumn2Data = [
  {
    name: "page1",
    time: 4
  },
  {
    name: "page2",
    time: 6
  },
  {
    name: "page3",
    time: 5
  },
  {
    name: "page4",
    time: 5
  },
  {
    name: "page5",
    time: 4
  }
];
export default function EchartsShow() {
  const [timeSelect, settimeSelect] = useState("1");
  const [pieData, setPieData] = useState(initialPieData);
  const [lineData, setLineData] = useState(initialLineData);
  const [columnData1, setColumnData1] = useState(initialColumn1Data);

  const [columnData2, setColumnData2] = useState(initialColumn2Data);

  const changeTime = (e: RadioChangeEvent) => {
    settimeSelect(e.target.value);
    setPieData((state) =>
      state.map((item) => {
        item.value = randomData(20, 100);
        return item;
      })
    );
    setLineData((state) => {
      return state.map((item) => {
        item.eatMoney = randomData(100, 200);
        item.entertainmentMoney = randomData(30, 100);
        return item;
      });
    });
    setColumnData1((state) => {
      return state.map((item) => {
        item.eatMoney = randomData(100, 200);
        return item;
      });
    });
    setColumnData2((state) => {
      return state.map((item) => {
        item.time = randomData(3, 6);
        return item;
      });
    });
  };
  return (
    <MainLayout style={{ backgroundColor: "#f0f2f5" }}>
      <div className="grid grid-cols-2 grid-rows-2 h-[100%] [&>div]:bg-white">
        <div className=" mr-1 mb-1 relative">
          <Radio.Group
            value={timeSelect}
            onChange={changeTime}
            buttonStyle="solid"
            size="small"
            className=" absolute right-2 top-2"
          >
            <Radio.Button value="1">日</Radio.Button>
            <Radio.Button value="2">周</Radio.Button>
            <Radio.Button value="3">月</Radio.Button>
          </Radio.Group>
          <PieChart data={pieData}></PieChart>
        </div>
        <div className=" mb-1">
          <LineChart1 data={lineData}></LineChart1>
        </div>
        <div className="mr-1">
          <ColumnChart1 data={columnData1}></ColumnChart1>
        </div>
        <div>
          <ColumnChart2 data={columnData2}></ColumnChart2>
        </div>
      </div>
    </MainLayout>
  );
}
