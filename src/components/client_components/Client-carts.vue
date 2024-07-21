<template>
  <div>
    <div v-if="empty === true">
      <el-empty description="你的购物车为空"></el-empty>
    </div>
    <div v-if="empty === false">
      <el-row>
        <el-col :span="22">
          <el-button type="text" @click="changeStatus"
                     style="float: right;">
            <span style="color: #8c939d">{{payOrDelete}}</span>
          </el-button>
        </el-col>
      </el-row>
      <el-row :justify="'center'" type="flex">
        <el-col :span="14">
          <div  v-for="(cart, index) in cartData" :key="index">
            <el-checkbox-group v-model="checkedCart" @change="handleCheckedChange">
              <el-card :body-style="{ padding: '10px' }"
                       style="margin-bottom: 10px;padding-bottom: 10px">
                <div slot="header" style="float: left">
                  <el-checkbox :label="cart">
                    <span>《{{cart.book_name}}》</span>
                  </el-checkbox>
                </div>
                <div style="float: left">
                  <el-image :src="cart.pic_url"
                            style="width: 100px; height: 100px;border-radius: 10px"
                            fit="fit"></el-image>
                </div>
                <div style="float: left;margin-left: 10px" >
                  <el-row justify="left" type="flex" style="margin-top: 10px">
                    <span style="font-size: 12px">{{cart.author}}</span></el-row>
                  <el-row justify="left" type="flex" style="margin-top: 10px">
                    <span style="font-size: 12px">{{cart.publisher}}</span></el-row>
                  <el-row justify="left" type="flex" style="margin-top: 10px">
                    <el-col :span="12">
                      <span style="font-size: 12px;color: red">
                        ￥<span style="font-size: 16px">{{cart.price}}</span>
                      </span>
                    </el-col>
                    <el-col :span="12">
                      <el-input-number size="mini" :min="1" :max="10"
                                       @change="handleChange(index,amount[index])"
                                       v-model="amount[index]"></el-input-number>
                    </el-col>
                  </el-row>
                </div>
              </el-card>
            </el-checkbox-group>
          </div>
        </el-col>
      </el-row>
      <el-row :justify="'center'" type="flex">
        <el-col :span="14">
          <el-card :body-style="{ padding: '10px' }" style="padding-bottom: 10px">
            <el-checkbox :indeterminate="isIndeterminate"
                         v-model="checkAll" style="float: left"
                         @change="handleCheckAllChange">全选</el-checkbox>
            <div v-if="payOrDelete === '管理'">
              <span style="font-size: 12px">
              合计：
            </span>
              <span style="font-size: 12px;color: red">￥
              <span style="font-size: 16px">{{ totalAmount }}</span></span>
              <el-button size="mini"
                         type="primary" style="border-radius: 20px;float: right;"
                         @click="goCheckOut">去结算</el-button>
            </div>
            <div v-if="payOrDelete === '完成'" style="float: right">
              <el-button
                size="mini"
                @click="handleDelete"
                style="border-radius: 20px">删除</el-button>
              <el-button
                size="mini"
                @click="handleFlush"
                style="border-radius: 20px">清空购物车</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {getUser} from '../../api/storage'
import {clearCart, delCart, getCart, setCart} from '../../api/cart_storage'

export default {
  data () {
    return {
      // 基础链接
      baseURL: '/api/client/carts',
      // 所有数据
      cartData: [{
        id: 0,
        book_name: '',
        price: 0,
        pic_url: '',
        publisher: '',
        author: ''
      }],
      // 选中数据
      checkedCart: [],
      amount: [],
      empty: true,
      totalAmount: 0,
      checkAll: false,
      isIndeterminate: true,
      payOrDelete: '管理',
      key: 0
    }
  },
  mounted () {
    this.getCarts(this.baseURL)
  },
  watch: {
    key: {
      handler (val) {
        if (val++) {
          this.totalAmount = 0
          for (let i = 0; i < this.checkedCart.length; i++) {
            this.totalAmount += this.amount[i] * this.checkedCart[i].price
          }
        }
      }
    }
  },
  methods: {
    // 获取购物车
    getCarts (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          if (response.err_code === 100201) {
            this.empty = true
          } else {
            this.empty = false
            this.cartData = response.data.cart
            for (let i = 0; i < this.cartData.length; i++) {
              this.amount[i] = getCart(getUser().id, this.cartData[i].id)
            }
          }
        }
      })
    },
    // 结算
    goCheckOut () {
      if (this.checkedCart.length === 0) {
        this.$message({
          type: 'info',
          message: '还没有选择图书'
        })
        return
      }
      this.$router.push({name: 'ClientSubmitOrder'})
    },
    // 删除
    handleDelete () {
      if (this.checkedCart.length === 0) {
        this.$message({
          type: 'info',
          message: '还没有选择图书'
        })
        return
      }
      this.$api.postSpecial('api/client/carts/remove', {
        Books: this.checkedCart
      }).then(response => {
        if (response.message === 'OK') {
          // 成功
          this.$message({
            type: 'success',
            message: response.details
          })
          // 删除本地数量缓存
          for (let i = 0; i < this.checkedCart.length; i++) {
            delCart(getUser().id, this.checkedCart[i].id)
          }
          if (response.data.bookLength === 0) {
            this.empty = true
          }
          this.getCarts(this.baseURL)
          this.checkedCart = []
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
    // 清空
    handleFlush () {
      this.$api.del('api/client/carts/flush').then(response => {
        if (response.message === 'OK') {
          this.empty = true
        }
      })
      clearCart()
    },
    // 重新存入购物车数量
    handleChange (index, val) {
      this.key++
      setCart(getUser().id, this.cartData[index].id, val)
    },
    // 全选
    handleCheckAllChange (val) {
      this.key++
      this.checkedCart = val ? this.cartData : []
      this.isIndeterminate = false
    },
    // 选择
    handleCheckedChange (value) {
      this.key++
      let checkedCount = value.length
      this.checkAll = (checkedCount === this.cartData.length)
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cartData.length
    },
    // 切换管理
    changeStatus () {
      if (this.payOrDelete === '完成') {
        this.payOrDelete = '管理'
      } else if (this.payOrDelete === '管理') {
        this.payOrDelete = '完成'
      }
    }
  }
}
</script>
<style scoped>
</style>
