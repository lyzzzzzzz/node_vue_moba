<template>
  <div>
    <h1>{{id?'修改':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择" :popper-append-to-body="false">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
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
      parents: [],
    };
  },
  created() {
    this.getParents()
    this.id && this.getCategory();
  },
  methods: {
    async getParents() {
      const res = await this.$http.get("/rest/categories");
      if (res.data) {
        this.parents = res.data;
      }
    },
    async getCategory() {
      const res = await this.$http.get("/rest/categories/" + this.id);
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
        res = await this.$http.put("/rest/categories/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/categories", this.model); //新增操作
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
      this.$router.push("/categories/list");
    },
  },
};
</script>

<style>
</style>