import request from '@/utils/request'
import qs from 'qs'

/**
 * 获取用户列表
 * @param username 用户名 模糊查询
 * @param current 当前的页数
 * @param size 当前每页的数量
 */
export function userList(searchForm, current, size) {
  return request({
    url: '/system/user/list' + '?' + qs.stringify(searchForm, { indices: false }),
    method: 'get',
    params: {
      current: current,
      size: size
    }
  })
}

/**
 * 获得用户的详情信息
 * @param id 用户id
 */
export function userInfo(id) {
  return request({
    url: '/system/user/info/' + id,
    method: 'get'
  })
}

/**
 * 用户的保存
 * @param data 表单
 */
export function userSave(data) {
  return request({
    url: '/system/user/save',
    method: 'post',
    data
  })
}

/**
 * 用户的更新
 * @param data 表单
 */
export function userUpdate(data) {
  return request({
    url: '/system/user/update',
    method: 'post',
    data
  })
}

/**
 * 用户的删除-支持批量删除
 * @param data ids
 */
export function userDelete(data) {
  return request({
    url: '/system/user/delete',
    method: 'post',
    data
  })
}

/**
 * 重置用户的密码
 * @param data
 */
export function repass(id) {
  return request({
    url: '/system/user/repass/' + id,
    method: 'post'
  })
}

/**
 * 分配角色
 * @param id
 * @param data
 */
export function roleHandle(id, data) {
  return request({
    url: '/system/user/role/' + id,
    method: 'post',
    data
  })
}
