<template lang="">
    <div :id="echartID" class="echart_container">
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
    isScroll: {
      type: Boolean,
      required: false,
      default: false,
    },
    scrollCount: {
      type: Number,
      required: false,
    },
    echartID: {
      type: String,
      required: true,
    },
  },
  created() {
    // 从后台获取data
    this.seriesData = [13, 10, 15, 14, 9, 17, 11, 11];
  },
  methods: {
    init() {
      let chartDom = document.getElementById(this.echartID);
      let myChart = echarts.init(chartDom);

      let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];

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
        grid: {
          top: "15%",
          left: "12%",
          bottom: "10%",
          // containLabel: true
        },
        xAxis: {
          // 不显示x轴相关信息
          show: false,
        },
        yAxis: [
          {
            type: "category",
            name: "单位：吨", //y轴上方的单位
            nameTextStyle: {
              color: "#fff",
              fontSize: 15,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#fff",
              fontSize: 15,
            },
            data: ["铁", "钴", "镍", "铜", "锌", "铬", "LME铜", "冷轧"],
          },
        ],

        dataZoom: [
          {
            yAxisIndex: 0, // 这里是从y轴的0刻度开始
            show: false, // 是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: this.seriesData.length,
          },
        ],
        series: [
          {
            name: "吨",
            type: "bar",
            barCategoryGap: 50,
            barWidth: 10,
            yAxisIndex: 0,
            itemStyle: {
              barBorderRadius: 20,
              color: function (params) {
                // params 传进来的是柱子的对象
                // dataIndex 是当前柱子的索引号
                // console.log(params);
                return myColor[params.dataIndex];
              },
            },
            // 显示柱子内的百分比文字
            label: {
              show: true,
              position: "inside",
              // {c} 会自动解析为数据（data内的数据）
              formatter: "{c}%",
              color: "#fff",
            },
            data: this.seriesData,
          },
          // {
          //   // 第二组柱子（框状 border）
          //   name: "框",
          //   type: "bar",
          //   barCategoryGap: 50,
          //   barWidth: 14,
          //   yAxisIndex: 1,
          //   itemStyle: {
          //     color: "none",
          //     borderColor: "#00c1de",
          //     borderWidth: 2,
          //     barBorderRadius: 15,
          //   },
          //   data: [50, 50, 50, 50, 50, 50, 50, 50],
          // },
        ],
      };

      if (this.isScroll && this.scrollCount)
        option.dataZoom[0].endValue = this.scrollCount;

      if (option && typeof option === "object") {
        if (this.isScroll) {
          // 定时自动滚动
          setInterval(() => {
            if (option.dataZoom[0].endValue == this.seriesData.length) {
              option.dataZoom[0].endValue = this.scrollCount;
              option.dataZoom[0].startValue = 0;
            } else {
              option.dataZoom[0].endValue += +1;
              option.dataZoom[0].startValue += +1;
            }
            myChart.setOption(option);
          }, 2000);
        }

        myChart.setOption(option);
      }
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

