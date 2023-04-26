import request from '@/utils/request'

/**
 * 登录
 * @param data 表单
 */
export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 * @param token token
 */
export function getInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: { token }
  })
}

/**
 * 退出
 */
export function logout() {
  return request({
    url: '/auth/logout',
    method: 'post'
  })
}

/**
 * 获取验证码
 */
export function getCodeImg() {
  return request({
    url: '/auth/code',
    method: 'get'
  })
}
