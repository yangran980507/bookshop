<template>
  <div>
    这里是搜索结果{{result}}
  </div>
</template>
<script>
export default {
  data () {
    return {
      result: ''
    }
  },
  mounted () {
    this.showResult()
  },
  methods: {
    showResult () {
      this.result = this.$route.params.book_name
    }
  }
}
</script>
