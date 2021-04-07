const state = {
  settings: {
    show12hourTimeformat: false
  }
}

const mutations = {
  setshow12hourTimeformat(state, value) {
    state.settings.show12hourTimeformat = value
  }
}

const actions = {
  setshow12hourTimeformat({ commit }, value) {
    commit('setshow12hourTimeformat', value)
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