<template>
  <el-container>
    <!-- header -->
    <el-header style="padding-left: 0;padding-right: 0">
      <!-- search -->
      <client-search></client-search>
      <!-- search -->
    </el-header>
    <!-- header -->
    <!-- main -->
    <el-main  style="padding-left: 0;padding-right: 0">
      <el-row type="flex" justify="left">
        <!-- pic -->
        <el-col :span="10">
          <el-card :shadow="'always'" :body-style="{padding: '0'}">
            <el-image :src="require('@/assets/' + BookDetail.pic_url)"
                      style="width: 100%;height:250px;padding-bottom: 0">
            </el-image>
          </el-card>
        </el-col>
        <!-- pic -->
        <!-- message -->
        <el-col :span="14">
          <el-card shadow="always"
                   style="text-align: left;margin-right: 0;">
            <div slot="header" style="text-align: left;
            font-size: medium;margin-top: 0">
              <span>
                {{BookDetail.book_name}}
              </span>
            </div>
            <div style="color: #8c939d;font-size: smaller;">
              <el-row>
                <el-col :span="6">
                  <span>价格：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: red"><span style="color: white">中</span>￥{{BookDetail.price}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <span>图书分类：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: black"><span style="color: white">中</span>{{BookDetail.category_name}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <span>作者：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: black"><span style="color: white">中</span>{{BookDetail.author}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <span>出版社：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: black"><span style="color: white">中</span>{{BookDetail.publisher}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="6">
                  <span>出版日期：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: black"><span style="color: white">中</span>{{formatDate(BookDetail.pdate)}}</span>
                </el-col>
              </el-row>
              <el-row style="margin-bottom: 9px">
                <el-col :span="6">
                  <span>剩余：</span>
                </el-col>
                <el-col :span="16" :offset="2">
                  <span style="color: black"><span style="color: white">中</span>{{BookDetail.quantity}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="11">
                  <el-input-number v-model="count" size="mini"
                                   @change="handleChange"
                                   :min="1" :max="10">
                  </el-input-number>
                </el-col>
                <el-col :span="7">
                  <el-button size="mini" type="danger" @click="AddCart(BookDetail.id)">加入购物车</el-button>
                </el-col>
                <el-col :span="6">
                  <el-button size="mini" type="primary" @click="goPay">立即购买</el-button>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </el-col>
        <!-- message -->
      </el-row>
      <!-- introduce -->
      <el-row>
        <el-col>
          <el-card>
            <div style="text-align: left;font-size: 16px;">
              <el-tabs>
                <el-tab-pane label="图书简介"></el-tab-pane>
              </el-tabs>
              <div style="font-size: 13px;text-indent: 26px">
                <span>{{BookDetail.introduce}}</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <!-- introduce -->
    </el-main>
    <!-- main -->
  </el-container>
</template>

<script>
import ClientSearch from '../../components/client_components/client-search.vue'
import {setCart} from '../../api/cart_storage'
import {getUser} from '../../api/storage'
import {formatDate} from '../../api/public'

export default {
  data () {
    return {
      BookDetail: {
        id: 0,
        book_name: '',
        category_name: '',
        publisher: '',
        author: '',
        introduce: '',
        price: 0,
        pdate: 0,
        pic_url: '',
        quantity: 0
      },
      count: 0
    }
  },
  mounted () {
    this.getBookDetail()
  },
  components: {
    ClientSearch
  },
  methods: {
    formatDate,
    AddCart (bookID) {
      this.$api.post('/api/client/carts/add/' + bookID).then(response => {
        if (response.message === 'OK') {
          setCart(getUser().id, bookID, this.count)
          this.$message({
            type: 'success',
            message: response.data
          })
        } else if (response.err_code === 100102) {
          this.$message({
            type: 'info',
            message: '请先登录'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data
          })
        }
      })
    },
    getBookDetail () {
      let b = this.$route.query.bookName
      this.$api.get('/api/client/books/' + b).then(response => {
        if (response.message === 'OK') {
          if (response.err_code === 100204) {
            this.$message({
              type: 'info',
              message: response.data
            })
          } else {
            this.BookDetail = response.data.book
          }
        }
      })
    },
    handleChange (val) {
    },
    goPay () {
      let user = getUser()
      if (user === null) {
        this.$message({
          type: 'info',
          message: '请先登录'
        })
        return
      }
      this.$router.push({name: 'DirectSubmit',
        query: {data: JSON.stringify({'book': this.BookDetail, 'Amount': this.count})}})
    }
  }
}
</script>
<style scoped>
</style>
