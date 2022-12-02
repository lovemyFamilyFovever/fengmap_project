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
    this.seriesData = [
      {
        name: "铁",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 302, 301, 334, 390, 330, 320, 530],
      },
      {
        name: "钴",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 232, 241, 194, 190, 230, 210, 330],
      },
      {
        name: "镍",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 182, 191, 234, 290, 330, 310, 440],
      },
      {
        name: "铜",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [150, 212, 201, 154, 190, 330, 410, 550],
      },
      {
        name: "锌",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320, 1330],
      },
      {
        name: "铬",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [810, 842, 941, 934, 1190, 1230, 1220, 1220],
      },
      {
        name: "LME铜",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [510, 542, 841, 824, 1010, 1170, 1490, 1490],
      },
      {
        name: "冷轧",
        type: "bar",
        stack: "total",
        label: {
          show: true,
          color: "#fff",
          fontSize: 10,
        },
        emphasis: {
          focus: "series",
        },
        data: [600, 621, 789, 841, 1069, 1500, 1030, 1030],
      },
    ];
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
          type: "value",
          axisLine: {
            // x轴线的颜色以及宽度
            show: true,
            lineStyle: {
              color: "#fff",
              width: 1,
              type: "solid",
            },
          },
          axisLabel: {
            //x轴文字的配置
            show: true,
            textStyle: {
              color: "#fff",
            },
          },
        },
        yAxis: {
          type: "category",
          data: [
            "仓库1",
            "仓库2",
            "仓库3",
            "仓库4",
            "仓库5",
            "仓库6",
            "仓库7",
            "仓库8",
          ],
          name: "单位：吨", //y轴上方的单位
          nameTextStyle: {
            //y轴上方单位的颜色
            color: "#fff",
          },
          axisLabel: {
            //y轴文字的配置
            textStyle: {
              color: "#fff",
            },
            // formatter: '{value} %'//y轴的每一个刻度值后面加上‘%’号
          },
        },
        dataZoom: [
          {
            yAxisIndex: 0, // 这里是从y轴的0刻度开始
            show: false, // 是否显示滑动条，不影响使用
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: this.seriesData.length,
          },
        ],
        series: this.seriesData,
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

