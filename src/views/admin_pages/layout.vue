<template>
    <el-container class="el-container">
      <!-- header -->
      <el-header class="header" height="40px">
          <el-col :span="18"><div class="grid-content bg-blue">图书管理系统</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple">管理员{{admin}}</div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple">
            <el-link type="info" @click="returnLogin">退出到前台</el-link>
          </div></el-col>
          <el-col :span="2"><div class="grid-content bg-purple">
            <el-link type="info" @click="returnLogin">退出登录</el-link>
          </div></el-col>
      </el-header>
      <!-- body -->
      <el-container class="body">
        <!-- 侧边栏导航 -->
        <el-aside class="aside" width="220px">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#BDB76B"
                text-color="#fff"
                active-text-color="#ffd04b">
                <el-menu-item @click="goUsers">
                  <i class="el-icon-user-solid"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-notebook-1"></i>
                    <span>图书管理</span>
                  </template>
                  <el-menu-item @click="goBooksIn">
                    <i class="el-icon-document-add"></i>
                    <span>图书入库</span>
                  </el-menu-item>
                  <el-menu-item @click="goBooksUpdate">
                    <i class="el-icon-edit"></i>
                    <span>图书修改</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item @click="goPolls">
                  <i class="el-icon-s-data"></i>
                  <span slot="title">投票管理</span>
                </el-menu-item>
                <el-menu-item @click="goNotices">
                  <i class="el-icon-s-promotion"></i>
                  <span slot="title">公告管理</span>
                </el-menu-item>
                <el-menu-item @click="goOrders">
                  <i class="el-icon-s-order"></i>
                  <span slot="title">定单管理</span>
                </el-menu-item>
              </el-menu>
        </el-aside>
        <!-- 主页面 -->
        <el-main class="main">
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>

export default {
  data () {
    return {
      admin: ''
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    returnLogin () {
      this.$router.push({name: 'AdminLogin'})
    },
    goUsers () {
      this.$router.push({name: 'UserFrozen'})
    },
    goBooksIn () {
      this.$router.push({name: 'BookAdd'})
    },
    goBooksUpdate () {
      this.$router.push({name: 'BookUpdate'})
    },
    goPolls () {
      this.$router.push({name: 'PollAdd'})
    },
    goNotices () {
      this.$router.push({name: 'NoticeDelete'})
      this.$refs.childNotice.getNotices()
    },
    goOrders () {
      this.$router.push({name: 'OrderExecute'})
    }
  }
}
</script>

<style scoped>
.el-header {
  width: 100%;
  background: #deb887;
  padding-bottom: 10px;
}
.el-aside {
  width: 240px;
  color: #333;
  text-align: center;
  line-height: 540px;
}
.el-menu {
  height: 540px;
}
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
}
body {
  margin-bottom: 10px;
}
.bg-purple {
  text-align: right;
 font-size: small;
  padding-top: 15px;
}
.bg-blue {
  text-align: left;
  padding-top: 4px;
  font-size: 22px;
 font-weight: bold;
  text-indent: 10px;
  color: white;
}
.grid-content {
  padding-bottom: 8px;
  min-height: 32px;
}
</style>
