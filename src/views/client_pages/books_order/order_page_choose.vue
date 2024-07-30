<template>
  <el-container>
    <el-main style="padding: 0">
      <el-divider content-position="left">我的订单</el-divider>
      <component :is="isLoad"></component>
    </el-main>
  </el-container>
</template>
<script>
import ClientUnload from '../../../components/client_components/client-unload.vue'
import ClientOrders from '../../../components/client_components/client-orders.vue'
import {getToken} from '../../../api/storage'

export default {
  data () {
    return {
      isLoad: ''
    }
  },
  components: {ClientUnload, ClientOrders},
  created () {
    this.selectView()
  },
  watch: {
    message: {
      handler (val) {
        if (val === false) {
          this.isLoad = 'ClientUnload'
        } else if (val === true) {
          this.isLoad = 'ClientOrders'
        }
      }
    }
  },
  props: ['message'],
  methods: {
    selectView () {
      let token = getToken()
      if (token === null) {
        this.isLoad = 'ClientUnload'
      } else {
        this.isLoad = 'ClientOrders'
      }
    }
  }
}
</script>
<style scoped>
</style>
