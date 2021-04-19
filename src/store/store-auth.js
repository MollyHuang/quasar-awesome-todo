import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth } from 'boot/firebase.js'
import { shwoErrorMessage } from 'src/functions/functions-show-error-message'

const state = {
  loggedIn: false,
  loggedInEmail: ''
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setLoggedInEmail(state, value) {
    state.loggedInEmail = value
  }
}

const actions = {
  registerUser({ }, payload) {
    Loading.show()
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('registerUser response: ', response)
      })
      .catch(error => {
        shwoErrorMessage(error.message)
      })
  },
  loginUser({ }, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('loginUser response: ', response)
      })
      .catch(error => {
        shwoErrorMessage(error.message)
      })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({ commit, dispatch }) {
    firebaseAuth.onAuthStateChanged(user => {
      Loading.hide()
      if (user) {
        // User is signed in.
        commit('setLoggedIn', true)
        LocalStorage.set('loggedIn', true)
        commit('setLoggedInEmail', user.email)
        LocalStorage.set('loggedInEmail', user.email)
        this.$router.push('/').catch(err => { })
        dispatch('tasks/fbReadData', null, { root: true })
        dispatch('foods/fbReadData', null, { root: true })
      }
      else {
        commit('tasks/clearTasks', null, { root: true })
        commit('tasks/setTaskDownloaded', false, { root: true })
        commit('foods/clearFoods', null, { root: true })
        commit('setLoggedIn', false)
        LocalStorage.set('loggedIn', false)
        commit('setLoggedInEmail', '')
        LocalStorage.set('loggedInEmail', '')
        this.$router.replace('/auth').catch(err => { })
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