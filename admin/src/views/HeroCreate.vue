<template>
  <div>
    <h1>{{id?'修改':'新建'}}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <el-tab-pane label="基础信息" name="basic">
          <el-form-item label="名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="頭像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :headers="getAuthHeader()"
            >
              <img
                v-if="model.avatar"
                :src="model.avatar"
                class="avatar"
                style="height:100px;width:100px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="背景">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBgImgSuccess"
              :headers="getAuthHeader()"
            >
              <img
                v-if="model.bgImg"
                :src="model.bgImg"
                class="avatar"
                style="height:auto;width:200px"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select
              v-model="model.categories"
              placeholder="请选择"
              :popper-append-to-body="false"
              multiple
            >
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate v-model="model.scores.difficult" style="marginTop:10px" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" style="marginTop:10px" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" style="marginTop:10px" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" style="marginTop:10px" :max="10"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select
              v-model="model.items1"
              placeholder="请选择"
              :popper-append-to-body="false"
              multiple
            >
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select
              v-model="model.items2"
              placeholder="请选择"
              :popper-append-to-body="false"
              multiple
            >
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="使用技巧">
            <el-input v-model="model.usageTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="对战技巧">
            <el-input v-model="model.battleTips" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label="团战思路">
            <el-input v-model="model.teamTips" type="textarea"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane label="技能" name="skills">
          <el-button @click="model.skills.push({})" size="small">
            <i class="el-icon-plus"></i> 添加技能
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.skills" :key="index">
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="uploadUrl"
                  :show-file-list="false"
                  :on-success="res=>$set(item,'icon',res.url)"
                  :headers="getAuthHeader()"
                >
                  <img
                    v-if="item.icon"
                    :src="item.icon"
                    class="avatar"
                    style="height:100px;width:100px"
                  />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="冷却值">
                <el-input v-model="item.delay"></el-input>
              </el-form-item>
              <el-form-item label="消耗">
                <el-input v-model="item.cost"></el-input>
              </el-form-item>
              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input v-model="item.tips" type="textarea"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" size="small" @click="model.skills.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>

        <el-tab-pane label="英雄关系" name="partners">
          <el-button @click="model.partners.push({})" size="small">
            <i class="el-icon-plus"></i> 添加英雄
          </el-button>
          <el-row type="flex" style="flex-wrap:wrap">
            <el-col :md="12" v-for="(item,index) in model.partners" :key="index">
              <el-form-item label="名称">
                <el-select
                  v-model="item.hero"
                  placeholder="请选择"
                  :popper-append-to-body="false"
                  filterable
                >
                  <el-option
                    v-for="hero in heroes"
                    :key="hero._id"
                    :label="hero.name"
                    :value="hero._id"
                  ></el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="danger" size="small" @click="model.partners.splice(index,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="marginTop:10px">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      heroes: [],
      model: {
        bgImg: "",
        avatar: "",
        name: "",
        scores: {
          difficult: 0,
          skills: 0,
          attack: 0,
          survive: 0,
        },
        skills: [],
        items1: [],
        items2: [],
      },
      parents: [],
      categories: [],
      items: [],
      usageTips: "",
      battleTips: "",
      teamTips: "",
    };
  },
  created() {
    this.id && this.getHeroById();
    this.getCategories();
    this.getItems();
    this.getHeros();
  },
  methods: {
    async getItems() {
      const res = await this.$http.get("/rest/items");
      this.items = res.data;
    },
    async getHeros() {
      const res = await this.$http.get("/rest/heroes");
      this.heroes = res.data;
    },
    async getCategories() {
      const res = await this.$http.get("/rest/categories");
      this.categories = res.data;
    },
    handleAvatarSuccess(res) {
      this.model.avatar = res.url;
    },
    handleBgImgSuccess(res) {
      this.model.bgImg = res.url;
      console.log( res.url);
    },
    async getHeroById() {
      //当前英雄
      const res = await this.$http.get("/rest/heros/" + this.id);
      if (res.data) {
        // this.model = res.data;
        this.model = Object.assign({}, this.model, res.data); //避免把初始化的model里面东西全部被替换
      }
    },
    cancel() {
      this.$router.push("/heroes/list");
    },
    async save() {
      let { name } = this.model;
      if (!name) {
        this.$message("请填写名称");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/rest/heros/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/heros", this.model); //新增操作
      }
      let { msg, data } = res.data;
      if (data) {
        this.$message({
          message: msg,
          type: "success",
        });
      } else {
        this.$message.error(msg);
      }
      this.model = {};
      this.$router.push("/heroes/list");
    },
  },
};
</script>

<style>
</style>