import { useEcharts } from "../../../../hooks/useEcharts";
const options: echarts.EChartsCoreOption = {
  tooltip: {
    trigger: "item"
  },
  series: [
    {
      name: "value",
      type: "pie",
      radius: "80%",
      label: {
        show: true,
        position: "inside",
        formatter: (params: any) => {
          return `${params.data.name}:${params.data.value}`;
        },
        color: "#fff"
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)"
        }
      }
    }
  ]
};

export const PipeChart = ({ data }: { data: Record<string, any>[] }) => {
  const [echartsRef] = useEcharts(options, data);
  return <div ref={echartsRef} className="h-[80%] w-[50%]"></div>;
};
