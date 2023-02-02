import { useEcharts } from "../../../../hooks/useEcharts";
const options: echarts.EChartsCoreOption = {
  title: {
    text: "饼图",
    left: "center"
  },
  legend: {
    orient: "vertical",
    left: "left"
  },
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      name: "value",
      type: "pie",
      // 饼图中radius决定大小
      radius: "80%",
      // 决定图示在饼图上的位置
      // label: {
      //   show: true,
      //   position: "inside",
      //   formatter: (params: any) => {
      //     return `${params.data.name}:${params.data.value}`;
      //   },
      //   color: "#fff"
      // },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      },
      // top right 饼图在画布中的位置
      top: 40
    }
  ]
};

export const PieChart = ({ data }: { data: Record<string, any>[] }) => {
  const [echartsRef] = useEcharts(options, data);
  return (
    <div
      ref={echartsRef}
      className="h-[80%] w-[60%] absolute bottom-0 left-6"
    ></div>
  );
};
