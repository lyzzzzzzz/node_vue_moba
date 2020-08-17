<template>
  <div class="text-center fs-sm text-dark nav-icons mt-3 w-100">
    <div class="d-flex flex-warp bg-white pt-3">
      <div class="icon-item mb-3">
        <i class="sprite sprite-news"></i>
        <div class="pt-2 text-grey">爆料站</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-story"></i>
        <div class="pt-2">故事站</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-shopping"></i>
        <div class="pt-2 text-grey">周边商城</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-experience-clothing"></i>
        <div class="pt-2 text-grey">体验服</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-new-people"></i>
        <div class="pt-2">新人专区</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-inherit"></i>
        <div class="pt-2">荣耀传承</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-camp"></i>
        <div class="pt-2">王者营地</div>
      </div>
      <div class="icon-item mb-3">
        <i class="sprite sprite-official-account"></i>
        <div class="pt-2 text-grey">公众号</div>
      </div>
      <div class="icon-item mb-3">
        <img src="../assets/sprite/version-icon.png" width="23" height="20" />
        <div class="pt-2 text-grey">版本介绍</div>
      </div>
      <div class="icon-item mb-3">
        <img src="../assets/sprite/djhj.png" width="23" height="20" />
        <div class="pt-2">对局环境</div>
      </div>
      <div class="icon-item mb-3">
        <img src="../assets/sprite/wxwzt.png" width="38" height="10" />
        <div class="pt-3 fs-sm text-grey">无限王者局</div>
      </div>
      <div class="icon-item mb-3">
        <img src="../assets/sprite/cyhdy.png" width="28" height="28" />
        <div class="pt-1 fs-sm">创意互动营</div>
      </div>
    </div>

    <div class="bg-ligit py-2">
      <i class="sprite sprite-pack-up"></i>
      <span style="paddingLeft:5px">收起</span>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scope>
@import "../_variable.scss";
.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
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