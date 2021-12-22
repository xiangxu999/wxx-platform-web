<template>
  <div class="login" :style="'background-image:url('+ Background +');'">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" label-position="left" label-width="0px" class="login-form">
      <h3 class="title">个人工作平台</h3>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input ref="password" v-model="loginForm.password" :type="passwordType" auto-complete="off" placeholder="密码" @keyup.enter.native="handleLogin">
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
          <svg-icon slot="suffix" :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" class="el-input__icon input-icon show-pwd" @click="showPwd" />
        </el-input>
      </el-form-item>
      <el-checkbox v-model="loginForm.rememberMe" style="margin:0 0 25px 0;">
        记住我
      </el-checkbox>
      <el-form-item style="width:100%;">
        <el-button :loading="loading" size="medium" type="primary" style="width:100%;" @click.native.prevent="useVerify()">
          <span v-if="!loading">登 录</span>
          <span v-else>登 录 中...</span>
        </el-button>
      </el-form-item>
    </el-form>
    <!--  底部  -->
    <div v-if="$store.state.settings.showFooter" id="el-login-footer">
      <span v-html="$store.state.settings.footerTxt" />
      <span> ⋅ </span>
      <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank">{{ $store.state.settings.caseNumber }}</a>
    </div>

    <!-- 验证码部分 -->
    <Verify
      ref="verify"
      mode="pop"
      captcha-type="blockPuzzle"
      :img-size="{ width: '330px', height: '155px' }"
      @success="success"
    />
  </div>
</template>

<script>
import Config from '@/settings'
import Cookies from 'js-cookie'
import qs from 'qs'
import md5 from 'js-md5'
import Background from '@/assets/images/background.jpg'
import Verify from '@/components/Verifition'
export default {
  name: 'Login',
  components: {
    Verify
  },
  data() {
    return {
      Background: Background,
      passwordType: 'password',
      loginForm: {
        username: '',
        password: '',
        rememberMe: false
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
        password: [{ required: true, trigger: 'blur', message: '密码不能为空' }],
        code: [{ required: true, trigger: 'change', message: '验证码不能为空' }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const data = route.query
        if (data && data.redirect) {
          this.redirect = data.redirect
          delete data.redirect
          if (JSON.stringify(data) !== '{}') {
            this.redirect = this.redirect + '&' + qs.stringify(data, { indices: false })
          }
        }
      },
      immediate: true
    }
  },
  created() {
    // 获取是否记住的状态
    this.getCookie()
    // token 过期提示
    this.point()
  },
  methods: {
    success(params) {
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
      this.handleLogin()
    },
    useVerify() {
      this.$refs.verify.show()
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    getCookie() {
      const rememberMe = Cookies.get('rememberMe')
      // 这边账号和密码不保存
      this.loginForm = {
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe)
      }
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        const user = {
          username: this.loginForm.username,
          // 加密
          password: md5(this.loginForm.password),
          rememberMe: this.loginForm.rememberMe
        }
        if (valid) {
          if (user.rememberMe) {
            Cookies.set('rememberMe', user.rememberMe, { expires: Config.passCookieExpires })
          } else {
            Cookies.remove('rememberMe')
          }
          this.loading = true
          this.$store.dispatch('user/login', user).then(() => {
            this.loading = false
            this.$router.push({ path: this.redirect || '/' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    point() {
      const point = Cookies.get('point') !== undefined
      if (point) {
        this.$notify({
          title: '提示',
          message: '当前登录状态已过期，请重新登录！',
          type: 'warning',
          duration: 5000
        })
        Cookies.remove('point')
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
// 修复变色问题
input {
  //caret-color: #fff !important;
  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px #fff inset !important;
  }
}
#el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial, serif;
  font-size: 12px;
  letter-spacing: 1px;
}
.show-pwd {
  right: 10px;
  font-size: 16px;
  color: #889aa4;
  cursor: pointer;
  user-select: none;
}
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-size: cover;
}
.title {
  margin: 0 auto 30px auto;
  text-align: center;
  color: #fff;
}

.login-form {
  border-radius: 6px;
  background: rgba(0,0,0,.5);
  width: 385px;
  padding: 25px 25px 5px 25px;
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon{
    height: 39px;width: 14px;margin-left: 2px;
  }
}
</style>
