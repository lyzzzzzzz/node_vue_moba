<template>
  <div>
    <h1>{{id?'修改':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
    };
  },
  created() {
    this.id && this.getCategory();
  },
  methods: {
    async getCategory() {
      const res = await this.$http.get("/categories/" + this.id);
      if (res.data) {
        this.model = res.data;
      }
    },
    cancel() {
      this.$router.push("/categories/list");
    },
    async save() {
      let { name } = this.model;
      if (!name) {
        this.$message("请填写名称");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/categories/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/categories", this.model); //新增操作
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
      this.$router.push("/categories/list");
    },
  },
};
</script>

<style>
</style>