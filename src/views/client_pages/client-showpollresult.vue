<template>
  <el-container>
    <el-main>
      <div v-if="isEmpty === true">
        <el-empty description="暂无投票项"></el-empty>
      </div>
      <div  v-if="isEmpty === false">
        <el-row>
          <el-table
            :data="tableData"
            style="width: 100%"
            border>
            <el-table-column align="center"
                             label="投票项目">
              <template slot-scope="scope">
                <div slot="reference">
                  <span>{{ scope.row.option_name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center"
                             label="票数">
              <template slot-scope="scope">
                <div slot="reference">
                  <span>{{ scope.row.count }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
    </el-main>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      baseURL: '/api/client/polls',
      tableData: [{
        option_name: '',
        count: 0
      }],
      isEmpty: true
    }
  },
  mounted () {
    this.getPolls(this.baseURL)
  },
  methods: {
    getPolls (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          if (response.err_code === 100201) {
            console.log(response.err_code)
            this.isEmpty = true
            console.log(this.isEmpty)
          } else {
            this.isEmpty = false
            this.tableData = response.data.polls
          }
        } else if (response.err_code === 100102 || response.err_code === 100104) {
          this.$message({
            message: '鉴权失败，请重新登录！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
