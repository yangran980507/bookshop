<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 2px">
      <el-col :span="24">
        <el-container>
          <el-header height="40px" style="width: 100%;padding: 0">
            <el-image style="width: 100%; height: 100%" :src="pollImg[0]"
                      fit="cover"></el-image>
          </el-header>
          <el-main style="padding: 0">
            <el-table
              :data="pollKeys"
              style="width: 100%"
              size="mini">
              <!-- 选中 -->
              <el-radio-group>
                <div v-for="item in pollKeys" :key="item">
                    <el-radio size="mini"
                              :label="item" border>{{item}}</el-radio>
                </div>
              </el-radio-group>
              <!--  操作 -->
            </el-table>
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
      pollImg: [require('../../assets/28.jpeg')],
      pollKeys: []
    }
  },
  mounted () {
    this.getPollOptions()
  },
  methods: {
    getPollOptions () {
      this.$api.get('api/client/polls/keys').then(response => {
        if (response.message === 'OK') {
          this.pollKeys = response.data.pollKeys
        }
      })
    },
    goResult () {
      this.$router.push({name: 'ClientShowPollResult'})
    },
    vote () {
    }
  }
}
</script>
<style scoped>
</style>
