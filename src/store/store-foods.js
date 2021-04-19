import Vue from 'vue'
import { uid, Notify } from 'quasar'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { shwoErrorMessage } from 'src/functions/functions-show-error-message'

const state = {
  foods: {}
  /*
  foods: [
    {
      id: 1,
      name: 'Burger',
      description: 'A burger is a sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.',
      imageUrl: 'https://i.imgur.com/0umadnY.jpg',
      rating: 4
    },
    {
      id: 2,
      name: 'Pizza',
      description: 'Pizza is a savory dish of Italian origin, consisting of a usually round, flattened base of leavened wheat-based dough.',
      imageUrl: 'https://i.imgur.com/b9zDbyb.jpg',
      rating: 5
    },
    {
      id: 3,
      name: 'Sprouts',
      description: 'The Brussels sprout is a member of the Gemmifera Group of cabbages, grown for its edible buds.',
      imageUrl: 'https://i.imgur.com/RbKjUjB.jpg',
      rating: 1
    }
  ]
  */
}

const mutations = {
  updateFood(state, payload) {
    console.log('updateFood (from mutations): ', payload)
    Object.assign(state.foods[payload.id], payload.updates)
    // let index = state.foods.findIndex(stateFood => stateFood.id == food.id);
    // Vue.set(state.foods, index, food)
  },
  deleteFood(state, id) {
    console.log('deleteFood id (from mutations): ', id)
    Vue.delete(state.foods, id)
    // let index = state.foods.findIndex(food => food.id == id);
    // console.log('deleteFood index (from mutations): ', index)
    // Vue.delete(state.foods, index)
  },
  addFood(state, payload) {
    // console.log('addFood (from mutations): ', payload)
    Vue.set(state.foods, payload.id, payload.food)
    // state.foods.push(food)
  },
  clearFoods() {
    state.foods = {}
  },
}

const actions = {
  updateFood({ dispatch }, payload) {
    dispatch('fbUpdateFood', payload)
    // commit('updateFood', food)
  },
  deleteFood({ dispatch }, id) {
    dispatch('fbDeleteFood', id)
    // commit('deleteFood', id)
  },
  addFood({ dispatch }, food) {
    let newId = uid()
    let payload = {
      id: newId,
      food: food
    }
    dispatch('fbAddFood', payload)
    // food.id = newId
    // commit('addFood', food)
  },

  fbReadData({ commit }) {
    console.log('start reading foods from Firebase')
    let userId = firebaseAuth.currentUser.uid
    // userId = '4jhombFiCyNqDzhL7iICOBoItdY2'
    let userFoods = firebaseDb.ref('foods/' + userId)

    // initial check for foods
    userFoods.once('value', snapshot => {
      // commit('setFoodDownloaded', true)
    }, error => {
      shwoErrorMessage(error.message)
      this.$router.replace('/auth')
    })

    // child added
    userFoods.on('child_added', snapshot => {
      // console.log("snapshot: ", snapshot)
      let food = snapshot.val()
      // console.log("food: ", food)
      let payload = {
        id: snapshot.key,
        food: food
      }
      commit('addFood', payload)
    })

    // child changed
    userFoods.on('child_changed', snapshot => {
      let food = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: food
      }
      commit('updateFood', payload)
    })

    // child removed
    userFoods.on('child_removed', snapshot => {
      commit('deleteFood', snapshot.key)
    })
  },
  fbAddFood({ }, payload) {
    console.log("fbAddFood payload: ", payload)
    let userId = firebaseAuth.currentUser.uid
    let foodRef = firebaseDb.ref('foods/' + userId + '/' + payload.id)
    foodRef.set(payload.food, error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
      else {
        Notify.create('Food added!')
      }
    })
  },
  fbUpdateFood({ }, payload) {
    console.log("fbUpdateFood payload: ", payload)
    let userId = firebaseAuth.currentUser.uid
    let foodRef = firebaseDb.ref('foods/' + userId + '/' + payload.id)
    foodRef.update(payload.updates, error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
      else {
        Notify.create('Food updated!')
      }
    })
  },
  fbDeleteFood({ }, foodId) {
    console.log("fbDeleteFood foodId: ", foodId)
    let userId = firebaseAuth.currentUser.uid
    let foodRef = firebaseDb.ref('foods/' + userId + '/' + foodId)
    foodRef.remove(error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
      else {
        Notify.create('Food deleted!')
      }
    })
  },
}

const getters = {
  foods: (state) => {
    return state.foods
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}