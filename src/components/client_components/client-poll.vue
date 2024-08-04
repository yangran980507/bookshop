<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 2px">
      <el-col :span="24">
        <el-container>
          <el-header height="40px" style="width: 100%;padding: 0">
            <el-image style="width: 100%; height: 100%" :src="pollImg[0]"
                      fit="cover"></el-image>
          </el-header>
          <el-main>
            <el-radio-group v-model="checkedPoll">
              <el-row type="flex" justify="left">
                <el-col :span="1" :offset="5">
                  <el-radio v-for="(poll,index) in pollData"
                            :label="poll.option_name" :key="index">
                    <span>{{poll.option_name}}</span>
                  </el-radio>
                </el-col>
              </el-row>
            </el-radio-group>
            <div style="padding-top: 20px">
              <el-row>
                <el-col :span="20" :offset="2">
                  <el-button-group>
                    <el-button size="mini" @click="vote">投票</el-button>
                    <el-button size="mini" @click="goResult">查看结果</el-button>
                  </el-button-group>
                </el-col>
              </el-row>
            </div>
          </el-main>
        </el-container>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      baseURL: '/api/client/polls',
      pollImg: [require('../../assets/28.jpeg')],
      pollData: [{
        option_name: '',
        count: 0,
        time: 0
      }],
      // 选中数据
      checkedPoll: ''
    }
  },
  mounted () {
    this.getPollOptions(this.baseURL)
  },
  methods: {
    getPollOptions (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.pollData = response.data.polls
        }
      })
    },
    goResult () {
      this.$router.push({name: 'ClientShowPollResult'})
    },
    vote () {
      this.$api.put('/api/client/polls/vote', {
        option_name: this.checkedPoll
      }).then(response => {
        if (response.message === 'OK') {
          this.$message({
            type: 'success',
            message: response.data
          })
        } else if (response.err_code === 100102) {
          this.$message({
            type: 'error',
            message: '请先登录'
          })
        } else {
          this.$message({
            type: 'error',
            message: response.data
          })
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
