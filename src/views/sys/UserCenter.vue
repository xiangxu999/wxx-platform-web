<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="5" style="margin-bottom: 10px">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人信息</span>
          </div>
          <div>
            <div style="text-align: center">
              <div class="el-upload">
                <img src="https://cdn.lixingyong.com/2021/01/15/QQ20210115152209.jpg?imageView2/1/w/80/h/80" title="点击上传头像" class="avatar">
              </div>
            </div>
            <ul class="user-info">
              <li><div style="height: 100%"><svg-icon icon-class="login" /> 登录账号<div class="user-right">wxx</div></div></li>
              <li><svg-icon icon-class="user" /> 用户昵称 <div class="user-right">旭日</div></li>
              <li><svg-icon icon-class="dept" /> 所属部门 <div class="user-right">研一</div></li>
              <li><svg-icon icon-class="phone" /> 手机号码 <div class="user-right">15281072408</div></li>
              <li><svg-icon icon-class="email" /> 用户邮箱 <div class="user-right">846212939@qq.com</div></li>
              <li>
                <svg-icon icon-class="lock" /> 安全设置
                <div class="user-right">
                  <a>修改密码 </a>
                  <a> 修改邮箱</a>
                </div>
              </li>
            </ul>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserCenter'
}
</script>

<style rel="stylesheet/scss" lang="scss">
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
</style>
