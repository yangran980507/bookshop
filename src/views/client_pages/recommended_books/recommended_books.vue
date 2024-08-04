<template>
    <!-- main -->
    <el-container>
      <!-- search -->
      <el-header style="border-radius: 5px;padding: 0;" height="40px">
        <client-search></client-search>
      </el-header>
      <!-- search -->
      <!-- main -->
      <el-main style="padding-right: 0;padding-left: 0">
        <el-container>
          <!-- recommend -->
          <el-main style="border-radius: 5px;padding-top: 0;">
            <el-divider content-position="left">推荐图书</el-divider>
            <!-- 容器 flex 布局 -->
            <div style="display: flex;flex-wrap: wrap;
                 justify-content: space-between;
            width: 100%;padding-right: 0;margin-right: 0">
              <!-- 遍历数据 -->
              <div v-for="(book, index) in recommendedBooks"
                   :key="index" style="margin-bottom: 10px">
                <!-- 卡片 -->
                <el-card :body-style="{padding: '0px'}"
                         :shadow="'always'" style="width: 110px">
                  <div>
                    <el-link size="mini" @click="showDetail(book.book_name)" :underline="false">
                    <el-image :src="require('@/assets/' + book.pic_url)" style="width: 100%;
                      height: 120px">
                    </el-image>
                    </el-link>
                  </div>
                  <div style="text-align: center">
                    <el-row>
                      <el-col :span="12">
                        <el-button type="text" @click="showDetail(book.book_name)"
                                   size="small" style="padding: 0;color: #f08080">
                          ￥{{ book.price }}</el-button>
                      </el-col>
                      <el-col :span="12">
                        <el-button type="text" @click="AddCart(book.id)" icon="el-icon-shopping-cart-2"
                                   size="medium" style="padding: 0">
                        </el-button>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </div>
            </div>
            <el-row style="margin-top: 30px">
              <el-col :span="12" :offset="12">
                <el-button-group>
                  <el-button icon="el-icon-arrow-left" size="mini" @click="getBooks(pages.PrevPageURL)"></el-button>
                  <el-button size="mini">{{pages.CurrentPage}}</el-button>
                  <el-button size="mini" @click="getBooks(pages.NextPageURL)"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-button-group>
              </el-col>
            </el-row>
          </el-main>
          <!-- recommend -->
      <!-- rightAside -->
          <el-aside width="37%" style="border-radius: 5px">
            <!-- newBook -->
           <el-container style="margin-top: 0">
             <el-main style="margin-bottom: 20px;padding: 0;border-radius: 5px">
               <client-new></client-new>
             </el-main>
           </el-container>
            <!-- newBook -->
            <el-container>
              <el-main style="margin-bottom: 20px;padding: 0;border-radius: 5px">
               <client-sell></client-sell>
              </el-main>
            </el-container>
          </el-aside>
      <!-- rightAside -->
        </el-container>
      </el-main>
      <!-- main -->
    </el-container>
    <!-- main -->
</template>
<script>
import ClientSearch from '../../../components/client_components/client-search.vue'
import ClientNew from '../../../components/client_components/client-newbook.vue'
import ClientSell from '../../../components/client_components/client-sell.vue'
import {setCart} from '../../../api/cart_storage'
import {getUser} from '../../../api/storage'

export default {
  data () {
    return {
      baseURL: '/api/client/books/by-recommended/12',
      recommendedBooks: [{
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
        NextPageURL: this.baseURL
      }
    }
  },
  components: {
    ClientSearch,
    ClientNew,
    ClientSell
  },
  mounted () {
    this.getBooks(this.baseURL)
  },
  methods: {
    getBooks (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.recommendedBooks = response.data.books
          this.pages = response.data.page
        }
      })
    },
    showDetail (key) {
      this.$router.push({name: 'ClientShowDetail',
        query: {bookName: key}})
    },
    AddCart (bookID) {
      this.$api.post('/api/client/carts/add/' + bookID).then(response => {
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
    }
  }
}
</script>
<style scoped>
.el-aside {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
</style>
