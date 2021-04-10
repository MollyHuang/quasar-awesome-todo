import { firebaseAuth } from 'boot/firebase.js'

const state = {
  loggedIn: false
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  }
}

const actions = {
  registerUser({ }, payload) {
    console.log('payload: ', payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        console.log('error.message: ', error.message)
      })
  },
  loginUser({ }, payload) {
    console.log('payload: ', payload)
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('response: ', response)
      })
      .catch(error => {
        console.log('error.message: ', error.message)
      })
  },
  handleAuthStateChange({ commit }) {
    firebaseAuth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        commit('setLoggedIn', true)
      }
      else {
        commit('setLoggedIn', false)
      }
    })
  },
}

const getters = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}