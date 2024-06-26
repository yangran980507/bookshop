<template>
  <el-container>
    <el-main>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          label="日期"
          width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.name }}</p>
              <p>住址: {{ scope.row.address }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-aside width="250px">
      <div>
        <img alt="加载失败" style="width: 200px; height: 140px"
             src="../../../assets/tips2.jpeg"/>
      </div>
      <ul>
        <el-row><li class="liStates">公告信息不可修改，只可添加和删除。</li></el-row>
        <el-row><li class="liStates">添加公告信息：点击“添加公告信息”超链接可以进行公告信息的添加。</li></el-row>
        <el-row><li class="liStates">删除图书信息：点击每条图书信息后面的“删除”按钮可以删除图书信息。</li></el-row>
      </ul>
    </el-aside>
  </el-container>
</template>
<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(index, row)
    }
  }
}
</script>
<style>
.liStates {
  text-align: left;
}
</style>
