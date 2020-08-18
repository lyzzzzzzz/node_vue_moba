<template>
  <div class="articles-page pb-5" v-if="model">
    <div class="d-flex px-1 py-3 text-blue-1 border-bottom">
      <router-link tag="span"
        :to="`/`" class="iconfont icon-left"></router-link>
      <div class="flex-1 text-ellipsis">{{model.title}}</div>
      <div class="text-grey fs-sm">{{model.updatedAt|date}}</div>
    </div>
    <div v-html="model.content" class="px-3 fs-xl"></div>
    <div class="px-3">
      <div class="mt-4 pb-2">
        <span class="iconfont icon-cc-menu-circle"></span>
        <strong class="text-blue-1 fx-lg pl-1">相关资讯</strong>
      </div>
      <router-link
        tag="div"
        :to="`/articles/${item._id}`"
        v-for="(item,index) in model.related"
        :key="index"
        class="mt-2 d-flex ai-center"
      >
        <div class="flex-1 text-ellipsis">{{item.title}}</div>
        <div class="text-grey fs-sm">{{item.updatedAt|date}}</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  props: ["id"],
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD");
    },
  },
  data() {
    return {
      model: null,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>

<style lang="scss">
.articles-page {
  img {
    max-width: 100%;
  }
}
</style>