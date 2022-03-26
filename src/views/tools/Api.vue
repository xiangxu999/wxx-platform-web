<!--swagger文档-->
<template>
  <div class="app-container">
    <text-tip text="接口文档" :link="swaggerApi" />
    <div class="code">
      # 相关账号和密码请咨询负责人<br>
    </div>
  </div>
</template>

<script>
import TextTip from '@/components/TextTip'
import { mapGetters } from 'vuex'
export default {
  name: 'SysApi',
  components: { TextTip },
  computed: {
    ...mapGetters([
      'swaggerApi'
    ])
  }
}
</script>
<style lang="scss" scoped>
.code{
  position: relative;
  padding: 15px;
  line-height: 20px;
  border-left: 5px solid #ddd;
  color: #333;
  font-family: Courier New, serif;
  font-size: 12px
}
</style>
