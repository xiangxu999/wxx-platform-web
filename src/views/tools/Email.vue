<!--邮箱工具（目前实现了普通邮箱，后续完成附件邮箱）-->
<template>
  <div class="app-container">
    <el-tabs v-model="index">
      <el-tab-pane label="邮箱配置" name="first">
        <el-form ref="configForm" :model="configForm" :rules="configRules" style="margin-top: 6px;" size="small" label-width="100px" :disabled="true">
          <el-form-item label="发件人邮箱" prop="fromUser">
            <el-input v-model="configForm.fromUser" style="width: 40%" />
            <span style="color: #C0C0C0;margin-left: 10px;">发件人邮箱</span>
          </el-form-item>
          <el-form-item label="邮箱密码" prop="pass">
            <el-input v-model="configForm.pass" type="password" style="width: 40%;" />
            <span style="color: #C0C0C0;margin-left: 10px;">邮箱密码</span>
          </el-form-item>
          <el-form-item label="SMTP地址" prop="host">
            <el-input v-model="configForm.host" style="width: 40%;" />
            <span style="color: #C0C0C0;margin-left: 10px;">SMTP地址</span>
          </el-form-item>
          <el-form-item label="SMTP端口" prop="port">
            <el-input v-model="configForm.port" style="width: 40%;" />
            <span style="color: #C0C0C0;margin-left: 10px;">SMTP端口</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="发送邮件" name="second">
        <el-form ref="sendForm" :model="sendForm" :rules="sendRules" style="margin-top: 6px;" size="small" label-width="100px">
          <el-form-item label="收件人邮箱" prop="sendUser">
            <el-input v-model="sendForm.sendUser" style="width: 40%" />
          </el-form-item>
          <el-form-item label="邮箱标题" prop="title">
            <el-input v-model="sendForm.title" style="width: 40%;" />
          </el-form-item>
          <el-form-item label="邮箱内容" prop="content">
            <el-input v-model="sendForm.content" type="textarea" style="width: 40%;" />
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" @click="sendSimpleEmail">发送邮箱</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="使用使用" name="third">
        <text-tip text="邮件服务器配置" />
        <div class="code">
          # 邮件服务器的SMTP地址，可选，默认为smtp <br>
          # 邮件服务器的SMTP端口，可选，默认465或者25 <br>
          # 发件人（必须正确，否则发送失败） <br>
          # 用户名，默认为发件人邮箱前缀 <br>
          # 密码（注意，某些邮箱需要为SMTP服务单独设置密码，如QQ和163等等）<br>
          # 是否开启ssl，默认开启 <br>
        </div>
        <text-tip text="相关文档" />
        <div class="code">更多帮助请查看：<el-link type="primary" href="https://service.mail.qq.com/" target="_blank">QQ邮箱文档</el-link></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TextTip from '@/components/TextTip'
import { sendSimpleMail } from '@/api/tools/Email'
export default {
  name: 'Email',
  components: {
    TextTip
  },
  data() {
    return {
      index: 'second',
      loading: false,
      // todo 后面要变成活的,现在邮箱配置在后端是使用的配置文件
      configForm: {
        fromUser: '846212939@qq.com',
        pass: 'xdcqjtxybnerbcai',
        host: 'smtp.qq.com',
        port: '465'
      },
      configRules: {
        fromUser: [
          { required: true, message: '请输入发件人邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        host: [
          { required: true, message: 'SMTP地址不能为空', trigger: 'blur' }
        ],
        port: [
          { required: true, message: 'SMTP端口不能为空', trigger: 'blur' }
        ]
      },
      sendForm: {
        sendUser: null,
        content: null,
        title: null
      },
      sendRules: {
        sendUser: [
          { required: true, message: '请输入发件人邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '内容不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    sendSimpleEmail() {
      this.$refs['sendForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          sendSimpleMail(this.sendForm.sendUser, this.sendForm.title, this.sendForm.content).then(res => {
            if (res.code === 200) {
              this.$notify({
                title: '成功',
                message: res.message,
                type: 'success'
              })
            }
            this.loading = false
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
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
