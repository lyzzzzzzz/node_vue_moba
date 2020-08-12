<template>
  <div>
    <div class="topbar bg-dark py-2 px-3 d-flex jc-between ai-center">
      <!-- <div class="d-flex"> -->
        <img src="../assets/logo.png" height="30" />
        <div class="ml-2 flex-1">
          <div class="text-white fs-md">王者荣耀</div>
          <div class="text-grey fs-sm mt-1">团队成就更多</div>
        </div>
      <!-- </div> -->
      <button class="bg-primary btn" >立即下载</button>
    </div>
    <div class="nav" >nav</div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>