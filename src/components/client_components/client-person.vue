<template>
  <div>
    <el-row :gutter="20">
      <!-- 头像 -->
      <el-col :span="8">
        <div class="block">
          <el-avatar :size="70" :src="picURL[0]"></el-avatar>
          <el-button style="margin-top: 10px" @click="signOut"
                     type="primary" size="mini">退出</el-button>
        </div>
      </el-col>
      <!-- 头像 -->
      <!-- 信息 -->
      <el-col :span="16" style="text-align: left;font-size: 14px;">
        <div class="block">
          <el-row type="flex" justify="left" >
            <el-col :span="8" style="color: #8c939d;">用户：
            </el-col>
            <el-col :span="16">{{user.login_name}}
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="8" style="color: #8c939d">电话：
            </el-col>
            <el-col :span="16">{{user.phone}}
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="8" style="color: #8c939d">地址：
            </el-col>
            <el-col :span="16">{{user.address}}
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="8" style="color: #8c939d">折扣：
            </el-col>
            <el-col :span="16">{{user.grade}}
            </el-col>
          </el-row>
          <el-row type="flex" justify="left">
            <el-col :span="8" style="color: #8c939d">消费：
            </el-col>
            <el-col :span="16">{{user.amount}}
            </el-col>
          </el-row>
        </div>
      </el-col>
      <!-- 信息 -->
    </el-row>
  </div>
</template>
<script>
import {getUser, delUser, delToken} from '../../api/storage'

export default {
  data () {
    return {
      picURL: [require('@/assets/27.jpeg')],
      user: {
        id: 0,
        login_name: '',
        true_name: '',
        phone: '',
        grade: 0,
        amount: 0,
        freeze: false,
        address: ''
      }
    }
  },
  created () {
    this.showPersonalMessage()
  },
  methods: {
    showPersonalMessage () {
      this.user = getUser()
      console.log(this.user)
    },
    signOut () {
      delToken()
      delUser()
      this.$message({
        message: '退出成功',
        type: 'success'
      })
      this.$emit('signOut', false)
    }
  }
}
</script>
<style scoped>
</style>
