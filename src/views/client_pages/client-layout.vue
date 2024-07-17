<template>
  <div>
      <el-row type="flex" justify="center">
        <el-col :span="20">
          <el-container id="total-container">
            <!-- header -->
            <el-header>
              <el-row type="flex" justify="right">
                <!-- logoImage -->
                <el-col :span="8">
                  <div class="block">
                    <el-image
                      style="width: 400px; height: 60px" :src="perImg[0]"
                      fit="cover"></el-image>
                  </div>
                </el-col>
                <!-- logoImage -->
                <!-- menu -->
                <el-col :span="16">
                  <el-menu style="width: 100%"
                           mode="horizontal" @select="handleSelect"
                           background-color="#696969" text-color="#f8f8ff">
                    <el-menu-item index="1" @click="goRem">首页</el-menu-item>
                    <el-menu-item index="2" @click="goNew">新书上架</el-menu-item>
                    <el-menu-item index="3" @click="goCategory">图书分类</el-menu-item>
                    <el-menu-item index="4" @click="goSell">销售排行</el-menu-item>
                    <el-menu-item index="5" @click="goCart">购物车</el-menu-item>
                    <el-menu-item index="6" @click="goOrder">订单查询</el-menu-item>
                    <el-menu-item index="7" @click="goAdminLogin">后台管理</el-menu-item>
                  </el-menu>
                </el-col>
                <!-- menu -->
              </el-row>
            </el-header>
            <!-- header -->
            <!-- main -->
            <el-main style="padding-top: 0;padding-bottom: 0">
              <el-container>
                <!-- leftAside -->
                <el-aside width="30%" style="background-color: #b3d8ff;
                color: #333;text-align: center;">
                  <!-- login/person -->
                  <el-container style="margin-bottom: 20px;margin-top: 20px">
                    <el-main style="border-radius: 5px;background-color: white">
                      <component :is="currentComponent"
                                 @login="handleLoginMess" @signOut="handleOutMess">
                      </component>
                    </el-main>
                  </el-container>
                  <!-- login/person -->
                  <!-- notice -->
                  <el-container style="margin-bottom: 20px">
                    <el-main style="border-radius: 5px;background-color: white">
                      <client-notice></client-notice>
                    </el-main>
                  </el-container>
                  <!-- notice -->
                  <!-- poll -->
                  <el-container style="margin-bottom: 20px">
                    <el-main style="border-radius: 5px;background-color: white">
                      <client-poll></client-poll>
                    </el-main>
                  </el-container>
                  <!-- poll -->
                </el-aside>
                <!-- leftAside -->
                <el-main style="background-color: peachpuff;
                margin-bottom: 20px;padding-right: 0">
                  <router-view :message="messFromLogin"></router-view>
                </el-main>
              </el-container>
            </el-main>
            <!-- main -->
            <!-- footer -->
            <el-footer height="60px">
              <el-row class="footer-row">
                <el-divider></el-divider>
                <p>网上图书超市客户服务热线：xxxx - xxxxxxxx xxxxxxx</p>
                <p>本站请使用IE6.0或以上版本2560*1600为最佳显示效果</p>
              </el-row>
            </el-footer>
            <!-- footer -->
          </el-container>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import ClientLogin from '../../components/client_components/client-login.vue'
import ClientPerson from '../../components/client_components/client-person.vue'
import ClientPoll from '../../components/client_components/client-poll.vue'
import ClientNotice from '../../components/client_components/client-notice.vue'
import ClientSearch from '../../components/client_components/client-search.vue'
import { getToken, delToken, delUser } from '../../api/storage'

export default {
  data () {
    return {
      perImg: [require('../../assets/9.jpeg')],
      currentComponent: '',
      messFromLogin: ''
    }
  },
  components: {
    ClientNotice,
    ClientSearch,
    ClientPoll,
    ClientLogin,
    ClientPerson
  },
  watch: {
    messFromLogin: {
      handler (val) {
        if (val === true) {
          this.currentComponent = 'ClientPerson'
        } else if (val === false) {
          this.currentComponent = 'ClientLogin'
        }
      }
    }
  },
  created () {
    this.selectView()
    this.handleLoginMess()
    this.handleOutMess()
  },
  methods: {
    selectView () {
      let token = getToken()
      if (token === null) {
        this.currentComponent = 'ClientLogin'
      } else {
        this.currentComponent = 'ClientPerson'
      }
    },
    handleLoginMess (message) {
      this.messFromLogin = message
    },
    handleOutMess (message) {
      this.messFromLogin = message
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    goRem () {
      this.$router.push({name: 'RecommendedBooks'})
    },
    goNew () {
      this.$router.push({name: 'NewBooks'})
    },
    goSell () {
      this.$router.push({name: 'BooksSell'})
    },
    goOrder () {
      this.$router.push({name: 'BooksOrder'})
    },
    goCategory () {
      this.$router.push({name: 'BooksCategory'})
    },
    goCart () {
      this.$router.push({name: 'ShoppingCart'})
    },
    goAdminLogin () {
      delUser()
      delToken()
      this.$router.push({name: 'AdminLogin'})
    }
  }
}
</script>

<style scoped>
#total-container{
  width: 100%;
  height: 100%;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
  margin: 0;
  padding: 0;
}
.el-main {
  background-color: #E9EEF3;
  color: #333;
}
.el-footer{
  font-size: smaller;
  color: #333;
  text-align: center;
  line-height: 4px;
}
</style>
