<template>
  <div>
     <h1>英雄列表</h1>
    <el-table :data="itemList">
      <!-- <el-table-column prop="_id" label="ID" width="300"></el-table-column> -->
      <el-table-column prop="name" label="英雄名称" width="200"></el-table-column>
      <el-table-column label="圖標">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="height:40px;width:40px" />
        </template>
      </el-table-column>
      <el-table-column prop="title" label="称号" width="300"></el-table-column>
      <el-table-column prop="scores.difficult" label="难度" width="200"></el-table-column>
      <el-table-column prop="scores.skills" label="技能" width="200"></el-table-column>
      <el-table-column prop="scores.attack" label="攻击" width="200"></el-table-column>
      <el-table-column prop="scores.survive" label="生存" width="200"></el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
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
        const res = await this.$http.delete("/rest/heros/" + row._id);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getCategortList();
      });
    },
    toEdit(id) {
      this.$router.push("/heroes/edit/" + id);
    },
    async getCategortList() {
      const res = await this.$http.get("/rest/heros");
      if (res.data) {
        this.itemList = res.data.reverse();
      }
    },
  },
};
</script>

<style>
</style>