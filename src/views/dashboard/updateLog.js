/**
 * title: 更新日志的标题
 * logs： 更新日志的内容
 * @type {[{title: string, logs: string[]}]}
 */

const updateLogs = [
  {
    title: 'v0.0.1 - 2021-11-30',
    logs: [
      '平台集成saToken实现权限框架',
      '集成Redis实现权限的缓存',
      '集成JWT'
    ]
  },
  {
    title: 'v0.0.2 - 2021-12-10',
    logs: [
      '平台集成druid数据源',
      '对swagger文档进行了升级'
    ]
  },
  {
    title: 'v0.0.3 - 2021-12-11',
    logs: [
      '平台集成服务监控'
    ]
  },
  {
    title: 'v0.0.4 - 2021-12-16',
    logs: [
      '平台集成表单生成器',
      '新增文本提示框组件TextTip',
      '平台集成邮箱工具（简单邮箱发送）'
    ]
  },
  {
    title: 'v0.0.5 - 2021-12-17',
    logs: [
      '平台首页更新',
      '文本提示框案例更新'
    ]
  },
  {
    title: 'v0.0.6 - 2021-12-18',
    logs: [
      '后端目录更新',
      '优化登录、重置密码细节',
      '跨域优化'
    ]
  }
]

export default updateLogs