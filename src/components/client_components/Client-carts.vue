<template>
  <div>
    <el-table
      :data="cartData" show-summary
      style="width: 100%;padding-left: 0"
      size="mini">
      <!-- 序号 -->
      <el-table-column
        label="序号"
        width="50" align="left">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <!-- 序号 -->
      <!-- 书名 -->
      <el-table-column
        label="书名"
        width="210">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
        </template>
      </el-table-column>
      <!-- 书名 -->
      <!-- 价格 -->
      <el-table-column
        label="单价" align="center"
        width="80">
        <template slot-scope="scope">
          <span style="margin-left: 10px">￥{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <!-- 价格 -->
      <!-- 数量 -->
      <el-table-column
        label="数量" prop="amount" align="center"
        width="60">
        <template slot-scope="scope">
          <span>{{ scope.row.amount }}</span>
        </template>
      </el-table-column>
      <!-- 数量 -->
      <!-- 总价 -->
      <el-table-column
        label="总价" align="center" prop="totalAmount"
        width="80">
        <template slot-scope="scope">
          <span>￥{{ getSum(scope.row) }}</span>
        </template>
      </el-table-column>
      <!-- 总价 -->
      <el-table-column align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button icon="el-icon-minus" size="mini" @click="sub(scope.row.amount)"></el-button>
            <el-button icon="el-icon-plus" size="mini" @click="add(scope.row.amount)"></el-button>
            <el-button
              size="mini"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"></el-button>
            <el-button size="mini" @click="goCheckOut">结算</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <el-row style="margin-top: 20px;padding-left: 0;" type="flex" justify="center">
      <el-col>
        <el-button-group>
          <el-button size="mini" type="primary" plain @click="goCheckOut">结算</el-button>
          <el-button
            size="mini" type="danger" plain
            @click="handleDelete(scope.$index, scope.row)">清空购物车</el-button>
        </el-button-group>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import {getUser} from '../../api/storage'
import {getCart} from '../../api/cart_storage'

export default {
  data () {
    return {
      baseURL: '/api/client/carts',
      cartData: [{
        id: 0,
        book_name: '',
        publisher: '',
        author: '',
        price: 0,
        amount: 0,
        totalAmount: 0
      }]
    }
  },
  mounted () {
    this.getCarts(this.baseURL)
  },
  watch: {
    cartData: {
      handler (val) {
      },
      deep: true
    }
  },
  methods: {
    getCarts (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.cartData = response.data.cart
          for (let i = 0; i < this.cartData.length; i++) {
            this.cartData[i].amount = Number(getCart(getUser().id, this.cartData[i].id))
          }
        }
      })
    },
    getSum (row) {
      row.totalAmount = row.amount * row.price
      return row.totalAmount
    },
    goCheckOut () {
      this.$router.push({name: 'ClientSubmitOrder'})
    },
    add (amount) {
      amount = amount + 1
      console.log(amount)
    },
    sub (amount) {
      amount--
      console.log(amount)
    },
    handleDelete (index, row) {
      this.$api.del('api/client/carts/remove/' + index).then(response => {
        if (response.message === 'OK') {
          this.$message({
            type: 'success',
            message: response.data
          })
          this.getCarts(this.baseURL)
        } else if (response.err_code === 100102) {
          this.$message({
            type: 'info',
            message: '登录后重试'
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
</style>
