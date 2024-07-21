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
        <div v-for="single in bookCart" :key="single"
             style="margin-bottom: 20px">
          <el-card>
            <span>{{single.book_name}}</span>
            <el-divider></el-divider>
            <el-input></el-input>
          </el-card>
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>金额支付</el-card>
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
        True_name: '',
        Pay_way: '',
        Address: '',
        Phone: '',
        Notes: '',
        Books: [{
          Book_id: 0,
          Amount: 1
        }]
      }
    }
  },
  mounted () {
    this.getBaseMessage()
  },
  methods: {
    getBaseMessage () {
      this.orderSubmit.True_name = getUser().true_name
      this.orderSubmit.Phone = getUser().phone
      this.orderSubmit.Address = getUser().address
    }
  }
}
</script>
<style scoped>
</style>
