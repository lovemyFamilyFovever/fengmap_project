<template>
  <header>
    <h1>可视化展板-ECharts</h1>
    <div class="show-time">{{ currentTime }}</div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      t: null,
      currentTime: "",
    };
  },
  methods: {
    time() {
      clearTimeout(this.t); //清除定时器
      var dt = new Date();
      var y = dt.getFullYear();
      var mt = dt.getMonth() + 1;
      var day = dt.getDate();
      var h = dt.getHours(); //获取时
      var m = dt.getMinutes(); //获取分
      var s = dt.getSeconds(); //获取秒
      this.currentTime = `当前时间：${y}年${mt}月${day}日-${h}时${m}分${s}秒`;
      setTimeout(this.time, 1000); //设定定时器，循环运行
    },
  },
  created() {
    setTimeout(this.time, 1000);
  },
};
</script>

<style>
header {
  position: relative;
  height: 1.25rem;
  background: url(../images/head_bg.png) no-repeat;
  background-size: 100% 100%;
}
header h1 {
  font-size: 0.475rem;
  color: rgba(255, 255, 255, 0.87);
  text-align: center;
  line-height: 1rem;
}
header .show-time {
  position: absolute;
  top: 0;
  right: 0.375rem;
  line-height: 0.9375rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.25rem;
}
</style>