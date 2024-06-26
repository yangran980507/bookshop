<template>
  <el-container>
    <el-main>
      <el-row>
        <el-table
          :data="tableData"
          style="width: 100%"
          height="300"
          border>
        <!-- 一列-->
          <el-table-column
            label="日期"
            width="130"
            >
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{ formatDate(scope.row)}}</span>
            </template>
          </el-table-column>
        <!-- 一列-->
        <!-- 一列-->
          <el-table-column
            label="标题" width="130">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.Title }}</el-tag>
                </div>
            </template>
          </el-table-column>
        <!-- 一列-->
          <!-- 一列-->
          <el-table-column
            label="公告内容">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>
                  <el-tag size="medium">{{ scope.row.Content }}</el-tag>
                </p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.Content }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <!-- 一列-->
        <!-- 一列-->
          <el-table-column label="操作" width="75">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        <!-- 一列-->
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
export default {
  /* eslint-disable */
  data () {
    return {
      tableData: [{
        Title: '',
        ShowTime: 0,
        Content: '',
        ID: 0
      }]
    }
  },
  components: {
    NoticeAside
  },
  mounted () {
    this.getNotices()
  },
  computed () {
    this.formatDate()
  },
  methods: {
    handleDelete (id) {
      this.$api.del('/api/admin/notices/delete/' + id).then(response => {
          if (response.message === 'OK') {
            this.$message({
              message: response.data,
              type: 'success'
            })
            this.getNotices()
          }
      })
    },
    goNoticesAdd () {
      this.$router.push({name: 'NoticeAdd'})
    },
    getNotices () {
      this.$api.get('/api/admin/notices').then(response => {
        if (response.message === 'OK') {
          this.tableData = response.data.notices
        } else if (response.err_code === 100201) {
          this.tableData =[{
            Title: '',
            ShowTime: 0,
            Content: '',
            ID: 0
          }]
          this.$message({
            message: '暂无公告',
            type: 'info'
          })
        } else {
          this.$message({
            message: '服务端出错',
            type: 'error'
          })
        }
      })
    },
    formatDate (row) {
      if (row.ShowTime !== 0) {
        let date = new Date(parseInt(row.ShowTime) * 1000);
        let Y = date.getFullYear() + '-';
        let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-';
        let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        return Y + M + D ;
      } else {
        return ''
      }
    },
  }
}
</script>
<style>
#increase {
  margin-top: 10px;
}
</style>
