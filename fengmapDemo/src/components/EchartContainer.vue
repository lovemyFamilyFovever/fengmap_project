<template >
  <div class="EchartContainer">
    <slot>
      <h2>添加图表标题</h2>
    </slot>
    <component :is="type" v-bind="$attrs" ref=""></component>
    <div class="EchartContainer-footer"></div>
  </div>
</template>
<script>
import Bar1 from "./EchartBar1.vue";
import Bar2 from "./EchartBar2.vue";
import Poly from "./EchartLine.vue";
import Pie from "./EchartPie.vue";

import ToolWrap from "./ToolWrap.vue";

export default {
  components: {
    Bar1,
    Bar2,
    Poly,
    Pie,
    ToolWrap,
  },
  data() {
    return {};
  },
  props: ["type"],
};
</script>
<style>
.EchartContainer {
  min-height: 3rem;
  position: relative;
  margin-bottom: 0.075rem;
  border: 1px solid rgba(25, 186, 139, 0.17);
  background: url(../images/line.png) rgba(255, 255, 255, 0.03);
}
.EchartContainer::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.EchartContainer::after {
  position: absolute;
  top: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-top: 2px solid #02a6b5;
  content: "";
}
.EchartContainer h2 {
  height: 0.45rem;
  color: #fff;
  line-height: 0.45rem;
  text-align: center;
  font-size: 0.2rem;
  font-weight: 400;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(44, 82, 165, 0.5),
    rgba(20, 41, 108, 0.5)
  );
  border-bottom: 1px solid #2145b7;
}
.EchartContainer .EchartContainer-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}
.EchartContainer .EchartContainer-footer::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 10px;
  height: 10px;
  border-left: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.EchartContainer .EchartContainer-footer::after {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  border-right: 2px solid #02a6b5;
  border-bottom: 2px solid #02a6b5;
  content: "";
}
.echart_container {
  height: 3rem;
}
</style>