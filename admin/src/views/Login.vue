<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>登录</span>
      </div>
      <div>
        <el-form ref="form" label-width="80px" @submit.native.prevent='login'>
          <el-form-item label="用户名">
            <el-input v-model="model.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="model.password" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        username:'',
        password:''
      },
    };
  },
  methods: {
  async  login(){
    const {username,password}=this.model
    if(!username){
    return  this.$message("请填写用户名")
    }
      if(!password){
    return  this.$message("请填写密码")
    }
    const res=await this.$http.post('/login',this.model)
    console.log(res.data.token);
    if(res.data){
      localStorage.setItem('token',res.data.token)
    }
     this.$router.push('/')
     this.$message({
       message:'登录成功',
       type:'success'
     })
    }
  }
};
</script>

<style>
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
  margin: 150px auto;
}
</style>