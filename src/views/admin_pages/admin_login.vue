<template>
  <div class="flex-container">
    <div class="flex-item" id="flex-item1">
      <span>&nbsp;图书管理系统</span>
    </div>
    <div class="flex-item" id="flex-item2">
      <div id="login_access">
        <form>
          <p id="form-head">
            <span>系统登录</span>
          </p>
          <p>
            <i class="el-icon-user"></i>
            <el-input class="sub_grey" v-model="user_name"
                      placeholder="请输入用户名" size="small"></el-input>
          </p>
          <p class="pwd-btn">
            <i class="el-icon-lock"></i>
            <el-input class="sub_grey" placeholder="请输入密码"
                      v-model="pwd" show-password size="small"></el-input>
          </p>
          <p>
            <el-button class="btn_grey" type="primary" size="mini" round @click="login">
              登录
            </el-button>
          </p>
      </form>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      user_name: '',
      pwd: ''
    }
  },
  methods: {
    login () {
      this.$api.post('/api/admin/auth/login', {
        LoginName: this.user_name,
        Password: this.pwd
      }).then(response => {
        if (response.message === 'OK') {
          this.$message({
            message: response.details,
            type: 'success'
          })
          this.$router.push({name: 'AdminManage'})
        } else if (response.err_code === 100101) {
          this.$message({
            message: '登录失败: ' + Object.keys(response.data).map(key => {
              return response.data[key]
            }),
            type: 'error'
          })
        } else {
          this.$message({
            message: '登录失败: ' + response.data,
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.flex-container{
  display: flex;
  flex-direction:column;
  width: 100%;
  height: 100%;
  margin-bottom: 40px;
  margin-top: 50px;
}
#flex-item1{
  background-image: url("../../assets/admin_login_head.jpg");
  width: 100%;
  height: 40px;
  font-size: 25px;
  color: white;
  text-align: left;
}
#flex-item2{
  background-image: url("../../assets/admin_login_bg.jpg");
  width: 100%;
  height: 540px;
  min-height: 520px;
  margin-bottom: 10px;
}
#login_access{
  background-color: white;
  border: 2px solid gray;
  border-radius: 20px;
  width: 300px;
  height: 300px;
  position: relative;
  left: 790px;
  top: 90px;
}
#form-head{
  font-size: 20px;
  color: black;
  padding: 15px;
  text-align: left;
  text-indent: 20px;
  font-weight: bolder;
}
.sub_grey{
  font-size: 15px;
  width: 170px;
  height: 20px;
  border-radius: 30px;
}
.btn_grey{
  font-size: 15px;
  width: 200px;
  margin: 20px;
  background-color: skyblue;
  color: white;
}
</style>
