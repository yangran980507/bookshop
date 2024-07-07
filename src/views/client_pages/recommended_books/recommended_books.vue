<template>
    <!-- main -->
    <el-container>
      <!-- search -->
      <el-header style="border-radius: 5px;padding-bottom: 0;
      background-color: #B3C0D1" height="40px">
        <client-search></client-search>
      </el-header>
      <!-- search -->
      <!-- main -->
      <el-main style="background-color: yellow;padding-right: 0;padding-left: 0">
        <el-container>
          <!-- recommend -->
          <el-main style="border-radius: 5px;margin-right: 20px;
            background-color: pink">
            main
          </el-main>
          <!-- recommend -->
      <!-- rightAside -->
          <el-aside width="37%" style="border-radius: 5px;background-color: gold">
            <!-- newBook -->
           <el-container style="margin-top: 0">
             <el-main style="margin-bottom: 20px;padding: 0;border-radius: 5px">
               <client-new></client-new>
             </el-main>
           </el-container>
            <!-- newBook -->
            <el-container>
              <el-main style="margin-bottom: 20px;padding: 0;border-radius: 5px">
               <client-sell></client-sell>
              </el-main>
            </el-container>
          </el-aside>
      <!-- rightAside -->
        </el-container>
      </el-main>
      <!-- main -->
    </el-container>
    <!-- main -->
</template>
<script>
import ClientSearch from '../../../components/client_components/client-search.vue'
import ClientNew from '../../../components/client_components/client-newbook.vue'
import ClientSell from '../../../components/client_components/client-sell.vue'
export default {
  data () {
    return {
      name: ''
    }
  },
  components: {
    ClientSearch,
    ClientNew,
    ClientSell
  }
}
</script>
<style scoped>
.el-aside {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
}
</style>
