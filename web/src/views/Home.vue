<template>
  <div class="home">
    <home-swiper></home-swiper>
    <home-icons></home-icons>
    <my-card icon="cc-menu-circle" title="新闻资讯">
      <div class="fs-md nav jc-between nav-border-top py-3">
        <div class="nav-item active">热门</div>
        <div class="nav-item">新闻</div>
        <div class="nav-item">公告</div>
        <div class="nav-item">活动</div>
        <div class="nav-item">赛事</div>
      </div>
      <swiper>
        <swiper-slide v-for="n in 5" :key="n">
          <div class="py-2 fs-sm d-flex jc-between ai-center" v-for="m in 5" :key="m">
            <span class="text-block">公告</span>
            <span class="flex-1 px-2">“游戏家中国行·王者零距离”活动重启说明</span>
            <span>08/14</span>
          </div>
        </swiper-slide>
      </swiper>
    </my-card>

    <my-card icon="cc-menu-circle" title="英雄列表"></my-card>
  </div>
</template>

<script>
import HomeIcons from "../components/HomeIcons";
import HomeSwiper from "../components/HomeSwiper";
import MyCard from "../components/MyCard";
export default {
  components: {
    HomeIcons,
    HomeSwiper,
    MyCard,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../_variable.scss";
.text-block {
  display: inlink-block;
  color: map-get($colors, "yellow");
  border: 1px solid map-get($colors, "yellow");
  border-radius: 3px;
  padding: 2px;
}
</style>
