<template>
  <div class="card px-3 bg-white mt-3 w-100">
    <div class="card-header d-flex jc-between ai-center py-3">
      <span class="iconfont" :class="`icon-${icon}`"></span>
      <span class="flex-1 px-2 fs-xl">{{title}}</span>
      <span class="iconfont icon-more"></span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    title:{type:String},
    icon:{type:String}
  }
};
</script>

<style lang="scss">
@import "../_variable.scss";
.card{
  border-bottom:1px solid $border-color;
}
</style>