<template>
  <my-card :icon="icon" :title="title">
    <slot name="topContent"></slot>
    <div class="fs-md nav jc-between nav-border-top py-3">
      <div
        class="nav-item"
        :class="{active:active===index}"
        v-for="(category,index) in categories"
        :key="index"
        @click="$refs.list.$swiper.slideTo(index)"
      >{{category.name}}</div>
    </div>
    <swiper
      :options="{autoHeight:true}"
      ref="list"
      @slide-change="()=>active=$refs.list.$swiper.realIndex"
    >
      <swiper-slide v-for="(category,index) in categories" :key="index">
        <slot name="item" :category="category"></slot>
      </swiper-slide>
    </swiper>
  </my-card>
</template>

<script>
import MyCard from "./MyCard";
export default {
  components: {
    MyCard,
  },
  props: {
    title: { type: String },
    icon: { type: String },
    categories: { type: Array },
  },
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    slideChange() {
      console.log(this.$refs.list.$swiper.realIndex);
    },
  },
};
</script>

<style>
</style>