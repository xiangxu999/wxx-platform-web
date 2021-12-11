<template>
  <div class="card-container">
    <el-row :gutter="20">
      <el-col v-for="item of blogList" :key="item.qq" :span="6">
        <info-card class="item" :img="item.img" :username="item.username" :nickname="item.nickname" :qq="item.qq" :email="item.email" :blog="item.blog" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'
import dataList from './data'
export default {
  name: 'Team',
  components: {
    InfoCard
  },
  data() {
    return {
      blogList: dataList
    }
  }
}
</script>
<style lang="scss" scoped>
  .card-container{
    padding: 10px;
    display: flex;
    justify-content: space-around;
    .item{
      width: 300px;
      margin-top: 10px;
    }
  }
</style>

