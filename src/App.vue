<template>
  <div id="app">
    <view-box ref="viewBOx">
      <transition :name="'vux-pop-'+(direction === 'forward' ? 'in' : 'out')">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </view-box>
  </div>
</template>

<script>
import { ViewBox } from "vux";
import { mapState } from "vuex";
export default {
  name: "App",
  components: {
    ViewBox
  },
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState({
      direction: state => {
        return state.vux.direction;
      },
    })
  }
};
</script>

<style lang="less">
html,
body {
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}
#app {
  height: 100%;
}
#app .vux-header .vux-header-left .left-arrow:before {
  border-color: #fff;
  border-width: 3px 0 0 3px;
  border-radius: 3px;
}
.vux-x-icon {
  fill: #fff;
}
.vux-pop-out-enter-active,
.vux-pop-out-leave-active,
.vux-pop-in-enter-active,
.vux-pop-in-leave-active {
  will-change: transform;
  transition: all 350ms;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.vux-pop-out-enter {
  opacity: 0.5;
  transform: translate3d(-100%, 0, 0);
}

.vux-pop-out-leave-active {
  opacity: 0.5;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-enter {
  opacity: 0.5;
  transform: translate3d(100%, 0, 0);
}

.vux-pop-in-leave-active {
  opacity: 0.5;
  transform: translate3d(-100%, 0, 0);
}
</style>

