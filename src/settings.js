module.exports = {

  title: '工作平台',

  /**
   * @description 是否打开全局设置
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: true,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @description 是否只保持一个子菜单的展开
   */
  uniqueOpened: true,

  /**
   * @description 记住密码状态下的token在Cookie中存储的天数，默认1天
   */
  tokenCookieExpires: 1,

  /**
   * @description 记住密码状态下的密码在Cookie中存储的天数，默认1天
   */
  passCookieExpires: 1,

  /**
   * @description 请求超时时间，毫秒（默认1分钟）
   */
  timeout: 600000,

  /**
   * @description token key
   */
  TokenKey: 'Authorization',

  /**
   * 是否显示设置的底部信息
   */
  showFooter: true,
  /**
   * 底部文字，支持html语法
   */
  footerTxt: '© 2021 旭日 <a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank">Apache License 2.0</a>',
  /**
   * 备案号
   */
  caseNumber: '蜀ICP备2021000788号-1'
}
