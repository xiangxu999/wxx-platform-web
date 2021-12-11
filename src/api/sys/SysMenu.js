import request from '@/utils/request'

/**
 * 获取菜单列表
 */
export function menuList(name) {
  return request({
    url: '/system/menu/list',
    method: 'get',
    params: {
      name: name
    }
  })
}

/**
 * 获取菜单的详情信息
 * @param id
 */
export function menuInfo(id) {
  return request({
    url: '/system/menu/info/' + id,
    method: 'get'
  })
}

/**
 * 菜单修改
 * @param data
 */
export function menuUpdate(data) {
  return request({
    url: '/system/menu/update',
    method: 'post',
    data
  })
}

/**
 * 菜单新增
 * @param data
 */
export function menuSave(data) {
  return request({
    url: '/system/menu/save',
    method: 'post',
    data
  })
}

export function menuDelete(id) {
  return request({
    url: '/system/menu/delete/' + id,
    method: 'post'
  })
}
