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
                  <el-image :src="book.pic_url" style="width: 100px;height: 120px"></el-image>
                </el-col>
                <el-col :span="16">
                  <div style="color: #8c939d;font-size: smaller;">
                    <el-row>
                      <el-col :span="6">
                        <span>价格：</span>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <span style="color: black"><span style="color: white">中</span>￥{{book.price}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <span>用户：</span>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <span style="color: black"><span style="color: white">中</span>{{order.login_name}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <span>联系电话：</span>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <span style="color: black"><span style="color: white">中</span>{{order.phone}}</span>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <span>邮寄地址：</span>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <span style="color: black"><span style="color: white">中</span>{{order.address}}</span>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px">
                      <el-col :span="6">
                        <span>购买数量：</span>
                      </el-col>
                      <el-col :span="16" :offset="2">
                        <span style="color: black"><span style="color: white">中</span>x{{bookAmount.buy_count}}</span>
                      </el-col>
                      <!-- 退货理由-->
                      <el-row v-if="order.enforce === '申请取消'">
                        <el-col :span="6">
                          <span>取消订单理由：</span>
                        </el-col>
                        <el-col :span="16" :offset="2">
                          <span style="color: black"><span style="color: white">中</span>{{order.refund_explain}}</span>
                        </el-col>
                      </el-row>
                      <!-- 退货理由-->
                      <!-- 订单状态-->
                      <!-- 已取消订单-->
                    </el-row>
                    <el-row v-if="order.enforce === '已取消订单'">
                      <el-col :span="7">
                        <el-tag size="small" type="danger">已取消订单</el-tag>
                      </el-col>
                    </el-row>
                    <!-- 已执行-->
                    <el-row v-if="order.enforce === '已执行'">
                      <el-col :span="7">
                        <el-tag size="small" type="success">已执行</el-tag>
                      </el-col>
                    </el-row>
                    <!-- 申请取消-->
                    <el-row v-if="order.enforce === '申请取消'">
                      <el-col :span="7">
                        <el-tag size="small" type="warning">申请取消</el-tag>
                      </el-col>
                    </el-row>
                    <!-- 已提交-->
                    <el-row v-if="order.enforce === '已提交'">
                      <el-col :span="7">
                        <el-tag size="small" type="">已提交</el-tag>
                      </el-col>
                    </el-row>
                    <!-- 订单状态-->
                  </div>
                </el-col>
              </el-row>
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
      baseURL: 'api/client/orders/detail/',
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
        enforce: '',
        phone: '',
        address: ''
      }
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
    returnOrderList () {
      this.$router.push({name: 'OrderExecute'})
    }
  }
}
</script>
