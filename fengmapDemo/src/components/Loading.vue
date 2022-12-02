<template lang="">
   <span class="loading">
    <span class="left"><span class="anim"></span></span>
    <span class="right"><span class="anim"></span></span>
  </span>
</template>
<script>
export default {
  name: "loading",
  data() {
    return {};
  },
};
</script>
<style>
.loading {
  position: absolute;
  display: inline-block;
  height: 46px;
  width: 46px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: none repeat scroll 0 0 #dddddd;
  overflow: hidden;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%) inset, 0 0 25px rgb(0 0 255 / 8%);
}

.loading:after {
  content: "";
  position: absolute;
  top: 9px;
  left: 9px;
  display: block;
  height: 28px;
  width: 28px;
  background: none repeat scroll 0 0 #f2f2f2;
  border-radius: 50%;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}

.right {
  left: 50%;
}

.left {
  left: 0;
}

.loading > span {
  position: absolute;
  height: 100%;
  width: 50%;
  overflow: hidden;
}

.anim {
  position: absolute;
  left: 100%;
  top: 0;
  height: 100%;
  width: 100%;
  border-radius: 999px;
  background: none repeat scroll 0 0 #508ec3;
  opacity: 0.8;
  -webkit-animation: ui-spinner-rotate-left 3s infinite;
  animation: ui-spinner-rotate-left 3s infinite;
  -webkit-transform-origin: 0 50% 0;
  transform-origin: 0 50% 0;
}

.left .anim {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.right .anim {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  left: -100%;
  -webkit-transform-origin: 100% 50% 0;
  transform-origin: 100% 50% 0;
}

.loading .anim {
  -webkit-animation-delay: 0s;
  -webkit-animation-duration: 3s;
  -webkit-animation-timing-function: linear;
  animation-delay: 0s;
  animation-duration: 3s;
  animation-timing-function: linear;
}

.loading .right .anim {
  -webkit-animation-name: ui-spinner-rotate-right;
  -webkit-animation-delay: 0;
  -webkit-animation-delay: 1.5s;
  animation-name: ui-spinner-rotate-right;
  animation-delay: 0;
  animation-delay: 1.5s;
}

@keyframes ui-spinner-rotate-left {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(0deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(180deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes ui-spinner-rotate-right {
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(180deg);
  }

  50% {
    transform: rotate(180deg);
  }

  75% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>