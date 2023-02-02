import { useEcharts } from "hooks/useEcharts";

const option: echarts.EChartsOption = {
  title: {
    text: "多维折线图"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      label: {
        backgroundColor: "#6a7985"
      }
    }
  },
  dataset: {
    dimensions: ["name", "eatMoney", "entertainmentMoney"]
  },
  legend: {
    data: ["eatMoney", "entertainmentMoney"],
    textStyle: {
      color: "#a1a1a1"
    },
    align: "auto"
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  // 折线图中图距离画布的位置使用grid 下的left right bottom
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  xAxis: [
    {
      type: "category",
      boundaryGap: false,
      // data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisLabel: {
        color: "#a1a1a1"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      axisLabel: {
        color: "#a1a1a1"
      }
    }
  ],
  series: [
    {
      // name: "eatMoney",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series"
      }
    },
    {
      // name: "entertainmentMoney",
      type: "line",
      stack: "Total",
      areaStyle: {},
      emphasis: {
        focus: "series"
      }
    }
  ]
};

export const LineChart1 = ({ data }: { data: Record<string, any>[] }) => {
  const [echartsRef] = useEcharts(option, data);
  return <div ref={echartsRef} className=" h-[100%] "></div>;
};
