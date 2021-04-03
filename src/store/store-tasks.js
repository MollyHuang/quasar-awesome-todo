const state = {
  tasks: [
    {
      id: 1,
      name: "Go to shop",
      completed: false,
      dueDate: '2019/05/12',
      dueTime: '18:30'
    },
    {
      id: 2,
      name: "Get bananas",
      completed: false,
      dueDate: '2019/05/13',
      dueTime: '14:00'
    },
    {
      id: 3,
      name: "Get apples",
      completed: false,
      dueDate: '2019/05/14',
      dueTime: '16:00'
    }
  ]
}

const mutations = {

}

const actions = {

}

const getters = {
  tasks: (state) => {
    return state.tasks
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}