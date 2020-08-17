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
          <span>{{info.createdAt}}</span>
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
      newCategories: [],
    };
  },
  created() {
    this.getNewCategories();
  },
  methods: {
    async getNewCategories() {
      const res = await this.$http("/news/list");
      this.newCategories = res.data;
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
</style>
