<template>
  <el-container>
    <!-- header -->
    <el-header>
      <!-- search -->
      <client-search></client-search>
      <!-- search -->
    </el-header>
    <!-- header -->
    <!-- main -->
    <el-main>
      <el-row type="flex" justify="left">
        这里是图书详细信息
      </el-row>
    </el-main>
    <!-- main -->
  </el-container>
</template>

<script>
import ClientSearch from '../../components/client_components/client-search.vue'
export default {
  data () {
    return {
      BookDetail: {
        id: 0,
        book_number: '',
        book_name: '',
        category_name: '',
        publisher: '',
        author: '',
        introduce: '',
        price: 0,
        pdate: 0,
        pic_url: '',
        is_new_book: false,
        is_commended: false,
        is_new_book_column: '',
        is_commended_column: '',
        in_time: 0,
        quantity: 0,
        sold: 0
      }
    }
  },
  components: {
    ClientSearch
  }
}
</script>
