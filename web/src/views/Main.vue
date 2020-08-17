<template>
  <div>
    <div class="topbar bg-dark py-2 px-3 d-flex jc-between ai-center">
      <img src="../assets/logo.png" height="30" class="logo" />
      <div class="ml-2 flex-1">
        <div class="text-white fs-md">王者荣耀</div>
        <div class="text-grey fs-sm mt-1">团队成就更多</div>
      </div>
      <button class="bg-primary btn">立即下载</button>
    </div>
    <div class="bg-primary text-white pt-3 pb-2">
      <div class="fs-md nav jc-around">
        <div class="nav-item reverse-active">
          <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
          <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>