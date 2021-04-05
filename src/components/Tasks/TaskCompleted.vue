<template>
  <q-list
    v-if="Object.keys(tasksCompleted).length"
    separator
    bordered>
    <task
      v-for="(task, key) in tasksCompleted"
      :key="key"
      :id="key"
      :task="task">
    </task>
  </q-list>
</template>

<script>
export default {
  props: ['tasksCompleted'],
  components: {
    "task": require("../Tasks/Task.vue").default,
  }
}
</script>