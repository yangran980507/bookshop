<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-divider content-position="left">订单提交</el-divider>
    <!-- 个人信息 -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>
          <el-row type="flex" justify="left">
            <el-input size="mini" v-model="orderSubmit.Address">
              <template slot="prepend">收货地址：</template>
            </el-input>
          </el-row>
          <el-row type="flex" justify="left" :gutter="10" style="margin-top: 3px">
            <el-col :span="12">
              <el-input size="mini" v-model="orderSubmit.Login_name">
                <template slot="prepend">收件人：</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input size="mini" v-model="orderSubmit.Phone">
                <template slot="prepend">联系电话：</template>
              </el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 订单信息 -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <div style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '10px' }"
                   style="margin-bottom: 10px;padding-bottom: 10px">
            <div style="float: left">
              <el-image :src="require('@/assets/' + orderSubmit.Books[0].pic_url)"
                        style="width: 100px; height: 100px;border-radius: 10px"
                        fit="fit"></el-image>
            </div>
            <div style="float: left;margin-left: 10px" >
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">《{{orderSubmit.Books[0].book_name}}》</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">{{orderSubmit.Books[0].author}}</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">{{orderSubmit.Books[0].publisher}}</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <el-col :span="12">
                      <span style="font-size: 12px;color: red">
                        ￥<span style="font-size: 16px">{{orderSubmit.Books[0].price}}</span>
                      </span>
                </el-col>
                <el-col :span="4" :offset="8">
                  <span style="font-size: 14px;color: #8c939d">x{{ orderSubmit.Books[0].Amount }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <!-- 支付信息 -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>
          <el-row type="flex" justify="left">
            <el-col :span="12">
              <el-select v-model="orderSubmit.Carry"
                         clearable placeholder="请选择邮寄方式">
                <el-option
                  v-for="(item,index) in carryOptions"
                  :key="index"
                  :value="item.val">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-select v-model="orderSubmit.Pay_way"
                         clearable placeholder="请选择支付方式">
                <el-option
                  v-for="(item,index) in payOptions"
                  :key="index"
                  :value="item.val">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <el-row type="flex" justify="center" style="margin-top: 5px">
            <el-col :span="23">
              <el-input size="mini" placeholder="留言：" maxlength="50" show-word-limit
                        type="textarea" v-model="orderSubmit.Notes">
              </el-input>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
    <!-- 订单提交 -->
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>
          <el-row>
            <el-col :span="11" :offset="1">
              <div style="float: left">
              <span style="color: red">￥
          <span style="font-size: 20px">{{totalAmount}}
          </span></span>
              </div>
            </el-col>
            <el-col :span="11">
              <el-button size="mini"
                         type="danger" style="border-radius: 20px;float: right;"
                         @click="OrdersSubmit">提交订单</el-button>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getUser} from '../../../api/storage'

export default {
  data () {
    return {
      orderSubmit: {
        Login_name: '',
        Pay_way: '',
        Carry: '',
        Address: '',
        Phone: '',
        Notes: '',
        Books: [{
          id: 0,
          book_name: '',
          price: 0,
          pic_url: '',
          publisher: '',
          author: '',
          Amount: 0
        }]
      },
      totalAmount: 0,
      payOptions: [{
        val: '银行卡支付'
      }, {
        val: '微信支付'
      }, {
        val: '支付宝支付'
      }],
      carryOptions: [{
        val: '普通邮寄'
      }, {
        val: '特快邮寄'
      }, {
        val: 'EMS专递'
      }]
    }
  },
  mounted () {
    this.getBaseMessage()
  },
  methods: {
    getBaseMessage () {
      let user = getUser()
      this.orderSubmit.Login_name = user.login_name
      this.orderSubmit.Phone = user.phone
      this.orderSubmit.Address = user.address
      this.orderSubmit.Books[0].id = JSON.parse(String(this.$route.query.data)).book.id
      this.orderSubmit.Books[0].book_name = JSON.parse(String(this.$route.query.data)).book.book_name
      this.orderSubmit.Books[0].price = JSON.parse(String(this.$route.query.data)).book.price
      this.orderSubmit.Books[0].author = JSON.parse(String(this.$route.query.data)).book.author
      this.orderSubmit.Books[0].publisher = JSON.parse(String(this.$route.query.data)).book.publisher
      this.orderSubmit.Books[0].pic_url = JSON.parse(String(this.$route.query.data)).book.pic_url
      this.orderSubmit.Books[0].Amount = JSON.parse(String(this.$route.query.data)).Amount
      this.totalAmount = this.orderSubmit.Books[0].Amount * this.orderSubmit.Books[0].price
    },
    OrdersSubmit () {
      this.$api.postSpecial('/api/client/orders/direct-submit',
        this.orderSubmit).then(response => {
        if (response.message === 'OK') {
          this.$message({
            type: 'success',
            message: response.data
          })
          this.$router.push({name: 'BooksOrder'})
        } else if (response.err_code === 100101) {
          let val = Object.keys(response.data).map(key => {
            return response.data[key]
          })
          this.$message({
            type: 'error',
            message: val + ''
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data
          })
          this.$router.push({name: 'Home'})
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
