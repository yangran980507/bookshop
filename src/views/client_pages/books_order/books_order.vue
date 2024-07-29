<template>
  <div>
    <el-divider content-position="left">我的订单</el-divider>
    <div v-if="empty">
      <el-empty description="暂无订单"></el-empty>
    </div>
    <div v-if="empty === false">
      <el-table
        :data="ordersData"
        style="width: 100%"
        border
        size="mini">
        <!-- 序号 -->
        <el-table-column
          label="序号"
          width="50" align="left">
          <template slot-scope="scope">
            <span style="margin-left: 10px">
              <el-button type="text" size="mini" @click="orderDetail(scope.row)">
                {{ scope.$index + 1 }}
                </el-button>
            </span>
          </template>
        </el-table-column>
        <!-- 序号 -->
        <!-- 用户名 -->
        <el-table-column
          label="用户名"
          width="140" align="center">
          <template slot-scope="scope">
              <div slot="reference" class="name-wrapper">
               {{ scope.row.login_name }}
              </div>
          </template>
        </el-table-column>
        <!-- 用户名 -->
        <!-- 付款方式 -->
        <el-table-column
          label="付款方式"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.pay_way }}</span>
          </template>
        </el-table-column>
        <!-- 付款方式 -->
        <!-- 运送方式 -->
        <el-table-column
          label="运送方式"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.carry }}</span>
          </template>
        </el-table-column>
        <!-- 运送方式 -->
        <!-- 定书日期 -->
        <el-table-column
          label="定书日期"
          width="180" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ formatDateToSecond(scope.row.date) }}</span>
          </template>
        </el-table-column>
        <!-- 定书日期 -->
        <!-- 用户名 -->
        <el-table-column
          label="订单状态" fixed="right"
          width="100" align="center">
          <template slot-scope="scope">
            <div slot="reference" class="name-wrapper">
              {{ scope.row.enforce }}
            </div>
          </template>
        </el-table-column>
        <!-- 用户名 -->
      </el-table>
    </div>
  </div>
</template>
<style scoped>
</style>
<script >
import {formatDateToSecond} from '../../../api/public'
import {setOrderDetail} from '../../../api/cart_storage'
import {getUser} from '../../../api/storage'

export default {
  data () {
    return {
      baseURL: 'api/client/orders',
      ordersData: [{
        login_name: '',
        pay_way: '',
        carry: '',
        order_detail_id: 0,
        date: 0,
        refund: false,
        refund_explain: '',
        enforce: ''
      }],
      empty: false
    }
  },
  mounted () {
    this.getOrders(this.baseURL)
  },
  methods: {
    formatDateToSecond,
    getOrders (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.ordersData = response.data.orders
        }
      })
    },
    orderDetail (row) {
      setOrderDetail(getUser().id, row)
      this.$router.push({name: 'BooksOrderDetail'})
    }
  }
}
</script>
