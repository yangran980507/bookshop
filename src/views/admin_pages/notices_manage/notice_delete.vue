<template>
  <el-container>
    <el-main>
      <div v-if="empty === true">
        <el-empty description="暂无公告"></el-empty>
      </div>
      <el-row v-if="empty === false">
        <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          border>
          <el-table-column
            label="日期"
            width="130">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ formatDate(scope.row.show_time)}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="公告内容">
            <template slot-scope="scope">
                <div slot="reference">
                  <span>{{ scope.row.content }}</span>
                </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="75">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id,scope.$index)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <el-row>
        <el-col :span="2">
          <el-button type="primary" id="increase"
                     icon="el-icon-circle-plus-outline"
                     size="small" @click="goNoticesAdd">添加</el-button>
        </el-col>
      </el-row>
</el-main>
    <el-aside width="250px">
      <notice-aside></notice-aside>
    </el-aside>
  </el-container>
</template>
<script>
import NoticeAside from '../../../components/admin_components/NoticeAside.vue'
import {formatDate} from '../../../api/public'
export default {
  /* eslint-disable */
  data () {
    return {
      baseURL: '/api/admin/notices',
      tableData: [{
        title: '',
        show_time: 0,
        content: '',
        id: 0
      }],
      empty: true
    }
  },
  components: {
    NoticeAside
  },
  mounted () {
    this.getNotices(this.baseURL)
  },
  methods: {
    formatDate,
    handleDelete (id, index) {
      this.$api.del('/api/admin/notices/delete/' + id).then(response => {
          if (response.message === 'OK') {
            this.$message({
              message: response.data,
              type: 'success'
            })
            this.getNotices(this.baseURL)
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
    goNoticesAdd () {
      this.$router.push({name: 'NoticeAdd'})
    },
    getNotices (url) {
      this.$api.get(url).then(response => {
        if (response.message === 'OK') {
          this.empty = false
          this.tableData = response.data.notices
        } else if (response.err_code === 100201) {
          this.empty = true
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
    }
  }
}
</script>
<style>
#increase {
  margin-top: 10px;
}
</style>
