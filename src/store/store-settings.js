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
  }
}

const actions = {
  setShow12hourTimeformat({ commit }, value) {
    commit('setShow12hourTimeformat', value)
    localStorage.setItem('show12hourTimeformat', value)
  },
  setShowTasksInOneList({ commit }, value) {
    commit('setShowTasksInOneList', value)
    localStorage.setItem('showTasksInOneList', value)
  },
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