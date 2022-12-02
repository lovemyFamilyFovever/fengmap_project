<template>
  <div id="app">
    <div class="map">
      <div id="fengmap" :style="styleObj"></div>
    </div>

    <HeaderCom></HeaderCom>
    <section class="mainbox">
      <!-- 左侧盒子 -->
      <!-- "type":图标类型，bar/pie/line -->
      <!-- "isScroll":是否滚动 -->
      <!-- "scrollCount":当选择bar且选择滚动时，每页显示几条数据 -->
      <!-- "roseType":是否展示成南丁格尔图 -->
      <!-- "echartID":必须要提供的一个id名 -->
      <div class="column float_left">
        <EchartContainer
          type="Bar1"
          echartID="storeBar"
          :isScroll="true"
          :scrollCount="3"
        >
          <h2>仓库金属储量</h2>
        </EchartContainer>

        <EchartContainer type="Pie" echartID="storePieTotal">
          <h2>仓库总量占比</h2>
        </EchartContainer>

        <EchartContainer type="Poly" echartID="storeLine">
          <h2>仓库储量变化</h2>
        </EchartContainer>
      </div>

      <!-- 中间盒子 -->
      <div class="column float_center_bottom">
        <EchartContainer type="ToolWrap">
          <h2>入库出库变化</h2>
        </EchartContainer>
      </div>

      <!-- 右侧盒子 -->
      <div class="column float_right">
        <EchartContainer
          type="Bar2"
          echartID="storeBarPercent"
          :isScroll="true"
          :scrollCount="3"
        >
          <h2>金属储量占比图</h2>
        </EchartContainer>

        <EchartContainer type="Pie" :roseType="true" echartID="storePieMetal">
          <h2>金属占比</h2>
        </EchartContainer>

        <EchartContainer type="ToolWrap">
          <h2>入库出库变化</h2>
        </EchartContainer>
      </div>
    </section>
  </div>
</template>

<script>
import fengmap from "fengmap/build/fengmap.map.min";
import "fengmap/build/fengmap.plugin.min";
import "fengmap/build/fengmap.effect.min"; //特效包
import "fengmap/build/fengmap.plugins-compositemarker.min"; //复合标注包
import "fengmap/build/fengmap.plugins-track-player.min"; //轨迹回放包

import HeaderCom from "./components/HeaderCom.vue"; //头部组件
import EchartContainer from "./components/EchartContainer.vue"; //信息图边框组件

import "./style/toolbar.css";

import getstoreinfo from "./libs/getStoreInfo.js"; //

export default {
  name: "App",
  components: {
    HeaderCom,
    EchartContainer, //信息图边框组件
  },
  data() {
    return {
      map: null,
      skyEffect: null,
      table: "",
      floorInfo: [],
      styleObj: {
        width: "100%",
        height: "100%",
        "z-index": 1,
        background: "url(./images/bg.jpg) no-repeat top center",
      },
      timer: "", //  window.onresize函数频繁调用时，页面抖动较大，设定间隔
    };
  },
  methods: {
    //初始化工具栏，指北针，缩放
    renderToolBar(map) {
      // 指北针控件
      var scrollCompassCtlOpt = {
        position: fengmap.FMControlPosition.RIGHT_TOP,
        offset: {
          x: -20,
          y: 80,
        },
      };
      var compass = new fengmap.FMCompass(scrollCompassCtlOpt);
      compass.addTo(map);

      compass.on("click", function () {
        map.setRotation({
          rotation: 0,
          animate: true,
          duration: 0.3,
          finish: function () {
            console.log("setRotation");
          },
        });
      });

      // 缩放控件
      var scrollZoomCtlOpt = {
        position: fengmap.FMControlPosition.RIGHT_TOP,
        offset: {
          x: -20,
          y: 510,
        },
      };
      var toolbar = new fengmap.FMZoomControl(scrollZoomCtlOpt);
      toolbar.addTo(map);
    },
    //设置自适应宽高
    setView() {
      const dpWidth = document.documentElement.clientWidth;
      const rootFontSize = (dpWidth * 80) / 750;
      document.documentElement.style.fontSize = 80 + "px";
    },
  },
  created() {
    this.setView();
  },
  mounted() {
    let that = this;
    window.onresize = () => {
      if (!that.timer) {
        that.timer = true;
        setTimeout(() => {
          this.setView(); // 如果窗口大小发生改变，就触发 setView 事件
          that.timer = false;
        }, 200);
      }
    };

    const options = {
      container: document.getElementById("fengmap"),
      appName: "库存3D仓库图",
      key: "eb459747ae2111144222a2c9e24dd98a",
      mapID: "1594977625500745730",
      mapZoom: 19.5,
    };

    this.map = new fengmap.FMMap(options);

    // 地图加载，loaded只执行一次
    this.map.on("loaded", () => {
      this.renderToolBar(this.map);

      //设置地图背景图片
      this.map.setBackgroundColor("#ffffff", 0);

      // 获取地图楼层信息
      this.floorInfo = this.map.getFloorInfos();

      const level = this.map.getVisibleLevels()[0];
      // 获取当前展示的第三层楼层对象
      const floor = this.map.getFloor(level);
      floor.setExtentImage(
        "https://developer.fengmap.com/fmAPI/images/extentImage.png"
      );
    });

    //地图点击事件
    this.map.on("click", (e) => {
      var clickMode = e.targets.find((it) => it.type === fengmap.FMType.MODEL);
      var floor = this.floorInfo.find((it) => it.level === e.level);

      this.$socket.emit(getstoreinfo, {
        storeName: clickMode.name,
      });

      this.$refs.storedom.showTable(clickMode, floor);
    });
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 100px;
  height: 100%;
}
body {
  margin: 0;
  padding: 0;
  /*  背景图定位 / 背景图尺寸  cover 完全铺满容器  contain 完整显示在容器内 */
  background: url(./images/bg.jpg) no-repeat #000;
  background-size: cover;
  /* 行高是字体1.15倍 */
  line-height: 1.15;
}

.map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.mainbox {
  min-width: 1024px;
  max-height: 1920px;
  margin: 0 auto;
  padding: 0 0.125rem 0;
}
.mainbox .column {
  width: 26%;
}

.float_left {
  float: left;
}
.float_right {
  float: right;
}
.float_center_bottom {
  position: absolute;
  left: 27%;
  top: 8.4rem;
}
</style>
