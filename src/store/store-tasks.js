import Vue from 'vue'
import { uid } from 'quasar'

const state = {
  tasks: {
    'ID1': {
      name: "Go to shop",
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    'ID2': {
      name: "Get bananas",
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    'ID3': {
      name: "Get apples",
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    }
  }
}

const mutations = {
  updateTask(state, payload) {
    console.log('payload (from mutations): ', payload)
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    console.log('deleteTask id (from mutations): ', id)
    // delete state.tasks[id]
    Vue.delete(state.tasks, id)
  },
  addTask(state, payload) {
    console.log('addTask (from mutations): ', payload)
    Vue.set(state.tasks, payload.id, payload.task)
  },
}

const actions = {
  updateTask({ commit }, payload) {
    console.log('updateTask action')
    console.log('payload: ', payload)
    commit('updateTask', payload)
  },
  deleteTask({ commit }, id) {
    commit('deleteTask', id)
  },
  addTask({ commit }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    commit('addTask', payload)
  }
}

const getters = {
  tasksTodo: (state) => {
    let tasks = {}
    Object.keys(state.tasks).forEach((key) => {
      let task = state.tasks[key]
      // console.log('key: ', task)
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state) => {
    let tasks = {}
    Object.keys(state.tasks).forEach((key) => {
      let task = state.tasks[key]
      // console.log('key: ', task)
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}