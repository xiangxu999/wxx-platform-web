import variables from '@/assets/styles/element-variables.scss'
import defaultSettings from '@/settings'

const { showSettings, fixedHeader, sidebarLogo, tagsView, uniqueOpened, showFooter, footerTxt, caseNumber } = defaultSettings

const state = {
  theme: variables.theme,
  showSettings: showSettings,
  fixedHeader: fixedHeader,
  sidebarLogo: sidebarLogo,
  tagsView: tagsView,
  uniqueOpened: uniqueOpened,
  showFooter: showFooter,
  footerTxt: footerTxt,
  caseNumber: caseNumber

}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

