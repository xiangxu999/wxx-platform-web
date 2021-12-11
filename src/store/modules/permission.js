import { constantRoutes } from '@/router'
import Layout from '@/layout'

/**
 * 导航转为路由
 * @param menu
 * @param role
 * @returns {null}
 */
const menuToRoute = (menu, role) => {
  // 如果当前是按钮就不添加进去,如果当前菜单被禁用，也不添加路由
  if (menu.type !== 2 && menu.status === 1) {
    // 构建路由
    const route = {
      path: menu.path,
      // 目录的话就没有对应的vue页面
      component: menu.component === '' || menu.component === null ? Layout : (resolve) => require([`@/${menu.component}.vue`], resolve),
      name: menu.name,
      // hidden: menu.status === 0,
      meta: {
        role: role.split(','),
        icon: menu.icon,
        title: menu.title
      },
      children: []
    }
    // 存在下级菜单和目录
    if (menu.children.length > 0) {
      for (let i = 0; i < menu.children.length; i++) {
        if (menu.children[i].type !== 2) {
          route.children.push(menuToRoute(menu.children[i], role))
        }
      }
    }
    return route
  } else {
    return null
  }
}

const state = {
  routers: constantRoutes,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRoutes.concat(routers)
  }
}
const actions = {
  generateRoutes({ commit }, data) {
    return new Promise(resolve => {
      const { role, nav } = data
      const addRouters = []
      nav.forEach(menu => {
        const route = menuToRoute(menu, role)
        if (route) {
          addRouters.push(route)
        }
      })
      commit('SET_ROUTERS', addRouters)
      resolve(addRouters)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
