<template>
  <div>
    <h1>{{id?'修改':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>

      <el-form-item label="广告">
        <el-button @click="model.items.push({})" size="small" type="primary">
          <i class="el-icon-plus"></i> 添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap:wrap">
          <el-col :md="24" v-for="(item,index) in model.items" :key="index">
            <el-form-item label="链接" style="marginTop:15px">
              <el-input v-model="item.url"></el-input>
            </el-form-item>
            <el-form-item label="图片" style="marginTop:5px">
              <el-upload
                class="avatar-uploader"
                :action="uploadUrl"
                :show-file-list="false"
                :on-success="res=>$set(item,'image',res.url)"
                :headers="getAuthHeader()"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  class="avatar"
                 
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
               <el-button type="danger" size="small" @click="model.items.splice(index,1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item>
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
      model: {
        items: [],
      },
    };
  },
  created() {
    this.id && this.getAdById();
  },
  methods: {
    async getAdById() {
      const res = await this.$http.get("/rest/ads/" + this.id);
      if (res.data) {
        this.model = res.data;
      }
    },
    cancel() {
      this.$router.push("/ads/list");
    },
    async save() {
      let { name } = this.model;
      if (!name) {
        this.$message("请填写名称");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/rest/ads/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/ads", this.model); //新增操作
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
      this.$router.push("/ads/list");
    },
  },
};
</script>

<style>
</style>