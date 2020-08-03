<template>
  <div>
    <h1>{{id?'修改':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="图标">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL+'/upload'"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
      model: {},
      parents: [],
    };
  },
  created() {
    this.id && this.getCategory();
  },
  methods: {
    handleAvatarSuccess(res) {
      this.$set(this.model, "icon", res.url);
    },
    async getCategory() {
      const res = await this.$http.get("/rest/items/" + this.id);
      if (res.data) {
        this.model = res.data;
      }
    },
    cancel() {
      this.$router.push("/items/list");
    },
    async save() {
      let { name } = this.model;
      if (!name) {
        this.$message("请填写名称");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/rest/items/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/items", this.model); //新增操作
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
      this.$router.push("/items/list");
    },
  },
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>