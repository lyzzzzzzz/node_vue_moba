<template>
  <div class="hero-page" v-if="model">
    <div class="topbar bg-dark py-2 px-3 d-flex text-white fs-md ai-center">
      <img src="../assets/logo.png" height="30" class="logo" />
      <div class="pl-2">王者荣耀</div>
      <div class="flex-1 pl-2">攻略站</div>
      <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <div class="bgImg" :style="{'background-image':`url(${model.bgImg})`}">
      <div class="info px-3 pb-2 text-white d-flex flex-column jc-end h-100">
        <div class="fs-xs">{{model.title}}</div>
        <h3 class="my-1">{{model.name}}</h3>
        <div class="fs-xs">{{model.categories.map(v=>v.name).join('/')}}</div>
        <div class="d-flex jc-between ai-center fs-xs">
          <div>
            <span>难度</span>
            <span class="bg-yellow bagde">{{model.scores.difficult}}</span>
            <span>技能</span>
            <span class="bg-blue-1 bagde">{{model.scores.skills}}</span>
            <span>攻击</span>
            <span class="bg-danger bagde">{{model.scores.attack}}</span>
            <span>生存</span>
            <span class="bg-dark bagde">{{model.scores.survive}}</span>
          </div>
          <div>皮肤：7 &gt;</div>
        </div>
      </div>
    </div>

    <div class="bg-white px-3">
      <div class="fs-md nav jc-around pt-3 pb-2 border-bottom">
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
        <swiper-slide>
          <!-- 技能部分 -->
          <div class="py-2 d-flex flex-column skill-content">
            <div class="d-flex jc-between fs-sm">
              <div class="nav-btn d-flex ai-center jc-center">
                <span class="iconfont icon-shipin pr-2"></span>
                <span>英雄介绍视频</span>
              </div>
              <div class="nav-btn d-flex ai-center jc-center">
                <span class="iconfont icon-tupian pr-2"></span>
                <span>一图识英雄</span>
              </div>
            </div>

            <div>
              <div class="d-flex jc-between mt-4">
                <img
                  class="skills"
                  :src="skill.icon"
                  v-for="(skill,index) in model.skills"
                  :key="index"
                  @click="$refs.skillList.$swiper.slideTo(index)"
                  :class="{skillActive:skillActive===index}"
                />
              </div>
              <div class="d-flex">
                <swiper
                  :options="{autoHeight:true}"
                  ref="skillList"
                  @slide-change="()=>skillActive=$refs.skillList.$swiper.realIndex"
                >
                  <swiper-slide v-for="(skill,index) in model.skills" :key="index">
                    <div class="mt-4">
                      <strong>{{skill.name}}</strong>
                      <span class="fs-xs text-grey pl-3">(冷却值：{{skill.delay}} 消耗：{{skill.delay}})</span>
                    </div>
                    <p class="fs-sm">{{skill.description}}</p>
                  </swiper-slide>
                </swiper>
              </div>
            </div>
          </div>
        </swiper-slide>

        <swiper-slide>2222</swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      model: null,
      categories: [{ name: "英雄初始" }, { name: "进阶攻略" }],
      active: 0,
      skillActive: 0,
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = res.data;
      console.log(res.data);
    },
  },
};
</script>

<style lang='scss'>
@import "../_variable.scss";
.hero-page {
  .bgImg {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
  }
  .bagde {
    width: 1rem;
    height: 1rem;
    display: inline-block;
    border-radius: 50%;
    font-size: 0.5rem;
    margin: 0 0.384rem;
    text-align: center;
    line-height: 1rem;
    border: 1px solid rgba(225, 225, 225, 0.2);
  }
  .skill-content {
    .nav-btn {
      width: 49%;
      height: 35px;
      background: #f8f8f8;
      border-radius: 5px;
      border: 1px solid #e4e3e3;
    }
    .skills {
      width: 18%;
    }
    .skillActive {
      border-radius: 50%;
      border: 3px solid map-get($colors, "primary");
    }
  }
}
</style>