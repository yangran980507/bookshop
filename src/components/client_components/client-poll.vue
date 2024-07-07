<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 2px">
      <el-col :span="24">
        <el-container>
          <el-header height="40px" style="width: 100%;padding: 0">
            <el-image style="width: 100%; height: 100%" :src="pollImg[0]"
                      :fit="'fill'"></el-image>
          </el-header>
          <el-main style="padding: 0">
            <el-table
              :data="pollKeys"
              style="width: 100%"
              size="mini">
              <!-- 选中 -->
              <el-table-column label="你需要哪方面的书籍？" fixed="right" align="left">
                <template slot-scope="scope">
                  <el-radio v-model="pollKeys[0]" size="mini"
                            label="1" border>{{scope.row}}</el-radio>
                </template>
              </el-table-column>
              <!--  操作 -->
            </el-table>
            <div style="padding-top: 20px">
              <el-row>
                <el-col :span="20" :offset="2">
                  <el-button-group>
                    <el-button size="mini" @click="getUsers(pages.FirstPageURL)">投票</el-button>
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
      pollImg: [require('../../assets/16.jpg')],
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
    }
  }
}
</script>
<style scoped>
</style>
