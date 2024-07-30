<template>
  <el-container>
    <el-main>
      <el-row :gutter="20" style="margin-top: 50px">
        <el-col :span="16">
          <el-select v-model="value" placeholder="请选择投票项" style="float: right" clearable>
            <el-option
              v-for="(item,index) in categories"
              :key="index"
              :value="item.name">
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.name }}</span>
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8" >
          <el-button size="mini" type="primary" @click="addPoll"
                     style="float: left;margin-top: 10px">添加</el-button>
          <el-button size="mini" type="info" @click="Return"
                     style="float: left;margin-top: 10px">返回</el-button>
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
      baseURL: '/api/admin/polls/options',
      categories: [{name: ''}],
      value: ''
    }
  },
  mounted () {
    this.getOptions(this.baseURL)
  },
  components: {
    PollAside
  },
  methods: {
    getOptions (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.categories = response.data.categories
        }
      })
    },
    addPoll () {
      this.$api.post('/api/admin/polls/create', {
        option_name: this.value
      }).then(response => {
        if (response.message === 'OK') {
          if (response === 100206) {
            this.$message({
              message: response.data,
              type: 'info'
            })
          } else {
            this.$message({
              message: response.data,
              type: 'success'
            })
          }
        } else {
          this.$message({
            message: response.data,
            type: 'error'
          })
        }
      })
    },
    Return () {
      this.$router.push({name: 'PollDelete'})
    }
  }
}
</script>
