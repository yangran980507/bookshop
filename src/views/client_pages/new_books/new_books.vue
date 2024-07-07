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
   <el-main style="background-color: yellow">
         <el-table
           :data="newBookData"
           style="width: 100%">
           <el-table-column
             label="书名" align="left"
             width="200px">
             <template slot-scope="scope">
               <span style="margin-left: 10px">{{ scope.row.book_name }}</span>
             </template>
           </el-table-column>
           <el-table-column
             label="出版社" align="left" width="200px">
             <template slot-scope="scope">
               <span style="margin-left: 10px">{{ scope.row.publisher }}</span>
             </template>
           </el-table-column>
           <el-table-column label="购买" align="center" width="200px">
             <template slot-scope="scope">
               <el-button
                 size="mini" icon="el-icon-plus"
                 @click="handleAddCart(scope.$index, scope.row)">
                 加入购物车
               </el-button>
             </template>
           </el-table-column>
         </el-table>
       <el-row style="margin-top: 30px">
         <el-col :span="12" :offset="12">
           <el-button-group>
             <el-button size="mini" @click="getBooks(pages.FirstPageURL)">首页</el-button>
             <el-button icon="el-icon-arrow-left" size="mini" @click="getBooks(pages.PrevPageURL)">上一页</el-button>
             <el-button size="mini">{{pages.CurrentPage}}</el-button>
             <el-button size="mini" @click="getBooks(pages.NextPageURL)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
             <el-button size="mini" @click="getBooks(pages.LastPageURL)">末页</el-button>
           </el-button-group>
         </el-col>
       </el-row>
   </el-main>
   <!-- main -->
 </el-container>
</template>

<script>
import ClientSearch from '../../../components/client_components/client-search.vue'
export default {
  data () {
    return {
      baseURL: 'api/client/books/by-is_new_book/12',
      newBookData: [{
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
      }],
      pages: {
        CurrentPage: 1,
        PrevPageURL: this.baseURL,
        NextPageURL: this.baseURL,
        FirstPageURL: this.baseURL,
        LastPageURL: this.baseURL
      }
    }
  },
  components: {
    ClientSearch
  },
  mounted () {
    this.getBooks(this.baseURL)
  },
  methods: {
    handleAddCart (index, row) {
      console.log(index, row)
    },
    getBooks (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.newBookData = response.data.books
          this.pages = response.data.page
        }
      })
    }
  }
}
</script>
