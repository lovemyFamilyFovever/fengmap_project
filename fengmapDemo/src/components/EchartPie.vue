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
      echart: null,
      show: true,
    };
  },
  props: {
    roseType: {
      type: Boolean,
      required: false,
      default: false,
    },
    echartID: {
      type: String,
      required: true,
    },
  },
  created() {
    // 从后台获取data
    this.seriesData = [
      { value: 2240, name: "仓库1" },
      { value: 2238, name: "仓库2" },
      { value: 2332, name: "仓库3" },
      { value: 2430, name: "仓库4" },
      { value: 3528, name: "仓库5" },
      { value: 2526, name: "仓库6" },
      { value: 3822, name: "仓库7" },
      { value: 3418, name: "仓库8" },
    ];
  },
  methods: {
    init() {
      let chartDom = document.getElementById(this.echartID);
      let myChart = echarts.init(chartDom);

      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          backgroundColor: "rgba(0,0,0,0.8)",
          borderWidth: "1", //边框宽度设置1
          borderColor: "rgba(0,0,0,0.8)", //设置边框颜色
          textStyle: {
            color: "white", //设置文字颜色
          },
        },
        legend: {
          bottom: 0,
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#fff",
          },
        },
        grid: {
          containLabel: true,
        },
        series: [
          {
            name: "仓库金属占比",
            type: "pie",
            label: {
              fontsize: 10,
              color: "#fff",
            },
            labelLine: {
              // 图形外文字线
              normal: {
                length: 5,
                length2: 80,
                lineStyle: {
                  color: "#28B1C7",
                },
              },
            },
            data: this.seriesData,
          },
        ],
      };

      if (this.roseType) {
        let series = option.series[0];
        series["roseType"] = "radius";
        series["radius"] = [20, 80];
        series["center"] = ["50%", "50%"];
        series["itemStyle"] = {
          borderRadius: 8,
        };
      }
      option && myChart.setOption(option);

      window.addEventListener(
        "resize",
        () => {
          setTimeout(() => {
            myChart && myChart.resize();
          }, 100);
        },
        false
      );
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

