// 适配 Nginx 反向代理
const baseUrl = process.env.VUE_APP_BASE_API === '/' ? '' : process.env.VUE_APP_BASE_API
const api = {
  state: {
    /**
     * sql监控
     */
    druidApi: baseUrl + '/druid/index.html',
    /**
     * swagger
     */
    swaggerApi: baseUrl + '/swagger-ui/',
    // baseUrl，
    baseApi: baseUrl
  }
}
export default api
