<template>
  <div>
    <el-header height="50px"
               style="background-color: white;border-top-style: outset;
                border-width: 2px;border-color: #3a8ee6;
                border-bottom-style: groove;border-bottom-color: #f5f5f5;
                border-bottom-width: 1px">
      <div style="text-align: center;padding-top: 12px">
        <i class="el-icon-s-data"></i>
        <span>销售排行</span>
      </div>
    </el-header>
    <el-main style="background-color: white">
      <el-row style="text-align: left;margin-bottom: 2px;">
        <el-col :span="5">
          <el-link @click="getDetails(books[0].book_name)" :underline="false">
            <el-image style="width: 35px;height: 35px;border-radius: 2px"
                      :src=img[0] fit="'scale-down'"></el-image>
          </el-link>
        </el-col>
        <el-col :span="19">
          <el-link @click="getDetails(books[0].book_name)" :underline="false">
            <span style="font-size: smaller;word-wrap: break-word">《{{books[0].book_name}}》</span>
          </el-link>
        </el-col>
      </el-row>
      <el-row style="text-align: left;margin-bottom: 2px">
        <el-col :span="5">
          <el-link size="mini" @click="getDetails(books[1].book_name)" :underline="false">
            <el-image style="width: 35px;height: 35px;border-radius: 2px"
                      :src=img[1] fit="'scale-down'"></el-image>
          </el-link>
        </el-col>
        <el-col :span="19">
          <el-link size="mini" @click="getDetails(books[1].book_name)" :underline="false">
            <span style="font-size: smaller">《{{books[1].book_name}}》</span>
          </el-link>
        </el-col>
      </el-row>
      <el-row style="text-align: left;margin-bottom: 2px">
        <el-col :span="5">
          <el-link size="mini" @click="getDetails(books[2].book_name)" :underline="false">
            <el-image style="width: 35px;height: 35px;border-radius: 2px"
                      :src=img[2] fit="'scale-down'"></el-image>
          </el-link>
        </el-col>
        <el-col :span="19">
          <el-link size="mini" @click="getDetails(books[2].book_name)" :underline="false">
            <span style="font-size: smaller">《{{books[2].book_name}}》</span>
          </el-link>
        </el-col>
      </el-row>
      <el-row style="text-align: left;margin-bottom: 2px">
        <el-col :span="5">
          <el-link size="mini" @click="getDetails(books[3].book_name)" :underline="false">
            <el-image style="width: 35px;height: 35px;border-radius: 2px"
                      :src=img[3] fit="'scale-down'"></el-image>
          </el-link>
        </el-col>
        <el-col :span="19">
          <el-link size="mini" @click="getDetails(books[3].book_name)" :underline="false">
            <span style="font-size: smaller">《{{books[3].book_name}}》</span>
          </el-link>
        </el-col>
      </el-row>
      <el-row style="text-align: left;margin-bottom: 2px">
        <el-col :span="5">
          <el-link size="mini" @click="getDetails(books[4].book_name)" :underline="false">
            <el-image style="width: 35px;height: 35px;border-radius: 2px"
                      :src=img[4] fit="'scale-down'"></el-image>
          </el-link>
        </el-col>
        <el-col :span="19">
          <el-link size="mini" @click="getDetails(books[4].book_name)" :underline="false">
            <span style="font-size: smaller">《{{books[4].book_name}}》</span>
          </el-link>
        </el-col>
      </el-row>
      <el-row style="margin-top: 5px;margin-bottom: 0">
        <el-col :span="4" :offset="20">
          <el-link icon="el-icon-arrow-left"
                   size="mini" @click="getBooks(pages.PrevPageURL)"></el-link>
          <el-link icon="el-icon-arrow-right"
                   size="mini" @click="getBooks(pages.NextPageURL)">
          </el-link>
        </el-col>
      </el-row>
    </el-main>
  </div>
</template>
<script >
export default {
  data () {
    return {
      baseURL: '/api/client/books/by-sold/5',
      books: [{
        book_name: ''
      }, {
        book_name: ''
      }, {
        book_name: ''
      }, {
        book_name: ''
      }, {
        book_name: ''
      }],
      pages: {
        PrevPageURL: this.baseURL,
        NextPageURL: this.baseURL
      },
      img: [require('@/assets/22.jpg'),
        require('@/assets/23.jpeg'),
        require('@/assets/24.jpeg'),
        require('@/assets/25.jpeg'),
        require('@/assets/26.jpg')]
    }
  },
  mounted () {
    this.getBooks(this.baseURL)
  },
  methods: {
    getDetails (name) {
      this.$router.push({name: 'ClientShowDetail', query: {bookName: name}})
    },
    getBooks (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.books = response.data.books
          this.pages = response.data.page
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
