<template>
  <div class="swiper-container w-100">
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide>
        <img src="../assets/swiper/1.jpeg" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiper/2.jpeg" class="w-100" />
      </swiper-slide>
      <swiper-slide>
        <img src="../assets/swiper/3.jpeg" class="w-100" />
      </swiper-slide>
      <div class="swiper-pagination home-pagination text-right pb-2 pr-3" slot="pagination"></div>
    </swiper>
  </div>
</template>

<script>
export default {
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".home-pagination",
        },
        autoplay: true,
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper;
    },
  },
  mounted() {
    // Swiper切换到指定slide。
    // index:必选，num，指定将要切换到的slide的索引。
    // speed:可选，num(单位ms)，切换速度
    // runCallbacks:可选，boolean，设置为false时不会触发onSlideChange回调函数。
    this.swiper.slideTo(0, 1000, false);
  },
};
</script>

<style lang="scss" scope>
@import "../_variable.scss";
.home-pagination {
  .swiper-pagination-bullet {
    background-color: #fff;
    border-radius: 2px;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background-color: map-get($colors, "blue");
    }
  }
}

</style>
