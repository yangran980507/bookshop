<template>
  <el-container>
    <el-main>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"
               label-width="100px" class="demo-ruleForm" size="mini">
        <!-- 书名/书号 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="书号" prop="book_number" required>
              <el-input v-model="ruleForm.book_number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="书名" prop="book_name" required>
              <el-input v-model="ruleForm.book_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 书名/书号 -->
        <!-- 作者/类别 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="作者" prop="author" required>
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="类别" prop="category_name" required>
              <el-input v-model="ruleForm.category_name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 作者/类别 -->
        <!-- 封面/价格 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="封面" prop="pic_url" required>
              <el-input v-model="ruleForm.pic_url"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单价" prop="price" required>
              <el-input v-model="ruleForm.price">
                <template slot="prefix">￥</template>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 封面/价格 -->
        <!-- 出版社/时间 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="出版社" prop="publisher" required>
              <el-input v-model="ruleForm.publisher"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="出版时间" required>
              <el-form-item prop="pdate">
                <el-date-picker type="date" placeholder="选择日期"
                                v-model="ruleForm.pdate" style="width: 100%;"
                                value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 出版社/时间 -->
        <!-- 库存 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="库存" prop="quantity" required>
              <el-input v-model="ruleForm.quantity"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 库存 -->
        <!-- 推荐/新书 -->
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否推荐" prop="is_commended" required>
              <el-radio v-model="ruleForm.is_commended" :label=true>是</el-radio>
              <el-radio v-model="ruleForm.is_commended" :label=false>否</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="是否新书" prop="is_new_book" required>
              <el-radio v-model="ruleForm.is_new_book" :label=true>是</el-radio>
              <el-radio v-model="ruleForm.is_new_book" :label=false>否</el-radio>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 推荐/新书 -->
        <!-- 图书简介 -->
        <el-form-item label="图书简介" prop="introduce" required>
          <el-input type="textarea" v-model="ruleForm.introduce"
                    :autosize="{minRows: 3,maxRows: 6}"></el-input>
        </el-form-item>
        <!-- 图书简介 -->
        <!-- 提交/重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交修改</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <!-- 提交/重置 -->
    </el-main>
    <el-aside width="250px">
      <book-aside1></book-aside1>
    </el-aside>
  </el-container>
</template>
<script>
import BookAside1 from '../../../components/admin_components/BookAside1.vue'
export default {
  data () {
    return {
      ruleForm: {
        id: 0,
        book_number: '',
        book_name: '',
        category_name: '',
        publisher: '',
        author: '',
        introduce: '',
        price: 0,
        pdate: 0,
        pic_url: '',
        is_new_book: false,
        is_commended: false,
        is_new_book_column: '',
        is_commended_column: '',
        in_time: 0,
        quantity: 0,
        sold: 0
      },
      rules: {
        book_number: [
          { required: true, message: '请输入书号', trigger: 'blur' }
        ],
        book_name: [
          { required: true, message: '请输入书名', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ],
        category_name: [
          { required: true, message: '请输入类别', trigger: 'blur' }
        ],
        publisher: [
          { required: true, message: '请输入出版社', trigger: 'blur' }
        ],
        pdate: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        is_commended: [
          { required: true, message: '请选择是否推荐', trigger: 'change' }
        ],
        is_new_ook: [
          { required: true, message: '请选择是否新书', trigger: 'change' }
        ],
        pic_url: [
          { required: true, message: '请输入封面', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' }
        ],
        quantity: [
          { required: true, message: '请输入库存量', trigger: 'blur' }
        ],
        introduce: [
          { required: true, message: '请输入图书简介', trigger: 'blur' }
        ]
      },
      paramID: 0
    }
  },
  components: {
    BookAside1
  },
  created () {
    this.getParams()
  },
  mounted () {
    this.getOldBook()
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.put('api/admin/books/update/' + this.paramID, {
            BookNumber: this.ruleForm.book_number,
            BookName: this.ruleForm.book_name,
            CategoryName: this.ruleForm.category_name,
            Publisher: this.ruleForm.publisher,
            Author: this.ruleForm.author,
            Introduce: this.ruleForm.introduce,
            Price: this.ruleForm.price,
            Pdate: this.ruleForm.pdate,
            PicURL: this.ruleForm.pic_url,
            Quantity: this.ruleForm.quantity,
            IsNewBook: this.ruleForm.is_new_book,
            IsCommended: this.ruleForm.is_commended
          })
            .then(response => {
              if (response.message === 'OK') {
                this.$message({
                  message: response.detail,
                  type: 'success'
                })
                this.$router.push({name: 'BookDelete'})
              } else if (response.err_code === 100102 || response.err_code === 100104) {
                this.$message({
                  message: '鉴权失败，请重新登录！',
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
    getOldBook () {
      this.$api.get('/api/admin/books/' + this.paramID)
        .then(response => {
          if (response.message === 'OK') {
            this.ruleForm = response.data.book
          } else if (response.err_code === 100102 || response.err_code === 100104) {
            this.$message({
              message: '鉴权失败，请重新登录！',
              type: 'error'
            })
          }
        })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getParams () {
      this.paramID = this.$route.params.id
    }
  }
}
</script>
<style>
</style>
