<template lang="">
    <div :id="echartID"  class="echart_container">
      <Loading v-if="show"></Loading>
    </div>
</template>
<script>
import * as echarts from "echarts";
export default {
  data() {
    return {
      seriesData: null,
      show: true,
    };
  },
  props: {
    echartID: {
      type: String,
      required: true,
    },
  },
  created() {
    this.seriesData = null;
  },
  methods: {
    init() {
      let chartDom = document.getElementById(this.echartID);
      let myChart = echarts.init(chartDom);

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
          backgroundColor: "rgba(0,0,0,0.8)",
          borderWidth: "1", //边框宽度设置1
          borderColor: "rgba(0,0,0,0.8)", //设置边框颜色
          textStyle: {
            color: "white", //设置文字颜色
          },
        },
        legend: {
          data: ["铁", "钴", "镍", "铜", "锌", "LME铜", "冷轧"],
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["11-01", "11-02", "11-03", "11-04", "11-05", "11-06", "11-07"],
          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: "#fff",
            },
            // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
          },
        },
        series: [
          {
            name: "铁",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "钴",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "镍",
            type: "line",
            stack: "Total",
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "铜",
            type: "line",
            stack: "Total",
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "锌",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            name: "LME铜",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
          {
            name: "冷轧",
            type: "line",
            stack: "Total",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    setTimeout(() => {
      this.init();
      this.show = !this.show;
    }, 1000);
  },
};
</script>
<style>
</style>

