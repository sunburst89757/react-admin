import { useEcharts } from "hooks/useEcharts";

const option: echarts.EChartsOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow" // 'shadow' as default; can also be 'line' or 'shadow'
    }
  },
  title: {
    text: "侧向柱状图"
  },
  dataset: {
    source: []
  },
  grid: {
    top: "12%",
    left: "2%",
    right: "5%",
    bottom: "1%",
    containLabel: true
  },
  xAxis: {
    // 隐藏x轴刻度
    show: false
  },
  yAxis: {
    type: "category",
    splitLine: { show: false },
    // data: ["/page/1", "/page/2", "/page", "/page"],
    axisTick: {
      //y轴刻度线
      show: false
    },
    axisLine: {
      //y轴
      show: false
    },
    axisLabel: {
      fontSize: 12
    }
  },
  series: [
    {
      name: "time",
      type: "bar",
      stack: "total",
      label: {
        show: true,
        position: "right",
        // 加单位
        formatter: (params: any) => {
          console.log(params, "时间");

          return `${params.value[params.seriesName]}s`;
        }
      },
      emphasis: {
        focus: "series"
      },
      color: "#ff8639",
      // 映射关系
      encode: {
        x: "time",
        y: "value"
      }
    }
  ]
};

export const ColumnChart2 = ({ data }: { data: Record<string, any>[] }) => {
  const [echartsRef] = useEcharts(option, data);
  return <div ref={echartsRef} className=" h-[100%] "></div>;
};
