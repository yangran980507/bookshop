<template>
  <div>
    <div v-if="empty === true">
      <el-empty description="暂无订单"></el-empty>
    </div>
    <div v-if="empty === false">
      <el-row>
        <el-table
          :data="ordersData"
          style="width: 100%"
          border
          size="mini"
          height="500">
          <!-- 序号 -->
          <el-table-column
            label="序号"
            width="50" align="center">
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
              <el-popover trigger="hover" placement="top">
                <p>联系电话: {{ scope.row.phone }}</p>
                <p>邮寄地址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.login_name }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 用户名 -->
          <!-- 支付方式 -->
          <el-table-column
            label="支付方式"
            width="140" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.pay_way }}</span>
            </template>
          </el-table-column>
          <!-- 支付方式 -->
          <!-- 运送方式 -->
          <el-table-column
            label="运送方式"
            width="140" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.carry }}</span>
            </template>
          </el-table-column>
          <!-- 运送方式 -->
          <!-- 订书日期 -->
          <el-table-column
            label="订书日期"
            width="100" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ formatDateToSecond(scope.row.date) }}</span>
            </template>
          </el-table-column>
          <!-- 订书日期 -->
          <!-- 订单状态 -->
          <el-table-column
            label="订单状态"
            width="120" align="center">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.enforce }}</span>
            </template>
          </el-table-column>
          <!-- 订单状态 -->
          <!-- 操作 -->
          <el-table-column label="操作" fixed="right" align="center">
            <template slot-scope="scope">
              <div>
              <el-row >
                <el-col :span="18">
                      <el-select v-model="value[scope.$index]" size="mini" clearable
                                 placeholder="请选择操作项" style="float: left">
                        <el-option
                          v-for="(item,index) in options"
                          :key="index"
                          :value="item">
                    <span style="float: right; color: #8492a6; font-size: 13px">
                      {{ item }}</span>
                        </el-option>
                      </el-select>
              </el-col>
              <el-col :span="6">
                <el-button
                  size="mini"
                  @click="handleConfirmSubmit(scope.row,scope.$index)">
                  <span>确认</span>
                </el-button>
              </el-col></el-row>
              </div>
            </template>
          </el-table-column>
          <!--  操作 -->
        </el-table>
      </el-row>
    </div>
  </div>
</template>
<script>
import {setOrderDetail} from '../../../api/cart_storage'
import {getUser} from '../../../api/storage'
import {formatDateToSecond} from '../../../api/public'

export default {
  data () {
    return {
      baseURL: '/api/admin/orders',
      empty: true,
      ordersData: [{
        id: 0,
        login_name: '',
        pay_way: '',
        carry: '',
        order_detail_id: 0,
        date: 0,
        refund_explain: '',
        enforce: '',
        address: '',
        phone: ''
      }],
      options: ['已执行', '已取消订单'],
      value: []
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
          if (response.err_code === 100201) {
            this.empty = true
          } else {
            this.empty = false
            this.ordersData = response.data.orders
          }
        }
      })
    },
    handleConfirmSubmit (row, index) {
      this.$api.postSpecial('/api/admin/orders/execute', {
        order_id: row.id,
        enforce: this.value[index]
      }).then(response => {
        if (response.message === 'OK') {
          row.enforce = this.value[index]
          this.$message({
            type: 'success',
            message: response.data
          })
        } else if (response.err_code === 100207) {
          this.$alert('已执行订单状态不可更改')
        } else if (response.err_code === 100003) {
          this.$message({
            type: 'error',
            message: '未选择操作项'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data
          })
        }
      })
    },
    orderDetail (row) {
      setOrderDetail(getUser().id, row)
      this.$router.push({name: 'OrderDetail'})
    }
  }
}
</script>
