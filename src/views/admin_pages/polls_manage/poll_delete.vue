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
            height="300"
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
            <el-table-column label="操作" width="75" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.row.option_name)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-row>
      </div>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" id="increase"
                     icon="el-icon-circle-plus-outline"
                     size="small" @click="goPollAdd">添加</el-button>
        </el-col>
      </el-row>
    </el-main>
    <el-aside width="250px">
     <poll-aside></poll-aside>
    </el-aside>
  </el-container>
</template>
<script>
import PollAside from '../../../components/admin_components/PollAside.vue'
export default {
  data () {
    return {
      baseURL: '/api/admin/polls',
      tableData: [{
        option_name: '',
        count: 0
      }],
      isEmpty: true
    }
  },
  components: {
    PollAside
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
    },
    handleDelete (name) {
      this.$api.del('/api/admin/polls/' + name + '/delete').then(response => {
        if (response.message === 'OK') {
          this.getPolls(this.baseURL)
          this.$message({
            message: response.data,
            type: 'success'
          })
        } else if (response.err_code === 100102 || response.err_code === 100104) {
          this.$message({
            message: '鉴权失败，请重新登录！',
            type: 'error'
          })
        } else {
          this.$message({
            message: response.data,
            type: 'error'
          })
        }
      })
    },
    goPollAdd () {
      this.$router.push({name: 'PollAdd'})
    }
  }
}
</script>
<style scoped>
#increase {
  margin-top: 10px;
}
</style>
