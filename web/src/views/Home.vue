<template>
  <div class="home">
    <home-swiper></home-swiper>
    <home-icons></home-icons>
  </div>
</template>

<script>
import HomeIcons from "../components/HomeIcons";
import HomeSwiper from "../components/HomeSwiper";
export default {
  components: {
    HomeIcons,
    HomeSwiper,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss">
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

.icon-item {
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-left: 1px solid $border-color;
  &:nth-child(4n + 1) {
    border-left: none;
  }
}
</style>
