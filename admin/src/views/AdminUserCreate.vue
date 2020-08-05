<template>
  <div>
    <h1>{{id?'修改':'新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
       <el-form-item label="密码">
        <el-input v-model="model.password"  type="password"></el-input>
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
      model: {}
    };
  },
  created() {
    this.id && this.getUserById();
  },
  methods: {
    async getUserById() {
      const res = await this.$http.get("/rest/admin_user/" + this.id);
      if (res.data) {
        this.model = res.data;
      }
    },
    cancel() {
      this.$router.push("/admin_user/list");
    },
    async save() {
      let { username } = this.model;
      if (!username) {
        this.$message("请填写名称");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/rest/admin_user/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/admin_user", this.model); //新增操作
      }
      let { msg, data } = res.data;
      if (data) {
        console.log("data",data);
        this.$message({
          message: msg,
          type: "success",
        });
      } else {
        this.$message.error(msg);
      }
      this.model = {};
      this.$router.push("/admin_user/list");
    },
  },
};
</script>

<style>
</style>