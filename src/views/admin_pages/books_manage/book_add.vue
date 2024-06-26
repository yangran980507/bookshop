<template>
  <el-container>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm" size="mini">
        <!-- 书名/书号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="书号" prop="BookNumber" required>
              <el-input v-model="ruleForm.BookNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书名" prop="BookName" required>
              <el-input v-model="ruleForm.BookName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 书名/书号 -->
        <!-- 作者/类别 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者" prop="Author" required>
              <el-input v-model="ruleForm.Author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="CategoryName" required>
              <el-input v-model="ruleForm.CategoryName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 作者/类别 -->
        <!-- 封面/价格 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面" prop="PicURL" required>
              <el-input v-model="ruleForm.PicURL"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价" prop="Price" required>
              <el-input v-model="ruleForm.Price">
                <template slot="prefix">￥</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 封面/价格 -->
        <!-- 出版社/时间 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="出版社" prop="Publisher" required>
              <el-input v-model="ruleForm.Publisher"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出版时间" required>
              <el-form-item prop="Pdate">
                <el-date-picker type="date" placeholder="选择日期"
                                v-model="ruleForm.Pdate" style="width: 100%;">
                </el-date-picker>
              </el-form-item>
          </el-form-item>
          </el-col>
        </el-row>
        <!-- 出版社/时间 -->
        <!-- 库存 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存" prop="Quantity" required>
              <el-input v-model="ruleForm.Quantity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 库存 -->
        <!-- 推荐/新书 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否推荐" prop="IsCommended" required>
              <el-radio v-model="ruleForm.IsCommended" :label=true>是</el-radio>
              <el-radio v-model="ruleForm.IsCommended" :label=false>否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否新书" prop="IsNewBook" required>
              <el-radio v-model="ruleForm.IsNewBook" :label=true>是</el-radio>
              <el-radio v-model="ruleForm.IsNewBook" :label=false>否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 推荐/新书 -->
        <!-- 图书简介 -->
        <el-form-item label="图书简介" prop="Introduce" required>
          <el-input type="textarea" v-model="ruleForm.Introduce"
                    :autosize="{minRows: 3,maxRows: 6}"></el-input>
        </el-form-item>
        <!-- 图书简介 -->
        <!-- 提交/重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">加入书库</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 提交/重置 -->
    </el-main>
    <el-aside width="250px">
      <book-aside></book-aside>
    </el-aside>
  </el-container>
</template>
<script>
import BookAside from '../../../components/admin_components/BookAside.vue'
export default {
  data () {
    return {
      ruleForm: {
        BookNumber: '',
        BookName: '',
        Author: '',
        CategoryName: '',
        Publisher: '',
        Pdate: '',
        IsCommended: true,
        IsNewBook: true,
        PicURL: '',
        Price: 0.0,
        Quantity: 0,
        Introduce: ''
      },
      rules: {
        BookNumber: [
          { required: true, message: '请输入书号', trigger: 'blur' }
        ],
        BookName: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        Author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        CategoryName: [
          { required: true, message: '请输入类别', trigger: 'blur' }
        ],
        Publisher: [
          { required: true, message: '请输入出版社', trigger: 'blur' }
        ],
        Pdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        IsCommended: [
          { required: true, message: '请选择是否推荐', trigger: 'change' }
        ],
        IsNewBook: [
          { required: true, message: '请选择是否新书', trigger: 'change' }
        ],
        PicURL: [
          { required: true, message: '请输入封面', trigger: 'blur' }
        ],
        Price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        Quantity: [
          { required: true, message: '请输入库存量', trigger: 'blur' }
        ],
        Introduce: [
          { required: true, message: '请输入图书简介', trigger: 'blur' }
        ]
      }
    }
  },
  components: {
    BookAside
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.post('/api/admin/books/book-storage', this.ruleForm)
            .then(response => {
              if (response.message === 'OK') {
                this.$message({
                  message: response.detail
                })
              } else {
                if (response.err_code === 100102) {
                  this.$message({
                    message: response.detail,
                    type: 'success'
                  })
                } else {
                  this.$message({
                    message: response.data
                  })
                }
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
    }
  }
}
</script>
<style>
.liStates {
  text-align: left;
}
</style>
