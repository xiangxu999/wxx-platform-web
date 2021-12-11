<template>
  <div class="app-container">
    <info-card
      style="width: 300px"
      :img="img"
      :username="username"
      :nickname="nickname"
      :qq="qq"
      :email="email"
      :blog="blog"
    />
  </div>
</template>

<script>
import InfoCard from '@/components/InfoCard'
export default {
  name: 'InfoCardDemo',
  components: {
    InfoCard
  },
  data() {
    return {
      img: 'https://cdn.lixingyong.com/2021/01/15/QQ20210115152209.jpg?imageView2/1/w/80/h/80',
      username: '文享旭',
      nickname: '旭日',
      qq: '846212939',
      email: '846212939@qq.com',
      blog: 'https://www.xiangxu999.com'

    }
  }
}
</script>
