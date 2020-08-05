<template>
  <div>
     <h1>分类列表</h1>
    <el-table :data="categortList">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="parent.name" label="上级分类" width="300"></el-table-column>
      <el-table-column prop="name" label="分类名称"></el-table-column>
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
      categortList: [],
    };
  },
  created() {
    this.getCategortList();
  },
  methods: {
    deleteCate(row) {
      this.$confirm(`确定删除分类“${row.name}”吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete("/rest/categories/" + row._id);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getCategortList();
      });
    },
    toEdit(id) {
      this.$router.push("/categories/edit/" + id);
    },
    async getCategortList() {
      const res = await this.$http.get("/rest/categories");
      if (res.data) {
        this.categortList = res.data.reverse();
      }
    },
  },
};
</script>

<style>
</style>