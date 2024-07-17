<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%"
        size="mini"
        height="370"
        border>
        <!-- 书号 -->
        <el-table-column
          label="书号"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.book_number }}</span>
          </template>
        </el-table-column>
        <!-- 书号 -->
        <!-- 书名 -->
        <el-table-column
          label="书名"
          width="210" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
          </template>
        </el-table-column>
        <!-- 书名 -->
        <!-- 作者 -->
        <el-table-column
          label="作者"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.author }}</span>
          </template>
        </el-table-column>
        <!-- 作者 -->
        <!-- 出版社 -->
        <el-table-column
          label="出版社"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.publisher }}</span>
          </template>
        </el-table-column>
        <!-- 出版社 -->
        <!-- 入库时间 -->
        <el-table-column
          label="入库时间"
          width="140" align="center">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ formatDate(scope.row) }}</span>
          </template>
        </el-table-column>
        <!-- 入库时间 -->
        <!-- 价格 -->
        <el-table-column
          label="价格"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <!-- 价格 -->
        <!-- 新书 -->
        <el-table-column
          label="新书"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.is_new_book_column }}</span>
          </template>
        </el-table-column>
        <!-- 新书 -->
        <!-- 推荐 -->
        <el-table-column
          label="推荐"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.is_commended_column }}</span>
          </template>
        </el-table-column>
        <!-- 推荐 -->
        <!-- 库存 -->
        <el-table-column
          label="库存"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.quantity }}</span>
          </template>
        </el-table-column>
        <!-- 库存 -->
        <!-- 销量 -->
        <el-table-column
          label="销量"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.sold }}</span>
          </template>
        </el-table-column>
        <!-- 销量 -->
        <el-table-column label="操作" fixed="right" width="147" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini" type="primary"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div id="pages">
        <el-row>
          <el-col :span="12" :offset="12">
            <el-button-group>
              <el-button size="mini" @click="getBooks(pages.FirstPageURL)">首页</el-button>
              <el-button icon="el-icon-arrow-left" size="mini" @click="getBooks(pages.PrevPageURL)">上一页</el-button>
              <el-button size="mini">{{pages.CurrentPage}}</el-button>
              <el-button size="mini" @click="getBooks(pages.NextPageURL)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              <el-button size="mini" @click="getBooks(pages.LastPageURL)">末页</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-aside width="250px">
      <book-aside2></book-aside2>
    </el-aside>
  </el-container>
</template>
<script>
import BookAside2 from '../../../components/admin_components/BookAside2.vue'

export default {
  data () {
    return {
      tableData: [{
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
      }],
      pages: {
        CurrentPage: 1,
        PrevPageURL: this.baseURL,
        NextPageURL: this.baseURL,
        FirstPageURL: this.baseURL,
        LastPageURL: this.baseURL
      },
      baseURL: '/api/admin/books'
    }
  },
  components: {
    BookAside2
  },
  mounted () {
    this.getBooks(this.baseURL)
  },
  watch: {
    tableData: {
      handler (val) {
      },
      deep: true
    }
  },
  computed () {
    this.formatDate()
  },
  methods: {
    handleEdit (index, row) {
      this.$router.push({name: 'BookUpdate', params: {id: row.id}})
    },
    handleDelete (index, row) {
      this.$api.del('/api/admin/books/delete/' + row.id)
        .then(response => {
          if (response.message === 'OK') {
            this.tableData.splice(index, 1)
            this.$message({
              message: response.data,
              type: 'success'
            })
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
    },
    getBooks (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.tableData = response.data.books
          this.pages = response.data.page
          this.transColumn()
        } else {
          this.$message({
            message: '鉴权失败，请重新登录！',
            type: 'error'
          })
        }
      })
    },
    transColumn () {
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].is_new_book === true) {
          this.tableData[i].is_new_book_column = '是'
        } else {
          this.tableData[i].is_new_book_column = '否'
        }
        if (this.tableData[i].is_commended === true) {
          this.tableData[i].is_commended_column = '是'
        } else {
          this.tableData[i].is_commended_column = '否'
        }
      }
    },
    formatDate (row) {
      if (row.in_time !== 0) {
        let date = new Date(parseInt(row.in_time) * 1000)
        let Y = date.getFullYear() + '-'
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
        return Y + M + D
      } else {
        return ''
      }
    }
  }
}
</script>
<style>
#pages{
  margin-top: 20px;
  padding-top: 20px;
}
</style>
