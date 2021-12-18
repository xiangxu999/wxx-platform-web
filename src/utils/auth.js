import Cookies from 'js-cookie'
import Config from '@/settings'

const TokenKey = Config.TokenKey

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, rememberMe) {
  if (rememberMe) {
    // 记住我状态，会设置Cookie的过期时间（默认一天）
    return Cookies.set(TokenKey, token, { expires: Config.tokenCookieExpires })
  } else {
    // 不设置Cookie的过期时间，关闭游览器之后就需要重新输入账号和密码
    return Cookies.set(TokenKey, token)
  }
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
