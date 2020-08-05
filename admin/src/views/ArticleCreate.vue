<template>
  <div>
    <h1>{{id?'修改':'新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类分类">
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
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
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
        categories: [],
        title: "",
      },
      categories: [],
    };
  },
  created() {
    this.getCategories();
    this.id && this.getArticle();
  },
  methods: {
    async getCategories() {
      const res = await this.$http.get("/rest/categories");
      if (res.data) {
        this.categories = res.data;
      }
    },
    async getArticle() {
      const res = await this.$http.get("/rest/articles/" + this.id);
      if (res.data) {
        this.model = res.data;
      }
    },
    cancel() {
      this.$router.push("/articles/list");
    },
    async save() {
      let { title } = this.model;
      if (!title) {
        this.$message("请填写标题");
        return;
      }
      let res;
      if (this.id) {
        res = await this.$http.put("/rest/articles/" + this.id, this.model); //修改操作
      } else {
        res = await this.$http.post("/rest/articles", this.model); //新增操作
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
      this.$router.push("/articles/list");
    },
  },
};
</script>

<style>
</style>