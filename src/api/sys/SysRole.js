import request from '@/utils/request'

/**
 * 分页获取角色列表
 * @param name
 * @param current
 * @param size
 */
export function roleList(name, current, size) {
  return request({
    url: '/system/role/list',
    method: 'get',
    params: {
      name: name,
      current: current,
      size: size
    }
  })
}

/**
 * 获得角色的详情信息
 * @param id 用户id
 */
export function roleInfo(id) {
  return request({
    url: '/system/role/info/' + id,
    method: 'get'
  })
}

/**
 * 角色的保存
 * @param data 表单
 */
export function roleSave(data) {
  return request({
    url: '/system/role/save',
    method: 'post',
    data
  })
}

/**
 * 角色的更新
 * @param data 表单
 */
export function roleUpdate(data) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data
  })
}

/**
 * 角色的删除-支持批量删除
 * @param data ids
 */
export function roleDelete(data) {
  return request({
    url: '/system/role/delete',
    method: 'post',
    data
  })
}

/**
 * 角色权限获取
 * @param id
 */
export function perm(id) {
  return request({
    url: '/system/role/perm/' + id,
    method: 'get'
  })
}

/**
 * 角色权限分配
 * @param id
 */
export function permSubmit(id, data) {
  return request({
    url: '/system/role/perm/' + id,
    method: 'post',
    data: data
  })
}

