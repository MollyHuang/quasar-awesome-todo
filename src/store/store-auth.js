import { firebaseAuth } from 'boot/firebase.js'

const state = {
}

const mutations = {
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
  }
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