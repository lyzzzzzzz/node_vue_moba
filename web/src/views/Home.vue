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
          <span class="flex-1 px-2 text-ellipsis">{{info.title}}</span>
          <span class="text-grey">{{info.createdAt|date}}</span>
        </div>
      </template>
    </list-card>

    <list-card icon="Hero" title="英雄列表" :categories="heroCategories">
      <template #item="{category}">
       <div class="d-flex flex-warp" style="margin:0 -0.5rem">
          <div
          class="p-2 fs-sm d-flex flex-column hero-item jc-center ai-center "
          v-for="(info,m) in category.list"
          :key="m"
        >
          <!-- <span class="text-block">{{info.categoryName}}</span> -->
          <img :src="info.avatar" class="w-100">
          <span class="flex-1 px-2 text-ellipsis">{{info.name}}</span>
          <!-- <span class="text-grey">{{info.createdAt|date}}</span> -->
        </div>
       </div>
      </template>
    </list-card>
  </div>
</template>

<script>
import HomeIcons from "../components/HomeIcons";
import HomeSwiper from "../components/HomeSwiper";
import ListCard from "../components/ListCard";
import dayjs from "dayjs";
export default {
  components: {
    HomeIcons,
    HomeSwiper,
    ListCard,
  },
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    },
  },
  data() {
    return {
      newCategories: [],
      heroCategories: [],
    };
  },
  created() {
    this.getNewCategories();
     this.getHeroCategories();
  },
  methods: {
    async getNewCategories() {
      const res = await this.$http("/news/list");
      this.newCategories = res.data;
    },
    async getHeroCategories() {
      const res = await this.$http("/heroes/list");
      this.heroCategories = res.data;
    },
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
.hero-item{
  width:20%
}

</style>
