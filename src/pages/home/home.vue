<template>
  <div class="home">
      <x-header>
          <x-icon slot="overwrite-left" type="ios-home" class="ico-head"></x-icon>
          <div slot="overwrite-title" class="title">
              <a href="#">搜索课程、资源、机构</a>
          </div>
          <x-icon slot="right" type="android-menu" class="ico-head"></x-icon>
      </x-header>
      <swiper :list="bannerList"></swiper>
      <grid>
        <grid-item>
          <img slot="icon" src="../../common/images/video.png" alt="">
          <span slot="label">点播课程</span>
        </grid-item>
        <grid-item>
          <img slot="icon" src="../../common/images/live.png" alt="">
          <span slot="label">直播课程</span>
        </grid-item>
        <grid-item>
          <img slot="icon" src="../../common/images/resource.png" alt="">
          <span slot="label">学科资源</span>
        </grid-item>
        <grid-item>
          <img slot="icon" src="../../common/images/shopping_car.png" alt="">
          <span slot="label">我的购买</span>
        </grid-item>
      </grid>

  </div>
</template>
<script>
import { XHeader, Swiper, Grid, GridItem } from "vux";
export default {
  name: "home",
  components: {
    XHeader,
    Swiper,
    Grid,
    GridItem
  },
  data() {
    return {
      bannerList: []
    };
  },
  mounted() {
    this.$http
      .get("/v1/home/getBannerUrl.node")
      .then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          const element = res.data.data[index];
          this.bannerList.push({
            url: element.adverUrl,
            img: element.adverImage
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style lang="less">
a {
  text-decoration: none;
}
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
  .vux-slider > .vux-indicator,
  .vux-slider .vux-indicator-right {
    right: auto;
    left: 50%;
    transform: translateX(-50%);
  }
  .weui-grids{
    background: #fff;
  }
  .weui-grid {
    padding: 10px;
    &:active{
      background: transparent;
    }
    &:before {
      border: none;
    }
    &:after {
      border: none;
    }
  }
  .weui-grid__icon{
    width: 50px;
    height: 50px;
  }
}
</style>



