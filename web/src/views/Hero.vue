<template>
  <div class="hero-page" v-if="model">
    <div class="topbar bg-dark py-2 px-3 d-flex text-white fs-md ai-center">
      <img src="../assets/logo.png" height="30" class="logo" />
      <div class="pl-2">王者荣耀</div>
      <div class="flex-1 pl-2">攻略站</div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="bgImg" :style="{'background-image':`url(${model.bgImg}})`}">

    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      model:null
    }
  },
  created () {
    this.fetch()
  },
  methods: {
   async fetch(){
    const res=await this.$http.get(`/heroes/${this.id}`)
    this.model=res.data
    console.log(res.data)
    }
  },
};
</script>

<style lang='scss'>
.hero-page{
  .bgImg{
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
}
</style>