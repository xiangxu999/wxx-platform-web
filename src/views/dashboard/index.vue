<template>
  <div class="dashboard-container">
    <div class="dashboard-editor-container">
      <github-corner class="github-corner" />
      <el-row :gutter="20">
        <el-col :sm="24" :lg="12" style="padding-left: 20px">
          <h2>个人工作平台</h2>
          <p>
            不断完善的一个后台管理系统，希望自己不断进步，记录自己的成长。希望自己在三年之后能看到这里硕果累累，与其在游艇上眺望，不如驾一艘破船乘风破浪！
          </p>
          <p>
            <b>当前版本:</b> <span>开发中</span>
          </p>
          <p>
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-cloudy"
              plain
              @click="goTarget('https://github.com/xiangxu999/wxx-platform-web')"
            >访问仓库</el-button>
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-document"
              plain
              @click="goTarget('http://202.202.43.5:91/#/guide/xdialog-edit')"
            >访问文档</el-button>
          </p>
        </el-col>

        <el-col :sm="24" :lg="12" style="padding-left: 50px">
          <el-row>
            <el-col :span="12">
              <h2>技术选型</h2>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="6">
              <h4>后端技术</h4>
              <ul>
                <li>SpringBoot</li>
                <li>SaToken</li>
                <li>JWT</li>
                <li>MyBatisPlus</li>
                <li>Druid</li>
                <li>...</li>
              </ul>
            </el-col>
            <el-col :span="6">
              <h4>前端技术</h4>
              <ul>
                <li>Vue</li>
                <li>Vuex</li>
                <li>Element-ui</li>
                <li>Axios</li>
                <li>Sass</li>
                <li>...</li>
              </ul>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-divider />
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <span>联系信息</span>
            </div>
            <div class="body">
              <p>
                <i class="el-icon-s-promotion" /> 博客：
                <el-link href="https://xiangxu999.com" target="_blank">Miyazono Kaori</el-link>
              </p>
              <p>
                <svg-icon icon-class="github-icon" /> Github：
                <el-link href="https://github.com/xiangxu999" target="_blank">旭日</el-link>
              </p>
              <p>
                <svg-icon icon-class="qq" /> QQ：
                <el-link href="https://wpa.qq.com/msgrd?v=3&uin=846212939&site=qq&menu=yes" target="_blank">846212939</el-link>
              </p>
              <p>
                <svg-icon icon-class="wechat" /> 微信：
                <el-link href="javascript:;">dylismywife</el-link>
              </p>
              <p>
                <svg-icon icon-class="bilibili" /> B站：
                <el-link href="https://space.bilibili.com/159065519" target="_blank">nivsnKb</el-link>
              </p>
              <p>
                <svg-icon icon-class="email" /> 邮箱：
                <el-link href="javascript:;">846212939@qq.com</el-link>
              </p>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <span>开发日志</span>
            </div>
            <el-collapse accordion>
              <el-collapse-item v-for="(item,index) of updateLogs.slice().reverse()" :key="index" :title="item.title">
                <ol>
                  <li v-for="(logItem, itemIndex) of item.logs" :key="itemIndex">{{ logItem }}</li>
                </ol>
              </el-collapse-item>
            </el-collapse>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12" :lg="8">
          <el-card class="update-log">
            <div slot="header" class="clearfix">
              <span>名片</span>
            </div>
            <div class="body">
              <img
                src="@/assets/images/background.jpg"
                alt="donate"
                width="100%"
              >
              <span
                style="display: inline-block; height: 30px; line-height: 30px"
              >或许前路永夜，即便如此我也要前进</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import updateLogs from '@/views/dashboard/updateLog'

export default {
  name: 'Dashboard',
  components: {
    GithubCorner
  },
  data() {
    return {
      updateLogs: updateLogs
    }
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
  .dashboard-container{
    .dashboard-editor-container {
      padding: 10px;
      position: relative;
      .github-corner {
        position: absolute;
        top: 0;
        border: 0;
        right: 0;
        z-index: 1;
      }
      blockquote {
        padding: 10px 20px;
        margin: 0 0 20px;
        font-size: 17.5px;
        border-left: 5px solid #eee;
      }
      .el-card{
        span {
          font-weight: bolder;
        }
      }
      hr {
        margin-top: 20px;
        margin-bottom: 20px;
        border: 0;
        border-top: 1px solid #eee;
      }
      .col-item {
        margin-bottom: 20px;
      }
      ul {
        padding: 0;
        margin: 0;
      }
      font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
      font-size: 13px;
      color: #676a6c;
      overflow-x: hidden;
      ul {
        list-style-type: none;
      }
      h4 {
        margin-top: 0px;
      }
      h2 {
        color: #5E6D82;
        margin-top: 10px;
        font-size: 26px;
        font-weight: bolder;
      }
      p {
        margin-top: 10px;

        b {
          font-weight: 700;
        }
      }
      .update-log {
        ol {
          display: block;
          list-style-type: decimal;
          margin-block-start: 1em;
          margin-block-end: 1em;
          margin-inline-start: 0;
          margin-inline-end: 0;
          padding-inline-start: 40px;
        }
      }
    }
  }
</style>
