import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Config from '@/settings'
import Cookies from 'js-cookie'
import router from '@/router'

// 创建一个axios实例
const service = axios.create({
  // url = base url + request url
  baseURL: process.env.VUE_APP_BASE_API,
  // send cookies when cross-domain requests
  // withCredentials: true,
  timeout: Config.timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (getToken()) {
      // let each request carry token
      // ['Authorization'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code) {
      if (res.code === 401) { // 401: 没有登录
        // to re-login
        store.dispatch('user/resetToken').then(() => {
          // 用户登录界面提示
          Cookies.set('point', 401)
          location.reload()
        })
      } else if (res.code === 403) { // 403: 没有权限
        router.push({ path: '/401' })
      } else if (res.code === 500 || res.code === 501) { // 500: 操作失败 501: 校验失败
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      } else if (res.code === 200) { // 200: 操作成功
        return res
      } else { // 其他普通错误
        Message({
          message: res.message || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
    } else {
      Message({
        message: '接口请求失败',
        type: 'error',
        duration: 5 * 1000
      })
      return res
    }
    return Promise.reject(new Error(res.message || 'Error'))
  },
  error => {
    // 网络超时
    if (error.toString().indexOf('Error: timeout') !== -1) {
      Message({
        message: '网络请求超时',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(error)
    }
    // 其他异常错误
    Message({
      message: error.response.data !== null ? error.response.data.message : error.message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service
