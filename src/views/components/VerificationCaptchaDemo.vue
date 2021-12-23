<template>
  <div class="app-container">
    <el-button type="primary" @click="useVerify">调用验证码</el-button>
    <template>
      <Verify
        ref="verify"
        mode="pop"
        captcha-type="blockPuzzle"
        :img-size="{ width: '330px', height: '155px' }"
        @success="success"
      />
    </template>
  </div>
</template>

<script>
import Verify from '@/components/Verifition'
export default {
  name: 'VerificationCaptchaDemo',
  components: {
    Verify
  },
  methods: {
    success(params) {
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
      this.$notify({
        title: '验证通过',
        type: 'success',
        duration: 5000
      })
    },
    useVerify() {
      this.$refs.verify.show()
    }
  }
}
</script>

<style scoped>

</style>
