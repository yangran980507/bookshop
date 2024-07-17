<template>
  <el-container>
    <el-header style="text-align: left;padding: 0" height="100px">
          <el-image :src="cartImg[0]" fit="scale-down"
                    style="width: 100px;height: 100px;"></el-image>
    </el-header>
    <el-divider></el-divider>
    <el-main style="padding: 0">
       <component :is="isLoad"></component>
    </el-main>
  </el-container>
</template>
<script>
import ClientUnload from '../../../components/client_components/client-unload.vue'
import ClientCarts from '../../../components/client_components/Client-carts.vue'
import {getToken} from '../../../api/storage'

export default {
  data () {
    return {
      cartImg: [require('@/assets/30.jpg')],
      isLoad: ''
    }
  },
  components: {ClientUnload, ClientCarts},
  created () {
    this.selectView()
  },
  watch: {
    message: {
      handler (val) {
        if (val === false) {
          this.isLoad = 'ClientUnload'
        } else if (val === true) {
          this.isLoad = 'ClientCarts'
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
        this.isLoad = 'ClientCarts'
      }
    }
  }
}
</script>
<style scoped>
</style>
