import request from '@/utils/request'

/**
 * 根据日志类型获取日志列表
 * @param type 日志类型
 * @param current 当前页数
 * @param size 每页大小
 */
export function logList(type, current, size) {
  return request({
    url: '/system/log/list',
    method: 'get',
    params: {
      type: type,
      current: current,
      size: size
    }
  })
}
