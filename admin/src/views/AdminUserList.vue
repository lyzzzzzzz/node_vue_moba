<template>
  <div>
    <h1>管理员列表</h1>
    <el-table :data="userList">
      <el-table-column prop="_id" label="ID" width="300"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
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
      userList: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    deleteCate(row) {
      this.$confirm(`确定删除分类“${row.name}”吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete("/rest/admin_user/" + row._id);
        this.$message({
          type: "success",
          message: res.data.msg,
        });
        this.getUserList();
      });
    },
    toEdit(id) {
      this.$router.push("/admin_user/edit/" + id);
    },
    async getUserList() {
      const res = await this.$http.get("/rest/admin_user");
      if (res.data) {
        this.userList = res.data.reverse();
      }
    },
  },
};
</script>

<style>
</style>