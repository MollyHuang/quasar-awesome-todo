const state = {
  settings: {
    show12hourTimeformat: true
  }
}

const mutations = {
}

const actions = {
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