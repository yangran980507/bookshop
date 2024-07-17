<template>
      <div style="margin: 0;padding-left: 0">
        <el-input placeholder="请输入书名" v-model="book_name">
          <el-button slot="append"
                     icon="el-icon-search"
                     @click="goSearch"></el-button>
        </el-input>
      </div>
</template>
<script>
export default {
  data () {
    return {
      book_name: '',
      searchImg: '@/assets/7.jpg'
    }
  },
  methods: {
    goSearch () {
      this.$router.push({name: 'ClientShowSearch', query: {bookName: this.book_name}})
      this.$emit('goSearch', true)
    }
  }
}
</script>
<style scoped>
</style>
