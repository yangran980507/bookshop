<template>
  <div>
    <el-divider content-position="center">用户注册</el-divider>
    <div>
      <el-form :model="signupForm" :rules="rules" ref="signupForm"
               label-width="100px" size="mini">
        <!-- 用户名 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="用户名" prop="LoginName" required>
              <el-input v-model="signupForm.LoginName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 用户名 -->
        <!-- 真实姓名 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="真实姓名" prop="TrueName" required>
              <el-input v-model="signupForm.TrueName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 真实姓名 -->
        <!-- 联系电话 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="联系电话" prop="Phone" required>
              <el-input v-model="signupForm.Phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 联系电话 -->
        <!-- 密码 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="密码" prop="PassWord" required>
              <el-input v-model="signupForm.PassWord" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  密码 -->
        <!--   密码确认 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="密码确认" prop="PassWordConfirm" required>
              <el-input v-model="signupForm.PassWordConfirm" show-password></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  密码确认 -->
        <!--  地址 -->
        <el-row>
          <el-col :span="12" :offset="4">
            <el-form-item label="地址" prop="Address">
              <el-input v-model="signupForm.Address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--  地址 -->
        <!-- 提交/重置/返回 -->
        <el-row style="margin-top: 20px">
          <el-col :span="12" :offset="4">
            <el-form-item>
              <el-button type="primary" @click="submitForm('signupForm')">注册</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
              <el-button @click="returnHome">返回首页</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
export default {
  data () {
    return {
      signupForm: {
        LoginName: '',
        TrueName: '',
        Phone: '',
        PassWord: '',
        PassWordConfirm: '',
        Address: ''
      },
      rules: {
        LoginName: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        TrueName: [
          { required: true, message: '请输入真实姓名', trigger: 'blur' }
        ],
        Phone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        PassWord: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        PassWordConfirm: [
          { required: true, message: '请确认密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.post('/api/client/auth/signup', this.signupForm)
            .then(response => {
              if (response.message === 'OK') {
                this.$message({
                  message: '注册成功',
                  type: 'success'
                })
                this.$router.push({name: 'Home'})
                location.reload()
              } else if (response.err_code === 100101) {
                this.$message({
                  message: '注册失败:' + Object.keys(response.data).map(keys => {
                    return response.data[keys]
                  }),
                  type: 'error'
                })
              } else {
                this.$message({
                  message: response.data,
                  type: 'error'
                })
              }
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    returnHome () {
      this.$router.push({name: 'Home'})
    }
  }
}
</script>
<style scoped>
</style>
