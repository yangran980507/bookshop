<template>
  <el-row>
    <el-col :span="18"><div class="grid-content bg-purple">图书管理系统</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">管理员{{admin}}</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">退出到前台</div></el-col>
    <el-col :span="2"><div class="grid-content bg-purple">退出登录</div></el-col>
  </el-row>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      admin: '',
      api: {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
</script>

<style>
  .bg-purple {
  background: skyblue;
}
  .grid-content {
    padding-top: 8px;
    text-align: left;
    text-indent: 20px;
    min-height: 32px;
}
</style>
