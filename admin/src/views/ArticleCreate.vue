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
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button type="primary" @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor,
  },
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
    //自定义富文本上传图片方式，，图片默认为base64，使得体积非常大，，改为后台图片地址
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("file", file); //"file"后台接受的是file字段
      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
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