<template>
  <div>
    <el-row type="flex" justify="center" style="margin-bottom: 2px">
      <el-col :span="24">
        <el-container>
          <el-header height="40px" style="width: 100%;padding: 0">
            <el-image style="width: 100%; height: 100%" :src="noticeImg[0]"
            fit="cover"></el-image>
          </el-header>
          <el-main style="padding: 0">
            <el-carousel height="200px" trigger="click"
                         direction="vertical" :autoplay="true">
              <el-carousel-item v-for="(item, index) in notices" :key="index">
                <h3>{{ item.content }}</h3>
              </el-carousel-item>
            </el-carousel>
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
      noticeImg: [require('../../assets/12.jpg')],
      notices: []
    }
  },
  mounted () {
    this.getNotices()
  },
  methods: {
    getNotices () {
      this.$api.get('api/client/notices').then(response => {
        if (response.message === 'OK') {
          this.notices = response.data.notices
        }
      })
    }
  }
}
</script>
<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  margin: 60px;
}
.el-carousel__item {
  background-color: #99a9bf;
}
</style>
