<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%"
        border
        size="mini"
        height="370"
        :row-class-name="tableRowFreeze">
        <!-- 登录名 -->
        <el-table-column
          label="用户名"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.login_name }}</span>
          </template>
        </el-table-column>
        <!-- 登录名 -->
        <!-- 真实姓名 -->
        <el-table-column
          label="真实姓名"
          width="140" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.true_name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <p>邮编: {{ scope.row.post_code }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.true_name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <!-- 真实姓名 -->
        <!-- 电话号码 -->
        <el-table-column
          label="电话"
          width="140" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.phone }}</span>
          </template>
        </el-table-column>
        <!-- 电话号码 -->
        <!-- 折扣 -->
        <el-table-column
          label="折扣等级"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.grade }}</span>
          </template>
        </el-table-column>
        <!-- 折扣 -->
        <!-- 消费金额 -->
        <el-table-column
          label="消费额"
          width="80" align="center">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <!-- 消费金额 -->
        <!-- 操作 -->
        <el-table-column label="冻结/解冻" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleFreeze(scope.row,scope.$index)">
              <span>{{ scope.row.isFrozen }}</span>
            </el-button>
          </template>
        </el-table-column>
        <!--  操作 -->
      </el-table>
      <div id="pages">
        <el-row>
          <el-col :span="12" :offset="12">
            <el-button-group>
              <el-button size="mini" @click="getUsers(pages.FirstPageURL)">首页</el-button>
              <el-button icon="el-icon-arrow-left" size="mini" @click="getUsers(pages.PrevPageURL)">上一页</el-button>
              <el-button size="mini">{{pages.CurrentPage}}</el-button>
              <el-button size="mini" @click="getUsers(pages.NextPageURL)">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
              <el-button size="mini" @click="getUsers(pages.LastPageURL)">末页</el-button>
            </el-button-group>
          </el-col>
        </el-row>
      </div>
    </el-main>
    <el-aside>
     <user-aside></user-aside>
    </el-aside>
  </el-container>
</template>
<script>
import UserAside from '../../../components/admin_components/UserAside.vue'
export default {
  data () {
    return {
      tableData: [{
        id: 0,
        login_name: '',
        true_name: '',
        address: '',
        post_code: '',
        phone: '',
        freeze: false,
        grade: 0,
        amount: 0,
        isFrozen: ''
      }],
      pages: {
        CurrentPage: 1,
        PrevPageURL: this.baseURL,
        NextPageURL: this.baseURL,
        FirstPageURL: this.baseURL,
        LastPageURL: this.baseURL
      },
      baseURL: '/api/admin/users'
    }
  },
  components: {
    UserAside
  },
  mounted () {
    this.getUsers(this.baseURL)
  },
  watch: {
    tableData: {
      handler (newVal, oldVal) {
      },
      deep: true
    }
  },
  methods: {
    handleFreeze (row, index) {
      this.$api.put('/api/admin/users/manage-freeze/' + row.id, {is_frozen: row.freeze})
        .then(response => {
          if (response.message === 'OK') {
            let newRow = response.data
            if (newRow.freeze === true) {
              newRow.isFrozen = '解冻'
            } else {
              newRow.isFrozen = '冻结'
            }
            this.tableData.splice(index, 1, newRow)
            this.$message({
              message: response.details,
              type: 'success'
            })
          } else {
            this.$message({
              message: response.data,
              type: 'error'
            })
          }
        })
    },
    getUsers (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.tableData = response.data.users
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].freeze === false) {
              this.tableData[i].isFrozen = '冻结'
            } else {
              this.tableData[i].isFrozen = '解冻'
            }
          }
          this.pages = response.data.page
        } else if (response.err_code === 100102 || response.err_code === 100104) {
          this.$message({
            message: '鉴权失败，请重新登录！',
            type: 'error'
          })
        }
      })
    },
    tableRowFreeze ({row}) {
      if (row.freeze === false) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
    }
  }
}
</script>
<style>
#pages{
  margin-top: 20px;
  padding-top: 20px;
}
 .el-table .warning-row {
   background: oldlace;
 }
.el-table .success-row {
  background: #f0f9eb;
}
</style>
