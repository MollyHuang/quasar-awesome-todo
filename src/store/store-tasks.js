import Vue from 'vue'
import { uid } from 'quasar'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { shwoErrorMessage } from 'src/functions/functions-show-error-message'

const state = {
  tasks: {
    // 'ID1': {
    //   name: "Go to shop",
    //   completed: false,
    //   dueDate: '2019/05/12',
    //   dueTime: '18:30'
    // },
    // 'ID2': {
    //   name: "Get bananas",
    //   completed: false,
    //   dueDate: '2019/05/13',
    //   dueTime: '14:00'
    // },
    // 'ID3': {
    //   name: "Get apples",
    //   completed: false,
    //   dueDate: '2019/05/14',
    //   dueTime: '16:00'
    // }
  },
  search: '',
  sort: 'dueDate',
  taskDownloaded: false
}

// 同步執行
const mutations = {
  addTask(state, payload) {
    // console.log('addTask (from mutations): ', payload)
    Vue.set(state.tasks, payload.id, payload.task)
  },
  updateTask(state, payload) {
    // console.log('payload (from mutations): ', payload)
    Object.assign(state.tasks[payload.id], payload.updates)
  },
  deleteTask(state, id) {
    // console.log('deleteTask id (from mutations): ', id)
    // delete state.tasks[id]
    Vue.delete(state.tasks, id)
  },
  clearTasks() {
    state.tasks = {}
  },
  setSearch(state, value) {
    state.search = value
  },
  setSort(state, value) {
    state.sort = value
  },
  setTaskDownloaded(state, value) {
    state.taskDownloaded = value
  },
}

// 可以異步執行
const actions = {
  updateTask({ dispatch }, payload) {
    // console.log('updateTask action')
    // console.log('payload: ', payload)
    dispatch('fbUpdateTask', payload)
  },
  deleteTask({ dispatch }, id) {
    dispatch('fbDeleteTask', id)
  },
  addTask({ dispatch }, task) {
    let taskId = uid()
    let payload = {
      id: taskId,
      task: task
    }
    dispatch('fbAddTask', payload)
  },
  setSearch({ commit }, value) {
    commit('setSearch', value)
  },
  setSort({ commit }, value) {
    commit('setSort', value)
  },

  fbReadData({ commit }) {
    console.log('start reading data from Firebase')
    let userId = firebaseAuth.currentUser.uid
    let userTasks = firebaseDb.ref('tasks/' + userId)

    // initial check for data
    userTasks.once('value', snapshot => {
      commit('setTaskDownloaded', true)
    }, error => {
      console.log("error.message: ", error.message)
    })

    // child added
    userTasks.on('child_added', snapshot => {
      // console.log("snapshot: ", snapshot)
      let task = snapshot.val()
      // console.log("task: ", task)
      let payload = {
        id: snapshot.key,
        task: task
      }
      commit('addTask', payload)
    })

    // child changed
    userTasks.on('child_changed', snapshot => {
      let task = snapshot.val()
      let payload = {
        id: snapshot.key,
        updates: task
      }
      commit('updateTask', payload)
    })

    // child removed
    userTasks.on('child_removed', snapshot => {
      commit('deleteTask', snapshot.key)
    })
  },
  fbAddTask({ }, payload) {
    // console.log("fbAddTask payload: ", payload)
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.set(payload.task, error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
    })
  },
  fbUpdateTask({ }, payload) {
    // console.log("fbUpdateTask payload: ", payload)
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + payload.id)
    taskRef.update(payload.updates, error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
    })
  },
  fbDeleteTask({ }, taskId) {
    // console.log("fbDeleteTask taskId: ", taskId)
    let userId = firebaseAuth.currentUser.uid
    let taskRef = firebaseDb.ref('tasks/' + userId + '/' + taskId)
    taskRef.remove(error => {
      if (error) {
        shwoErrorMessage(error.message)
      }
    })
  },
}

const getters = {
  tasksSorted: (state) => {
    let tasksSorted = {},
      keysOrdered = Object.keys(state.tasks)

    keysOrdered.sort((a, b) => {
      let taskAProp = state.tasks[a][state.sort].toLowerCase(),
        taskBProp = state.tasks[b][state.sort].toLowerCase()
      if (taskAProp > taskBProp) return 1
      else if (taskAProp < taskBProp) return -1
      else return 0
    })

    keysOrdered.forEach((key) => {
      tasksSorted[key] = state.tasks[key]
    })
    // console.log('keysOrdered: ', keysOrdered)

    return tasksSorted
  },
  tasksFiltered: (state, getters) => {
    let tasksSorted = getters.tasksSorted
    let tasksFiltered = {}
    if (state.search) {
      // populate empty object
      Object.keys(tasksSorted).forEach((key) => {
        let task = tasksSorted[key]
        // console.log('key: ', task)
        if (task.name.toLowerCase().includes(state.search.toLowerCase())) {
          tasksFiltered[key] = task
        }
      })
      return tasksFiltered
    }
    return tasksSorted
  },
  tasksTodo: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]
      // console.log('key: ', task)
      if (!task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
  tasksCompleted: (state, getters) => {
    let tasksFiltered = getters.tasksFiltered
    let tasks = {}
    Object.keys(tasksFiltered).forEach((key) => {
      let task = tasksFiltered[key]
      // console.log('key: ', task)
      if (task.completed) {
        tasks[key] = task
      }
    })
    return tasks
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}