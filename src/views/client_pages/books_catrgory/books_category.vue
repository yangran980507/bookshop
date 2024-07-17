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
        <el-tabs type="border-card">
          <el-tab-pane :label="category.name"
                       v-for="category in categories"
                        :key="category">
            <el-table
              :data="category.books"
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
          </el-tab-pane>
        </el-tabs>
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
      baseURL: 'api/client/books/by-category',
      categories: [{
        category_id: 0,
        name: '',
        books: [
          {
            id: 0,
            book_name: '',
            publisher: ''
          }
        ]
      }]
    }
  },
  components: {
    ClientSearch
  },
  mounted () {
    this.getCategories(this.baseURL)
  },
  methods: {
    getCategories (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.categories = response.data.categories
        }
      })
    },
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
    goDetail (name) {
      this.$router.push({name: 'ClientShowDetail', query: {bookName: name}})
    }
  }
}
</script>
<style scoped>
</style>
