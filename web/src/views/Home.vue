<template>
  <div class="home">
    <home-swiper></home-swiper>
    <home-icons></home-icons>

    <list-card icon="cc-menu-circle" title="新闻资讯" :categories="newCategories">
      <template #item="{category}">
        <div
          class="py-2 fs-sm d-flex jc-between ai-center"
          v-for="(info,m) in category.list"
          :key="m"
        >
          <span class="text-block">{{info.categoryName}}</span>
          <span class="flex-1 px-2">{{info.title}}</span>
          <span>{{info.date}}</span>
        </div>
      </template>
    </list-card>
  </div>
</template>

<script>
import HomeIcons from "../components/HomeIcons";
import HomeSwiper from "../components/HomeSwiper";
import ListCard from "../components/ListCard";
export default {
  components: {
    HomeIcons,
    HomeSwiper,
    ListCard,
  },
  data() {
    return {
      newCategories: [
        {
          name: "新闻",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "新闻",
            title: "游戏家中国行·王者零距离”活动重启说明",
            date: "08/14",
          })),
        },
        {
          name: "公告",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "公告",
            title: "游戏家中国行·王者零距离”活动重启说明",
            date: "08/14",
          })),
        },
        {
          name: "活动",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "活动",
            title: "游戏家中国行·王者零距离”活动重启说明",
            date: "08/14",
          })),
        },
        {
          name: "赛事",
          list: new Array(5).fill({}).map(() => ({
            categoryName: "赛事",
            title: "游戏家中国行·王者零距离”活动重启说明",
            date: "08/14",
          })),
        },
      ],
    };
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
