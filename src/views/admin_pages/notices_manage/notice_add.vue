<template>
  <el-container>
    <el-main>
      <el-form :model="NoticeValidation" :rules="rules" ref="NoticeValidation"
               label-width="100px" class="demo-ruleForm" size="mini">
        <!-- 公告内容 -->
        <el-form-item label="公告内容" prop="content" required>
          <el-input type="textarea" v-model="NoticeValidation.content"
                    :autosize="{minRows: 2,maxRows: 6}"></el-input>
        </el-form-item>
        <!-- 公告内容 -->
        <!-- 提交/重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('NoticeValidation')">立刻发布</el-button>
          <el-button @click="resetForm('NoticeValidation')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 提交/重置 -->
    </el-main>
    <el-aside width="250px">
      <notice-aside></notice-aside>
    </el-aside>
  </el-container>
</template>

<script>
import NoticeAside from '../../../components/admin_components/NoticeAside.vue'
export default {
  data () {
    return {
      NoticeValidation: {
        content: ''
      },
      rules: {
        content: [
          { required: true, message: '请输入公告内容', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    NoticeAside
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.post('/api/admin/notices/notice-release', this.NoticeValidation)
            .then(response => {
              if (response.message === 'OK') {
                this.$message({
                  message: response.data,
                  type: 'success'
                })
                this.$router.push({name: 'NoticeDelete'})
              } else {
                this.$message({
                  message: response.data,
                  type: 'error'
                })
              }
            })
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
