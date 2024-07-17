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
      <div v-for="category in categories" :key="category">
        <el-tabs type="border-card" >
          <el-tab-pane :label="category.name">
            <el-table
              :data="category.books"
              style="width: 100%">
              <el-table-column
                label="书名" align="left"
                width="200px">
                <template slot-scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
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
                    @click="handleAddCart(scope.$index, scope.row)">
                    加入购物车
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-main>
    <!-- main -->
  </el-container>
</template>

<script>
import ClientSearch from '../../../components/client_components/client-search.vue'
export default {
  data () {
    return {
      baseURL: 'api/client/books/by-is_new_book/12',
      categories: [{
        category_id: 0,
        name: '123',
        books: [
          {
            id: 0,
            book_name: '',
            publisher: ''
          }
        ]
      }, {
        category_id: 0,
        name: '456',
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
  },
  methods: {
    handleAddCart (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style scoped>
</style>
