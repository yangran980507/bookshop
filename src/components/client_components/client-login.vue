<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 2px">
      <el-col :span="20">
    <el-form  :model="person" ref="person" name="login"
              size="mini" style="padding-bottom: 0">
          <!-- 登录入口 -->
      <el-form-item style="text-align: left;height: 40px;">
        <el-image style="width: 55px;height: 55px;border-radius: 5px"
                  :src="loginImg[0]"
                  :fit="'scale-down'"></el-image>
      </el-form-item>
          <!-- 登录入口 -->
          <!-- 用户名 -->
          <el-form-item prop="LoginName">
            <el-input v-model="person.LoginName"
                      placeholder="请输入用户名" size="mini"></el-input>
          </el-form-item>
          <!-- 用户名 -->
          <!-- 密码 -->
          <el-form-item prop="Password">
            <el-input placeholder="请输入密码"
                      v-model="person.Password" show-password size="mini"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <!-- 按钮 -->
          <el-form-item size="mini">
            <el-button type="primary" size="mini" round @click="goSignup">
              注册
            </el-button>
            <el-button type="primary" size="mini" round @click="login">
              登录
            </el-button>
            <el-button type="info" size="mini" @click="resetForm('person')" round>
              重置
            </el-button>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item size="mini" style="color: red;padding-bottom: 0;margin-bottom: 0;
          text-align: left;">
            {{mess}}
          </el-form-item>
          <!-- 提示 -->
    </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  data () {
    return {
      loginImg: [require('@/assets/11.jpeg')],
      person: {
        LoginName: '',
        Password: ''
      },
      mess: '',
      transMess: false
    }
  },
  methods: {
    login () {
      this.$api.post('api/client/auth/login', this.person).then(response => {
        if (response.message === 'OK') {
          this.$message({
            message: response.details,
            type: 'success'
          })
          this.$emit('login', true)
        } else if (response.err_code === 100101) {
          this.mess = Object.keys(response.data).map(keys => {
            return response.data[keys]
          })
          if (this.mess.length === 2) {
            this.mess = this.mess[0] + this.mess[1]
          } else {
            this.mess = this.mess[0] + ''
          }
        } else {
          this.mess = response.data
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.mess = ''
    },
    goSignup () {
      this.$router.push({name: 'ClientSignup'})
    }
  }
}
</script>

<style scoped>
</style>
