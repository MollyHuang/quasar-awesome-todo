// outside of a Vue file
import { LocalStorage } from 'quasar'

const state = {
  settings: {
    show12hourTimeformat: false,
    showTasksInOneList: false
  }
}

const mutations = {
  setShow12hourTimeformat(state, value) {
    state.settings.show12hourTimeformat = value
  },
  setShowTasksInOneList(state, value) {
    state.settings.showTasksInOneList = value
  },
  setSettings(state, settings) {
    Object.assign(state.settings, settings)
  }
}

const actions = {
  setShow12hourTimeformat({ commit, dispatch }, value) {
    commit('setShow12hourTimeformat', value)
    // localStorage.setItem('show12hourTimeformat', value)
    dispatch('saveSettings')
  },
  setShowTasksInOneList({ commit, dispatch }, value) {
    commit('setShowTasksInOneList', value)
    // localStorage.setItem('showTasksInOneList', value)
    dispatch('saveSettings')
  },
  saveSettings({ state }) {
    LocalStorage.set('settings', state.settings)
  },
  getSettings({ commit }) {
    let settings = LocalStorage.getItem('settings')
    // console.log('getSettings:', settings)
    if (settings) {
      commit('setSettings', settings)
    }
  }
}

const getters = {
  settings: state => {
    return state.settings
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}