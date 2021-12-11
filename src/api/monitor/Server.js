import request from '@/utils/request'

/**
 * 获取服务端信息
 */
export function serverInfo() {
  return request({
    url: '/monitor/server',
    method: 'get'
  })
}
