import { useEcharts } from "../../../../hooks/useEcharts";
const options: echarts.EChartsCoreOption = {
  title: {
    text: "柱状图"
  },
  legend: {
    orient: "vertical",
    left: "center"
  },
  xAxis: {
    type: "category"
  },
  yAxis: {
    type: "value"
  },
  tooltip: {
    trigger: "item"
  },
  grid: {
    bottom: "1%",
    containLabel: true
  },
  series: [
    {
      type: "bar"
      //   showBackground: true
      //   backgroundStyle: {
      //     color: "rgba(180, 180, 180, 0.2)"
      //   }
    }
  ]
};

export const ColumnChart1 = ({ data }: { data: Record<string, any>[] }) => {
  const [echartsRef] = useEcharts(options, data);
  return <div ref={echartsRef} className="h-[100%] "></div>;
};
