<!--这里是个人信息名片那种，不涉及安全-->
<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>个人信息</span>
    </div>
    <div>
      <div style="text-align: center">
        <div class="el-upload">
          <img :src="img" title="点击上传头像" class="avatar">
        </div>
      </div>
      <ul class="user-info">
        <li><svg-icon icon-class="account" /> 用户姓名<div class="user-right">{{ username }}</div></li>
        <li><svg-icon icon-class="user" /> 用户昵称 <div class="user-right">{{ nickname }}</div></li>
        <li><svg-icon icon-class="qq" /> 用户QQ <div class="user-right">{{ qq }}</div></li>
        <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">{{ email }}</div></li>
        <li><svg-icon icon-class="guide" /> 博客地址<div class="user-right"><a @click="openBlog">{{ blog }}</a></div></li>
      </ul>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    img: {
      type: String,
      default: ''
    },
    username: {
      type: String,
      default: ''
    },
    nickname: {
      type: String,
      default: ''
    },
    qq: {
      type: String,
      default: ''
    },
    email: {
      type: String,
      default: ''
    },
    blog: {
      type: String,
      default: ''
    }
  },
  methods: {
    openBlog() {
      window.open(this.blog, '_blank')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.box-card{
  .avatar {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info {
    padding-left: 0;
    list-style: none;
    li{
      border-bottom: 1px solid #F0F3F4;
      padding: 11px 0;
      font-size: 13px;
    }
    .user-right {
      float: right;
      a{
        color: #317EF3;
      }
    }
  }
}
</style>
