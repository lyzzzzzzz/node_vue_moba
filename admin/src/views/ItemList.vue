<template>
  <div>
    <h1>装备列表</h1>
    <el-table :data="itemList">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="name" label="英雄名称" width="500"></el-table-column>
      <el-table-column label="圖標">
        <template slot-scope="scope">
          <img :src="scope.row.icon" style="height:40px;width:40px" />
        </template>
      </el-table-column>
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
      itemList: [],
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
        const res = await this.$http.delete("/rest/items/" + row._id);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getCategortList();
      });
    },
    toEdit(id) {
      this.$router.push("/items/edit/" + id);
    },
    async getCategortList() {
      const res = await this.$http.get("/rest/items");
      if (res.data) {
        this.itemList = res.data.reverse();
      }
    },
  },
};
</script>

<style>
</style>