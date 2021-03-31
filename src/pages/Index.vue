<template>
  <q-page padding>

    <ul>
      <li v-for="(task, index) in tasks">
        <div>{{ task.name }} {{ index }}</div>
        <small>{{ task.dueDate }} {{ task.dueTime }}</small>
        <button @click="deleteTask(index)">X</button>
      </li>
    </ul>

  </q-page>
</template>

<script>
export default {
  data() {
    return {
      tasks: [
        {
          name: 'Go to shop',
          dueDate: '2019/05/12',
          dueTime: '18:30'
        },
        {
          name:'Get bananas',
          dueDate: '2019/05/13',
          dueTime: '14:00'
        },
        {
          name:'Get apples',
          dueDate: '2019/05/14',
          dueTime: '16:00'
        }, 
      ]
    }
  },
  methods: {
    deleteTask(index) {
      this.tasks.splice(index, 1)
    }
  }
}
</script>

<style scoped>

</style>