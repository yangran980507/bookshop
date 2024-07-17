<template>
  <el-container>
    <!-- header -->
    <el-header style="padding: 0">
      <!-- search -->
      <client-search></client-search>
      <!-- search -->
    </el-header>
    <!-- header -->
    <!-- main -->
    <el-main style="background-color: yellow">
      <el-table
        :data="sellBookData"
        style="width: 100%">
        <el-table-column
          label="编号" align="left"
          width="80px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="书名" align="left"
          width="200px">
          <template slot-scope="scope">
            <el-button type="text" @click="goDetail(scope.row.book_name)">
              <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="出版社" align="left" width="200px">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.publisher }}</span>
          </template>
        </el-table-column>
        <el-table-column label="购买" align="center" width="200px">
          <template slot-scope="scope">
            <el-button
              size="mini" icon="el-icon-plus"
              @click="handleAddCart(scope.row.id)">
              加入购物车
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row style="margin-top: 30px">
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
    </el-main>
    <!-- main -->
  </el-container>
</template>

<script>
import ClientSearch from '../../../components/client_components/client-search.vue'
import {setCart} from '../../../api/cart_storage'
import {getUser} from '../../../api/storage'

export default {
  data () {
    return {
      baseURL: 'api/client/books/by-sold/12',
      sellBookData: [{
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
      }
    }
  },
  components: {
    ClientSearch
  },
  mounted () {
    this.getBooks(this.baseURL)
  },
  methods: {
    handleAddCart (bookID) {
      this.$api.post('api/client/carts/add/' + bookID).then(response => {
        if (response.message === 'OK') {
          setCart(getUser().id, bookID)
          this.$message({
            type: 'success',
            message: response.data
          })
        } else if (response.err_code === 100102) {
          this.$message({
            type: 'info',
            message: '登录后可加购'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data
          })
        }
      })
    },
    getBooks (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.sellBookData = response.data.books
          this.pages = response.data.page
        }
      })
    },
    goDetail (name) {
      this.$router.push({name: 'ClientShowDetail', query: {bookName: name}})
    }
  }
}
</script>
<style scoped>
</style>
