<template>
  <div>
    <el-table :data="articleList">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column label="所属分类" width="300">
        <template slot-scope="scope">
          <span v-for="(item,index) in scope.row.categories" :key="index">
            {{item.name}}
            <span v-if="index!=scope.row.categories.length-1">、</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="toEdit(scope.row._id)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteCate(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
    };
  },
  created() {
    this.getArticleList();
  },
  methods: {
    deleteCate(row) {
      this.$confirm(`确定删除分类“${row.title}”吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete("/rest/articles/" + row._id);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getArticleList();
      });
    },
    toEdit(id) {
      this.$router.push("/articles/edit/" + id);
    },
    async getArticleList() {
      const res = await this.$http.get("/rest/articles");
      if (res.data) {
        this.articleList = res.data.reverse();
      }
    },
  },
};
</script>

<style>
</style>