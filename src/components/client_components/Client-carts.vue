<template>
  <div>
    <div v-if="empty === true">
      <el-empty description="你的购物车为空"></el-empty>
    </div>
    <div v-if="empty === false">
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
              @click="handleFlush">清空购物车</el-button>
          </el-button-group>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {getUser} from '../../api/storage'
import {clearCart, delCart, getCart} from '../../api/cart_storage'

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
      }],
      empty: true
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
          if (response.err_code === 100201) {
            this.empty = true
          } else {
            this.empty = false
            this.cartData = response.data.cart
            for (let i = 0; i < this.cartData.length; i++) {
              this.cartData[i].amount = Number(getCart(getUser().id, this.cartData[i].id))
            }
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
      console.log(localStorage)
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
            message: response.details
          })
          if (response.data.bookLength === 0) {
            this.empty = true
          }
          delCart(getUser().id, row.id)
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
    },
    handleFlush () {
      this.$api.del('api/client/carts/flush').then(response => {
        if (response.message === 'OK') {
          this.empty = true
        }
      })
      clearCart()
    }
  }
}
</script>
<style scoped>
</style>
