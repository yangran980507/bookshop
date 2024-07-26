<template xmlns:el-col="http://www.w3.org/1999/html">
  <div>
    <el-divider content-position="left">订单提交</el-divider>
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
                <el-input size="mini" v-model="orderSubmit.True_name">
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
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <div v-for="(single, index) in orderSubmit.Books" :key="index"
             style="margin-bottom: 20px">
          <el-card :body-style="{ padding: '10px' }"
                   style="margin-bottom: 10px;padding-bottom: 10px">
            <div style="float: left">
              <el-image :src="single.pic_url"
                        style="width: 100px; height: 100px;border-radius: 10px"
                        fit="fit"></el-image>
            </div>
            <div style="float: left;margin-left: 10px" >
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">《{{single.book_name}}》</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">{{single.author}}</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <span style="font-size: 12px">{{single.publisher}}</span></el-row>
              <el-row justify="left" type="flex" style="margin-top: 10px">
                <el-col :span="12">
                      <span style="font-size: 12px;color: red">
                        ￥<span style="font-size: 16px">{{single.price}}</span>
                      </span>
                </el-col>
                <el-col :span="4" :offset="8">
                  <span style="font-size: 14px;color: #8c939d">x{{ single.Amount }}</span>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
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
import {getOrders, getCart, flushOrders} from '../../../api/cart_storage'

export default {
  data () {
    return {
      orderSubmit: {
        True_name: '',
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
      totalAmount: 0
    }
  },
  mounted () {
    this.getBaseMessage()
  },
  methods: {
    getBaseMessage () {
      let user = getUser()
      this.orderSubmit.True_name = user.true_name
      this.orderSubmit.Phone = user.phone
      this.orderSubmit.Address = user.address
      this.orderSubmit.Books = getOrders(user.id)
      for (let i = 0; i < this.orderSubmit.Books.length; i++) {
        this.orderSubmit.Books[i].Amount = getCart(user.id, this.orderSubmit.Books[i].id)
        this.totalAmount += this.orderSubmit.Books[i].Amount * this.orderSubmit.Books[i].price
      }
    },
    OrdersSubmit () {
      this.$api.postSpecial('/api/client/orders/submit',
        this.orderSubmit).then(response => {
        if (response.message === 'OK') {
          this.$message({
            type: 'success',
            message: response.data
          })
          flushOrders(getUser().id)

        }
      })
    }
  }
}
</script>
<style scoped>
</style>
