<template>
  <div class="home">
      <x-header>
          <x-icon slot="overwrite-left" type="ios-home" class="ico-head"></x-icon>
          <div slot="overwrite-title" class="title">
              <a href="#">搜索课程、资源、机构</a>
          </div>
          <x-icon slot="right" type="android-menu" class="ico-head"></x-icon>
      </x-header>
  </div>
</template>
<script>
import { XHeader } from "vux";
export default {
  name: "home",
  components: {
    XHeader
  },
  data() {
    return {};
  },
  mounted() {
    this.$http
      .get("/v1/home/getBannerUrl.node")
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less">
.ico-head {
  fill: #fff;
}
.title {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  a {
    position: absolute;
    left: 0;
    right: 0;
    top: 7px;
    height: 26px;
    background: #fff;
    line-height: 26px;
    text-decoration: none;
    border-radius: 13px;
    font-size: 14px;
    text-align: center;
    color: #999;
  }
}
.home {
  .vux-header-title-area,
  .vux-header .vux-header-title {
    margin: 0 66px;
  }
}
</style>



