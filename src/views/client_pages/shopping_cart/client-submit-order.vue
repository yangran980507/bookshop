<template>
  <div>
    <el-divider content-position="left">订单提交</el-divider>
    <el-row type="flex" justify="center" style="margin-bottom: 20px">
      <el-col :span="18">
        <el-card>收货信息</el-card>
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
export default {
  data () {
    return {
      bookCart: [{
        id: 0,
        book_name: 'ASP工程应用与项目实践 ',
        publisher: ' 机械工业出版社 ',
        author: ' 陈威、白伟明、李楠 ',
        price: 42.0,
        amount: 2,
        totalAmount: ''
      }, {
        id: 0,
        book_name: 'ASP工程应用与项目实践 ',
        publisher: ' 机械工业出版社 ',
        author: ' 陈威、白伟明、李楠 ',
        price: 41.0,
        amount: 2,
        totalAmount: ''
      }]
    }
  }
}
</script>
<style scoped>
</style>
