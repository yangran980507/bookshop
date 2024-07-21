<template>
  <el-container>
    <!-- header -->
    <el-header style="padding: 0">
      <!-- search -->
      <client-search @goSearch="handleMessage"></client-search>
      <!-- search -->
    </el-header>
    <!-- header -->
    <!-- main -->
    <el-main style="background-color: yellow">
      <el-divider content-position="left">
        <span>共查询到 {{resultCount}} 条结果,查询关键字：『 {{search}} 』</span>
      </el-divider>
      <div v-if="resultCount === 0">
        <el-empty ></el-empty>
      </div>
      <div v-if="resultCount !== 0">
        <el-table
          :data="searchBooks"
          style="width: 100%">
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
      </div>
    </el-main>
  </el-container>
</template>
<script>
import ClientSearch from '../../components/client_components/client-search.vue'
import {setCart} from '../../api/cart_storage'
import {getUser} from '../../api/storage'

export default {
  data () {
    return {
      searchBooks: [{
        id: 0,
        book_name: '',
        category_name: '',
        publisher: '',
        author: '',
        introduce: '',
        price: 0,
        pdate: '',
        pic_url: ''
      }],
      resultCount: 0,
      search: '',
      single: false
    }
  },
  mounted () {
    this.getBookSearch()
  },
  components: {
    ClientSearch
  },
  watch: {
    single: {
      handler (val) {
        if (val === true) {
          this.getBookSearch()
          this.single = false
        }
      }
    }
  },
  methods: {
    handleAddCart (bookID) {
      this.$api.post('api/client/carts/add/' + bookID).then(response => {
        if (response.message === 'OK') {
          setCart(getUser().id, bookID, 1)
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
    getBookSearch () {
      this.search = this.$route.query.bookName
      this.$api.get('api/client/books/search/' + this.search).then(response => {
        if (response.message === 'OK') {
          if (response.err_code === 100201) {
            this.searchBooks = null
            this.$message({
              type: 'info',
              message: response.data
            })
          } else {
            this.searchBooks = response.data.books
            this.resultCount = response.data.resultCount
          }
        }
      })
    },
    handleMessage (message) {
      this.single = message
    },
    goDetail (name) {
      this.$router.push({name: 'ClientShowDetail', query: {bookName: name}})
    }
  }
}
</script>
<style scoped>
</style>
