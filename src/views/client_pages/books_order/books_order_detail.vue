<template>
  <div>
    <div v-if="bookHadRemoved === true">
      <el-empty description="图书已下架"></el-empty>
    </div>
    <div v-if="bookHadRemoved === false">
    <el-row type="flex" justify="center">
      <el-col :span="16">
        <el-card shadow="always"
                 style="text-align: left;margin-right: 0;">
          <div slot="header" style="text-align: left;
            font-size: medium;margin-top: 0">
              <span>
                {{book.book_name}}
              </span>
            <el-button size="mini" @click="returnOrderList" type="text"
                       style="float: right">返回</el-button>
          </div>
          <div>
            <el-row style="margin-bottom: 5px">
              <el-col :span="8">
                <el-image :src="require('@/assets/' + book.pic_url)" style="width: 100px;height: 120px"></el-image>
              </el-col>
              <el-col :span="16">
                <div style="color: #8c939d;font-size: smaller;">
                  <el-row>
                    <el-col :span="6">
                      <span>价格：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: red"><span style="color: white">中</span>￥{{book.price}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <span>图书分类：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: black"><span style="color: white">中</span>{{book.category_name}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <span>作者：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: black"><span style="color: white">中</span>{{book.author}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <span>出版社：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: black"><span style="color: white">中</span>{{book.publisher}}</span>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="6">
                      <span>出版日期：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: black"><span style="color: white">中</span>{{formatDate(book.pdate)}}</span>
                    </el-col>
                  </el-row>
                  <el-row style="margin-bottom: 20px">
                    <el-col :span="6">
                      <span>购买数量：</span>
                    </el-col>
                    <el-col :span="16" :offset="2">
                      <span style="color: black"><span style="color: white">中</span>x{{bookAmount.buy_count}}</span>
                    </el-col>
                  </el-row>
                  <el-row v-if="order.enforce === '已取消订单'">
                    <el-col :span="7">
                      <el-tag size="mini" type="info">订单已取消</el-tag>
                    </el-col>
                  </el-row>
                  <el-row v-if="order.enforce !== '已取消订单'">
                    <el-col :span="7">
                      <el-button size="mini" @click="BookRefund">申请售后</el-button>
                    </el-col>
                  </el-row>
                </div>
              </el-col>
            </el-row>
            <!-- 退货理由-->
            <el-row v-if="IsRefund">
              <el-col :offset="8" :span="16">
                <el-form :model="order" :rules="rules" ref="order" >
                  <el-form-item prop="refund_explain" required>
              <el-input size="mini" placeholder="取消订单原因："
                        maxlength="50" show-word-limit
                        type="textarea" v-model="order.refund_explain">
              </el-input>
                  </el-form-item>
                </el-form>
              </el-col>
              <el-button size="mini" @click="BookRefundSubmit('order')"
                         style="float: right">提交申请</el-button>
            </el-row>
            <!-- 退货理由-->
          </div>
        </el-card>
      </el-col>
    </el-row>
    </div>
  </div>
</template>
<script>
import {formatDate} from '../../../api/public'
import {getOrderDetail} from '../../../api/cart_storage'
import {getUser} from '../../../api/storage'

export default {
  data () {
    return {
      baseURL: '/api/client/orders/detail/',
      bookHadRemoved: false,
      IsRefund: false,
      bookAmount: {
        buy_count: 0
      },
      book: {
        book_name: '',
        category_name: '',
        publisher: '',
        author: '',
        price: 0,
        pdate: 0,
        pic_url: ''
      },
      order: {
        id: 0,
        login_name: '',
        pay_way: '',
        carry: '',
        order_detail_id: 0,
        date: 0,
        refund_explain: '',
        enforce: ''
      },
      rules: {
        refund_explain: [
          { required: true, message: '请输入取消订单理由', trigger: 'blur' }
        ]}
    }
  },
  created () {
    this.getOrder()
  },
  mounted () {
    this.getBookMessage(this.baseURL)
  },
  methods: {
    formatDate,
    getOrder () {
      this.order = getOrderDetail(getUser().id)
    },
    getBookMessage (url) {
      this.$api.get(url + this.order.order_detail_id).then(response => {
        if (response.message === 'OK') {
          this.book = response.data.book
          this.bookAmount = response.data.bookAmount
        } else if (response.err_code === 100204) {
          this.bookHadRemoved = true
        }
      })
    },
    BookRefund () {
      this.IsRefund = true
    },
    returnOrderList () {
      this.$router.push({name: 'BooksOrder'})
    },
    BookRefundSubmit (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$api.postSpecial('/api/client/orders/refund', {
            order_id: this.order.id,
            refund_explain: this.order.refund_explain
          }).then(response => {
            if (response.message === 'OK') {
              this.$alert('请求已提交，将尽快处理你的请求,或者可拨打下方联系电话处理!')
            } else if (response.err_code === 100207) {
              this.$alert('订单已执行，可以通过下方联系电话联系管理员处理!')
            } else {
              this.$message({
                type: 'error',
                message: response.data
              })
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
